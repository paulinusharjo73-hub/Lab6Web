/* ============================================================
   Mini Project: Form Pendaftaran Workshop
   Fungsi interaktif:
   1. Validasi nama, email, dan sesi (event submit)
   2. Ringkasan langsung + penghitung karakter (event input)
   3. Info sesi saat dropdown berubah (event change)
   4. Pesan galat dan sukses di halaman
   5. Tombol "Hapus isian" (event click)
   ============================================================ */

const sesiWorkshop = {
  pagi:  { nama: "Sesi pagi: dasar DOM",
           waktu: "09.00–11.00",
           materi: "memilih elemen, mengubah teks, atribut, dan kelas CSS." },
  siang: { nama: "Sesi siang: event dan interaksi",
           waktu: "13.00–15.00",
           materi: "addEventListener, event click, input, dan change." },
  sore:  { nama: "Sesi sore: validasi form",
           waktu: "15.30–17.30",
           materi: "event submit, preventDefault, dan pesan validasi." }
};

const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ----- Referensi elemen -----
const form = document.getElementById("formWorkshop");
const inputNama = document.getElementById("nama");
const inputEmail = document.getElementById("email");
const pilihSesi = document.getElementById("sesi");
const inputAlasan = document.getElementById("alasan");
const hitungAlasan = document.getElementById("hitungAlasan");
const infoSesi = document.getElementById("infoSesi");
const pesanForm = document.getElementById("pesanForm");
const tombolReset = document.getElementById("tombolReset");

const ringNama = document.getElementById("ringNama");
const ringEmail = document.getElementById("ringEmail");
const ringSesi = document.getElementById("ringSesi");
const ringAlasan = document.getElementById("ringAlasan");
const statusTiket = document.getElementById("statusTiket");
const kodeTiket = document.getElementById("kodeTiket");

// ----- Aturan validasi: mengembalikan teks galat, atau "" jika valid -----
const bidang = {
  nama: {
    input: inputNama,
    galat: document.getElementById("galatNama"),
    periksa: function () {
      const nilai = inputNama.value.trim();
      if (nilai === "") return "Nama wajib diisi.";
      if (nilai.length < 3) return "Nama minimal terdiri dari 3 karakter.";
      return "";
    }
  },
  email: {
    input: inputEmail,
    galat: document.getElementById("galatEmail"),
    periksa: function () {
      const nilai = inputEmail.value.trim();
      if (nilai === "") return "Email wajib diisi.";
      if (!polaEmail.test(nilai)) return "Masukkan email yang valid, misalnya nama@kampus.ac.id.";
      return "";
    }
  },
  sesi: {
    input: pilihSesi,
    galat: document.getElementById("galatSesi"),
    periksa: function () {
      return pilihSesi.value === "" ? "Pilih salah satu sesi workshop." : "";
    }
  }
};

function tampilkanGalat(kunci, teks) {
  const b = bidang[kunci];
  b.galat.textContent = teks;
  b.input.classList.toggle("tidak-valid", teks !== "");
  b.input.setAttribute("aria-invalid", teks !== "" ? "true" : "false");
}

function periksaBidang(kunci) {
  const teks = bidang[kunci].periksa();
  tampilkanGalat(kunci, teks);
  return teks === "";
}

function tampilkanPesan(teks, jenis) {
  pesanForm.textContent = teks;
  pesanForm.className = "pesan-form " + jenis; // "galat" | "sukses" | ""
}

// ----- Ringkasan langsung (semua teks lewat textContent) -----
function isiRingkasan(elemen, teks, teksKosong) {
  const kosong = teks === "";
  elemen.textContent = kosong ? teksKosong : teks;
  elemen.classList.toggle("kosong", kosong);
}

function perbaruiRingkasan() {
  isiRingkasan(ringNama, inputNama.value.trim(), "Belum diisi");
  isiRingkasan(ringEmail, inputEmail.value.trim(), "Belum diisi");

  const dipilih = sesiWorkshop[pilihSesi.value];
  isiRingkasan(ringSesi, dipilih ? dipilih.nama + ", " + dipilih.waktu : "", "Belum dipilih");

  isiRingkasan(ringAlasan, inputAlasan.value.trim(), "Tidak diisi");
  hitungAlasan.textContent = inputAlasan.value.length;
}

function setStatusDraf() {
  statusTiket.textContent = "Draf";
  statusTiket.classList.remove("terdaftar");
  kodeTiket.textContent = "belum ada";
}

// ----- Event input: ringkasan langsung dan validasi ulang -----
form.addEventListener("input", function (event) {
  perbaruiRingkasan();

  // Jika tiket sudah terdaftar lalu pengguna mengetik lagi, kembali ke draf
  if (statusTiket.classList.contains("terdaftar")) {
    setStatusDraf();
    tampilkanPesan("", "");
  }

  // Bidang yang tadinya salah diperiksa ulang agar galat hilang begitu benar
  const kunci = event.target.name;
  if (bidang[kunci] && bidang[kunci].input.classList.contains("tidak-valid")) {
    periksaBidang(kunci);
  }

  // Pesan galat di atas tombol ikut diperbarui, lalu hilang jika semua sudah benar
  if (pesanForm.classList.contains("galat")) {
    const sisa = form.querySelectorAll(".tidak-valid").length;
    if (sisa === 0) {
      tampilkanPesan("", "");
    } else {
      tampilkanPesan(
        sisa + " kolom perlu diperbaiki sebelum Anda bisa mendaftar.",
        "galat"
      );
    }
  }
});

// ----- Event change: tampilkan sesi yang dipilih -----
pilihSesi.addEventListener("change", function () {
  const dipilih = sesiWorkshop[pilihSesi.value];
  if (dipilih) {
    infoSesi.textContent = dipilih.nama + ", pukul " + dipilih.waktu +
      ". Materi: " + dipilih.materi;
    periksaBidang("sesi");
  } else {
    infoSesi.textContent = "";
  }
  perbaruiRingkasan();
});

// ----- Event submit: validasi seluruh form -----
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const kunciSemua = Object.keys(bidang);
  const tidakValid = kunciSemua.filter(function (kunci) {
    return !periksaBidang(kunci);
  });

  if (tidakValid.length > 0) {
    tampilkanPesan(
      tidakValid.length + " kolom perlu diperbaiki sebelum Anda bisa mendaftar.",
      "galat"
    );
    bidang[tidakValid[0]].input.focus();
    return;
  }

  const kode = "WS-" + Math.floor(1000 + Math.random() * 9000);
  const namaPeserta = inputNama.value.trim();

  statusTiket.textContent = "Terdaftar";
  statusTiket.classList.add("terdaftar");
  kodeTiket.textContent = kode;
  tampilkanPesan(
    "Pendaftaran berhasil, " + namaPeserta + ". Simpan kode tiket " + kode + ".",
    "sukses"
  );

  // Kosongkan isian, tetapi biarkan tiket menampilkan data yang baru didaftarkan
  form.reset();
  infoSesi.textContent = "";
  hitungAlasan.textContent = "0";
});

// ----- Event click: hapus semua isian -----
tombolReset.addEventListener("click", function () {
  form.reset();
  Object.keys(bidang).forEach(function (kunci) {
    tampilkanGalat(kunci, "");
  });
  infoSesi.textContent = "";
  tampilkanPesan("", "");
  perbaruiRingkasan();
  setStatusDraf();
  inputNama.focus();
});
