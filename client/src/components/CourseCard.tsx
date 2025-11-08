import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, User } from "lucide-react";
import type { Course } from "@shared/schema";
import csImage from "@assets/generated_images/Computer_science_course_thumbnail_f0c08700.png";
import businessImage from "@assets/stock_images/business_meeting_pro_d9541405.jpg";
import designImage from "@assets/stock_images/graphic_design_creat_e654cdce.jpg";
import dataImage from "@assets/stock_images/data_analytics_chart_1f057f5f.jpg";
import marketingImage from "@assets/stock_images/digital_marketing_so_0e0cdeda.jpg";

const imageMap: Record<string, string> = {
  cs: csImage,
  business: businessImage,
  design: designImage,
  data: dataImage,
  marketing: marketingImage,
};

type CourseCardProps = {
  course: Course;
  isRegistered?: boolean;
  onRegister?: (courseId: string) => void;
  onUnregister?: (courseId: string) => void;
  showActions?: boolean;
};

export default function CourseCard({
  course,
  isRegistered = false,
  onRegister,
  onUnregister,
  showActions = true,
}: CourseCardProps) {
  const isFull = course.availableSeats === 0;
  const imageUrl = course.imageUrl ? imageMap[course.imageUrl] : csImage;

  const handleAction = () => {
    if (isRegistered && onUnregister) {
      onUnregister(course.id);
    } else if (!isRegistered && onRegister && !isFull) {
      onRegister(course.id);
    }
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden hover-elevate" data-testid={`card-course-${course.id}`}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={course.title}
          className="h-full w-full object-cover"
          data-testid={`img-course-${course.id}`}
        />
        <div className="absolute right-2 top-2">
          <Badge
            variant={isFull ? "secondary" : "default"}
            className="bg-background/90 backdrop-blur"
            data-testid={`badge-seats-${course.id}`}
          >
            <Users className="mr-1 h-3 w-3" />
            {course.availableSeats}/{course.totalSeats}
          </Badge>
        </div>
      </div>

      <CardHeader className="flex-1 gap-2 space-y-0 pb-4">
        <h3 className="text-xl font-semibold" data-testid={`text-title-${course.id}`}>
          {course.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span data-testid={`text-instructor-${course.id}`}>{course.instructor}</span>
        </div>
        {course.category && (
          <Badge variant="secondary" className="w-fit" data-testid={`badge-category-${course.id}`}>
            {course.category}
          </Badge>
        )}
        <p className="line-clamp-2 text-sm text-muted-foreground" data-testid={`text-description-${course.id}`}>
          {course.description}
        </p>
      </CardHeader>

      {showActions && (
        <CardFooter className="pt-0">
          <Button
            className="w-full"
            variant={isRegistered ? "outline" : "default"}
            onClick={handleAction}
            disabled={!isRegistered && isFull}
            data-testid={`button-action-${course.id}`}
          >
            {isRegistered ? "Unregister" : isFull ? "Course Full" : "Register"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
