interface WordResponse {
  word: string;
}

interface WordStats {
  [key: string]: number;
}

export async function fetchRandomWord(): Promise<WordResponse> {
  try {
    const response = await fetch("/api/random-word");
    if (!response.ok) {
      throw new Error(
        `Failed to fetch word: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    if (!data.word) {
      throw new Error("Invalid response format: missing word property");
    }
    return data as WordResponse;
  } catch (error) {
    console.error("Error fetching word:", error);
    throw error;
  }
}

export async function fetchWordStats(): Promise<WordStats> {
  const response = await fetch("/api/word-stats?since=5m");
  if (!response.ok) {
    throw new Error("Failed to fetch word stats");
  }
  return response.json() as Promise<WordStats>;
}
