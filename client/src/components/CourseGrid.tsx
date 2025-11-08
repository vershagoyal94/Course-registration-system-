import CourseCard from "./CourseCard";
import type { Course } from "@shared/schema";

type CourseGridProps = {
  courses: Course[];
  registeredCourseIds: string[];
  onRegister: (courseId: string) => void;
  onUnregister: (courseId: string) => void;
};

export default function CourseGrid({
  courses,
  registeredCourseIds,
  onRegister,
  onUnregister,
}: CourseGridProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-3xl font-bold" data-testid="text-courses-title">
        Available Courses
      </h2>

      {courses.length === 0 ? (
        <div className="py-16 text-center text-muted-foreground" data-testid="text-no-results">
          No courses found matching your search.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="grid-courses">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isRegistered={registeredCourseIds.includes(course.id)}
              onRegister={onRegister}
              onUnregister={onUnregister}
            />
          ))}
        </div>
      )}
    </div>
  );
}
