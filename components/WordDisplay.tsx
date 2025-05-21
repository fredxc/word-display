import { CornerBorder } from './CornerBorder';
import { Loader2, Pause, Play, RefreshCw } from 'lucide-react';
import { memo } from 'react';

interface WordDisplayProps {
  word: string | undefined;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  isPaused: boolean;
  onRefresh: () => void;
  onPauseToggle: () => void;
}

export const WordDisplay = memo(function WordDisplay({
  word,
  isLoading,
  isError,
  isFetching,
  isPaused,
  onRefresh,
  onPauseToggle,
}: WordDisplayProps) {
  const buttonBaseClasses = "flex items-center justify-center w-32 h-10";
  const pauseButtonClasses = isPaused
    ? 'bg-slate-dark text-white hover:bg-slate-dark/90'
    : 'border border-slate-medium/20 bg-blue-light hover:bg-blue-light/30';

  return (
    <div className="w-full bg-white border border-border-light p-6 pt-12 relative">
      <CornerBorder />
      <div className="flex flex-col items-center justify-center space-y-6">
        {isLoading ? (
          <div className="flex items-center gap-2 text-lg text-slate-medium">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading word...
          </div>
        ) : word ? (
          <div className="relative flex flex-col items-center">
            <div className="relative flex items-center">
              <h1 className={`text-4xl font-bold text-center ${isFetching ? 'text-slate-medium' : ''}`}>
                {word}
              </h1>
              {isFetching && (
                <div className="absolute -right-8">
                  <Loader2 className="h-5 w-5 animate-spin text-slate-medium" />
                </div>
              )}
            </div>
            <div className="h-6">
              {isError && (
                <div className="text-red-error text-center animate-in slide-in-from-top-2 duration-300">
                  Could not fetch a new word. Retrying...
                </div>
              )}
            </div>
          </div>
        ) : null}

        <div className="flex gap-4">
          <button
            onClick={onRefresh}
            disabled={isFetching}
            className={`${buttonBaseClasses} bg-amber-vibrant text-white disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-amber-vibrant/90`}
            aria-label="Refresh word"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={onPauseToggle}
            className={`${buttonBaseClasses} ${pauseButtonClasses}`}
            aria-label={isPaused ? "Resume word generation" : "Pause word generation"}
          >
            {isPaused ? (
              <><Play className="h-4 w-4 mr-2" /> Resume</>
            ) : (
              <><Pause className="h-4 w-4 mr-2" /> Pause</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}); 