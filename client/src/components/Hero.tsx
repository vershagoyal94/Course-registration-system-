import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import heroImage from "@assets/stock_images/diverse_students_stu_541844a8.jpg";

type HeroProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export default function Hero({ searchQuery, onSearchChange }: HeroProps) {
  return (
    <div className="relative h-[400px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
      
      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="mb-4 text-center text-5xl font-bold text-white" data-testid="text-hero-title">
          Discover Your Next Course
        </h1>
        <p className="mb-8 max-w-2xl text-center text-xl text-white/90" data-testid="text-hero-subtitle">
          Explore our comprehensive catalog of courses taught by expert instructors
        </p>
        
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search courses or instructors..."
            className="h-12 pl-12 text-base"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            data-testid="input-search"
          />
        </div>
      </div>
    </div>
  );
}
