'use client';

import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { WordDisplay } from '@/components/WordDisplay';
import { WordHistory } from '@/components/WordHistory';
import { WordFrequencyChart } from '@/components/WordFrequencyChart';
import { fetchRandomWord, fetchWordStats } from '@/lib/services/wordService';

export default function Home() {
  const [isPaused, setIsPaused] = useState(false);
  const [wordHistory, setWordHistory] = useState<string[]>([]);

  const {
    failureCount,
    data: wordData,
    error: wordErrorData,
    refetch: refetchWord,
    isLoading: isWordLoading,
    isFetching: isWordFetching
  } = useQuery({
    queryFn: fetchRandomWord,
    queryKey: ['random-word'],
    refetchInterval: isPaused ? 0 : 10000,
    retry: 5,
    retryOnMount: true,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    gcTime: 60000,
    staleTime: 10000,
  });

  const {
    data: statsData,
    isLoading: statsLoading
  } = useQuery({
    refetchInterval: 15000,
    queryFn: fetchWordStats,
    queryKey: ['word-stats'],
    staleTime: 15000,
  });

  useEffect(() => {
    if (wordData && failureCount === 0) {
      setWordHistory((prev) => {
        const newHistory = [wordData.word, ...prev.filter(w => w !== wordData.word)];
        return newHistory.slice(0, 5);
      });
    }
  }, [wordData, failureCount]);

  useEffect(() => {
    if (failureCount > 0) {
      console.error('Query error:', wordErrorData);
    }
  }, [failureCount, wordErrorData]);

  const chartData = useMemo(() =>
    statsData ? Object.entries(statsData).map(([word, count]) => ({
      word,
      count
    })) : [],
    [statsData]
  );

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="h-full w-full p-4 md:p-8 relative">
        {/* Recent Words */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 w-64 md:w-80">
          <WordHistory words={wordHistory} />
        </div>

        <div className="h-full flex flex-col items-center justify-center gap-8">
          {/* Word Display */}
          <div className="w-full max-w-2xl">
            <WordDisplay
              isPaused={isPaused}
              word={wordData?.word}
              onRefresh={refetchWord}
              isLoading={isWordLoading}
              isError={failureCount > 0}
              isFetching={isWordFetching}
              onPauseToggle={() => setIsPaused(!isPaused)}
            />
          </div>

          {/* Word Frequency Chart */}
          <div className="w-full max-w-2xl">
            <WordFrequencyChart
              data={chartData}
              isLoading={statsLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}