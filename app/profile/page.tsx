export default function ProfilePage() {
  return (
    <div className="relative px-6 py-16">
      {/* Background glow */}
      <div className="absolute -top-16 -left-16 h-56 w-56 rounded-full bg-green-200/40 blur-3xl" />
      <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-green-300/40 blur-3xl" />

      <div className="fade-up relative mx-auto max-w-3xl">
        <div className="glass-card rounded-3xl p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl">
              👤
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Archana Tiwari
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Developer & Agro Enthusiast
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-xs uppercase text-gray-500">Email</p>
              <p className="mt-1 font-medium text-gray-800">
                arc*******ari@gmail.com
              </p>
            </div>

            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-xs uppercase text-gray-500">Phone</p>
              <p className="mt-1 font-medium text-gray-800">
                +91 ******3210
              </p>
            </div>

            <div className="rounded-2xl bg-white/70 p-4 md:col-span-2">
              <p className="text-xs uppercase text-gray-500">Address</p>
              <p className="mt-1 font-medium text-gray-800">
                Bangalore, India
              </p>
            </div>
          </div>

          <button className="hover-lift mt-8 w-full rounded-2xl bg-green-600 py-3 text-white font-medium hover:bg-green-700">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}