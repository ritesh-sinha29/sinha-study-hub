import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    registrationId: v.string(),
    year: v.string(),
    branch: v.string(),
    avatar: v.optional(v.string()),
    points: v.number(),
    streak: v.number(),
    joinedAt: v.string(),
    // NOTE: for now this mirrors your current demo app which stores passwords client-side.
    // In production, never store raw passwords; use a real auth provider.
    password: v.string(),
  })
    .index("by_email", ["email"])
    .index("by_registrationId", ["registrationId"]),

  resources: defineTable({
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
    uploadedAt: v.string(),
    downloads: v.number(),
    rating: v.number(),
    tags: v.array(v.string()),
    size: v.optional(v.string()),
  })
    .index("by_year_semester", ["year", "semester"])
    .index("by_subject", ["subject"]),

  comments: defineTable({
    resourceId: v.string(),
    userId: v.string(),
    userName: v.string(),
    userAvatar: v.optional(v.string()),
    content: v.string(),
    createdAt: v.string(),
    upvotes: v.number(),
    downvotes: v.number(),
    parentCommentId: v.optional(v.string()),
  }).index("by_resource", ["resourceId"]),
});

