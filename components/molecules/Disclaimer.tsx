import { Info } from "lucide-react"

export function Disclaimer() {
  return (
    <div className="mt-16 rounded-2xl border border-amber-200/60 bg-amber-50/50 p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
          <Info className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h3 className="mb-2 text-lg font-bold text-amber-900">Disclaimer</h3>
          <p className="text-sm leading-relaxed text-amber-900/80">
            Himalayan Legal Solutions is one of the premier legal firms in Nepal
            with a team of the best professional lawyers in Nepal. This article
            published on the website of the law firm is just for information
            purpose only. It shall not be taken as the legal advice,
            advertisement, personal communication, solicitation or inducement.
            Himalayan Legal Solutions or any of the team members of the firm
            shall not be liable for the consequence arising of the information
            provided. As the factual situation may be different on your case,
            thereof if you need further legal advice on the subject matter,
            don&apos;t hesitate to get in touch with Us.
          </p>
        </div>
      </div>
    </div>
  )
}
