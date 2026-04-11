function Footer() {
  return (
    <footer className="mt-12 border-t border-white/50 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-xl font-bold text-green-700">Agro</h3>
            <p className="mt-1 text-sm text-gray-600">
              Fresh and organic essentials for everyday life.
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <span className="cursor-pointer transition hover:text-green-700">
              About
            </span>
            <span className="cursor-pointer transition hover:text-green-700">
              Contact
            </span>
            <span className="cursor-pointer transition hover:text-green-700">
              Privacy
            </span>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
          © 2026 Agro. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;