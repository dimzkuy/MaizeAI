"use client";

import Image from "next/image";
import Header from "../../components/header";
import Footer from "../../components/footer";

const uploadIcon = "https://www.figma.com/api/mcp/asset/6c21ecc1-d7e2-425f-84e2-d16c87e5758f";

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />

      <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6 pb-14 pt-8 sm:px-10 lg:px-12 lg:pb-16 lg:pt-10">
        <section className="space-y-3 text-center">
          <h2 className="text-[24px] font-bold tracking-tight text-slate-900 sm:text-[24px]">
            Unggah Gambar Daun Jagung
          </h2>
          <p className="mx-auto max-w-[1191px] text-base leading-7 text-slate-900 sm:text-[20px]">
            Unggah foto daun jagung yang sehat atau terindikasi terkena penyakit untuk dilakukan analisis cepat
          </p>
        </section>

        <section className="mt-8 flex flex-1 items-start justify-center px-0 sm:px-2">
          <div className="w-full max-w-[1135px] rounded-[24px] border-2 border-dashed border-[#2e7d32] px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12">
            <div className="mx-auto flex w-full max-w-[736px] flex-col items-center text-center">
              <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full bg-[#2e7d32]">
                <Image
                  src={uploadIcon}
                  alt="Upload icon"
                  width={64}
                  height={64}
                  className="h-16 w-16 object-contain"
                  priority
                />
              </div>

              <div className="mt-8 flex w-full max-w-[736px] flex-col items-center gap-3 text-center">
                <h3 className="mx-auto max-w-[18ch] text-center text-[clamp(1rem,3.2vw,1.5rem)] font-bold leading-tight tracking-tight text-slate-900 sm:max-w-[24ch] sm:text-[1.35rem] md:max-w-none md:whitespace-nowrap md:text-[1.5rem]">
                  Seret Gambar kesini atau Klik tombol dibawah untuk menggunggah
                </h3>
                <p className="max-w-[680px] text-sm leading-7 text-slate-900 sm:text-base sm:leading-7 md:text-[20px]">
                  Mendukung format PNG, JPG, HEIC maks 10 MB
                </p>
              </div>
              <label className="mt-8 inline-flex w-full max-w-[240px] cursor-pointer items-center justify-center rounded-[18px] bg-[#2e7d32] px-8 py-4 text-base font-semibold text-white transition-transform duration-200 hover:hover:bg-[#25692a] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#2e7d32] focus-within:ring-offset-2 focus-within:ring-offset-white sm:max-w-[280px]">
                <span>Pilih Gambar</span>
                <input type="file" accept="image/*" className="sr-only" />
              </label>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
