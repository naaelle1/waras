import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component
 * Secara otomatis mereset posisi scroll browser ke paling atas (0, 0)
 * setiap kali pengguna berpindah rute/halaman atau tab navigasi.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Jika ada anchor hash (#id), arahkan ke elemen tersebut
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    // Reset posisi scroll ke paling atas seketika
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Double check pada frame berikutnya untuk memastikan elemen DOM baru selesai di-render
    const frameId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    return () => cancelAnimationFrame(frameId);
  }, [pathname, hash]);

  return null;
}
