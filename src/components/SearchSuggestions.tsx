import { Button } from "@/components/ui/button";

interface SearchSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function SearchSuggestions({ suggestions, onSelect }: SearchSuggestionsProps) {
  return (
    <div className="hidden md:flex flex-wrap gap-2 mt-4 justify-center">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion}
          variant="secondary"
          className="rounded-full text-sm"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
}