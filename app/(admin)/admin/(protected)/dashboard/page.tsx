import { getSession } from "@/lib/auth"

export default async function AdminDashboard() {
  const session = await getSession()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-gray-500">
          Welcome back,{" "}
          <span className="font-semibold text-[#0E4A66]">{session.name}</span>{" "}
          👋
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">
            Total Practice Areas
          </h3>
          <p className="mt-2 text-3xl font-bold text-[#0E4A66]">--</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">
            Total Publications
          </h3>
          <p className="mt-2 text-3xl font-bold text-[#0E4A66]">--</p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Services</h3>
          <p className="mt-2 text-3xl font-bold text-[#0E4A66]">--</p>
        </div>
      </div>

      <div className="rounded-xl border border-[#0E4A66]/10 bg-[#0E4A66]/5 p-6">
        <p className="text-[#0E4A66]">
          Select an option from the sidebar to start managing your content.
          Stats will populate once CRUD operations are complete.
        </p>
      </div>
    </div>
  )
}
