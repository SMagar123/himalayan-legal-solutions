import { Star } from "lucide-react"

export function StarRating({
  rating,
  className = "",
}: {
  rating: number
  className?: string
}) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 md:h-5 md:w-5 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-transparent text-gray-400"
          }`}
        />
      ))}
    </div>
  )
}
