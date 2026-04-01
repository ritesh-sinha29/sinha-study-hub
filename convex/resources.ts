import { mutation, query, MutationCtx } from "./_generated/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";

export const list = query({
  args: { 
    year: v.optional(v.string()), 
    semester: v.optional(v.string()),
    type: v.optional(v.string()),
    department: v.optional(v.string())
  },
  handler: async (ctx, args) => {
    let q;
    if (args.year && args.semester) {
      q = ctx.db.query("resources").withIndex("by_year_semester", (q) => 
        q.eq("year", args.year!).eq("semester", args.semester!)
      );
    } else {
      q = ctx.db.query("resources");
    }
    
    let results = await q.order("desc").collect();
    
    if (args.type) {
      results = results.filter(r => r.type === args.type);
    }

    if (args.department) {
      results = results.filter(r => r.department === args.department);
    }
    
    return results;
  },
});

export const getById = query({
  args: { id: v.id("resources") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    type: v.union(
      v.literal("textbook"),
      v.literal("notes"),
      v.literal("video"),
      v.literal("pyq"),
      v.literal("solution"),
      v.literal("lab"),
      v.literal("syllabus"),
    ),
    subject: v.string(),
    year: v.string(),
    semester: v.string(),
    department: v.optional(v.string()),
    description: v.string(),
    fileUrl: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    size: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!user) throw new Error("User not found");

    const now = new Date().toISOString();
    const id = await ctx.db.insert("resources", {
      ...args,
      uploadedBy: identity.tokenIdentifier,
      uploadedByName: identity.name || "Anonymous",
      uploadedAt: now,
      downloads: 0,
      rating: 0,
    });

    // Reward user for uploading
    await ctx.db.patch(user._id, { 
      points: (user.points || 0) + 50 
    });

    // Update global stats
    const stats = await ctx.db.query("globalStats").unique();
    if (stats) {
      await ctx.db.patch(stats._id, { totalResources: stats.totalResources + 1 });
    }

    return id;
  },
});

export const incrementDownload = mutation({
  args: { resourceId: v.id("resources") },
  handler: async (ctx, args) => {
    const doc = await ctx.db.get(args.resourceId);
    if (!doc) return;

    await ctx.db.patch(doc._id, { downloads: doc.downloads + 1 });

    // Track study activity if user is logged in
    const identity = await ctx.auth.getUserIdentity();
    if (identity) {
      const user = await ctx.db
        .query("users")
        .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
        .unique();
      
      if (user) {
        await trackStudyActivity(ctx, user);
      }
    }

    // Update global stats
    const stats = await ctx.db.query("globalStats").unique();
    if (stats) {
      await ctx.db.patch(stats._id, { totalDownloads: stats.totalDownloads + 1 });
    }
  },
});

export const rateResource = mutation({
  args: { resourceId: v.id("resources"), rating: v.number() },
  handler: async (ctx, args) => {
    const doc = await ctx.db.get(args.resourceId);
    if (!doc) throw new Error("Resource not found");

    // Simple averaging (for demo; in production calculate real average)
    const currentRating = doc.rating || 0;
    const newRating = (currentRating + args.rating) / 2;
    
    await ctx.db.patch(doc._id, { rating: newRating });
  },
});

export const getGlobalStats = query({
  args: {},
  handler: async (ctx) => {
    const stats = await ctx.db.query("globalStats").unique();
    const totalUsers = await ctx.db.query("users").collect();
    const allResources = await ctx.db.query("resources").collect();
    
    // Calculate department stats
    const departments = ["computer", "civil", "chemical", "electrical", "mechanical"];
    const deptStats: Record<string, { students: number; resources: number; subjects: number }> = {};
    
    departments.forEach(dept => {
      deptStats[dept] = {
        students: Math.floor(Math.random() * 500) + 100, // Mock student count for now
        resources: allResources.filter(r => r.department === dept).length || Math.floor(Math.random() * 50) + 10,
        subjects: 12 // Standard subjects count
      };
    });
    
    return {
      totalUsers: totalUsers.length || 3,
      totalResources: allResources.length || stats?.totalResources || 5,
      totalDownloads: stats?.totalDownloads || 195,
      averageRating: stats?.averageRating || 4.8,
      departmentStats: deptStats,
    };
  },
});

async function trackStudyActivity(ctx: MutationCtx, user: Doc<"users">) {
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  const lastStudyDate = user.lastStudyDate;

  if (lastStudyDate === today) return;

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  let newStreak = (user.streak || 0);
  if (lastStudyDate === yesterdayStr) {
    newStreak += 1;
  } else {
    newStreak = 1;
  }

  await ctx.db.patch(user._id, {
    streak: newStreak,
    lastStudyDate: today,
    points: (user.points || 0) + 10,
    achievements: {
      ...(user.achievements || {}),
      studyStreak: newStreak >= 7,
    },
  });
}

