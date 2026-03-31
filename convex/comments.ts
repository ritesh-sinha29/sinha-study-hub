import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listByResource = query({
  args: { resourceId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("comments")
      .withIndex("by_resource", (q) => q.eq("resourceId", args.resourceId))
      .order("desc")
      .collect();
  },
});

export const add = mutation({
  args: {
    resourceId: v.string(),
    userId: v.string(),
    userName: v.string(),
    userAvatar: v.optional(v.string()),
    content: v.string(),
    parentCommentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const now = new Date().toISOString();
    return await ctx.db.insert("comments", {
      ...args,
      createdAt: now,
      upvotes: 0,
      downvotes: 0,
    });
  },
});

