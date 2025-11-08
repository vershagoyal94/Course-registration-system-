import { useState } from "react";
import Hero from "../Hero";

export default function HeroExample() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className="p-4">
        <p className="text-sm text-muted-foreground">Search query: {searchQuery || "(empty)"}</p>
      </div>
    </div>
  );
}
