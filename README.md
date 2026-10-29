# Lab6Web: Praktikum 6, JavaScript DOM dan Event Handling

Mata kuliah Pemrograman Web, Pertemuan 7.

| | |
|---|---|
| Nama | _isi nama Anda_ |
| NIM | _isi NIM Anda_ |
| Kelas | _isi kelas Anda_ |

## Tujuan

1. Memahami DOM sebagai representasi dokumen HTML yang dapat diakses lewat JavaScript.
2. Memilih elemen dengan `id`, `class`, dan selector CSS.
3. Mengubah teks, atribut, kelas CSS, dan gaya elemen lewat JavaScript.
4. Menangani event pengguna dengan `addEventListener()`.
5. Membuat validasi form dan menampilkan pesan sesuai kondisi input.
6. Mengembangkan halaman interaktif dengan minimal tiga fungsi yang berjalan benar.

## Struktur file

```
Lab6Web/
├── README.md
├── latihan/                 Latihan 1-6 + eksperimen mandiri 1, 2, 4
│   ├── index.html
│   ├── style.css
│   └── script.js
├── eksperimen5/             Eksperimen mandiri 5 (script tanpa dan dengan defer)
│   ├── tanpa_defer.html
│   ├── dengan_defer.html
│   └── script.js
├── mini-project/            Form pendaftaran workshop
│   ├── index.html
│   ├── style.css
│   └── script.js
└── screenshots/             Semua screenshot hasil
```

## Cara menjalankan

Tidak perlu instalasi. Buka file berikut langsung di browser modern (klik dua kali atau seret ke jendela browser):

- `latihan/index.html` untuk Latihan 1-6
- `eksperimen5/tanpa_defer.html` dan `eksperimen5/dengan_defer.html` untuk eksperimen 5
- `mini-project/index.html` untuk mini project

Tekan `F12` untuk membuka Developer Tools dan melihat Console.

---

## Langkah kerja dan hasil

Setiap perilaku di bawah ini diuji otomatis dengan Chromium headless (Playwright). Hasil lengkap ada di bagian **Tabel pengujian**.

### Latihan 1: mengubah teks dengan DOM

`getElementById()` memilih `#judul` dan `#pesan`, lalu `textContent` mengganti isinya saat halaman dimuat.

![Latihan 1](screenshots/latihan1_hasil.png)

### Latihan 2: event click

Setiap klik pada tombol memperbarui paragraf dengan waktu klik (`new Date().toLocaleTimeString()`). Tombol ditekan tiga kali; waktu terakhir yang tampil adalah waktu klik ketiga.

![Latihan 2](screenshots/latihan2_setelah_klik.png)

### Latihan 3: mengubah kelas dan gaya CSS

| Tahap | Screenshot |
|---|---|
| Kondisi awal | ![](screenshots/latihan3a_awal.png) |
| Setelah `toggle` (highlight dan teks-besar terpasang) | ![](screenshots/latihan3b_toggle_aktif.png) |
| Setelah `remove(highlight)`: hanya `teks-besar` yang tersisa | ![](screenshots/latihan3c_remove_highlight.png) |
| Setelah `add(highlight)` dua kali: kelas tidak menggandakan | ![](screenshots/latihan3d_add_highlight.png) |

**Pengamatan:**

- `classList.add()` memasang kelas. Jika kelas sudah ada, tidak ada perubahan.
- `classList.remove()` melepas kelas. Jika kelas tidak ada, tidak ada perubahan.
- `classList.toggle()` memasang kelas jika belum ada dan melepasnya jika sudah ada, sehingga satu tombol bisa menyalakan dan mematikan tampilan.

### Latihan 4: event input dan penghitung karakter

Penghitung diperbarui pada setiap ketikan, penghapusan, dan penempelan teks. Atribut `maxlength="40"` membatasi teks yang ditempel; 55 karakter yang ditempel hanya tersimpan 40.

| Mengetik "Budi Santoso" (12 karakter) | Menempel 55 karakter (terpotong menjadi 40) |
|---|---|
| ![](screenshots/latihan4a_mengetik.png) | ![](screenshots/latihan4b_tempel_teks_panjang.png) |

### Latihan 5: validasi form pendaftaran

Event `submit` memakai `preventDefault()` agar halaman tidak dimuat ulang, lalu input diperiksa berurutan. Selain lima kondisi minimal yang diminta, ditambahkan satu kondisi untuk **eksperimen mandiri nomor 2** (nama minimal tiga karakter).

| Kondisi | Hasil |
|---|---|
| a. Semua input kosong | ![](screenshots/latihan5a_semua_kosong.png) |
| b. Nama kosong | ![](screenshots/latihan5b_nama_kosong.png) |
| c. Nama 2 karakter (eksperimen 2) | ![](screenshots/latihan5c_nama_2_karakter.png) |
| d. Email tidak valid | ![](screenshots/latihan5d_email_tidak_valid.png) |
| e. Usia di bawah 17 | ![](screenshots/latihan5e_usia_di_bawah_17.png) |
| f. Semua input valid (form dikosongkan) | ![](screenshots/latihan5f_semua_valid.png) |

### Latihan 6: daftar tugas sederhana

Elemen dibuat dengan `createElement()`, teks pengguna dimasukkan lewat `textContent`. Tombol **Hapus** per item adalah **eksperimen mandiri nomor 1**.

| Tahap | Hasil |
|---|---|
| Menekan Tambah dengan input kosong | ![](screenshots/latihan6a_tugas_kosong.png) |
| Empat tugas ditambahkan. Tugas keempat berisi `<b>tebal</b>` dan tampil apa adanya sebagai teks, bukan sebagai huruf tebal | ![](screenshots/latihan6b_tugas_ditambah.png) |
| Tugas pertama ditandai selesai, tugas kedua dihapus | ![](screenshots/latihan6c_selesai_dan_hapus.png) |

### Eksperimen mandiri

**Nomor 1:** tombol hapus item To-do List. Lihat Latihan 6.

**Nomor 2:** nama minimal tiga karakter. Lihat Latihan 5 kondisi c, dan mini project.

**Nomor 3:** event `change` pada dropdown sesi. Lihat mini project (info sesi tampil di bawah dropdown).

**Nomor 4:** sembunyikan dan tampilkan paragraf dengan kelas CSS `sembunyi` (`display: none`).

| Tampil | Tersembunyi |
|---|---|
| ![](screenshots/eksperimen4a_tampil.png) | ![](screenshots/eksperimen4b_tersembunyi.png) |

**Nomor 5:** memindahkan script tanpa `defer` ke `<head>`.

| Tanpa `defer` | Dengan `defer` |
|---|---|
| ![](screenshots/eksperimen5_tanpa_defer.png) | ![](screenshots/eksperimen5_dengan_defer.png) |

Pada halaman tanpa `defer`, judul dan pesan **tidak berubah**, dan Console menampilkan galat:

```
TypeError: Cannot set properties of null (setting 'textContent')
```

**Penyebab:** browser membaca HTML dari atas ke bawah. Tag `<script>` di dalam `<head>` tanpa `defer` dijalankan seketika, dan parsing HTML berhenti sampai script selesai. Pada saat itu `<h1 id="judul">` dan `<p id="pesan">` belum dibaca, sehingga `getElementById()` mengembalikan `null`. Menulis `null.textContent = ...` menimbulkan `TypeError`. Dengan `defer`, script diunduh bersamaan dengan parsing tetapi baru dijalankan setelah seluruh HTML selesai diparsing, sehingga elemen sudah tersedia. Alternatif lain: menaruh `<script>` tepat sebelum `</body>`.

---

## Mini project: form pendaftaran workshop

Halaman: `mini-project/index.html`. Data sesi pada halaman ini adalah contoh fiktif untuk keperluan praktikum.

Fitur interaktif (semua memakai `addEventListener()`):

| # | Fitur | Event |
|---|---|---|
| 1 | Validasi nama (minimal 3 karakter), email, dan pilihan sesi; galat tampil per kolom dan fokus pindah ke kolom pertama yang salah | `submit` |
| 2 | Tiket ringkasan yang terisi langsung saat mengetik, dan penghitung karakter alasan (maks. 200) | `input` |
| 3 | Info sesi (waktu dan materi) muncul saat dropdown berubah | `change` |
| 4 | Pesan galat dan pesan sukses (dengan kode tiket) tampil di halaman | `submit` |
| 5 | Tombol **Hapus isian** mengosongkan form, galat, dan tiket | `click` |

Galat pada sebuah kolom hilang otomatis begitu isiannya diperbaiki. Semua teks pengguna ditampilkan dengan `textContent`.

| Tahap | Desktop |
|---|---|
| Tampilan awal | ![](screenshots/mini01_tampilan_awal.png) |
| Memilih sesi (event `change`) | ![](screenshots/mini02_pilih_sesi.png) |
| Submit saat semua kosong | ![](screenshots/mini03_submit_kosong.png) |
| Nama 2 karakter dan email tidak valid | ![](screenshots/mini04_input_tidak_valid.png) |
| Ringkasan langsung saat mengisi | ![](screenshots/mini05_ringkasan_langsung.png) |
| Pendaftaran berhasil | ![](screenshots/mini06_pendaftaran_berhasil.png) |
| Setelah Hapus isian | ![](screenshots/mini07_hapus_isian.png) |

Tampilan mobile (lebar 390 px, satu kolom, tidak ada scroll horizontal):

| Awal | Galat | Berhasil |
|---|---|---|
| ![](screenshots/mini08_mobile_awal.png) | ![](screenshots/mini09_mobile_galat.png) | ![](screenshots/mini10_mobile_berhasil.png) |

---

## Tabel pengujian

Total 44 pemeriksaan otomatis, semuanya lulus, dan tidak ada galat JavaScript pada halaman latihan maupun mini project (satu-satunya galat adalah galat yang memang disengaja pada `eksperimen5/tanpa_defer.html`).

| Kode | Skenario | Hasil yang diharapkan | Status |
|---|---|---|---|
| L1 | Halaman dimuat | Judul menjadi "Belajar JavaScript DOM", paragraf berubah | Lulus |
| L2 | Klik tombol 3 kali | Pesan memuat waktu klik | Lulus |
| L3 | Toggle, remove, add dua kali | Kelas sesuai, tidak menggandakan | Lulus |
| L4 | Ketik 12, hapus 5, tempel 55 karakter | Penghitung 12, 7, 40 | Lulus |
| L5-a | Semua kosong | "Nama wajib diisi." | Lulus |
| L5-b | Nama kosong | "Nama wajib diisi." | Lulus |
| L5-c | Nama 2 karakter | "Nama minimal terdiri dari tiga karakter." | Lulus |
| L5-d | Email `budi@kampus` | "Masukkan email yang valid." | Lulus |
| L5-e | Usia 16 | "Usia harus berupa bilangan bulat 17–100." | Lulus |
| L5-f | Semua valid | Pesan sukses dan form dikosongkan | Lulus |
| L6 | Tambah tugas kosong | "Tulis tugas terlebih dahulu." | Lulus |
| L6 | Tambah 4 tugas, tandai selesai, hapus satu | 4 item, 1 tercoret, tersisa 3 | Lulus |
| L6 | Tugas berisi `<b>tebal</b>` | Tampil sebagai teks, tanpa elemen `<b>` | Lulus |
| E4 | Klik tombol sembunyikan dua kali | Tersembunyi, lalu tampil lagi | Lulus |
| E5 | Script tanpa dan dengan `defer` | Tanpa: judul tidak berubah dan ada `TypeError`; dengan: berubah | Lulus |
| M1 | Submit kosong, nama pendek, email salah | Galat per kolom, fokus ke kolom pertama yang salah | Lulus |
| M2 | Mengisi form | Tiket dan penghitung berubah langsung | Lulus |
| M3 | Pilih sesi | Info sesi tampil | Lulus |
| M4 | Submit valid | Pesan sukses, kode tiket, status "Terdaftar" | Lulus |
| M5 | Hapus isian | Form, galat, dan tiket kembali ke awal | Lulus |
| M6 | Layar 390 px | Tidak ada scroll horizontal | Lulus |

---

## Jawaban pertanyaan evaluasi

**1. Apa yang dimaksud dengan DOM dan apa manfaatnya?**
DOM (Document Object Model) adalah representasi dokumen HTML dalam bentuk pohon objek yang dibuat browser. Manfaatnya, JavaScript dapat memilih elemen, mengubah teks, atribut, dan gaya, menambah atau menghapus elemen, serta merespons tindakan pengguna tanpa memuat ulang halaman.

**2. Apa perbedaan `getElementById()`, `querySelector()`, dan `querySelectorAll()`?**
- `getElementById("x")` memilih satu elemen berdasarkan `id` (hanya menerima nama id, tanpa tanda `#`).
- `querySelector(selector)` menerima selector CSS apa pun dan mengembalikan elemen **pertama** yang cocok, atau `null` jika tidak ada.
- `querySelectorAll(selector)` mengembalikan **semua** elemen yang cocok sebagai `NodeList` (kosong jika tidak ada).

**3. Apa fungsi `addEventListener()` dan sebutkan tiga contoh event?**
`addEventListener()` menghubungkan sebuah event dengan fungsi yang dijalankan saat event itu terjadi, dan boleh dipasang lebih dari satu pada elemen yang sama. Contoh event: `click`, `input`, `submit` (juga `change`, `keydown`, `mouseover`).

**4. Mengapa `event.preventDefault()` digunakan pada event submit form?**
Perilaku bawaan `submit` adalah mengirim form dan memuat ulang halaman. `preventDefault()` membatalkan perilaku itu sehingga JavaScript bisa memeriksa data lebih dulu, menampilkan pesan galat, dan hanya melanjutkan jika data valid.

**5. Apa perbedaan `textContent` dan `innerHTML` dari sisi penggunaan dan keamanan?**
`textContent` membaca dan menulis **teks biasa**; karakter seperti `<` ditampilkan apa adanya. `innerHTML` membaca dan menulis **markup HTML** sehingga tag ikut diproses. Jika teks dari pengguna yang tidak dipercaya dimasukkan ke `innerHTML`, penyerang dapat menyisipkan HTML atau script berbahaya (XSS). Karena itu `textContent` dipilih untuk menampilkan input pengguna, seperti pada tugas `<b>tebal</b>` di Latihan 6 yang tampil sebagai teks.

**6. Bagaimana `classList.toggle()` membantu mengubah tampilan elemen?**
`toggle()` memasang kelas CSS jika elemen belum memilikinya dan melepasnya jika sudah. Tampilan diatur sepenuhnya oleh CSS, dan satu tombol cukup untuk berpindah antara dua tampilan tanpa kode `if` tambahan, misalnya `highlight` pada Latihan 3 dan `sembunyi` pada eksperimen 4.

**7. Sebutkan minimal tiga skenario pengujian validasi form.**
1. Semua kolom kosong harus menampilkan pesan bahwa nama wajib diisi.
2. Email tanpa domain lengkap (misalnya `budi@kampus`) harus ditolak.
3. Usia di bawah batas (16) harus ditolak.
4. Nama kurang dari tiga karakter harus ditolak.
5. Semua input valid harus menampilkan pesan sukses.
