import Image from "next/image";
import Link from "next/link";

const logoImage = "https://www.figma.com/api/mcp/asset/0368b504-692a-4791-8619-d0947989bef6";

export default function Header() {
  return (
    <header className="border-b border-[#2e7d32] bg-[#2e7d32] text-white">
      <div className="mx-auto flex w-full max-w-[1440px] items-center gap-3 px-4 py-4 sm:gap-4 sm:px-10 sm:py-6 lg:px-12">
        <Link href="/" className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#2e7d32] sm:gap-4">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden sm:h-14 sm:w-14 lg:h-[76px] lg:w-[76px]">
            <Image
              src={logoImage}
              alt="Corn cob logo"
              width={87}
              height={87}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="leading-tight">
            <h1 className="text-[1.6rem] font-extrabold tracking-[0.06em] sm:text-3xl sm:tracking-[0.08em] lg:text-[40px]">
              MaizeAI
            </h1>
            <p className="mt-1 text-xs font-normal sm:text-sm sm:leading-6 lg:text-lg">
              Web App Deteksi Penyakit Daun Jagung
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}