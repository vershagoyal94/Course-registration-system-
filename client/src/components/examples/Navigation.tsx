import { useState } from "react";
import Navigation from "../Navigation";
import { ThemeProvider } from "../ThemeProvider";

export default function NavigationExample() {
  const [currentView, setCurrentView] = useState<"home" | "courses" | "my-courses" | "admin">("home");
  const [isAdminMode, setIsAdminMode] = useState(false);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navigation
          currentView={currentView}
          onViewChange={setCurrentView}
          isAdminMode={isAdminMode}
          onAdminModeToggle={() => setIsAdminMode(!isAdminMode)}
        />
        <div className="p-8">
          <p className="text-muted-foreground">Current view: {currentView}</p>
          <p className="text-muted-foreground">Admin mode: {isAdminMode ? "On" : "Off"}</p>
        </div>
      </div>
    </ThemeProvider>
  );
}
