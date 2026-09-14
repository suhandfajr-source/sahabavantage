# Protokol Gerbang Tiga Lapis (Three-Tier Gatekeeping)
**SmoothDev Standard Operating Procedure & Deployment Protocol**

- **Proyek:** SmoothDev Web Applications
- **Project Manager:** Abu Sena
- **Gerbang 1 (Staging PIC):** Kevin
- **Gerbang 2 (Production PIC):** Mas Dayu
- **Eksplorasi / Vibe Coding PIC:** Pak Yahya & Staf
- **Versi:** 1.1 (AI-Assisted Deployment Authorization) — Efektif: September 2026

> **Changelog v1.1:** Kebijakan diperbarui — AI assistant kini **BOLEH mengeksekusi deployment ke Staging/Production atas izin eksplisit Gatekeeper** (Kevin / Mas Dayu). Gatekeeper tetap pemilik keputusan rilis; AI bertindak sebagai eksekutor yang didelegasikan. Rincian lengkap di **Bagian 5**.

---

## 1. Latar Belakang & Urgensi
Protokol ini diberlakukan secara ketat menyusul insiden pada server produksi (VPS Contabo) akibat praktik koding/vibe coding langsung di server produksi oleh pihak non-teknis. Mulai saat ini, akses SSH / SFTP / IP langsung ke server staging maupun produksi **bersifat terkendali**: hanya Gatekeeper yang berwenang — atau AI assistant yang mengeksekusi deployment **atas izin eksplisit Gatekeeper** (Bagian 5) — yang boleh menyentuh server, dan semua perubahan kode wajib melewati mekanisme filtering tiga lapis (GitHub branching).

---

## 2. Struktur Branch & Hak Akses GitHub

| Branch | Pengawas / PIC | Target Environment | Deskripsi & Aturan Hak Akses |
| :--- | :--- | :--- | :--- |
| **`explore`** | Pak Yahya & Staf | Lokal (*Local Machine*) | Tempat untuk *vibe coding*, eksplorasi fitur, dan eksperimen di komputer lokal. Bebas diotak-atik tanpa risiko merusak server. |
| **`dev`** | **Kevin** (Gerbang 1) | VM Kantor (*HKU VM via Proxmox*) | **Staging environment** (akses internal via Tailscale & Cloudflare Tunnel). **Hanya Kevin** yang berhak menyetujui review, merge, dan push ke branch ini; eksekusi dapat didelegasikan ke AI assistant atas izinnya (Bagian 5). |
| **`main`** | **Mas Dayu** (Gerbang 2) | VPS Contabo (*Production*) | **Production environment** live ke publik. **Hanya Mas Dayu** yang berhak menyetujui review, smoke test, merge, dan push ke branch ini; eksekusi dapat didelegasikan ke AI assistant atas izinnya (Bagian 5). |

---

## 3. Alur Kerja Deployment (Step-by-Step)

```
[Pak Yahya & Staf] 
       │ (Koding di Local & Push ke branch `explore`)
       ▼
   [Branch: explore]
       │
       ├─► (Izin & Request Testing ke Kevin)
       ▼
  [Kevin (Gatekeeper 1)]
       │ 1. Clone/Pull `explore` ke Local Kevin
       │ 2. Testing Lokal
       │ 3. Push/Merge ke `dev` ──► [Auto-Deploy / Deploy ke VM Kantor]
       │ 4. Re-testing di VM Kantor
       ▼
 [Kevin Oper ke Mas Dayu]
       ▼
  [Mas Dayu (Gatekeeper 2)]
       │ 1. Clone/Pull `dev` ke Local Mas Dayu
       │ 2. Testing Lokal & Smoke Testing di VM Kantor
       │ 3. Push/Merge ke `main` ──► [Auto-Deploy / Deploy ke VPS Contabo]
       ▼
[LIVE ON PRODUCTION (VPS Contabo)]
```

### **Tahap 1: Eksplorasi Lokal (Pak Yahya & Staf)**
1. Seluruh proses coding dilakukan di mesin lokal masing-masing pada branch `explore`.
2. Setelah fitur berhasil berjalan dengan baik di lokal, lakukan `git commit` dan `git push` ke branch `explore` di GitHub.
3. Pak Yahya atau staf **wajib memberitahu Kevin** untuk meminta review dan kelayakan naik ke staging.

### **Tahap 2: Uji Coba & Deploy Staging (Kevin / Gerbang 1)**
1. Kevin melakukan pull/clone branch `explore` terbaru ke lingkungan lokalnya.
2. Kevin melakukan pengujian (testing) awal secara lokal.
3. Jika aman, Kevin melakukan merge/push ke branch `dev`.
4. Sistem / Kevin men-deploy kode dari branch `dev` ke VM Kantor (Proxmox via Tailscale & Cloudflare Tunnel).
5. Kevin menguji kembali fungsionalitas di VM Kantor. Jika sukses, ia berkoordinasi dengan Mas Dayu.

### **Tahap 3: Validasi Akhir & Deploy Produksi (Mas Dayu / Gerbang 2)**
1. Mas Dayu melakukan pull/clone branch `dev` ke lokalnya untuk pengujian menyeluruh.
2. Mas Dayu melakukan uji coba langsung (*smoke testing*) pada aplikasi yang sedang aktif berjalan di VM Kantor.
3. Jika validasi lolos dan tidak ada error, Mas Dayu melakukan push/merge ke branch `main`.
4. Perubahan terintegrasi langsung dan di-deploy ke server produksi resmi di VPS Contabo.
5. Mas Dayu memastikan aplikasi live di VPS Contabo berjalan dengan normal.

---

## 4. Standard Operating Procedure (SOP) & Golden Rules

1. **Controlled Server Access:** Pak Yahya dan staf tidak memiliki akses SSH, SFTP, maupun IP langsung ke VPS Contabo (Production) dan VM Kantor HKU. Seluruh deployment melewati sistem git push dan ditangani oleh para gatekeeper — atau oleh AI assistant yang mengeksekusi atas izin eksplisit gatekeeper (Bagian 5).
2. **Strict Merge Permission:**
   - Approval & merge ke branch `dev` adalah kewenangan **Kevin**.
   - Approval & merge ke branch `main` adalah kewenangan **Mas Dayu**.
   - Eksekusi merge/push dapat didelegasikan ke AI assistant **hanya dengan izin eksplisit** sesuai Bagian 5.
3. **Komunikasi & Notifikasi Wajib:** Setiap kali fitur baru di-push ke branch `explore`, pihak pengembang wajib berkoordinasi dengan Kevin. Dilarang keras berasumsi atau meminta rilis instan tanpa melalui proses review bertahap.

---

## 5. AI-Assisted Deployment — Kebijakan Izin (v1.1)

AI assistant (Claude, Copilot, Cursor, Windsurf, Antigravity, dll.) **BOLEH mengeksekusi deployment** — termasuk git merge/push ke `dev`/`main`, build, migrasi database, reload/restart PM2, akses SSH/SFTP, dan health check — dengan syarat dan ketentuan berikut.

### 5.1 Matriks Izin (Authorization Matrix)

| Target Environment | Izin diberikan oleh |
| :--- | :--- |
| **Staging** (VM Kantor HKU, branch `dev`) | **Kevin** (Gerbang 1) |
| **Production** (VPS Contabo, branch `main`) | **Mas Dayu** (Gerbang 2) |

### 5.2 Syarat Izin
1. **Eksplisit & Spesifik:** Izin harus dinyatakan langsung oleh Gatekeeper yang berwenang (mis. dalam sesi kerja), dengan menyebut **project, environment tujuan, dan lingkup aksi**. Izin bersifat per-aksi deployment — **izin permanen/blanket tidak sah**.
2. **Ambigu → Tanya Ulang:** Jika sumber izin, environment, atau lingkup tidak jelas, AI WAJIB berhenti dan meminta konfirmasi sebelum mengeksekusi apa pun.
3. **Gatekeeper pemilik keputusan, AI eksekutor:** Alur Three-Tier (`explore` → `dev` → `main`) tetap berlaku. AI hanya pelaksana yang didelegasikan oleh Gatekeeper, bukan pengambil keputusan rilis.

### 5.3 Kewajiban Saat & Setelah Eksekusi
1. **Log Wajib:** Setiap deployment yang dieksekusi AI wajib dicatat (pemberi izin, waktu, apa yang dideploy, hasil) — misalnya di folder dokumentasi/log deployment project (contoh: `bmad-output/`).
2. **Verifikasi Pasca-Deploy:** Wajib menjalankan health check / smoke test setelah deploy, lalu melaporkan hasilnya kembali ke Gatekeeper pemberi izin.
3. **Rollback:** Bila deployment gagal, AI wajib mengembalikan server ke kondisi kerja sehat terakhir (rollback / restart versi sebelumnya) dan segera melapor.
4. **Higienitas Kredensial:** Kredensial server WAJIB disimpan di environment variable / file lokal yang tidak di-commit. Dilarang keras menuliskan kredensial di dalam repositori.
