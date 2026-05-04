let currentAnalysis = null;

export function setAnalysis(analysis) {
  if (currentAnalysis?.imageUrl && currentAnalysis.imageUrl !== analysis?.imageUrl && currentAnalysis.imageUrl.startsWith("blob:")) {
    URL.revokeObjectURL(currentAnalysis.imageUrl);
  }

  currentAnalysis = analysis;
}

export function getAnalysis() {
  return currentAnalysis;
}

export function clearAnalysis() {
  if (currentAnalysis?.imageUrl && currentAnalysis.imageUrl.startsWith("blob:")) {
    URL.revokeObjectURL(currentAnalysis.imageUrl);
  }

  currentAnalysis = null;
}