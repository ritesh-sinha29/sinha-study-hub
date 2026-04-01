import { v } from "convex/values";
import { mutation, query, QueryCtx } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication identifier");
    }

    // Check if we've already stored this user
    const user = await getUser(ctx, identity.tokenIdentifier);
    if (user !== null) {
      // If we've seen this user before but the name has changed, update it.
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }

    // If it's a new user, create it
    return await ctx.db.insert("users", {
      name: identity.name ?? "Anonymous",
      email: identity.email ?? "no-email@example.com",
      tokenIdentifier: identity.tokenIdentifier,
      points: 0,
      streak: 0,
      joinedAt: new Date().toISOString(),
      favorites: [],
      achievements: {
        topContributor: false,
        studyStreak: false,
        helpfulMember: false,
      },
    });
  },
});

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }
    return await getUser(ctx, identity.tokenIdentifier);
  },
});

export const updateProfile = mutation({
  args: {
    registrationId: v.optional(v.string()),
    year: v.optional(v.string()),
    branch: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const user = await getUser(ctx, identity.tokenIdentifier);
    if (!user) {
      throw new Error("User not found");
    }
    await ctx.db.patch(user._id, args);
  },
});

export const toggleFavorite = mutation({
  args: { resourceId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    
    const user = await getUser(ctx, identity.tokenIdentifier);
    if (!user) throw new Error("User not found");

    const favorites = user.favorites || [];
    const index = favorites.indexOf(args.resourceId);
    
    if (index === -1) {
      favorites.push(args.resourceId);
    } else {
      favorites.splice(index, 1);
    }

    await ctx.db.patch(user._id, { favorites });
  },
});

async function getUser(ctx: QueryCtx, tokenIdentifier: string) {
  return await ctx.db
    .query("users")
    .withIndex("by_token", (q) => q.eq("tokenIdentifier", tokenIdentifier))
    .unique();
}
