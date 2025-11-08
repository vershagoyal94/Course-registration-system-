import CourseGrid from "../CourseGrid";
import type { Course } from "@shared/schema";

const sampleCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Programming",
    description: "Learn programming fundamentals",
    instructor: "Dr. Sarah Johnson",
    totalSeats: 30,
    availableSeats: 12,
    category: "Computer Science",
    imageUrl: "cs",
  },
  {
    id: "2",
    title: "Business Management",
    description: "Master business essentials",
    instructor: "Prof. Michael Chen",
    totalSeats: 25,
    availableSeats: 0,
    category: "Business",
    imageUrl: "business",
  },
];

export default function CourseGridExample() {
  return (
    <CourseGrid
      courses={sampleCourses}
      registeredCourseIds={["1"]}
      onRegister={(id) => console.log("Register:", id)}
      onUnregister={(id) => console.log("Unregister:", id)}
    />
  );
}
