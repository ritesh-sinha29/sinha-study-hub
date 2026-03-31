import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("resources").order("desc").collect();
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
    uploadedBy: v.string(),
    tags: v.array(v.string()),
    size: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    const id = await ctx.db.insert("resources", {
      ...args,
      uploadedAt: now,
      downloads: 0,
      rating: 0,
    });
    return id;
  },
});

export const incrementDownload = mutation({
  args: { resourceId: v.string() },
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query("resources")
      .filter((q) => q.eq(q.field("_id"), args.resourceId as any))
      .unique();
    if (!doc) return;
    await ctx.db.patch(doc._id, { downloads: doc.downloads + 1 });
  },
});

