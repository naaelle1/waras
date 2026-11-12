export const navLinks = [
  { name: "Beranda", href: "#beranda" },
  { name: "Tentang", href: "#tentang" },
  { name: "Fitur", href: "#fitur" },
  { name: "Panduan", href: "#panduan" },
  { name: "Faskes", href: "#faskes" },
  { name: "FAQ", href: "#faq" },
];

export const featureStripData = [
  {
    id: "info",
    icon: "HeartPulse",
    title: "Informasi Kesehatan",
    desc: "Artikel terpercaya & kurasi medis",
    badge: "Terverifikasi",
  },
  {
    id: "faskes",
    icon: "MapPin",
    title: "Fasilitas Terdekat",
    desc: "Temukan faskes se-Kota Semarang",
    badge: "37+ Lokasi",
  },
  {
    id: "ai",
    icon: "Sparkles",
    title: "AI Assistant",
    desc: "Konsultasi awal & info instan 24/7",
    badge: "Smart Triase",
  },
  {
    id: "panduan",
    icon: "ShieldAlert",
    title: "Panduan Layanan",
    desc: "Bantuan rujukan BPJS & SOP P3K",
    badge: "SOP Medis",
  },
];

export const bentoFeatures = {
  aiAssistant: {
    badge: "WARAS Smart Engine",
    title: "AI Assistant Kesehatan",
    description: "Tanyakan keluhan umum dan peroleh panduan pertolongan pertama berbasis referensi medis terverifikasi dalam hitungan detik.",
    sampleChat: [
      {
        sender: "user",
        text: "Kaki saya terkilir saat olahraga pagi, apa langkah pertama yang harus dilakukan?",
        time: "08:14",
      },
      {
        sender: "ai",
        text: "Gunakan metode R.I.C.E: Istirahatkan kaki (Rest), kompres es 15-20 menit (Ice), balut elastis tidak terlalu kencang (Compression), dan posisikan kaki lebih tinggi dari jantung (Elevation).",
        tag: "Panduan P3K Ringan",
        time: "08:14",
      },
    ],
  },
  facilityFinder: {
    badge: "Geolokasi Real-time",
    title: "Cari Fasilitas Terdekat",
    description: "Pemetaan faskes Kota Semarang lengkap dengan status IGD 24 Jam, nomor darurat, dan ketersediaan layanan.",
    facilities: [
      {
        name: "RSUD KRMT Wongsonegoro",
        type: "Rumah Sakit Tipe B",
        status: "IGD 24 Jam",
        distance: "2.4 km",
        ready: true,
      },
      {
        name: "Puskesmas Pandanaran",
        type: "Fasilitas Tingkat 1",
        status: "Buka s/d 14.00",
        distance: "1.1 km",
        ready: true,
      },
      {
        name: "RSUP Dr. Kariadi",
        type: "Rumah Sakit Rujukan Nasional",
        status: "IGD Trauma Ready",
        distance: "3.8 km",
        ready: true,
      },
    ],
  },
  healthArticles: {
    badge: "Kurasi Medis",
    title: "Informasi Kesehatan Tepercaya",
    description: "Artikel berbasis sains medis yang ditulis dengan bahasa yang mudah dipahami orang awam.",
    articles: [
      {
        title: "Pertolongan Pertama pada Asma Kambuh di Rumah",
        category: "Kedaruratan",
        readTime: "3 mnt baca",
      },
      {
        title: "Mengenal Gejala Demam Berdarah Dengue (DBD)",
        category: "Penyakit Tropis",
        readTime: "4 mnt baca",
      },
    ],
  },
  emergencyGuide: {
    badge: "Aksi Cepat",
    title: "Panduan Darurat & Kontak 119",
    description: "Akses hotline ambulans gawat darurat Semarang dan petunjuk tindakan darurat yang ringkas dan bebas panik.",
    hotline: "119",
    subtext: "Call Center Ambulans Hebat Kota Semarang",
    steps: [
      { step: "1", title: "Cek Kesadaran", desc: "Pastikan lingkungan aman lalu periksa respons korban" },
      { step: "2", title: "Hubungi 119", desc: "Sampaikan lokasi persis & kondisi pasien tanpa terputus" },
      { step: "3", title: "Tindakan Awal", desc: "Ikuti instruksi operator sambil menunggu tim medis tiba" },
    ],
  },
};

export const howItWorksSteps = [
  {
    number: "01",
    title: "Cari kebutuhan Anda",
    description: "Ketik gejala yang dirasakan, cari nama faskes di Semarang, atau pilih topik panduan medis yang dibutuhkan.",
    icon: "Search",
    highlight: "Pencarian Cepat",
  },
  {
    number: "02",
    title: "Dapatkan informasi atau rekomendasi",
    description: "Sistem cerdas WARAS memfilter faskes terdekat yang sedang aktif, jalur rujukan, serta edukasi penanganan awal.",
    icon: "Sparkles",
    highlight: "Hasil Akurat & Netral",
  },
  {
    number: "03",
    title: "Temukan langkah selanjutnya",
    description: "Kunjungi faskes dengan navigasi rute langsung, hubungi kontak darurat, atau terapkan panduan mandiri secara aman.",
    icon: "Compass",
    highlight: "Tindakan Terarah",
  },
];

export const productShowcaseSlides = [
  {
    id: "ai-assistant",
    title: "AI Assistant Kesehatan",
    subtitle: "Konsultasi Awal Cerdas",
    description: "Dapatkan penjelasan mengenai istilah medis, pertolongan pertama, atau rekomendasi spesialis yang relevan tanpa istilah rumit.",
    badge: "24/7 Responsif",
    previewType: "ai",
  },
  {
    id: "faskes-search",
    title: "Pencarian Fasilitas Kesehatan",
    subtitle: "Direktori Faskes Semarang",
    description: "Temukan Puskesmas, Rumah Sakit, dan Klinik terdekat dari lokasi Anda dengan informasi ketersediaan IGD dan jam operasional.",
    badge: "GPS Integrated",
    previewType: "faskes",
  },
  {
    id: "health-info",
    title: "Informasi Kesehatan",
    subtitle: "Edukasi & Glosarium Medis",
    description: "Kumpulan artikel kesehatan, tips preventif gaya hidup sehat, dan penjelasan istilah medis agar Anda lebih memahami kondisi tubuh.",
    badge: "Dokter Reviewed",
    previewType: "articles",
  },
  {
    id: "service-guide",
    title: "Panduan Layanan & Rujukan",
    subtitle: "Navigasi Birokrasi Kesehatan",
    description: "Panduan alur rujukan BPJS Kesehatan tingkat 1 hingga faskes lanjutan tanpa kebingungan di loket pendaftaran.",
    badge: "Alur Terstandar",
    previewType: "guide",
  },
];

export const semarangHealthcareData = {
  headline: "Terhubung dengan Akses Kesehatan Semarang.",
  subtext: "Menjangkau seluruh wilayah dari Semarang Barat, Tengah, Selatan, Timur, hingga Banyumanik dan Gunungpati.",
  stats: [
    { value: "37+", label: "Puskesmas Aktif", note: "Tersebar di 16 kecamatan" },
    { value: "18+", label: "Rumah Sakit", note: "Rujukan Tipe A, B, dan C" },
    { value: "24 Jam", label: "Layanan IGD Siaga", note: "Hotline 119 Ambulans Hebat" },
    { value: "100%", label: "Gratis Akses Publik", note: "Tanpa biaya langganan" },
  ],
  locations: [
    { name: "RSUD KRMT Wongsonegoro", zone: "Semarang Selatan", type: "RSUD", lat: 38, lng: 72, ready: true },
    { name: "RSUP Dr. Kariadi", zone: "Semarang Tengah", type: "RSUP", lat: 50, lng: 48, ready: true },
    { name: "Puskesmas Pandanaran", zone: "Semarang Selatan", type: "Puskesmas", lat: 58, lng: 52, ready: true },
    { name: "Puskesmas Halmahera", zone: "Semarang Timur", type: "Puskesmas", lat: 46, lng: 66, ready: true },
    { name: "RS Columbia Asia", zone: "Semarang Barat", type: "RS Swasta", lat: 42, lng: 28, ready: true },
    { name: "Puskesmas Banyumanik", zone: "Banyumanik", type: "Puskesmas", lat: 75, lng: 55, ready: true },
    { name: "Puskesmas Mangkang", zone: "Semarang Barat", type: "Puskesmas", lat: 34, lng: 18, ready: true },
  ],
};

export const trustPoints = [
  {
    title: "Informasi lebih mudah diakses",
    desc: "Semua direktori faskes, jadwal layanan, dan panduan kesehatan disajikan dalam satu portal tanpa perlu mencari di berbagai website berbeda.",
  },
  {
    title: "Panduan yang jelas dan terstruktur",
    desc: "Instruksi langkah pertolongan pertama dan alur rujukan disajikan ringkas, bebas jargon rumit, dan mudah dieksekusi saat darurat.",
  },
  {
    title: "Membantu menemukan layanan kesehatan",
    desc: "Peta lokasi akurat dan nomor kontak langsung memudahkan warga Semarang menentukan fasilitas kesehatan yang paling tepat.",
  },
];

export const faqData = [
  {
    q: "Apa itu WARAS?",
    a: "WARAS adalah platform informasi dan akses layanan kesehatan digital untuk masyarakat Kota Semarang. WARAS mempermudah pencarian fasilitas kesehatan, panduan darurat, rujukan BPJS, artikel edukatif, serta menyediakan AI Assistant untuk konsultasi awal.",
  },
  {
    q: "Apakah WARAS gratis?",
    a: "Ya, seluruh fitur publik WARAS—mulai dari pencarian faskes, direktori kontak, panduan P3K, hingga konsultasi dengan AI Assistant—dapat digunakan 100% secara gratis tanpa biaya langganan.",
  },
  {
    q: "Apakah AI Assistant dapat mendiagnosis penyakit?",
    a: "Tidak. AI Assistant WARAS dirancang untuk edukasi informasi kesehatan umum dan pertolongan pertama awal. AI tidak menggantikan diagnosis resmi, resep obat, atau pemeriksaan langsung oleh dokter atau tenaga medis profesional.",
  },
  {
    q: "Bagaimana mencari fasilitas kesehatan di Semarang?",
    a: "Anda cukup menggunakan fitur Pencarian Fasilitas di WARAS. Anda dapat memfilter berdasarkan jenis (Puskesmas, RSUD, RS Swasta, Klinik), ketersediaan IGD 24 Jam, serta melihat lokasi terdekat dari posisi Anda saat ini.",
  },
];

export const footerLinks = {
  platform: [
    { label: "Pencarian Faskes", href: "/user/facilities" },
    { label: "AI Assistant", href: "/user/ai" },
    { label: "Panduan Layanan", href: "/user/health-info/guides" },
    { label: "Glosarium Medis", href: "/user/health-info/medical-terms" },
  ],
  informasi: [
    { label: "Artikel Kesehatan", href: "/user/health-info/articles" },
    { label: "Ambulans Hebat 119", href: "tel:119" },
    { label: "Dinas Kesehatan Semarang", href: "https://dinkes.semarangkota.go.id" },
    { label: "Panduan BPJS", href: "/user/health-info/services" },
  ],
  bantuan: [
    { label: "Laporkan Masalah", href: "/user/report-problem" },
    { label: "Pusat Bantuan", href: "/user/help" },
    { label: "Ketentuan Penggunaan", href: "#" },
    { label: "Kebijakan Privasi", href: "#" },
  ],
};