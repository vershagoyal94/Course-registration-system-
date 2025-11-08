import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from "lucide-react";
import CourseCard from "./CourseCard";
import type { Course } from "@shared/schema";

type MyCoursesProps = {
  registeredCourses: Course[];
  onUnregister: (courseId: string) => void;
};

export default function MyCourses({ registeredCourses, onUnregister }: MyCoursesProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="mb-6 text-3xl font-bold" data-testid="text-my-courses-title">
        My Registered Courses
      </h2>

      {registeredCourses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <BookOpen className="mb-4 h-16 w-16 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold" data-testid="text-empty-title">
              No Courses Yet
            </h3>
            <p className="text-center text-muted-foreground" data-testid="text-empty-description">
              You haven't registered for any courses yet. Browse our catalog to get started!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" data-testid="grid-courses">
          {registeredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              isRegistered
              onUnregister={onUnregister}
            />
          ))}
        </div>
      )}
    </div>
  );
}
