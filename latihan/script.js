/* ============================================================
   Praktikum 6: JavaScript DOM dan Event Handling
   Script dimuat dengan atribut defer, sehingga semua elemen
   sudah tersedia saat kode ini dijalankan.
   ============================================================ */

/* ---------- Latihan 1: mengubah teks dengan DOM ---------- */
const judul = document.getElementById("judul");
const pesan = document.getElementById("pesan");

judul.textContent = "Belajar JavaScript DOM";
pesan.textContent = "Konten berhasil diubah oleh JavaScript.";


/* ---------- Latihan 2: event click ---------- */
const tombol = document.getElementById("tombolAksi");

tombol.addEventListener("click", function () {
  pesan.textContent = "Tombol diklik pada " + new Date().toLocaleTimeString();
});


/* ---------- Latihan 3: mengubah kelas dan gaya CSS ---------- */
const tombolGaya = document.getElementById("tombolGaya");
const teksGaya = document.getElementById("teksGaya");
const tombolTambahKelas = document.getElementById("tombolTambahKelas");
const tombolHapusKelas = document.getElementById("tombolHapusKelas");

// toggle: kelas dipasang jika belum ada, dilepas jika sudah ada
tombolGaya.addEventListener("click", function () {
  teksGaya.classList.toggle("highlight");
  teksGaya.classList.toggle("teks-besar");
});

// add: selalu memasang kelas (tidak berubah jika sudah terpasang)
tombolTambahKelas.addEventListener("click", function () {
  teksGaya.classList.add("highlight");
});

// remove: selalu melepas kelas (tidak berubah jika belum terpasang)
tombolHapusKelas.addEventListener("click", function () {
  teksGaya.classList.remove("highlight");
});


/* ---------- Latihan 4: event input dan penghitung karakter ---------- */
const namaInput = document.getElementById("namaInput");
const jumlahKarakter = document.getElementById("jumlahKarakter");

namaInput.addEventListener("input", function () {
  jumlahKarakter.textContent = namaInput.value.length;
});


/* ---------- Latihan 5: validasi form pendaftaran ----------
   Eksperimen mandiri nomor 2 sudah diterapkan di sini:
   nama minimal terdiri dari tiga karakter. */
const form = document.getElementById("formPendaftaran");
const pesanForm = document.getElementById("pesanForm");

function tampilkanPesanForm(teks, jenis) {
  pesanForm.textContent = teks;
  pesanForm.className = jenis; // "galat" atau "sukses"
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const usiaInput = document.getElementById("usia").value;
  const usia = Number(usiaInput);
  const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nama === "") {
    tampilkanPesanForm("Nama wajib diisi.", "galat");
  } else if (nama.length < 3) {
    tampilkanPesanForm("Nama minimal terdiri dari tiga karakter.", "galat");
  } else if (!polaEmail.test(email)) {
    tampilkanPesanForm("Masukkan email yang valid.", "galat");
  } else if (usiaInput === "" || !Number.isInteger(usia) || usia < 17 || usia > 100) {
    tampilkanPesanForm("Usia harus berupa bilangan bulat 17–100.", "galat");
  } else {
    tampilkanPesanForm("Validasi berhasil. Form siap diproses.", "sukses");
    form.reset();
  }
});


/* ---------- Latihan 6: daftar tugas sederhana ----------
   Eksperimen mandiri nomor 1 sudah diterapkan di sini:
   tombol "Hapus" untuk menghapus satu item. */
const inputTugas = document.getElementById("inputTugas");
const tambahTugas = document.getElementById("tambahTugas");
const daftarTugas = document.getElementById("daftarTugas");
const pesanTugas = document.getElementById("pesanTugas");

tambahTugas.addEventListener("click", function () {
  const teks = inputTugas.value.trim();

  if (teks === "") {
    pesanTugas.textContent = "Tulis tugas terlebih dahulu.";
    return;
  }

  const item = document.createElement("li");
  const label = document.createElement("span");
  const selesai = document.createElement("button");
  const hapus = document.createElement("button");

  // textContent: teks pengguna tampil sebagai teks, bukan markup HTML
  label.textContent = teks + " ";

  selesai.type = "button";
  selesai.textContent = "Tandai selesai";
  selesai.addEventListener("click", function () {
    item.classList.toggle("selesai");
    selesai.textContent = item.classList.contains("selesai")
      ? "Batalkan selesai" : "Tandai selesai";
  });

  hapus.type = "button";
  hapus.textContent = "Hapus";
  hapus.className = "sekunder";
  hapus.addEventListener("click", function () {
    item.remove();
    pesanTugas.textContent = "Tugas dihapus.";
  });

  item.append(label, selesai, hapus);
  daftarTugas.appendChild(item);

  inputTugas.value = "";
  pesanTugas.textContent = "Tugas ditambahkan.";
  inputTugas.focus();
});


/* ---------- Eksperimen mandiri nomor 4: sembunyikan/tampilkan ---------- */
const tombolSembunyi = document.getElementById("tombolSembunyi");
const paragrafToggle = document.getElementById("paragrafToggle");

tombolSembunyi.addEventListener("click", function () {
  paragrafToggle.classList.toggle("sembunyi");
  tombolSembunyi.textContent = paragrafToggle.classList.contains("sembunyi")
    ? "Tampilkan paragraf" : "Sembunyikan paragraf";
});
