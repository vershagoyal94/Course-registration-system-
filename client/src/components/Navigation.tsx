import { Moon, Sun, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "./ThemeProvider";

type NavigationProps = {
  currentView: "home" | "courses" | "my-courses" | "admin";
  onViewChange: (view: "home" | "courses" | "my-courses" | "admin") => void;
  isAdminMode: boolean;
  onAdminModeToggle: () => void;
};

export default function Navigation({
  currentView,
  onViewChange,
  isAdminMode,
  onAdminModeToggle,
}: NavigationProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" data-testid="logo-icon" />
            <span className="text-xl font-semibold" data-testid="text-app-title">
              CourseHub
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Button
              variant={currentView === "home" ? "secondary" : "ghost"}
              onClick={() => onViewChange("home")}
              data-testid="button-nav-home"
            >
              Home
            </Button>
            <Button
              variant={currentView === "courses" ? "secondary" : "ghost"}
              onClick={() => onViewChange("courses")}
              data-testid="button-nav-courses"
            >
              Courses
            </Button>
            <Button
              variant={currentView === "my-courses" ? "secondary" : "ghost"}
              onClick={() => onViewChange("my-courses")}
              data-testid="button-nav-my-courses"
            >
              My Courses
            </Button>
            {isAdminMode && (
              <Button
                variant={currentView === "admin" ? "secondary" : "ghost"}
                onClick={() => onViewChange("admin")}
                data-testid="button-nav-admin"
              >
                Admin
              </Button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="admin-mode"
                checked={isAdminMode}
                onCheckedChange={onAdminModeToggle}
                data-testid="switch-admin-mode"
              />
              <Label htmlFor="admin-mode" className="text-sm font-medium" data-testid="label-admin-mode">
                Admin
              </Label>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
