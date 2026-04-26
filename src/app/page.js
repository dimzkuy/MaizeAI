"use client";

import Image from "next/image";
import { diseaseCards, featureCards } from "./cardContent";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-[#2e7d32] bg-[#2e7d32] text-white">
        <div className="mx-auto flex w-full max-w-[1440px] items-center gap-4 px-6 py-6 sm:px-10 lg:px-12">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden sm:h-[76px] sm:w-[76px]">
            <Image
              src="https://www.figma.com/api/mcp/asset/0368b504-692a-4791-8619-d0947989bef6"
              alt="Corn cob logo"
              width={87}
              height={87}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="leading-tight">
            <h1 className="text-3xl font-extrabold tracking-[0.08em] sm:text-[40px]">
              MaizeAI
            </h1>
            <p className="mt-1 text-sm font-normal sm:text-lg">
              Web App Deteksi Penyakit Daun Jagung
            </p>
          </div>
        </div>
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-[1440px] gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:px-12 lg:py-16">
          <div className="max-w-[680px]">
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-[34px]">
              Aplikasi Web Berbasis <span className="text-[#2e7d32]">AI</span> untuk Memprediksi Penyakit Daun Jagung
            </h2>
            <p className="mt-6 max-w-[620px] text-lg leading-8 text-slate-900 sm:text-[20px]">
              Unggah foto daun jagung Anda dan dapatkan diagnosis penyakit secara instan beserta rekomendasi perawatan. Sistem menganalisis penyakit pada daun jagung secara real-time.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="#top"
                className="inline-flex h-14 items-center justify-center gap-4 rounded-[18px] bg-[#2e7d32] px-8 text-[17px] font-semibold text-white shadow-[0_10px_24px_rgba(46,125,50,0.28)] transition-transform duration-200 hover:hover:bg-[#25692a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7d32] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="6.5" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                Mulai Analisis
              </a>
              <a
                href="#features"
                className="inline-flex h-14 items-center justify-center rounded-[18px] border-2 border-[#2e7d32] bg-white px-8 text-base font-semibold text-[#2e7d32] transition-colors duration-200 hover:bg-[#eef8ef]"
              >
                Pelajari Selengkapnya
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-[20px] shadow-[0_10px_24px_rgba(0,0,0,0.14)]">
            <Image
              src="https://www.figma.com/api/mcp/asset/41ff3eda-3272-4a34-b51e-e946602b48d5"
              alt="Corn field preview"
              width={558}
              height={331}
              sizes="(min-width: 1024px) 558px, 100vw"
              className="h-[260px] w-full object-cover sm:h-[331px]"
              priority
            />
          </div>
        </section>

        <section id="classes" className="bg-[#f2fff3]">
          <div className="mx-auto w-full max-w-[1440px] px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
            <div className="mx-auto max-w-4xl text-center">
              <h3 className="text-2xl font-bold text-slate-900 sm:text-[24px]">
                Kelas Penyakit yang Dapat Dideteksi
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-900 sm:text-[20px]">
                Sistem dapat mendeteksi beberapa jenis penyakit yang umum terjadi pada daun jagung dan juga daun yang sehat
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-7">
              {diseaseCards.map((card) => (
                <article
                  key={card.title}
                  className="overflow-hidden rounded-[18px] border-2 border-[#2e7d32] bg-white shadow-[0_10px_22px_rgba(0,0,0,0.06)]"
                >
                  <div className="relative h-[220px] border-b-2 border-[#2e7d32] bg-slate-100">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(min-width: 1280px) 269px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h4 className="text-base font-semibold text-slate-900">
                      {card.title}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-slate-900">
                      {card.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-[1440px] px-6 py-14 sm:px-10 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-5xl text-center">
            <h3 className="text-2xl font-bold text-slate-900 sm:text-[24px]">
              Keunggulan Sistem
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-900 sm:text-[20px]">
              Sistem dirancang untuk membantu pengguna mendeteksi penyakit daun jagung dengan mudah, cepat, dan akurat hanya melalui gambar.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-3 lg:gap-8">
            {featureCards.map((feature) => (
              <article key={feature.title} className="mx-auto flex max-w-sm flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2e7d32] shadow-[0_12px_24px_rgba(46,125,50,0.22)]">
                  <Image
                    src={feature.image}
                    alt="Feature icon"
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <h4 className="mt-6 text-2xl font-bold text-slate-900">
                  {feature.title}
                </h4>
                <p className="mt-4 text-base leading-7 text-slate-900 sm:text-[20px]">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#1f5f26] bg-[#245f2a] text-white">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-6 py-8 sm:px-10 lg:flex-row lg:items-start lg:justify-between lg:px-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white/15 ring-1 ring-white/20">
                <Image
                  src="https://www.figma.com/api/mcp/asset/0368b504-692a-4791-8619-d0947989bef6"
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
              <a href="#top" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#245f2a]">
                Mulai Analisis
              </a>
              <a href="#classes" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#245f2a]">
                Kelas Penyakit
              </a>
              <a href="#features" className="transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#245f2a]">
                Keunggulan Sistem
              </a>
            </div>
            <span className="pt-1 text-white/55">
              © 2026 MaizeAI. All rights reserved
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
