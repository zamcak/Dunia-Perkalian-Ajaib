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
    bg: '/assets/images/levels/level1-bg.png',
    color: '#4CAF50',
    description: 'Level ini sangat mudah, belajar penjumlahan bilangan sederhana!',
    type: 'multiple-choice',
    questions: [
      { id: 1, soal: "1 + 2 = ?", gambar: null, jawaban: 3, pilihan: [2, 3, 4, 5], petunjuk: "1 + 2 = 3" },
      { id: 2, soal: "2 + 3 = ?", gambar: null, jawaban: 5, pilihan: [4, 5, 6, 7], petunjuk: "2 + 3 = 5" },
      { id: 3, soal: "3 + 4 = ?", gambar: null, jawaban: 7, pilihan: [5, 6, 7, 8], petunjuk: "3 + 4 = 7" },
      { id: 4, soal: "4 + 2 = ?", gambar: null, jawaban: 6, pilihan: [5, 6, 7, 8], petunjuk: "4 + 2 = 6" },
      { id: 5, soal: "5 + 3 = ?", gambar: null, jawaban: 8, pilihan: [7, 8, 9, 10], petunjuk: "5 + 3 = 8" },
      { id: 6, soal: "6 + 2 = ?", gambar: null, jawaban: 8, pilihan: [7, 8, 9, 10], petunjuk: "6 + 2 = 8" },
      { id: 7, soal: "7 + 1 = ?", gambar: null, jawaban: 8, pilihan: [7, 8, 9, 10], petunjuk: "7 + 1 = 8" },
      { id: 8, soal: "3 + 5 = ?", gambar: null, jawaban: 8, pilihan: [7, 8, 9, 10], petunjuk: "3 + 5 = 8" },
      { id: 9, soal: "4 + 4 = ?", gambar: null, jawaban: 8, pilihan: [7, 8, 9, 10], petunjuk: "4 + 4 = 8" },
      { id: 10, soal: "2 + 7 = ?", gambar: null, jawaban: 9, pilihan: [8, 9, 10, 11], petunjuk: "2 + 7 = 9" }
    ]
  },
  { 
    id: 'level2', 
    name: 'Level 2', 
    icon: '⭐', 
    world: 'Level 2',
    bg: '/assets/images/levels/level2-bg.png',
    color: '#FF9800',
    description: 'Level ini sedang, belajar bilangan sederhana!',
    type: 'multiple-choice',
    questions: [
      { id: 1, soal: "Berapakah Hasilnya", gambar: "/assets/images/quiz/mla.png", jawaban: "1", pilihan: ["5","4","3","1"], petunjuk: "" },
      { id: 2, soal: "5 - 2 = ?", gambar: null, jawaban: 3, pilihan: [2, 3, 4, 5], petunjuk: "5 - 2 = 3" },
      { id: 3, soal: "7 - 3 = ?", gambar: null, jawaban: 4, pilihan: [3, 4, 5, 6], petunjuk: "7 - 3 = 4" },
      { id: 4, soal: "8 - 4 = ?", gambar: null, jawaban: 4, pilihan: [3, 4, 5, 6], petunjuk: "8 - 4 = 4" },
      { id: 5, soal: "9 - 5 = ?", gambar: null, jawaban: 4, pilihan: [3, 4, 5, 6], petunjuk: "9 - 5 = 4" },
      { id: 6, soal: "10 - 3 = ?", gambar: null, jawaban: 7, pilihan: [6, 7, 8, 9], petunjuk: "10 - 3 = 7" },
      { id: 7, soal: "12 - 4 = ?", gambar: null, jawaban: 8, pilihan: [7, 8, 9, 10], petunjuk: "12 - 4 = 8" },
      { id: 8, soal: "15 - 5 = ?", gambar: null, jawaban: 10, pilihan: [8, 9, 10, 11], petunjuk: "15 - 5 = 10" },
      { id: 9, soal: "20 - 8 = ?", gambar: null, jawaban: 12, pilihan: [10, 11, 12, 13], petunjuk: "20 - 8 = 12" },
      { id: 10, soal: "25 - 10 = ?", gambar: null, jawaban: 15, pilihan: [13, 14, 15, 16], petunjuk: "25 - 10 = 15" }
    ]
  },
  { 
    id: 'level3', 
    name: 'Level 3', 
    icon: '⭐', 
    world: 'Level 3',
    bg: '/assets/images/levels/level3-bg.png',
    color: '#2196F3',
    description: 'Level ini sedang, belajar  bilangan sederhana!',
    type: 'multiple-choice',
    questions: [
      { id: 1, soal: "1 × 2 = ?", gambar: null, jawaban: 2, pilihan: [1, 2, 3, 4], petunjuk: "1 + 1 = 2" },
      { id: 2, soal: "2 × 2 = ?", gambar: null, jawaban: 4, pilihan: [2, 3, 4, 5], petunjuk: "2 + 2 = 4" },
      { id: 3, soal: "2 × 3 = ?", gambar: null, jawaban: 6, pilihan: [4, 5, 6, 7], petunjuk: "2 + 2 + 2 = 6" },
      { id: 4, soal: "3 × 3 = ?", gambar: null, jawaban: 9, pilihan: [6, 7, 8, 9], petunjuk: "3 + 3 + 3 = 9" },
      { id: 5, soal: "3 × 4 = ?", gambar: null, jawaban: 12, pilihan: [9, 10, 11, 12], petunjuk: "3 + 3 + 3 + 3 = 12" },
      { id: 6, soal: "4 × 4 = ?", gambar: null, jawaban: 16, pilihan: [12, 14, 16, 18], petunjuk: "4 + 4 + 4 + 4 = 16" },
      { id: 7, soal: "4 × 5 = ?", gambar: null, jawaban: 20, pilihan: [16, 18, 20, 22], petunjuk: "4 + 4 + 4 + 4 + 4 = 20" },
      { id: 8, soal: "5 × 5 = ?", gambar: null, jawaban: 25, pilihan: [20, 22, 24, 25], petunjuk: "5 + 5 + 5 + 5 + 5 = 25" },
      { id: 9, soal: "5 × 6 = ?", gambar: null, jawaban: 30, pilihan: [25, 28, 30, 32], petunjuk: "5 + 5 + 5 + 5 + 5 + 5 = 30" },
      { id: 10, soal: "6 × 6 = ?", gambar: null, jawaban: 36, pilihan: [30, 32, 35, 36], petunjuk: "6 + 6 + 6 + 6 + 6 + 6 = 36" }
    ]
  },
  { 
    id: 'level4', 
    name: 'Level 4', 
    icon: '⭐', 
    world: 'Level 4',
    bg: '/assets/images/levels/level4-bg.png',
    color: '#9C27B0',
    description: 'Level ini sedang, belajar pembagian bilangan sederhana!',
    type: 'multiple-choice',
    questions: [
      { id: 1, soal: "4 ÷ 2 = ?", gambar: null, jawaban: 2, pilihan: [1, 2, 3, 4], petunjuk: "2 × 2 = 4" },
      { id: 2, soal: "6 ÷ 2 = ?", gambar: null, jawaban: 3, pilihan: [2, 3, 4, 5], petunjuk: "3 × 2 = 6" },
      { id: 3, soal: "8 ÷ 2 = ?", gambar: null, jawaban: 4, pilihan: [3, 4, 5, 6], petunjuk: "4 × 2 = 8" },
      { id: 4, soal: "9 ÷ 3 = ?", gambar: null, jawaban: 3, pilihan: [2, 3, 4, 5], petunjuk: "3 × 3 = 9" },
      { id: 5, soal: "12 ÷ 3 = ?", gambar: null, jawaban: 4, pilihan: [3, 4, 5, 6], petunjuk: "4 × 3 = 12" },
      { id: 6, soal: "15 ÷ 3 = ?", gambar: null, jawaban: 5, pilihan: [4, 5, 6, 7], petunjuk: "5 × 3 = 15" },
      { id: 7, soal: "16 ÷ 4 = ?", gambar: null, jawaban: 4, pilihan: [3, 4, 5, 6], petunjuk: "4 × 4 = 16" },
      { id: 8, soal: "20 ÷ 4 = ?", gambar: null, jawaban: 5, pilihan: [4, 5, 6, 7], petunjuk: "5 × 4 = 20" },
      { id: 9, soal: "24 ÷ 4 = ?", gambar: null, jawaban: 6, pilihan: [5, 6, 7, 8], petunjuk: "6 × 4 = 24" },
      { id: 10, soal: "36 ÷ 6 = ?", gambar: null, jawaban: 6, pilihan: [5, 6, 7, 8], petunjuk: "6 × 6 = 36" }
    ]
  }
];