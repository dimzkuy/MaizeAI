import { LoaderCircle } from "lucide-react";

export default function UploadLoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-6 backdrop-blur-[1px]">
      <div className="flex h-[173px] w-full max-w-[361px] items-center justify-center rounded-[20px] bg-white px-6 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col items-center gap-[18px] text-center">
          <LoaderCircle className="h-[60px] w-[60px] animate-spin text-[#2e7d32] [animation-duration:1.1s]" aria-hidden="true" />
          <p className="text-[24px] font-semibold leading-none text-[#2e7d32]">Mengunggah Gambar</p>
        </div>
      </div>
    </div>
  );
}