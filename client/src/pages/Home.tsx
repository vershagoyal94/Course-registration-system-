import { useState, useEffect, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CourseGrid from "@/components/CourseGrid";
import MyCourses from "@/components/MyCourses";
import AdminPanel from "@/components/AdminPanel";
import CourseModal from "@/components/CourseModal";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useToast } from "@/hooks/use-toast";
import type { Course, InsertCourse } from "@shared/schema";
import {
  loadCourses,
  saveCourses,
  loadRegistrations,
  addCourse,
  updateCourse,
  deleteCourse,
  registerForCourse,
  unregisterFromCourse,
} from "@/lib/courseStorage";

type View = "home" | "courses" | "my-courses" | "admin";

export default function Home() {
  const { toast } = useToast();
  const [currentView, setCurrentView] = useState<View>("home");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [registrations, setRegistrations] = useState<string[]>([]);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingCourse, setEditingCourse] = useState<Course | undefined>();
  
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmDescription, setConfirmDescription] = useState("");

  useEffect(() => {
    setCourses(loadCourses());
    const regs = loadRegistrations();
    setRegistrations(regs.map((r) => r.courseId));
  }, []);

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses;
    const query = searchQuery.toLowerCase();
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.category?.toLowerCase().includes(query)
    );
  }, [courses, searchQuery]);

  const registeredCourses = useMemo(() => {
    return courses.filter((course) => registrations.includes(course.id));
  }, [courses, registrations]);

  const handleRegister = (courseId: string) => {
    const success = registerForCourse(courseId);
    if (success) {
      setCourses(loadCourses());
      setRegistrations(loadRegistrations().map((r) => r.courseId));
      toast({
        title: "Registration Successful",
        description: "You have been registered for the course.",
      });
    } else {
      toast({
        title: "Registration Failed",
        description: "Unable to register. The course may be full or you're already registered.",
        variant: "destructive",
      });
    }
  };

  const handleUnregister = (courseId: string) => {
    setConfirmTitle("Unregister from Course");
    setConfirmDescription("Are you sure you want to unregister from this course?");
    setConfirmAction(() => () => {
      const success = unregisterFromCourse(courseId);
      if (success) {
        setCourses(loadCourses());
        setRegistrations(loadRegistrations().map((r) => r.courseId));
        toast({
          title: "Unregistered",
          description: "You have been unregistered from the course.",
        });
      }
      setConfirmOpen(false);
    });
    setConfirmOpen(true);
  };

  const handleAddCourse = () => {
    setModalMode("add");
    setEditingCourse(undefined);
    setModalOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setModalMode("edit");
    setEditingCourse(course);
    setModalOpen(true);
  };

  const handleDeleteCourse = (courseId: string) => {
    setConfirmTitle("Delete Course");
    setConfirmDescription("Are you sure you want to delete this course? This action cannot be undone.");
    setConfirmAction(() => () => {
      deleteCourse(courseId);
      setCourses(loadCourses());
      setRegistrations(loadRegistrations().map((r) => r.courseId));
      toast({
        title: "Course Deleted",
        description: "The course has been permanently deleted.",
      });
      setConfirmOpen(false);
    });
    setConfirmOpen(true);
  };

  const handleSubmitCourse = (data: InsertCourse) => {
    if (modalMode === "add") {
      addCourse(data);
      toast({
        title: "Course Added",
        description: "The new course has been added successfully.",
      });
    } else if (editingCourse) {
      updateCourse(editingCourse.id, {
        ...data,
        availableSeats: editingCourse.availableSeats + (data.totalSeats - editingCourse.totalSeats),
      });
      toast({
        title: "Course Updated",
        description: "The course has been updated successfully.",
      });
    }
    setCourses(loadCourses());
  };

  const renderContent = () => {
    if (currentView === "admin" && isAdminMode) {
      return (
        <AdminPanel
          courses={courses}
          onEdit={handleEditCourse}
          onDelete={handleDeleteCourse}
          onAdd={handleAddCourse}
        />
      );
    }

    if (currentView === "my-courses") {
      return (
        <MyCourses
          registeredCourses={registeredCourses}
          onUnregister={handleUnregister}
        />
      );
    }

    return (
      <>
        {currentView === "home" && (
          <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        )}
        <CourseGrid
          courses={filteredCourses}
          registeredCourseIds={registrations}
          onRegister={handleRegister}
          onUnregister={handleUnregister}
        />
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentView={currentView}
        onViewChange={setCurrentView}
        isAdminMode={isAdminMode}
        onAdminModeToggle={() => {
          setIsAdminMode(!isAdminMode);
          if (!isAdminMode && currentView !== "admin") {
            setCurrentView("admin");
          }
        }}
      />

      {renderContent()}

      <footer className="border-t bg-muted/30 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-muted-foreground sm:px-6 lg:px-8">
          <p data-testid="text-footer">
            © 2025 CourseHub. All rights reserved. Built with localStorage for client-side persistence.
          </p>
        </div>
      </footer>

      <CourseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitCourse}
        course={editingCourse}
        mode={modalMode}
      />

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={confirmAction}
        title={confirmTitle}
        description={confirmDescription}
        confirmText={confirmTitle.includes("Delete") ? "Delete" : "Confirm"}
        variant={confirmTitle.includes("Delete") ? "destructive" : "default"}
      />
    </div>
  );
}
