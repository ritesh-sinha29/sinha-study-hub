import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(), // Clerk's userId
    registrationId: v.optional(v.string()),
    year: v.optional(v.string()),
    branch: v.optional(v.string()),
    avatar: v.optional(v.string()),
    points: v.number(),
    streak: v.number(),
    lastStudyDate: v.optional(v.string()),
    joinedAt: v.string(),
    favorites: v.array(v.string()), // Array of resource IDs
    achievements: v.object({
      topContributor: v.boolean(),
      studyStreak: v.boolean(),
      helpfulMember: v.boolean(),
    }),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"]),

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
    uploadedBy: v.string(), // Clerk ID
    uploadedByName: v.string(),
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
    userId: v.string(), // Clerk ID
    userName: v.string(),
    userAvatar: v.optional(v.string()),
    content: v.string(),
    createdAt: v.string(),
    upvotes: v.number(),
    downvotes: v.number(),
    parentCommentId: v.optional(v.string()),
  }).index("by_resource", ["resourceId"]),

  globalStats: defineTable({
    totalUsers: v.number(),
    totalDownloads: v.number(),
    totalResources: v.number(),
    averageRating: v.number(),
  }),
});

