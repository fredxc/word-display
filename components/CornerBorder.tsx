interface CornerBorderProps {
  className?: string;
}

export function CornerBorder({ className = "" }: CornerBorderProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-3 border-l-3 border-amber-vibrant" />
      <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-3 border-r-3 border-amber-vibrant" />
      <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-3 border-l-3 border-amber-vibrant" />
      <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-3 border-r-3 border-amber-vibrant" />
    </div>
  );
}
