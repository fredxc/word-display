interface WordHistoryProps {
  words: string[];
}

export function WordHistory({ words }: WordHistoryProps) {
  if (words.length === 0) return null;

  return (
    <div className="w-full p-4 text-right">
      <h2 className="font-bold mb-2">RECENT WORDS</h2>
      <ul>
        {words.map((word, index) => (
          <li
            key={`${word}-${index}`}
            className="py-0.5"
          >
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
} 