"use client";

import { useLanguage } from "@/components/context/LanguageContext";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-12 border-t border-white/50 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-xl font-bold text-green-700">Agro</h3>
            <p className="mt-1 text-sm text-gray-600">
              {t.footer.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <span className="cursor-pointer transition hover:text-green-700">
              {t.footer.about}
            </span>
            <span className="cursor-pointer transition hover:text-green-700">
              {t.footer.contact}
            </span>
            <span className="cursor-pointer transition hover:text-green-700">
              {t.footer.privacy}
            </span>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
          © 2026 Agro. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}

export default Footer;