"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/header";
import Footer from "../../components/footer";

const STORAGE_KEY = "maizeai:last-analysis";

const CLASS_MAP = {
  Healthy: "Sehat",
  Blight: "Hawar Daun",
  "Common Rust": "Karat Daun",
  "Gray Leaf Spot": "Bercak Daun Abu-abu",
};

const CARE_ITEMS = [
  "Pemupukan Berimbang",
  "Pengendalian Penyakit",
  "Sanitasi Lahan",
  "Rotasi Tanaman",
  "Penyiraman Rutin",
];

const ICON_MAP = {
  Healthy: "/assets/icons/checked.png",
  Blight: "/assets/icons/alert.png",
  "Common Rust": "/assets/icons/alert.png",
  "Gray Leaf Spot": "/assets/icons/alert.png",
};

function resolveConfidence(searchParams) {
  const value = Number(searchParams.get("confidence"));
  return Number.isFinite(value) ? value : null;
}

function resolveAnalysis(searchParams) {
  const stored = window.sessionStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  }

  const prediction = searchParams.get("prediction");

  if (!prediction || !CLASS_MAP[prediction]) {
    return null;
  }

  const confidence = resolveConfidence(searchParams);

  return {
    prediction,
    title: CLASS_MAP[prediction],
    confidence,
    date: searchParams.get("date"),
    image: searchParams.get("image"),
  };
}

export default function ResultPage() {
  const searchParams = useSearchParams();
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setAnalysis(resolveAnalysis(searchParams));
    }, 0);

    return () => window.clearTimeout(timerId);
  }, [searchParams]);

  const backendPrediction = analysis?.prediction;
  const displayClassLabel = backendPrediction ? CLASS_MAP[backendPrediction] : null;
  const title = analysis?.title || displayClassLabel;
  const confidence = analysis?.confidence;
  const date = analysis?.date;
  const confidenceFillWidth = confidence == null ? "0%" : `${Math.max(0, Math.min(confidence, 100))}%`;

  const iconSrc = backendPrediction ? ICON_MAP[backendPrediction] : null;

  const handleDownload = () => {
    const text = [
      "Hasil Prediksi",
      title,
      `Prediksi backend: ${backendPrediction}`,
      `Label Indonesia: ${displayClassLabel}`,
      `Keyakinan: ${confidence}%`,
      `Tanggal Analisis: ${date}`,
      "",
      "Saran Perawatan",
      ...CARE_ITEMS.map((item, index) => `${index + 1}. ${item}`),
    ].join("\n");

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `maizeai-hasil-${analysis?.status || "sick"}.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  if (!analysis || !backendPrediction || !displayClassLabel || confidence == null || !date || !analysis.image) {
    return (
      <div className="min-h-screen bg-white text-black">
        <Header />
        <main className="mx-auto flex w-full max-w-[1440px] items-center justify-center px-6 py-24 text-center sm:px-6">
          <p className="text-base font-medium text-slate-700 sm:text-lg">Menunggu hasil analisis...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      <main className="mx-auto w-full max-w-[1440px] px-4 pb-16 pt-8 text-center sm:px-6 sm:pt-[44px]">
        <h1 className="text-[22px] font-bold leading-tight sm:text-[24px] sm:leading-none">Hasil Prediksi</h1>
        <p className="mt-4 text-base font-light leading-relaxed sm:mt-[28px] sm:text-[20px] sm:leading-none">
          Analisis hasil prediksi dan saran perawatan akan ditampilkan dibawah
        </p>

        <section className="mt-8 flex flex-col items-center justify-center gap-6 lg:mt-[45px] lg:flex-row lg:items-start lg:gap-[40px]">
          <article className="w-full max-w-[362px] rounded-[20px] border-[3px] border-[#2e7d32] bg-white px-4 pb-[18px] pt-4 shadow-[8px_10px_2px_rgba(0,0,0,0.25)] sm:px-8 sm:pt-[29px]">
            <div className="relative mx-auto aspect-square w-full max-w-[300px] overflow-hidden rounded-[6px]">
              <Image src={analysis.image} alt={title} fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 300px, 100vw" className="object-cover" priority />
            </div>
            <p className="mt-4 text-center text-lg font-semibold leading-tight sm:mt-[20px] sm:text-[20px] sm:leading-none">Tanggal Analisis</p>
            <p className="mt-2 text-center text-lg font-light leading-tight sm:mt-[18px] sm:text-[20px] sm:leading-none">{date}</p>
          </article>

          <article className="w-full max-w-[798px] rounded-[20px] border-[3px] border-[#2e7d32] bg-[#f2f0f0] px-3 pb-5 pt-4 shadow-[0px_4px_2px_rgba(0,0,0,0.25)] sm:px-5 sm:pb-[22px] sm:pt-[28px]">
            <div className="rounded-[20px] bg-white px-3 pb-4 pt-4 text-left sm:px-[12px] sm:pb-[12px] sm:pt-[14px]">
              <div className="flex items-center gap-3 px-2 pb-px pt-0 sm:gap-[18px] sm:px-[19px] sm:pt-[2px]">
                <div className="relative size-8 shrink-0 sm:size-[36px]" style={{ color: backendPrediction === "Healthy" ? "#2e7d32" : "#d6ba03" }}>
                  <Image src={iconSrc} alt="Status icon" fill sizes="36px" className="object-contain" />
                </div>
                <p className="text-lg font-bold leading-tight sm:text-[24px] sm:leading-none">{title}</p>
              </div>

              <div className="mt-8 flex w-full flex-col gap-2 px-0 sm:mt-[49px] sm:max-w-[489px] sm:gap-[7px] sm:px-[31px]">
                <div className="flex w-full items-end justify-between gap-3 text-base font-semibold leading-tight sm:gap-[71px] sm:text-[20px] sm:leading-none">
                  <p className="flex-1 text-left sm:flex-none sm:w-[209px] sm:text-center">Keyakinan</p>
                  <p className="flex-1 text-right sm:flex-none sm:w-[209px] sm:text-center">{confidence}%</p>
                </div>
                <div className="relative h-[8px] w-full overflow-hidden rounded-full bg-[#e9e9e9] sm:w-[360px]">
                  <div
                    className="absolute left-0 top-0 h-[8px] rounded-full"
                    style={{ width: confidenceFillWidth, backgroundColor: backendPrediction === "Healthy" ? "#2e7d32" : "#d6ba03" }}
                  />
                </div>
              </div>

              <h2 className="mt-8 px-0 text-lg font-bold leading-tight sm:mt-[46px] sm:px-[19px] sm:text-[24px] sm:leading-none">Saran Perawatan</h2>

              <ol className="mt-2 list-decimal px-5 text-base font-normal leading-relaxed sm:mt-[10px] sm:px-[19px] sm:text-[24px] sm:leading-[1.2]">
                {CARE_ITEMS.map((item) => (
                  <li key={item} className="ms-4 sm:ms-[36px]">
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:mt-[22px] sm:flex-row sm:gap-[50px]">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex h-[54px] min-w-[220px] w-full items-center justify-center rounded-[20px] border-[3px] border-[#2e7d32] bg-white px-6 text-[14px] font-semibold leading-none whitespace-nowrap text-[#2e7d32] transition-colors hover:bg-[#eef8ef] sm:min-w-0 sm:w-[187px] sm:px-[38px] sm:text-[16px]"
              >
                Unduh Hasil Analisis
              </button>
              <Link
                href="/upload"
                className="inline-flex h-[54px] w-full items-center justify-center rounded-[20px] bg-[#2e7d32] px-[38px] text-[16px] font-semibold text-white transition-colors hover:bg-[#245f2a] sm:w-[187px]"
              >
                Analisis Ulang
              </Link>
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}