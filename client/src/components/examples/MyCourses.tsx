import MyCourses from "../MyCourses";
import type { Course } from "@shared/schema";

const sampleCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Programming",
    description: "Learn the fundamentals of programming",
    instructor: "Dr. Sarah Johnson",
    totalSeats: 30,
    availableSeats: 12,
    category: "Computer Science",
    imageUrl: "cs",
  },
];

export default function MyCoursesExample() {
  return (
    <div>
      <MyCourses
        registeredCourses={sampleCourses}
        onUnregister={(id) => console.log("Unregister:", id)}
      />
      
      <div className="mt-8">
        <h3 className="mb-4 px-4 text-lg font-semibold">Empty State:</h3>
        <MyCourses
          registeredCourses={[]}
          onUnregister={(id) => console.log("Unregister:", id)}
        />
      </div>
    </div>
  );
}
