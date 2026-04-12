export const materiList = [
  {
    id: 1,
    judul: "Apa itu Perkalian?",
    gambar: "",
    gambarSoal: "",
    deskripsi: 'Perkalian adalah penjumlahan yang dilakukan berulang-ulang dengan bilangan yang sama. Perkalian dasar menggunakan simbol " × " pada penulisan kalimat matematika.',
    rumus: '"2 dikali 3" atau "2 kali 3" ditulis secara matematika: 2 × 3',
    rumusGambar: "",
    contoh: [
      { text: '<div class="math-card"><p class="title">Penjumlahan Berulang</p><div class="content"><p class="addition">3 + 3 + 3 = <span>9</span></p><div class="arrow">⬇️</div><p class="meaning">Artinya sama dengan:</p><p class="multiplication">3 × 3 = <span>9</span></p></div></div>', gambar: "" },
      { text: "<div style=\"text-align:center; font-family:sans-serif;\"><p>Ada <b>3 kantong kelereng</b>. Setiap kantong berisi <b>10 kelereng</b>.</p><img src=\"assets/images/materi/maone.png\" alt=\"kantong kelereng\" style=\"margin:10px 0; border-radius:10px;\" /><p>Ada <b>3 kali penjumlahan bilangan 10</b>:</p><p>10 + 10 + 10 = <b>30</b></p><p>⬇️</p><p><b>3 × 10 = 30</b></p></div>", gambar: "" },
    ],
    
  },
];

export const videoList = [
  {
    id: 1,
    judul: "Pengenalan Matematika Dasar",
    thumbnail: "/assets/images/materi/maxresc.jpg",
    url: "https://www.youtube.com/embed/rs_bX7K_u5M",
    durasi: "5:30",
    deskripsi: "Video ini menjelaskan konsep dasar matematika"
  },
  {
    id: 2,
    judul: "Tips Menghitung Cepat",
    thumbnail: "/assets/images/materi/maxresb.jpg",
    url: "https://www.youtube.com/embed/mrJt8Ux4GXA&pp",
    durasi: "8:15",
    deskripsi: "Pelajari trik menghitung cepat"
  },
  {
    id: 3,
    judul: "Latihan Soal Matematika",
    thumbnail: "/assets/images/materi/maxresa.jpg",
    url: "https://www.youtube.com/embed/cL2lvaRTD6Q",
    durasi: "10:00",
    deskripsi: "Latihan soal dan pembahasan"
  }
];

export const rangkumanData = {
  penjumlahan: "Penjumlahan: a + b = c",
  pengurangan: "Pengurangan: a - b = c",
  perkalian: "Perkalian: a × b = c",
  pembagian: "Pembagian: a ÷ b = c"
};