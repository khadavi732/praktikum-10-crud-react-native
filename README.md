# Praktikum 10 - CRUD React Native

## Identitas

- Mata Kuliah: Konsep dan Pengembangan Aplikasi Web dan Mobile
- Praktikum: Pertemuan 10
- Proyek: Aplikasi Catatan Kuliah
- Teknologi: React Native, Expo Go, SQLite

## Deskripsi

Aplikasi mobile sederhana untuk mengelola catatan
kuliah dengan operasi CRUD menggunakan SQLite.

## Fitur

1. Create: Menambahkan catatan.
2. Read: Menampilkan daftar catatan.
3. Update: Mengubah catatan.
4. Delete: Menghapus catatan.
5. Validasi: Judul minimal 3 karakter.
6. Penyimpanan lokal menggunakan SQLite.

## Teknologi

- React Native
- Expo
- TypeScript
- Expo SQLite
- Expo Router

## Struktur Folder

src/
├── app/
│ ├── \_layout.tsx
│ └── index.tsx
├── db/
│ └── database.ts
└── services/
└── noteService.ts

## Cara Menjalankan

1. Clone repository.
2. Install dependencies:

   npm install

3. Jalankan aplikasi:

   npx expo start

4. Scan QR Code menggunakan Expo Go.

## Bukti Pengujian

Tambahkan screenshot:

- Tampilan utama.
- Proses tambah catatan.
- Proses edit catatan.
- Proses hapus catatan.
- Data setelah aplikasi dibuka kembali.
