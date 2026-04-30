// Data karakter
export const characters = [
  { id: 'boy', name: 'Laki-laki', image: '/assets/images/characters/boy.png', color: '#4A90D9' },
  { id: 'girl', name: 'Perempuan', image: '/assets/images/characters/girl.png', color: '#FF6B9D' }
];


// Data level - LEVEL 1, 2, 3, 4
export const levels = [
  { 
    id: 'level1', 
    name: 'Level 1', 
    icon: '⭐', 
    world: 'Level 1',
    bg: '/assets/images/bg/bgame.png',
    color: '#4CAF50',
    description: 'Level ini sangat mudah, belajar  bilangan sederhana!',
    type: 'multiple-choice',
    questions: [
      { id: 1, soal: "2 + 2 + 2 = ?", gambar: null, jawaban: 6, pilihan: [2, 3, 6, 7], petunjuk: "2x3" },
      { id: 2, soal: "5 + 5 + 5 + 5 = ?", gambar: null, jawaban: 20, pilihan: [10, 20, 30, 40], petunjuk: "5x4" },
      { id: 3, soal: "🧺🌸🌸🌸🌸 + 🧺🌸🌸🌸🌸 + 🧺🌸🌸🌸🌸 \n Jika ditulis dalam kalimat matematika adalah...", gambar: null, jawaban: "4 x 3 = 12", pilihan: ["4 x 3 = 12","3 x 4 = 14","3 x 4 = 14", "3 x 3 = 12"], petunjuk: "Ada 3 keranjang, setiap keranjang berisi 4 bunga 🌸" },
      { id: 4, soal: "Berapa jumlah bola seluruhnya?", gambar: null, jawaban: 18, pilihan: [15, 16, 17, 18], petunjuk: "Ada 9 kotak, setiap kotak berisi 2 bola ⚽" },
    ]
  },
   { 
    id: 'level2', 
    name: 'Level 2', 
    icon: '🌟', 
    world: 'Level 2',
    bg: '/assets/images/levels/level2-bg.png',
    color: '#2196F3',
    description: 'Mulai belajar perkalian sederhana!',
    type: 'multiple-choice',
    questions: [
      { id: 1, soal: "3 x 4 = ?", gambar: null, jawaban: 12, pilihan: [7, 12, 14, 16], petunjuk: "3 kelompok 4" },
      { id: 2, soal: "6 x 2 = ?", gambar: null, jawaban: 12, pilihan: [10, 11, 12, 13], petunjuk: "6 kelompok 2" },
      { id: 3, soal: "🍎🍎🍎 + 🍎🍎🍎 + 🍎🍎🍎 \n Bentuk perkaliannya adalah...", gambar: null, jawaban: "3 x 3 = 9", pilihan: ["3 x 3 = 9","3 + 3 = 9","3 x 2 = 6","9 x 3 = 12"], petunjuk: "Ada 3 kelompok, masing-masing 3 apel" },
      { id: 4, soal: "4 x 5 = ?", gambar: null, jawaban: 20, pilihan: [10, 15, 20, 25], petunjuk: "4 kelompok 5" },
    ]
  },

  { 
    id: 'level3', 
    name: 'Level 3', 
    icon: '🔥', 
    world: 'Level 3',
    bg: '/assets/images/levels/level3-bg.png',
    color: '#FF9800',
    description: 'Level menengah, gabungan soal cerita dan perkalian!',
    type: 'multiple-choice',
    questions: [
      { id: 1, soal: "7 x 3 = ?", gambar: null, jawaban: 21, pilihan: [18, 20, 21, 24], petunjuk: "7 kelompok 3" },
      { id: 2, soal: "Ada 5 kotak, tiap kotak berisi 6 pensil. Total pensil?", gambar: null, jawaban: 30, pilihan: [25, 30, 35, 40], petunjuk: "5 x 6" },
      { id: 3, soal: "🍇🍇🍇🍇 + 🍇🍇🍇🍇 + 🍇🍇🍇🍇 \n Jadi perkaliannya adalah...", gambar: null, jawaban: "3 x 4 = 12", pilihan: ["4 x 3 = 12","3 x 4 = 12","4 x 4 = 16","3 x 3 = 9"], petunjuk: "Ada 3 kelompok, masing-masing 4 anggur" },
      { id: 4, soal: "9 x 2 = ?", gambar: null, jawaban: 18, pilihan: [16, 17, 18, 19], petunjuk: "9 kelompok 2" },
    ]
  },

  { 
    id: 'level4', 
    name: 'Level 4', 
    icon: '🚀', 
    world: 'Level 4',
    bg: '/assets/images/levels/level4-bg.png',
    color: '#9C27B0',
    description: 'Level lebih sulit, kombinasi logika dan perkalian!',
    type: 'multiple-choice',
    questions: [
      { id: 1, soal: "8 x 4 = ?", gambar: null, jawaban: 32, pilihan: [28, 30, 32, 36], petunjuk: "8 kelompok 4" },
      { id: 2, soal: "Ada 3 kandang, tiap kandang berisi 7 ayam. Total ayam?", gambar: null, jawaban: 21, pilihan: [18, 20, 21, 24], petunjuk: "3 x 7" },
      { id: 3, soal: "🍪🍪🍪🍪🍪 + 🍪🍪🍪🍪🍪 \n Bentuk perkaliannya adalah...", gambar: null, jawaban: "2 x 5 = 10", pilihan: ["5 x 2 = 10","2 x 5 = 10","5 + 5 = 10","5 + 2 = 10"], petunjuk: "Ada 2 kelompok, masing-masing 5 kue" },
      { id: 4, soal: "10 x 3 = ?", gambar: null, jawaban: 30, pilihan: [20, 25, 30, 35], petunjuk: "10 kelompok 3" },
    ]
  }
  
];