import React from "react";

export default function CameraModal({
  isOpen,
  onClose,
  onCapture,
  onFlipCamera,
  cameraFacingMode,
  cameraError,
  cameraVideoRef,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-4 backdrop-blur-sm sm:items-center sm:py-6"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="camera-popup-title"
        className="my-2 flex max-h-[calc(100vh-2rem)] w-full max-w-[1019px] flex-col overflow-y-auto rounded-[20px] bg-white px-4 pb-4 pt-6 shadow-[0_30px_80px_rgba(0,0,0,0.28)] sm:my-0 sm:max-h-[calc(100vh-3rem)] sm:px-8 sm:pb-8 sm:pt-6"
        onClick={(event) => event.stopPropagation()}
      >
        <h3
          id="camera-popup-title"
          className="text-center text-[clamp(1.5rem,3.2vw,2rem)] font-bold tracking-tight text-black"
        >
          Ambil Foto Daun Jagung
        </h3>

        <div className="mt-6">
          <div className="overflow-hidden rounded-[20px] bg-slate-950 shadow-inner">
            <div className="relative h-[min(524px,44vh)] min-h-[220px] w-full bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08),_rgba(0,0,0,0.28)_45%,_rgba(0,0,0,0.65)_100%)] sm:h-[min(524px,50vh)]">
              <video
                ref={cameraVideoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/10" />

              <button
                type="button"
                onClick={onFlipCamera}
                className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-transparent text-white shadow-[0_2px_12px_rgba(0,0,0,0.25)] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 sm:h-12 sm:w-12 xl:hidden"
                aria-label={cameraFacingMode === "environment" ? "Pakai kamera depan" : "Pakai kamera belakang"}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 1.5 20.5 5 17 8.5M7 22.5 3.5 19 7 15.5M20 5H11a7.5 7.5 0 0 0-7.5 7.5v1M4 19h9a7.5 7.5 0 0 0 7.5-7.5v-1"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {cameraError ? (
            <p className="mt-4 rounded-[16px] bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{cameraError}</p>
          ) : null}

          <div className="mx-auto mt-8 flex w-full max-w-[725px] flex-col gap-3 sm:gap-4 md:flex-row md:items-center md:justify-center md:gap-8 lg:gap-[72px]">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-[56px] w-full items-center justify-center rounded-[20px] border-[3px] border-[#2e7d32] bg-white px-6 text-[1rem] font-semibold text-[#2e7d32] transition-colors hover:bg-[#eef8ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7d32] focus-visible:ring-offset-2 sm:h-[64px] sm:text-[1.2rem] md:h-[78px] md:w-[301px] md:flex-none md:text-[1.75rem] lg:h-[93px] lg:text-[2rem]"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={onCapture}
              className="inline-flex h-[56px] w-full items-center justify-center gap-2 rounded-[20px] bg-[#2e7d32] px-6 text-[1rem] font-semibold text-white transition-colors hover:bg-[#245f2a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7d32] focus-visible:ring-offset-2 sm:h-[64px] sm:gap-3 sm:text-[1.2rem] md:h-[78px] md:w-[352px] md:flex-none md:text-[1.75rem] lg:h-[93px] lg:text-[2rem]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8.5 7.5 10 5h4l1.5 2.5H19A2.5 2.5 0 0 1 21.5 10v7A2.5 2.5 0 0 1 19 19.5H5A2.5 2.5 0 0 1 2.5 17v-7A2.5 2.5 0 0 1 5 7.5h3.5Z" stroke="currentColor" strokeWidth="1.8"/>
                <circle cx="12" cy="13.2" r="3.4" stroke="currentColor" strokeWidth="1.8"/>
              </svg>
              Ambil Foto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
