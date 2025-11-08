import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { Course } from "@shared/schema";

type AdminPanelProps = {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (courseId: string) => void;
  onAdd: () => void;
};

export default function AdminPanel({ courses, onEdit, onDelete, onAdd }: AdminPanelProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4 space-y-0">
          <CardTitle data-testid="text-admin-title">Course Management</CardTitle>
          <Button onClick={onAdd} data-testid="button-add-course">
            <Plus className="mr-2 h-4 w-4" />
            Add New Course
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full" data-testid="table-courses">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Instructor</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Category</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Total Seats</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Available</th>
                  <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="border-b last:border-0" data-testid={`row-course-${course.id}`}>
                    <td className="px-4 py-4 text-sm font-medium" data-testid={`text-title-${course.id}`}>
                      {course.title}
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground" data-testid={`text-instructor-${course.id}`}>
                      {course.instructor}
                    </td>
                    <td className="px-4 py-4 text-sm text-muted-foreground" data-testid={`text-category-${course.id}`}>
                      {course.category || "-"}
                    </td>
                    <td className="px-4 py-4 text-center text-sm" data-testid={`text-total-${course.id}`}>
                      {course.totalSeats}
                    </td>
                    <td className="px-4 py-4 text-center text-sm" data-testid={`text-available-${course.id}`}>
                      {course.availableSeats}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onEdit(course)}
                          data-testid={`button-edit-${course.id}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => onDelete(course.id)}
                          data-testid={`button-delete-${course.id}`}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {courses.length === 0 && (
            <div className="py-12 text-center text-muted-foreground" data-testid="text-empty">
              No courses found. Add your first course to get started.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
