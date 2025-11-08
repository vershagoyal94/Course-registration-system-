import CourseCard from "../CourseCard";
import type { Course } from "@shared/schema";

const sampleCourse: Course = {
  id: "1",
  title: "Introduction to Programming",
  description: "Learn the fundamentals of programming with hands-on projects and real-world examples.",
  instructor: "Dr. Sarah Johnson",
  totalSeats: 30,
  availableSeats: 12,
  category: "Computer Science",
  imageUrl: "cs",
};

export default function CourseCardExample() {
  return (
    <div className="grid gap-6 p-8 md:grid-cols-2 lg:grid-cols-3">
      <CourseCard
        course={sampleCourse}
        onRegister={(id) => console.log("Register:", id)}
      />
      <CourseCard
        course={{ ...sampleCourse, id: "2", availableSeats: 0 }}
        onRegister={(id) => console.log("Register:", id)}
      />
      <CourseCard
        course={sampleCourse}
        isRegistered
        onUnregister={(id) => console.log("Unregister:", id)}
      />
    </div>
  );
}
