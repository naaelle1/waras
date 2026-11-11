#!/usr/bin/env python3
import json
import urllib.parse

FACILITIES_FILE = '/home/iamozzie/VScode/masih-project/waras/src/data/facilities.js'
OUTPUT_FILE = '/home/iamozzie/VScode/masih-project/waras/DAFTAR_FASILITAS_KESEHATAN_FOTO.md'

with open(FACILITIES_FILE, 'r', encoding='utf-8') as f:
    text = f.read()

json_str = text.split('export const facilities = ')[1].strip().rstrip(';')
facilities = json.loads(json_str)

puskesmas = [f for f in facilities if f['category'] == 'Puskesmas']
rumahsakit = [f for f in facilities if f['category'] == 'Rumah Sakit']

md = []
md.append('# 📋 Daftar Fasilitas Kesehatan Kota Semarang (Checklist Pencarian Foto)')
md.append('')
md.append('> **Catatan Penggunaan:**')
md.append('> - Beri tanda silang `[x]` pada nomor faskes yang sudah kamu temukan fotonya.')
md.append('> - Tempelkan link gambar (URL online atau path lokal misal `/src/assets/facilities/...`) pada bagian **Link Foto Baru**.')
md.append('> - Kamu bisa klik langsung link **[🗺️ Buka di Google Maps]** atau **[🔍 Cari di Google Images]** untuk langsung membuka foto gedung asli di Google.')
md.append('')
md.append('### 📊 Ringkasan Data Faskes')
md.append(f'- **Total Puskesmas:** {len(puskesmas)} Fasilitas')
md.append(f'- **Total Rumah Sakit:** {len(rumahsakit)} Fasilitas')
md.append(f'- **Total Keseluruhan:** {len(facilities)} Fasilitas')
md.append('')
md.append('---')
md.append('')
md.append('## 🏥 BAGIAN 1: PUSKESMAS KOTA SEMARANG (38 Faskes)')
md.append('')

for f in puskesmas:
    query = f"{f['name']} {f['address']} Kota Semarang"
    q_encoded = urllib.parse.quote_plus(query)
    gmaps_url = f"https://www.google.com/maps/search/?api=1&query={q_encoded}"
    gimages_url = f"https://www.google.com/search?tbm=isch&q={q_encoded}"

    md.append(f"### [ ] No. {f['id']:02d} — {f['name']}")
    md.append(f"- **Tipe Pelayanan:** {f['type']}")
    md.append(f"- **Kecamatan:** {f['district']}")
    md.append(f"- **Alamat Lengkap:** {f['address']}")
    md.append(f"- **Koordinat Peta:** `{f['latitude']}, {f['longitude']}`")
    md.append(f"- **Kontak:** Telepon: {f['phone']} | WA: {f['whatsapp']}")
    md.append(f"- **Layanan Utama:** {', '.join(f['services'][:5])}...")
    md.append(f"- **Pencarian Cepat:** [🗺️ Buka di Google Maps]({gmaps_url}) | [🔍 Cari di Google Images]({gimages_url})")
    md.append(f"- **Foto Saat Ini:** `{f['image']}`")
    md.append("- **Foto Baru:** `\"\"`")
    md.append("")

md.append("---")
md.append("")
md.append("## 🏢 BAGIAN 2: RUMAH SAKIT KOTA SEMARANG (26 Faskes)")
md.append("")

for f in rumahsakit:
    query = f"{f['name']} {f['address']} Kota Semarang"
    q_encoded = urllib.parse.quote_plus(query)
    gmaps_url = f"https://www.google.com/maps/search/?api=1&query={q_encoded}"
    gimages_url = f"https://www.google.com/search?tbm=isch&q={q_encoded}"

    md.append(f"### [ ] No. {f['id']:02d} — {f['name']}")
    md.append(f"- **Tipe RS:** {f['type']}")
    md.append(f"- **Kecamatan / Wilayah:** {f['district']}")
    md.append(f"- **Alamat Lengkap:** {f['address']}")
    md.append(f"- **Koordinat Peta:** `{f['latitude']}, {f['longitude']}`")
    md.append(f"- **Kontak Telepon:** {f['phone']}")
    md.append(f"- **Layanan/Spesialis:** {', '.join(f['services'][:4])}...")
    md.append(f"- **Pencarian Cepat:** [🗺️ Buka di Google Maps]({gmaps_url}) | [🔍 Cari di Google Images]({gimages_url})")
    md.append(f"- **Foto Saat Ini:** `{f['image']}`")
    md.append("- **Foto Baru:** `\"\"`")
    md.append("")

with open(OUTPUT_FILE, 'w', encoding='utf-8') as out:
    out.write('\n'.join(md))

print(f"✅ Selesai! Berhasil membuat {OUTPUT_FILE} ({len(md)} baris).")
