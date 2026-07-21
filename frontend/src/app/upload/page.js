"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import UploadLoadingOverlay from "../../components/uploadLoadingOverlay";
import AnalyzeLoadingOverlay from "../../components/analyzeLoadingOverlay";
import CameraModal from "../../components/cameraModal";
import { clearAnalysis, setAnalysis } from "../../lib/analysisStore";

const uploadIcon = "/assets/icons/image.png";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const classifyAnalysis = (prediction) => {
  if (prediction === "Healthy") {
    return "healthy";
  }

  return "sick";
};

export default function UploadPage() {
  const maxUploadSizeBytes = 10 * 1024 * 1024;
  const router = useRouter();
  const fileInputRef = useRef(null);
  const cameraVideoRef = useRef(null);
  const cameraStreamRef = useRef(null);
  const objectUrlRef = useRef(null);
  const uploadTimerRef = useRef(null);
  const selectedFileRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraFacingMode, setCameraFacingMode] = useState("environment");
  const [cameraError, setCameraError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [isChangeImageModalOpen, setIsChangeImageModalOpen] = useState(false);

 // Membersihkan timer dan URL objek saat komponen di-unmount untuk mencegah memory leak 
  useEffect(() => {
    const cameraVideoElement = cameraVideoRef.current;

    return () => {
      if (uploadTimerRef.current) {
        window.clearTimeout(uploadTimerRef.current);
      }

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }

      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      if (cameraVideoElement) {
        cameraVideoElement.srcObject = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!isCameraOpen) {
      return undefined;
    }

    let isActive = true;
    const cameraVideoElement = cameraVideoRef.current;

    const startCamera = async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Browser tidak mendukung kamera");
        }

        let stream = null;
        let lastError = null;
        const constraintOptions = [
          { facingMode: { exact: cameraFacingMode } },
          { facingMode: cameraFacingMode },
          true,
        ];

        for (const videoConstraints of constraintOptions) {
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              audio: false,
              video: videoConstraints,
            });
            break;
          } catch (error) {
            lastError = error;
          }
        }

        if (!stream) {
          throw lastError instanceof Error ? lastError : new Error("Gagal membuka kamera");
        }

        if (!isActive) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        cameraStreamRef.current = stream;
        setCameraError("");

        if (cameraVideoElement) {
          cameraVideoElement.srcObject = stream;
          await cameraVideoElement.play();
        }
      } catch (error) {
        if (!isActive) {
          return;
        }

        if (error instanceof DOMException && error.name === "NotAllowedError") {
          setCameraError("Izin kamera ditolak. Izinkan akses kamera lalu coba lagi.");
          return;
        }

        if (error instanceof DOMException && (error.name === "NotFoundError" || error.name === "OverconstrainedError")) {
          setCameraError("Kamera tidak tersedia pada perangkat ini.");
          return;
        }

        setCameraError("Tidak dapat memulai kamera.");
      }
    };

    startCamera();

    return () => {
      isActive = false;

      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((track) => track.stop());
        cameraStreamRef.current = null;
      }

      if (cameraVideoElement) {
        cameraVideoElement.srcObject = null;
      }
    };
  }, [isCameraOpen, cameraFacingMode]);

  useEffect(() => {
    if (!isCameraOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsCameraOpen(false);
        setCameraError("");
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCameraOpen]);

  // Mengecek arsitektur model saat halaman upload dibuka agar bisa dilihat di console browser
  useEffect(() => {
    const controller = new AbortController();

    const fetchModelArchitecture = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/`, { signal: controller.signal });

        if (!response.ok) {
          return;
        }
        // Menampilkan arsitektur model di console untuk debugging dan transparansi
        const data = await response.json();
        console.log("Arsitektur Model yang Dimuat:", data.model_architecture);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Gagal mengambil arsitektur model:", error);
      }
    };

    fetchModelArchitecture();

    return () => controller.abort();
  }, []);

 // Membersihkan URL objek saat gambar baru dipilih untuk mencegah memory leak dan memastikan pratinjau yang ditampilkan benar 
  const clearObjectUrl = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  };

 // Membuka file manager saat tombol unggah gambar diklik 
  const openFileManager = () => {
    const fileInput = fileInputRef.current;

    if (!fileInput) {
      return;
    }

    fileInput.value = "";
    fileInput.click();
  };

 // Membuka popup kamera saat user memilih ambil foto 
  const openCameraPopup = () => {
    setUploadError("");
    setCameraError("");
    setCameraFacingMode("environment");
    setIsCameraOpen(true);
  };

 // Menutup popup kamera dan menghentikan stream kamera 
  const closeCameraPopup = () => {
    setIsCameraOpen(false);
    setCameraError("");

    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      cameraStreamRef.current = null;
    }

    if (cameraVideoRef.current) {
      cameraVideoRef.current.srcObject = null;
    }
  };

 // Membalik kamera depan/belakang untuk perangkat mobile dan tablet
  const handleFlipCamera = () => {
    setCameraError("");
    setCameraFacingMode((previousMode) => (previousMode === "environment" ? "user" : "environment"));
  };

 // Membersihkan timer unggah saat terjadi kesalahan validasi 
  const clearUploadTimer = () => {
    if (uploadTimerRef.current) {
      window.clearTimeout(uploadTimerRef.current);
      uploadTimerRef.current = null;
    }
  };

  // Membaca analisis yang disimpan dari sessionStorage untuk memulihkan hasil analisis sebelumnya jika user merefresh halaman
  const readFileAsDataUrl = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(typeof reader.result === "string" ? reader.result : null);
      };

      reader.onerror = () => {
        reject(new Error("Gagal membaca gambar"));
      };

      reader.readAsDataURL(file);
    });

 // Memvalidasi file yang dipilih untuk memastikan file yang diunggah adalah gambar 
  const validateFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      clearUploadTimer();
      setUploadError("File gambar tidak valid");
      setIsUploading(false);
      return false;
    }
// Memvalidasi ukuran file untuk memastikan file yang diunggah tidak melebihi batas ukuran yang ditentukan
    if (file.size > maxUploadSizeBytes) {
      clearUploadTimer();
      setUploadError("Ukuran gambar terlalu besar. Maksimal 10 MB");
      setIsUploading(false);
      return false;
    }

    setUploadError("");
    return true;
  };

// Pratinjau gambar yang dipilih oleh user
  const startPreview = (file) => {
    if (!validateFile(file)) {
      return;
    }

    clearUploadTimer();
    selectedFileRef.current = file;
    setSelectedFile(file);

    setIsUploading(true);

    uploadTimerRef.current = window.setTimeout(() => {
      clearObjectUrl();
      const objectUrl = URL.createObjectURL(file);
      objectUrlRef.current = objectUrl;
      setSelectedImage({ src: objectUrl, alt: file.name || "Pratinjau gambar yang dipilih" });
      setIsUploading(false);
      uploadTimerRef.current = null;
    }, 900);
  };

// Menangani perubahan file saat user memilih gambar melalui file manager  
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!validateFile(file)) {
      event.target.value = "";
      return;
    }

    startPreview(file);
    event.target.value = "";
  };

  // Menangani preview gambar
  const setFilePreview = (file) => {
    startPreview(file);
  };

  // Mengambil frame dari kamera dan mengubahnya menjadi file gambar untuk diproses seperti upload biasa
  const handleCameraCapture = () => {
    const video = cameraVideoRef.current;

    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      setCameraError("Kamera belum siap");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      setCameraError("Gagal mengambil foto");
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setCameraError("Gagal mengambil foto");
          return;
        }

        const capturedFile = new File([blob], `camera-capture-${Date.now()}.jpg`, {
          type: "image/jpeg",
        });

        closeCameraPopup();
        startPreview(capturedFile);
      },
      "image/jpeg",
      0.92
    );
  };

  // Menangani proses analisis gambar yang dipilih dengan mengirimkannya ke backend untuk diprediksi dan menyimpan hasil analisis untuk ditampilkan di halaman hasil prediksi
  const handleAnalyze = async () => {
    if (!selectedFileRef.current) {
      setUploadError("Pilih gambar terlebih dahulu");
      return;
    }

    try {
      setIsAnalyzing(true);
      setUploadError("");

      const formData = new FormData();
      formData.append("file", selectedFileRef.current);

      const response = await fetch(`${API_BASE_URL}/predict`, { 
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Prediksi gagal diproses oleh server");
      }

      const result = await response.json();
      const status = classifyAnalysis(result.prediction);
      const imageUrl = await readFileAsDataUrl(selectedFileRef.current);

      clearAnalysis();
      setAnalysis({
        imageUrl,
        prediction: result.prediction,
        confidence: result.confidence,
        status,
        date: new Intl.DateTimeFormat("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date()),
      });

      // Mengarahkan user ke halaman hasil prediksi setelah analisis selesai
      router.push(
        `/result?status=${status}&prediction=${encodeURIComponent(result.prediction)}&confidence=${encodeURIComponent(String(result.confidence))}`
      );
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Gagal menganalisis gambar");
    } finally {
      setIsAnalyzing(false);
    }
  };

// Menangani event drag and drop untuk memungkinkan user mengunggah gambar dengan menyeretnya ke area upload box 
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    setFilePreview(event.dataTransfer.files?.[0]);
  };

// Menangani event drag enter untuk memberikan feedback visual saat user mulai menyeret file ke area upload box  
  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

// Menangani event drag over untuk mempertahankan feedback visual saat user terus menyeret file di atas area upload box  
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

 // Menangani event drag leave untuk menghapus feedback visual saat user meninggalkan area upload box dengan menyeret file keluar dari area tersebut 
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
                    <h3 className="mx-auto max-w-[28ch] text-center text-[clamp(1rem,3vw,1.375rem)] font-bold leading-tight tracking-tight text-slate-900 sm:max-w-none sm:text-[1.375rem] md:text-[1.5rem]">
                      Ambil Foto dari Kamera atau Unggah Gambar
                    </h3>
                    <p className="max-w-[680px] text-sm leading-7 text-slate-900 sm:text-base sm:leading-7 md:text-[20px]">
                      Mendukung format PNG, JPG, HEIC maks 2 MB
                    </p>
                  </div>
                  <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
                    <button
                      type="button"
                      onClick={openCameraPopup}
                      className="inline-flex h-[54px] w-full max-w-[187px] cursor-pointer items-center justify-center rounded-[20px] border-[3px] border-[#2e7d32] bg-white px-[38px] text-[16px] font-semibold whitespace-nowrap text-[#2e7d32] transition-colors hover:bg-[#eef8ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7d32] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    >
                      Ambil Foto
                    </button>
                    <button
                      type="button"
                      onClick={openFileManager}
                      className="inline-flex w-full max-w-[200px] cursor-pointer items-center justify-center rounded-[18px] bg-[#2e7d32] px-6 py-4 text-base font-semibold text-white transition-transform duration-200 hover:bg-[#25692a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2e7d32] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:max-w-[220px]"
                    >
                      Unggah Gambar
                    </button>
                  </div>
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
                      onClick={() => setIsChangeImageModalOpen(true)}
                      className="inline-flex h-[54px] w-full items-center justify-center rounded-[20px] border-[3px] border-[#2e7d32] bg-white px-[38px] text-[16px] font-semibold text-[#2e7d32] whitespace-nowrap transition-colors hover:bg-[#eef8ef] sm:w-[187px] cursor-pointer"
                    >
                      Ganti Gambar
                    </button>
                    <button
                      type="button"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing || !selectedFile}
                      className="inline-flex h-[54px] w-full cursor-pointer items-center justify-center rounded-[20px] bg-[#2e7d32] px-[38px] text-[16px] font-semibold text-white transition-colors hover:bg-[#245f2a] disabled:cursor-not-allowed disabled:bg-[#8fb191] sm:w-[187px]"
                    >
                      {isAnalyzing ? "Menganalisis..." : "Mulai Analisis"}
                    </button>
                  </div>
                </>
              )}

              {uploadError ? (
                <p className="mt-4 text-center text-sm font-medium text-red-600">
                  {uploadError}
                </p>
              ) : null}

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

      <CameraModal
        isOpen={isCameraOpen}
        onClose={closeCameraPopup}
        onCapture={handleCameraCapture}
        onFlipCamera={handleFlipCamera}
        cameraFacingMode={cameraFacingMode}
        cameraError={cameraError}
        cameraVideoRef={cameraVideoRef}
      />

      {isUploading ? <UploadLoadingOverlay /> : null}
      {isAnalyzing ? <AnalyzeLoadingOverlay /> : null}
      {/* Modal Ganti Gambar */}
      {isChangeImageModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setIsChangeImageModalOpen(false)}
        >
          <div 
            className="flex w-full max-w-[400px] flex-col items-center justify-center gap-6 rounded-[32px] bg-white p-10 shadow-xl"
            onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat area dalam diklik
          >
            <button
              type="button"
              onClick={() => {
                setIsChangeImageModalOpen(false);
                openCameraPopup();
              }}
              className="inline-flex h-[60px] w-full cursor-pointer items-center justify-center rounded-[24px] border-[3px] border-[#2e7d32] bg-white px-[38px] text-[20px] font-bold whitespace-nowrap text-[#2e7d32] transition-colors hover:bg-[#eef8ef] focus-visible:outline-none"
            >
              Ambil Foto
            </button>
            <button
              type="button"
              onClick={() => {
                setIsChangeImageModalOpen(false);
                openFileManager();
              }}
              className="inline-flex h-[60px] w-full cursor-pointer items-center justify-center rounded-[24px] bg-[#337a34] px-6 py-4 text-[20px] font-bold text-white transition-transform duration-200 hover:bg-[#25692a] focus-visible:outline-none"
            >
              Unggah Gambar
            </button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
