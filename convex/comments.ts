import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const listByResource = query({
  args: { resourceId: v.id("resources") },
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
    resourceId: v.id("resources"),
    content: v.string(),
    parentCommentId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const now = new Date().toISOString();
    return await ctx.db.insert("comments", {
      ...args,
      userId: identity.tokenIdentifier,
      userName: identity.name || "Anonymous",
      userAvatar: identity.pictureUrl,
      createdAt: now,
      upvotes: 0,
      downvotes: 0,
    });
  },
});

export const vote = mutation({
  args: { commentId: v.id("comments"), type: v.union(v.literal("up"), v.literal("down")) },
  handler: async (ctx, args) => {
    const doc = await ctx.db.get(args.commentId);
    if (!doc) return;

    if (args.type === "up") {
      await ctx.db.patch(doc._id, { upvotes: doc.upvotes + 1 });
    } else {
      await ctx.db.patch(doc._id, { downvotes: doc.downvotes + 1 });
    }
  },
});

