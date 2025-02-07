import { Star } from "lucide-react";

interface RatingProps {
  label: string;
  value: number;
  maxValue?: number;
}

export default function Rating({ label, value, maxValue = 5 }: RatingProps) {
  return (
    <div className="flex items-center gap-2">
      {label && <span className="min-w-24 text-sm font-medium">{label}</span>}
      <div className="flex gap-0.5">
        {Array.from({ length: maxValue }).map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < value ? "fill-red-600 text-red-500" : "fill-muted text-muted"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
