import AdminPanel from "../AdminPanel";
import type { Course } from "@shared/schema";

const sampleCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Programming",
    description: "Learn programming basics",
    instructor: "Dr. Sarah Johnson",
    totalSeats: 30,
    availableSeats: 12,
    category: "Computer Science",
  },
  {
    id: "2",
    title: "Business Management",
    description: "Business essentials",
    instructor: "Prof. Michael Chen",
    totalSeats: 25,
    availableSeats: 8,
    category: "Business",
  },
];

export default function AdminPanelExample() {
  return (
    <AdminPanel
      courses={sampleCourses}
      onEdit={(course) => console.log("Edit:", course)}
      onDelete={(id) => console.log("Delete:", id)}
      onAdd={() => console.log("Add new course")}
    />
  );
}
