import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { SearchSuggestions } from "@/components/SearchSuggestions";
import { SearchResult } from "@/components/SearchResult";
import { useToast } from "@/hooks/use-toast";

const SUGGESTIONS = [
  "Who is current PM of India ?",
  "How to create a github repo ?",
  "Calculate the factorial of 8 ?",
];

export default function Index() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      console.log("Initiating search with query:", query);
      
      const currentDate = new Date().toISOString();
      const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { 
              role: 'system', 
              content: 'You are a AI Search Engine with access to real-time information, Do not mention Date in the Answer, Provide Conscise Answers, Make sure to access the Internet for Realtime Answers. Make sure the Output is in Markdown only, Make sure to use Plain Text for Math.' 
            },
            { 
              role: 'user', 
              content: `${query} as per The Current Date & Time i.e, ${currentDate}.` 
            }
          ],
          model: 'searchgpt',
          jsonMode: false
        })
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      console.log("Received response data:", data.substring(0, 100) + "...");
      setResult(data);
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Error",
        description: "Failed to perform search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-16 bg-background">
      <h1 className="text-4xl font-bold mb-12">Arc Search</h1>
      
      <SearchBar onSearch={handleSearch} />
      
      <SearchSuggestions
        suggestions={SUGGESTIONS}
        onSelect={handleSearch}
      />

      {loading && (
        <div className="flex-1 flex items-center justify-center -mt-20">
          <div className="cube">
            <div className="side"></div>
            <div className="side"></div>
            <div className="side"></div>
            <div className="side"></div>
            <div className="side"></div>
            <div className="side"></div>
          </div>
        </div>
      )}

      {result && !loading && <SearchResult content={result} />}
    </div>
  );
}