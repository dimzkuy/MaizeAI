"use client";

import Image from "next/image";
import Link from "next/link";
import { diseaseCards, featureCards } from "../components/cardContent";
import SiteHeader from "../components/header";
import SiteFooter from "../components/footer";

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-white text-slate-900">
      <SiteHeader />
      
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
              <Link
                href="/upload"
                className="inline-flex h-14 items-center justify-center gap-4 rounded-[18px] bg-[#2e7d32] px-8 text-[17px] font-semibold text-white transition-transform duration-200 hover:hover:bg-[#25692a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7d32] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
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
              </Link>
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
              src="/assets/images/41ff3eda-3272-4a34-b51e-e946602b48d5.png"
              alt="Corn field preview"
              width={558}
              height={331}
              sizes="(min-width: 1024px) 558px, 100vw"
              className="h-[260px] w-full object-cover sm:h-[331px]"
              priority
            />
          </div>
        </section>

        {/* Menampilkan kartu penyakit dengan informasi gambar, nama penyakit, dan deskripsi singkat untuk setiap kelas penyakit yang dapat dideteksi oleh sistem */}
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
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2e7d32]">
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

      <SiteFooter />
    </div>
  );
}
