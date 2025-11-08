import { useState } from "react";
import CourseModal from "../CourseModal";
import { Button } from "@/components/ui/button";
import type { InsertCourse } from "@shared/schema";

export default function CourseModalExample() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data: InsertCourse) => {
    console.log("Course data:", data);
  };

  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>Open Add Course Modal</Button>
      <CourseModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        mode="add"
      />
    </div>
  );
}
