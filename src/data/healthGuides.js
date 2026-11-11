export const healthGuidesData = {
  darurat: {
    categoryTitle: "Darurat",
    caseTitle: "Berdasarkan Kasus Darurat",
    hero: {
      id: "darurat-hero",
      title: "Pertolongan Pertama Tersedak (Metode Heimlich)",
      type: "Heimlich Manuever",
      illustration: "choking",
      steps: [
        "Berdiri di belakang korban dan lingkarkan tangan di perut.",
        "Kepalkan tangan sedikit di atas pusar.",
        "Tekan ke arah dalam dan atas secara hentakan cepat hingga benda keluar."
      ],
      fullDetails: {
        description: "Tersedak terjadi ketika benda asing tersangkut di tenggorokan atau jalan napas, menghambat aliran udara. Metode Heimlich adalah teknik darurat yang sangat efektif untuk membebaskan jalan napas.",
        precautions: [
          "Jika korban masih bisa batuk keras, dorong korban untuk terus batuk.",
          "Jangan memberikan minum air saat korban sedang tersedak parah.",
          "Jika korban pingsan, segera lakukan Bantuan Hidup Dasar (CPR) dan hubungi 112."
        ],
        detailedSteps: [
          "Posisikan diri Anda berdiri di belakang korban dengan satu kaki di antara kedua kaki korban untuk menjaga keseimbangan.",
          "Lingkarkan kedua lengan Anda di sekeliling pinggang korban.",
          "Kepalkan satu tangan Anda dan letakkan bagian ibu jari mengepal di atas pusar korban (di bawah tulang dada).",
          "Genggam kepalan tangan tersebut dengan tangan satunya, lalu dorong ke dalam dan ke atas dengan cepat dan kuat.",
          "Ulangi dorongan secara cepat hingga benda asing terdorong keluar atau korban mulai bisa bernapas/batuk."
        ]
      }
    },
    cases: [
      {
        id: "darurat-cpr",
        title: "Bantuan Hidup Dasar (CPR) untuk Henti Jantung",
        previewSteps: [
          "Cek kesadaran dan pernapasan korban.",
          "Letakkan telapak tangan di tengah dada korban.",
          "Tekan dada korban dengan cepat dan kuat (100-120x/menit)."
        ],
        fullDetails: {
          description: "Resusitasi Jantung Paru (CPR) adalah tindakan pertolongan pertama pada korban yang mengalami henti jantung atau tidak bernapas untuk menjaga sirkulasi darah ke otak.",
          precautions: [
            "Pastikan lokasi sekitar aman sebelum mendekati korban (Aman Diri, Aman Lingkungan, Aman Korban).",
            "Minta bantuan orang sekitar untuk menghubungi ambulans / Faskes terdekat segera."
          ],
          detailedSteps: [
            "Panggil dan tepuk bahu korban untuk memastikan kesadaran.",
            "Jika tidak ada respons dan napas terhenti, posisikan korban terlentang di permukaan datar dan keras.",
            "Berlutut di samping dada korban, letakkan tumit satu telapak tangan di tengah dada dengan tangan satunya mengunci di atasnya.",
            "Tekan dada sedalam 5-6 cm secara konsisten dengan kecepatan 100–120 kali per menit hingga bantuan medis tiba."
          ]
        }
      },
      {
        id: "darurat-kejang",
        title: "Penanganan Pertama Saat Kejang atau Ayan (Epilepsi)",
        previewSteps: [
          "Amankan area sekitar dari benda berbahaya.",
          "Miringkan tubuh korban ke satu sisi.",
          "Sterilkan area sekitar dan lindungi kepala korban."
        ],
        fullDetails: {
          description: "Kejang terjadi akibat gangguan aktivitas listrik di otak secara tiba-tiba. Pertolongan utama berfokus pada mencegah cedera fisik selama kejang berlangsung.",
          precautions: [
            "JANGAN memasukkan benda apa pun (sendok/jari) ke dalam mulut korban.",
            "JANGAN menahan atau memegang gerak tubuh korban yang sedang kejang secara paksa."
          ],
          detailedSteps: [
            "Tetap tenang dan amati durasi kejang menggunakan jam.",
            "Jauhkan benda-benda keras atau tajam dari sekitar tubuh korban.",
            "Letakkan alas lunak (seperti jaket atau bantal tipis) di bawah kepala korban.",
            "Bantu miringkan tubuh korban perlahan ke satu sisi agar saluran napas tetap terbuka dan cairan mulut keluar alami.",
            "Dampingi korban hingga kejang berhenti total dan kesadaran pulih sepenuhnya."
          ]
        }
      },
      {
        id: "darurat-ular",
        title: "Pertolongan Pertama Digigit Ular Berbisa",
        previewSteps: [
          "Tenangkan korban dan minimalkan gerakan.",
          "Ikat bidai pada area sekitar gigitan.",
          "Segera cari bantuan medis dan hindari tindakan berbahaya."
        ],
        fullDetails: {
          description: "Gigitan ular berbisa memerlukan imobilisasi (peningkatan imobilitas anggota tubuh) untuk memperlambat penyebaran racun melalui pembuluh getah bening.",
          precautions: [
            "JANGAN mengisap, menyayat, atau mengikat kencang (tourniquet) area gigitan.",
            "JANGAN mengompres bekas gigitan dengan es atau bahan kimia."
          ],
          detailedSteps: [
            "Tenangkan korban agar detak jantung tetap stabil dan aliran darah tidak makin cepat.",
            "Lepaskan cincin, jam tangan, atau pakaian ketat di sekitar area gigitan sebelum terjadi pembengkakan.",
            "Pasang bidai atau kayu penopang untuk membatasi pergerakan sendi di atas dan di bawah area gigitan.",
            "Posisikan area gigitan lebih rendah atau sejajar dengan posisi jantung.",
            "Bawa korban ke Rumah Sakit terdekat secepatnya untuk mendapatkan Penawar Racun Ular (SABU)."
          ]
        }
      }
    ]
  },
  p3k: {
    categoryTitle: "P3K (Pertolongan Pertama Pada Kecelakaan)",
    caseTitle: "Berdasarkan Kasus P3K",
    hero: {
      id: "p3k-hero",
      title: "Penanganan Keseleo atau Terkilir (Metode RICE)",
      type: "First Aid - RICE",
      illustration: "ankle",
      steps: [
        "Istirahatkan bagian tubuh yang terkilir (Rest).",
        "Kompres dingin dengan es selama 15-20 menit (Ice).",
        "Balut dengan perban elastis dan tinggikan posisi (Compression & Elevation)."
      ],
      fullDetails: {
        description: "Metode RICE (Rest, Ice, Compression, Elevation) adalah standar penanganan awal cedera otot, ligamen, atau sendi untuk mengurangi pembengkakan dan rasa nyeri.",
        precautions: [
          "Jangan memijat atau mengurut area yang baru saja terkilir secara keras.",
          "Jangan gunakan kompres hangat dalam 48 jam pertama pasca cedera."
        ],
        detailedSteps: [
          "Rest: Hentikan semua aktivitas fisik dan istirahatkan sendi yang cedera.",
          "Ice: Tempelkan kantong es yang dibungkus kain tipis ke area nyeri selama 15–20 menit setiap 2–3 jam.",
          "Compression: Balut area cedera dengan perban elastis secara rapi, jangan terlalu kencang agar sirkulasi darah lancar.",
          "Elevation: Sangga bagian tubuh yang terkilir agar posisinya lebih tinggi dari letak jantung saat berbaring."
        ]
      }
    },
    cases: [
      {
        id: "p3k-luka-bakar",
        title: "Pertolongan Pertama pada Luka Bakar Ringan",
        previewSteps: [
          "Siram air mengalir selama 10-15 menit.",
          "Gunakan salep khusus luka bakar.",
          "Tutup dengan kassa steril tanpa ditekan."
        ],
        fullDetails: {
          description: "Luka bakar derajat satu atau dua ringan ditandai dengan kulit kemerahan dan rasa perih akibat paparan benda panas, uap, atau air panas.",
          precautions: [
            "DILARANG mengoleskan pasta gigi, mentega, atau minyak goreng pada luka bakar.",
            "JANGAN memecahkan gelembung lepuhan kulit yang muncul."
          ],
          detailedSteps: [
            "Segera bilas area luka bakar di bawah air bersih yang mengalir pelan (suhu kamar) selama 10–15 menit.",
            "Lepaskan pakaian atau perhiasan di sekitar area luka sebelum membengkak.",
            "Oleskan salep pemulih luka bakar (seperti Silver Sulfadiazine atau gel lidah buaya murni).",
            "Tutup tipis dengan kassa steril bersih jika berisiko gesekan."
          ]
        }
      },
      {
        id: "p3k-mimisan",
        title: "Penanganan Pertama Mimisan (Epistaksis)",
        previewSteps: [
          "Duduk tegak dan condongkan badan ke depan.",
          "Jepit cuping hidung selama 10 menit.",
          "Bernapas melalui mulut dan kompres dingin."
        ],
        fullDetails: {
          description: "Mimisan terjadi akibat pecahnya pembuluh darah kecil di dalam hidung, sering disebabkan oleh udara kering, benturan ringan, atau mengorek hidung.",
          precautions: [
            "JANGAN menengadahkan kepala ke belakang karena darah dapat masuk ke tenggorokan dan saluran cerna."
          ],
          detailedSteps: [
            "Duduk tegak dan condongkan sedikit tubuh serta kepala ke depan.",
            "Jepit kedua cuping hidung rapat-rapat menggunakan ibu jari dan telunjuk.",
            "Bernapaslah secara perlahan melalui mulut dan tahan jepitan selama 10 menit penuh tanpa dilepas.",
            "Letakkan kompres dingin atau kantong es di atas tulang hidung untuk membantu penyempitan pembuluh darah."
          ]
        }
      },
      {
        id: "p3k-luka-sayat",
        title: "Pertolongan Pertama Luka Sayat atau Tergores",
        previewSteps: [
          "Tekan luka dengan kain bersih.",
          "Cuci bersih luka dengan air dan sabun.",
          "Oleskan antiseptik dan tutup plester."
        ],
        fullDetails: {
          description: "Luka terbuka ringan akibat irisan pisau atau goresan benda tajam perlu dibersihkan dengan benar untuk mencegah risiko infeksi infeksi kuman.",
          precautions: [
            "Jika luka sangat dalam dan darah terus mengucur deras, segera cari bantuan medis."
          ],
          detailedSteps: [
            "Cuci tangan Anda dengan sabun sebelum menyentuh luka.",
            "Gunakan kain bersih atau kassa steril untuk menekan area luka secara lembut hingga pendarahan berhenti.",
            "Bilas luka di bawah air mengalir dan cuci area sekitar luka dengan sabun berbahan lembut.",
            "Oleskan cairan antiseptik (povidone-iodine) dan tutup rapat dengan plester steril."
          ]
        }
      }
    ]
  },
  cekMandiri: {
    categoryTitle: "Cek Mandiri (Self-Check Guide)",
    caseTitle: "Berdasarkan Kasus Cek Mandiri",
    hero: {
      id: "cek-hero",
      title: "Cara Mengukur Suhu Tubuh yang Akurat di Rumah",
      type: "Self-Check Temp",
      illustration: "thermometer",
      steps: [
        "Bersihkan termometer dengan alkohol sebelum & sesudah dipakai.",
        "Jepit termometer di ketiak atau bawah lidah selama 1-3 menit.",
        "Baca hasil: Normal 36.5°C - 37.5°C. Di atas 38°C dikategorikan demam."
      ],
      fullDetails: {
        description: "Pengukuran suhu tubuh mandiri membantu mendeteksi respon sistem kekebalan tubuh terhadap infeksi secara dini dari rumah.",
        precautions: [
          "Informasi ini hanya sebagai panduan awal dan tidak menggantikan pemeriksaan oleh tenaga kesehatan profesional.",
          "Jangan minum air panas/dingin 15 menit sebelum mengukur suhu di bawah lidah."
        ],
        detailedSteps: [
          "Bersihkan bagian ujung sensor termometer digital menggunakan kapas yang dibasahi alkohol 70%.",
          "Nyalakan termometer hingga layar menunjukkan angka 0 atau siap pakai.",
          "Letakkan di lipatan ketiak rapat-rapat (atau di bawah lidah dengan mulut tertutup) dan tunggu hingga berbunyi bleep.",
          "Catat hasil angka yang tertera dan waktu pengukurannya untuk referensi konsultasi dokter."
        ]
      }
    },
    cases: [
      {
        id: "cek-nadi",
        title: "Pemeriksaan Mandiri Nadi & Detak Jantung",
        previewSteps: [
          "Tempelkan 2 jari di pergelangan tangan bagian dalam.",
          "Hitung jumlah denyutan selama 60 detik.",
          "Nadi normal dewasa berkisar 60-100 bpm saat istirahat."
        ],
        fullDetails: {
          description: "Menghitung denyut nadi mandiri berguna untuk memantau kebugaran, irama jantung, serta tingkat stres fisik tubuh.",
          precautions: [
            "Lakukan pemeriksaan saat tubuh dalam keadaan tenang dan sudah beristirahat minimal 5 menit."
          ],
          detailedSteps: [
            "Letakkan telunjuk dan jari tengah tangan kanan di pergelangan tangan kiri bagian dalam (segaris dengan ibu jari).",
            "Tekan perlahan hingga merasakan denyutan halus di bawah jari.",
            "Gunakan jam untuk menghitung jumlah denyutan selama 60 detik penuh.",
            "Bila ritme terasa tidak beraturan atau >100 bpm saat tidak beraktivitas, konsultasikan ke Faskes."
          ]
        }
      },
      {
        id: "cek-flu-dehidrasi",
        title: "Pemantauan Gejala Flu & Dehidrasi Sederhana",
        previewSteps: [
          "Amati warna urine (jernih/kuning muda = cukup cairan).",
          "Cek elastisitas kulit (turgor kulit) di punggung tangan.",
          "Pantau konsumsi cairan harian minimal 2 liter/hari."
        ],
        fullDetails: {
          description: "Pemantauan kecukupan cairan secara mandiri penting saat flu atau demam untuk mencegah dehidrasi ringan hingga berat.",
          precautions: [
            "Segera bawa ke fasilitas medis jika urine berwarna sangat gelap atau tidak buang air kecil lebih dari 8 jam."
          ],
          detailedSteps: [
            "Perhatikan warna urine setiap kali buang air kecil (indikator utama tingkat hidrasi).",
            "Cek turgor kulit: cubit pelan kulit di punggung tangan, kulit yang sehat akan kembali mendatar secara instan.",
            "Pastikan rutin meminum air putih secara bertahap sepanjang hari."
          ]
        }
      },
      {
        id: "cek-pernapasan",
        title: "Pemantauan Laju Pernapasan Mandiri",
        previewSteps: [
          "Duduk santai dan istirahat selama 5 menit.",
          "Hitung berapa kali dada naik-turun dalam 1 menit.",
          "Laju napas normal dewasa: 12-20 kali per menit."
        ],
        fullDetails: {
          description: "Pemeriksaan frekuensi napas membantu mengenali gejala sesak napas, gangguan paru, atau kecemasan lebih awal.",
          precautions: [
            "Laju napas >24 kali per menit pada orang dewasa saat istirahat tergolong cepat dan memerlukan perhatian medis."
          ],
          detailedSteps: [
            "Duduk dengan posisi punggung tegak namun tetap rileks.",
            "Letakkan satu tangan di dada atas untuk merasakan gerakan kembang kempis paru.",
            "Hitung 1 kali napas setiap kali dada terangkat naik selama 60 detik.",
            "Catat frekuensi tersebut beserta keluhan pendamping (seperti batuk atau nyeri dada)."
          ]
        }
      }
    ]
  }
};