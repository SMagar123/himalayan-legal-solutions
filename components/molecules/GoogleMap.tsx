"use client"

export function GoogleMap({ embedUrl }: { embedUrl: string }) {
  return (
    <div className="relative h-50 w-full overflow-hidden rounded-md border border-white/10 bg-white/10">
      <iframe
        src={embedUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 transition-all duration-500"
        title="Office Location Map"
      />
    </div>
  )
}
