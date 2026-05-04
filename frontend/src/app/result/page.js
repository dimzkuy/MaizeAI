import { Suspense } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ResultClient from "./resultClient";

function ResultFallback() {
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

export default function ResultPage() {
  return (
    <Suspense fallback={<ResultFallback />}>
      <ResultClient />
    </Suspense>
  );
}