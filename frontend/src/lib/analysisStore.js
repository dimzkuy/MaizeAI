let currentAnalysis = null;

const STORAGE_KEY = "maizeai.analysis";
const listeners = new Set();


// Mengecek apakah kode sedang berjalan di browser, bukan saat server-side rendering
function isBrowser() {
  return typeof window !== "undefined";
}

// Membaca hasil analisis yang sudah disimpan di sessionStorage
function readStoredAnalysis() {
  if (!isBrowser()) {
    return null;
  }

  try {
    const rawValue = window.sessionStorage.getItem(STORAGE_KEY);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
}

// Menyimpan atau menghapus hasil analisis dari sessionStorage
function persistAnalysis(analysis) {
  if (!isBrowser()) {
    return;
  }

  try {
    if (analysis) {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(analysis));
    } else {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors and keep the in-memory copy working.
  }
}

// Memberi tahu semua subscriber bahwa data analisis berubah
function notifyListeners() {
  listeners.forEach((listener) => listener());
}

if (isBrowser()) {
  currentAnalysis = readStoredAnalysis();
}

// Menetapkan hasil analisis baru dan menyimpannya ke memori serta sessionStorage
export function setAnalysis(analysis) {
  if (currentAnalysis?.imageUrl && currentAnalysis.imageUrl !== analysis?.imageUrl && currentAnalysis.imageUrl.startsWith("blob:")) {
    URL.revokeObjectURL(currentAnalysis.imageUrl);
  }

  currentAnalysis = analysis;
  persistAnalysis(analysis);
  notifyListeners();
}

// Mengambil hasil analisis yang aktif, atau memuat ulang dari sessionStorage bila perlu
export function getAnalysis() {
  if (!currentAnalysis) {
    currentAnalysis = readStoredAnalysis();
  }

  return currentAnalysis;
}

// Menghapus hasil analisis dari memori, sessionStorage, dan object URL blob jika ada
export function clearAnalysis() {
  if (currentAnalysis?.imageUrl && currentAnalysis.imageUrl.startsWith("blob:")) {
    URL.revokeObjectURL(currentAnalysis.imageUrl);
  }

  currentAnalysis = null;
  persistAnalysis(null);
  notifyListeners();
}

// Mendaftarkan listener agar komponen bisa mengikuti perubahan data analisis
export function subscribeAnalysis(listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}