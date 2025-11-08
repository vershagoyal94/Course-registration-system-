import type { Course, InsertCourse, Registration } from "@shared/schema";

const COURSES_KEY = "courses";
const REGISTRATIONS_KEY = "registrations";

export function getInitialCourses(): Course[] {
  return [
    {
      id: "1",
      title: "Introduction to Programming",
      description: "Learn the fundamentals of programming with hands-on projects and real-world examples. Perfect for beginners!",
      instructor: "Dr. Sarah Johnson",
      totalSeats: 30,
      availableSeats: 12,
      category: "Computer Science",
      imageUrl: "cs",
    },
    {
      id: "2",
      title: "Business Management Essentials",
      description: "Master the core principles of business management, leadership, and strategic planning.",
      instructor: "Prof. Michael Chen",
      totalSeats: 25,
      availableSeats: 8,
      category: "Business",
      imageUrl: "business",
    },
    {
      id: "3",
      title: "Graphic Design Fundamentals",
      description: "Explore the principles of visual design, typography, and color theory. Create stunning designs!",
      instructor: "Emily Rodriguez",
      totalSeats: 20,
      availableSeats: 5,
      category: "Design",
      imageUrl: "design",
    },
    {
      id: "4",
      title: "Data Science & Analytics",
      description: "Dive into data analysis, visualization, and machine learning techniques using modern tools.",
      instructor: "Dr. James Wilson",
      totalSeats: 28,
      availableSeats: 15,
      category: "Data Science",
      imageUrl: "data",
    },
    {
      id: "5",
      title: "Digital Marketing Strategy",
      description: "Learn to create effective marketing campaigns across social media, SEO, and content marketing.",
      instructor: "Amanda Foster",
      totalSeats: 35,
      availableSeats: 0,
      category: "Marketing",
      imageUrl: "marketing",
    },
    {
      id: "6",
      title: "Web Development Bootcamp",
      description: "Build modern, responsive websites using HTML, CSS, JavaScript, and popular frameworks.",
      instructor: "Dr. Sarah Johnson",
      totalSeats: 30,
      availableSeats: 18,
      category: "Computer Science",
      imageUrl: "cs",
    },
  ];
}

export function loadCourses(): Course[] {
  const stored = localStorage.getItem(COURSES_KEY);
  if (!stored) {
    const initial = getInitialCourses();
    saveCourses(initial);
    return initial;
  }
  return JSON.parse(stored);
}

export function saveCourses(courses: Course[]): void {
  localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
}

export function loadRegistrations(): Registration[] {
  const stored = localStorage.getItem(REGISTRATIONS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveRegistrations(registrations: Registration[]): void {
  localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
}

export function addCourse(course: InsertCourse): Course {
  const courses = loadCourses();
  const newCourse: Course = {
    ...course,
    id: Date.now().toString(),
    availableSeats: course.totalSeats,
  };
  courses.push(newCourse);
  saveCourses(courses);
  return newCourse;
}

export function updateCourse(id: string, updates: Partial<Course>): void {
  const courses = loadCourses();
  const index = courses.findIndex((c) => c.id === id);
  if (index !== -1) {
    courses[index] = { ...courses[index], ...updates };
    saveCourses(courses);
  }
}

export function deleteCourse(id: string): void {
  const courses = loadCourses();
  const filtered = courses.filter((c) => c.id !== id);
  saveCourses(filtered);
  
  const registrations = loadRegistrations();
  const filteredRegs = registrations.filter((r) => r.courseId !== id);
  saveRegistrations(filteredRegs);
}

export function registerForCourse(courseId: string): boolean {
  const courses = loadCourses();
  const course = courses.find((c) => c.id === courseId);
  
  if (!course || course.availableSeats <= 0) {
    return false;
  }
  
  const registrations = loadRegistrations();
  const alreadyRegistered = registrations.some((r) => r.courseId === courseId);
  
  if (alreadyRegistered) {
    return false;
  }
  
  course.availableSeats -= 1;
  saveCourses(courses);
  
  registrations.push({
    courseId,
    registeredAt: new Date().toISOString(),
  });
  saveRegistrations(registrations);
  
  return true;
}

export function unregisterFromCourse(courseId: string): boolean {
  const registrations = loadRegistrations();
  const index = registrations.findIndex((r) => r.courseId === courseId);
  
  if (index === -1) {
    return false;
  }
  
  registrations.splice(index, 1);
  saveRegistrations(registrations);
  
  const courses = loadCourses();
  const course = courses.find((c) => c.id === courseId);
  if (course) {
    course.availableSeats += 1;
    saveCourses(courses);
  }
  
  return true;
}

export function isRegistered(courseId: string): boolean {
  const registrations = loadRegistrations();
  return registrations.some((r) => r.courseId === courseId);
}
