import Link from "next/link";
import Image from "next/image";

const logoImage = "https://www.figma.com/api/mcp/asset/0368b504-692a-4791-8619-d0947989bef6";

export default function Footer() {
  return (
    <footer className="border-t border-[#1f5f26] bg-[#2e7d32] text-white">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 py-8 sm:px-10 lg:flex-row lg:items-start lg:justify-between lg:px-12">
        <div className="max-w-xl">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white/15 ring-1 ring-white/20">
              <Image
                src={logoImage}
                alt="Corn cob logo"
                width={48}
                height={48}
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <p className="text-xl font-bold tracking-[0.06em] text-white">
                MaizeAI
              </p>
              <p className="text-sm text-white/80">
                Web App Deteksi Penyakit Daun Jagung
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/80 sm:text-base">
            Membantu petani dalam mendeteksi penyakit daun jagung lebih cepat melalui analisis gambar yang sederhana, akurat, dan mudah digunakan.
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 text-sm text-white/80 lg:min-w-[320px] lg:items-end lg:text-right">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:justify-end">
            <Link href="/" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#245f2a]">
              Mulai Analisis
            </Link>
            <Link href="/#classes" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#245f2a]">
              Kelas Penyakit
            </Link>
            <Link href="/#features" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#245f2a]">
              Keunggulan Sistem
            </Link>
          </div>
          <span className="pt-1 text-white/55">
            © 2026 MaizeAI. All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}