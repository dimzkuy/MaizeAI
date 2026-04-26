"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

const uploadIcon = "https://www.figma.com/api/mcp/asset/6c21ecc1-d7e2-425f-84e2-d16c87e5758f";

export default function UploadPage() {
  const fileInputRef = useRef(null);
  const objectUrlRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  const clearObjectUrl = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

  const openFileManager = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      event.target.value = "";
      return;
    }

    clearObjectUrl();
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setSelectedImage({ src: objectUrl, alt: file.name || "Pratinjau gambar yang dipilih" });
    event.target.value = "";
  };

  const setFilePreview = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    clearObjectUrl();
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setSelectedImage({ src: objectUrl, alt: file.name || "Pratinjau gambar yang dipilih" });
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    setFilePreview(event.dataTransfer.files?.[0]);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };


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
          <div
            className={`w-full max-w-[1135px] rounded-[24px] border-2 border-dashed px-4 py-8 transition-colors sm:px-6 sm:py-10 md:px-10 md:py-12 ${isDragging ? "border-[#245f2a] bg-[#f3faf3]" : "border-[#2e7d32] bg-white"}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="mx-auto flex w-full max-w-[736px] flex-col items-center text-center">
              {!selectedImage ? (
                <>
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
                  <button
                    type="button"
                    onClick={openFileManager}
                    className="mt-8 inline-flex w-full max-w-[240px] items-center justify-center rounded-[18px] bg-[#2e7d32] px-8 py-4 text-base font-semibold text-white transition-transform duration-200 hover:hover:bg-[#25692a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7d32] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:max-w-[280px]"
                  >
                    Unggah Gambar
                  </button>
                </>
              ) : (
                <>
                  <div className="mt-4 flex w-full justify-center">
                    <div className="relative h-[260px] w-full max-w-[520px] overflow-hidden rounded-[20px] sm:h-[300px]">
                      <Image
                        src={selectedImage.src}
                        alt={selectedImage.alt}
                        fill
                        sizes="(min-width: 640px) 520px, 100vw"
                        className="object-contain p-4"
                        unoptimized={selectedImage.src.startsWith("blob:")}
                        priority
                      />
                    </div>
                  </div>

                  <p className="mt-6 text-center text-sm font-normal leading-normal text-[rgba(0,0,0,0.4)] sm:text-base md:text-[20px]">
                      Pastikan gambar daun jagung terlihat jelas
                  </p>

                  <div className="mt-8 flex w-full flex-col justify-center gap-4 sm:flex-row sm:gap-[50px]">
                    <button
                      type="button"
                      onClick={openFileManager}
                      className="inline-flex h-[54px] w-full items-center justify-center rounded-[20px] border-[3px] border-[#2e7d32] bg-white px-[38px] text-[16px] font-semibold text-[#2e7d32] whitespace-nowrap transition-colors hover:bg-[#eef8ef] sm:w-[187px]"
                    >
                      Ganti Gambar
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-[54px] w-full items-center justify-center rounded-[20px] bg-[#2e7d32] px-[38px] text-[16px] font-semibold text-white transition-colors hover:bg-[#245f2a] sm:w-[187px]"
                    >
                      Mulai Analisis
                    </button>
                  </div>
                </>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
