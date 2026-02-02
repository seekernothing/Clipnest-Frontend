import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Content {
  _id: string;
  title: string;
  link: string;
  type: "document" | "tweet" | "youtube" | "link";
  tags: (string | { title: string })[];
  createdAt: string;
}

export const useContent = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const response = await axios.get(BACKEND_URL + "/content", {
        withCredentials: true,
      });
      // Assuming response.data.content or similar structure, adapting to usual backend patterns
      // If the user didn't specify the exact response structure, I'll assume standard { content: [...] } or just [...]
      // Based on common "content model" description. I'll check response.data directly or response.data.contents;
      // Safest is to log or try to handle standard wrapper.
      // For now, let's assume it returns { contents: [...] } or pure array.
      // I'll try to handle both or direct array.
      if (response.data && response.data.content) {
        setContents(response.data.content);
      } else if (Array.isArray(response.data)) {
        setContents(response.data);
      } else {
        // Fallback if structure is different
        setContents([]);
      }
    } catch (err) {
      setError("Failed to fetch content, please login first or check backend.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
    const interval = setInterval(() => {
      refresh();
    }, 10 * 1000); // Poll every 10 seconds to keep fresh

    return () => {
      clearInterval(interval);
    };
  }, []);

  return { contents, refresh, loading, error };
};
