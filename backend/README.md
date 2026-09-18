# Backend Express MySQL2 Boilerplate

Selamat datang di **Backend Express MySQL2 Boilerplate** — sebuah kerangka kerja awal (boilerplate) backend yang dibangun menggunakan **Node.js, Express.js, dan MySQL2**.

Project ini dirancang sebagai media pembelajaran backend. File `README` ini disusun agar mudah dipahami oleh pemula sekaligus dapat dijadikan referensi teknis selama proses belajar.

---

## Daftar Isi

- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Arsitektur & Struktur Folder](#arsitektur--struktur-folder)
- [Cara Menjalankan Project](#cara-menjalankan-project)
- [Tips Belajar](#tips-belajar)

---

## Teknologi yang Digunakan

Project ini menggunakan beberapa *library* modern yang umum dipakai di industri:

| Library | Versi | Fungsi |
|---|---|---|
| [Express.js](https://expressjs.com/) | `^5.2.1` | Framework utama untuk membangun server dan REST API. |
| [MySQL2](https://www.npmjs.com/package/mysql2) | `^3.24.4` | Driver untuk menghubungkan Node.js dengan database MySQL. |
| [Zod](https://zod.dev/) | `^4.6.5` | Validasi data input dari client (memastikan format data sudah benar sebelum diproses). |
| [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) | `^3.0.3` | *Hashing* password sebelum disimpan ke database. Password tidak boleh disimpan dalam bentuk teks asli (*plaintext*). |
| [JSON Web Token (JWT)](https://jwt.io/) | `^9.0.3` | Autentikasi berbasis token. Setelah login berhasil, server menerbitkan token yang digunakan untuk mengakses endpoint yang dilindungi. |
| [Helmet](https://helmetjs.github.io/) | `^8.3.0` | Middleware keamanan yang mengatur HTTP headers untuk melindungi dari kerentanan umum. |
| [Express Rate Limit](https://www.npmjs.com/package/express-rate-limit) | `^8.7.0` | Membatasi jumlah *request* dari satu IP dalam rentang waktu tertentu untuk mencegah serangan *brute force*. |
| [Dotenv](https://www.npmjs.com/package/dotenv) | `^17.4.2` | Membaca konfigurasi dari file `.env` ke dalam `process.env`. |
| [Nodemon](https://nodemon.io/) | `^3.1.14` | (Dev) Me-restart server secara otomatis setiap kali ada perubahan file. |

---

## Arsitektur & Struktur Folder

Project ini mengimplementasikan **Layered Architecture** (arsitektur berlapis) yang memisahkan tanggung jawab setiap komponen secara tegas. Pola ini umum digunakan di lingkungan produksi karena membuat kode lebih mudah dibaca, diuji, dan dikembangkan.

```
backend-express-mysql2-boilerplate/
├── backend/
│   ├── src/
│   │   ├── config/         # Konfigurasi koneksi database dan pengaturan global lainnya.
│   │   ├── controllers/    # Menangani request masuk dan mengirim response. Tidak mengandung logika bisnis.
│   │   ├── middlewares/    # Fungsi perantara (cek JWT, rate limiting, error handler, dll).
│   │   ├── models/         # Definisi struktur data yang merepresentasikan tabel di database.
│   │   ├── repositories/   # Satu-satunya layer yang berinteraksi langsung dengan database (query SQL).
│   │   ├── routes/         # Mendefinisikan endpoint URL dan menghubungkannya ke controller yang tepat.
│   │   ├── services/       # Mengandung logika bisnis utama. Menjadi jembatan antara controller dan repository.
│   │   ├── utils/          # Fungsi-fungsi utilitas yang dapat digunakan ulang di seluruh bagian aplikasi.
│   │   ├── validations/    # Skema validasi Zod untuk setiap input endpoint.
│   │   └── server.js       # Entry point aplikasi. Inisialisasi Express, middleware, dan server.
│   ├── .env                # File variabel lingkungan (wajib dibuat, tidak di-commit ke Git).
│   └── package.json        # Metadata project, daftar dependensi, dan npm scripts.
└── package.json            # Package.json root (opsional, untuk tooling di level atas).
```

### Alur Pemrosesan Request

Setiap *request* dari client melewati lapisan-lapisan berikut secara berurutan:

```
Client Request
     |
     v
[ Middleware ]   --> Validasi token JWT, rate limiting, parsing JSON
     |
     v
[ Router ]       --> Menentukan handler yang sesuai berdasarkan URL dan HTTP method
     |
     v
[ Controller ]   --> Menerima request, memanggil service, mengembalikan response
     |
     v
[ Service ]      --> Menjalankan logika bisnis (kalkulasi, transformasi data, dll)
     |
     v
[ Repository ]   --> Mengeksekusi query ke database MySQL
     |
     v
[ Database ]     --> MySQL
```

---

## Cara Menjalankan Project

### Prasyarat

Pastikan perangkat lunak berikut sudah terinstal di komputer:

- **Node.js** versi 18 ke atas — [nodejs.org](https://nodejs.org/)
- **MySQL** — [mysql.com](https://www.mysql.com/)
- **Git** — [git-scm.com](https://git-scm.com/)

### Langkah Instalasi

**1. Clone repository**

```bash
git clone https://github.com/username/backend-express-mysql2-boilerplate.git
cd backend-express-mysql2-boilerplate
```

**2. Masuk ke folder backend dan install dependensi**

```bash
cd backend
npm install
```

**3. Buat dan konfigurasi file `.env`**

Buat file bernama `.env` di dalam folder `backend/`, lalu isi dengan konfigurasi berikut:

```env
# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password_mysql_kamu
DB_NAME=nama_database_kamu

# Authentication
JWT_SECRET=ganti_dengan_string_panjang_dan_acak
```

> **Catatan:** File `.env` sudah terdaftar di `.gitignore` sehingga tidak akan ter-*commit* ke repository. Jangan pernah menyimpan kredensial sensitif di dalam kode.

**4. Jalankan server**

Untuk mode development (dengan *hot reload* via Nodemon):

```bash
npm run dev
```

Untuk mode production:

```bash
npm start
```

Jika konfigurasi berhasil, terminal akan menampilkan:

```
Server berjalan di http://localhost:3000
```

---

## Tips Belajar

### Mulai dari Entry Point

Buka `src/server.js` terlebih dahulu. Perhatikan bagaimana:

- `express()` diinisialisasi menjadi objek `app`.
- Middleware global didaftarkan menggunakan `app.use()`.
- Route diregistrasi dan dipetakan ke prefix URL tertentu.
- Server dijalankan dengan `app.listen()`.

### Ikuti Alur Request Secara Vertikal

Pilih satu fitur, misalnya "Login", lalu telusuri kodenya dari atas ke bawah:

```
routes/authRoutes.js  -->  controllers/authController.js  -->  services/authService.js  -->  repositories/userRepository.js
```

Dengan cara ini, kamu akan memahami bagaimana sebuah request diolah dari ujung ke ujung (*end-to-end*).

### Gunakan `console.log` untuk Debugging

Jika tidak yakin isi sebuah variabel, tambahkan `console.log()` untuk memeriksa nilainya di terminal. Ini adalah teknik debugging paling fundamental yang tetap digunakan oleh developer berpengalaman.

```javascript
console.log("Isi variabel user:", user);
```

### Baca Dokumentasi Resmi

Dokumentasi resmi adalah sumber belajar paling akurat:

- Express.js: [expressjs.com/en/api.html](https://expressjs.com/en/api.html)
- MySQL2: [sidorares.github.io/node-mysql2](https://sidorares.github.io/node-mysql2/docs)
- Zod: [zod.dev](https://zod.dev/)
- JWT: [jwt.io/introduction](https://jwt.io/introduction/)

---

## Lisensi

Didistribusikan untuk keperluan pembelajaran. Bebas digunakan dan dimodifikasi sesuai kebutuhan.
