let currentAnalysis = null;

const STORAGE_KEY = "maizeai.analysis";
const listeners = new Set();

function isBrowser() {
  return typeof window !== "undefined";
}

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

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

if (isBrowser()) {
  currentAnalysis = readStoredAnalysis();
}

export function setAnalysis(analysis) {
  if (currentAnalysis?.imageUrl && currentAnalysis.imageUrl !== analysis?.imageUrl && currentAnalysis.imageUrl.startsWith("blob:")) {
    URL.revokeObjectURL(currentAnalysis.imageUrl);
  }

  currentAnalysis = analysis;
  persistAnalysis(analysis);
  notifyListeners();
}

export function getAnalysis() {
  if (!currentAnalysis) {
    currentAnalysis = readStoredAnalysis();
  }

  return currentAnalysis;
}

export function clearAnalysis() {
  if (currentAnalysis?.imageUrl && currentAnalysis.imageUrl.startsWith("blob:")) {
    URL.revokeObjectURL(currentAnalysis.imageUrl);
  }

  currentAnalysis = null;
  persistAnalysis(null);
  notifyListeners();
}

export function subscribeAnalysis(listener) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}