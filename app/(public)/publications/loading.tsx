export default function Loading() {
  return (
    <div className="min-h-screen bg-white lg:pb-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16 flex flex-col items-center">
          <div className="mb-6 h-10 w-48 animate-pulse rounded bg-gray-200" />
          <div className="mb-2 h-4 w-full max-w-4xl animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-full max-w-3xl animate-pulse rounded bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="aspect-4/5 w-full animate-pulse rounded-2xl bg-gray-200"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
