import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const courseSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  instructor: z.string().min(1, "Instructor is required"),
  totalSeats: z.number().int().min(1, "Must have at least 1 seat"),
  availableSeats: z.number().int().min(0),
  imageUrl: z.string().optional(),
  category: z.string().optional(),
});

export const insertCourseSchema = courseSchema.omit({ id: true, availableSeats: true });

export type Course = z.infer<typeof courseSchema>;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type Registration = {
  courseId: string;
  registeredAt: string;
};
