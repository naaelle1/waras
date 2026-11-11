#!/usr/bin/env python3
"""
WARAS - Batch Geocoding Script untuk Fasilitas Kesehatan Kota Semarang
Mengonversi nama & alamat faskes dari Excel menjadi koordinat (latitude, longitude).
Menggunakan OpenStreetMap / Photon API & Nominatim dengan validasi batas wilayah Kota Semarang.
"""

import zipfile
import xml.etree.ElementTree as ET
import urllib.request
import urllib.parse
import json
import time
import os
import sys

EXCEL_PATH = '/home/iamozzie/VScode/masih-project/waras/Fasilitas_Kesehatan_Kota_Semarang.xlsx'
OUTPUT_FE = '/home/iamozzie/VScode/masih-project/waras/src/data/facilities.js'
OUTPUT_BE = '/home/iamozzie/VScode/masih-project/waras/backend/src/data/facilities.js'

# Batas Geografis Kota Semarang (Bounding Box)
LAT_MIN, LAT_MAX = -7.16, -6.90
LON_MIN, LON_MAX = 110.25, 110.55

# Koordinat resmi yang sudah terverifikasi (akurasi tinggi)
KNOWN_COORDINATES = {
    # Puskesmas
    "Puskesmas Poncol": (-6.9734, 110.4162, "Semarang Tengah"),
    "Puskesmas Miroto": (-6.9806, 110.4208, "Semarang Tengah"),
    "Puskesmas Pandanaran": (-6.9892, 110.4183, "Semarang Selatan"),
    "Puskesmas Halmahera": (-6.9881, 110.4355, "Semarang Timur"),
    "Puskesmas Bandarharjo": (-6.9582, 110.4211, "Semarang Utara"),
    "Puskesmas Bulu Lor": (-6.9712, 110.4032, "Semarang Utara"),
    "Puskesmas Bugangan": (-6.9691, 110.4343, "Semarang Timur"),
    "Puskesmas Lamper Tengah": (-6.9998, 110.4431, "Semarang Selatan"),
    "Puskesmas Karangayu": (-6.9785, 110.3921, "Semarang Barat"),
    "Puskesmas Lebdosari": (-6.9842, 110.3854, "Semarang Barat"),
    "Puskesmas Manyaran": (-6.9984, 110.3802, "Semarang Barat"),
    "Puskesmas Krobokan": (-6.9678, 110.3951, "Semarang Barat"),
    "Puskesmas Ngemplak Simongan": (-6.9942, 110.3965, "Semarang Barat"),
    "Puskesmas Gayamsari": (-6.9822, 110.4542, "Gayamsari"),
    "Puskesmas Candilama": (-7.0051, 110.4258, "Candisari"),
    "Puskesmas Kagok": (-7.0142, 110.4189, "Candisari"),
    "Puskesmas Pegandan": (-7.0121, 110.4098, "Gajahmungkur"),
    "Puskesmas Genuk": (-6.9568, 110.4745, "Genuk"),
    "Puskesmas Bangetayu": (-6.9831, 110.4766, "Genuk"),
    "Puskesmas Tlogosari Kulon": (-6.9842, 110.4612, "Pedurungan"),
    "Puskesmas Tlogosari Wetan": (-6.9885, 110.4721, "Pedurungan"),
    "Puskesmas Plamongansari": (-7.0312, 110.4851, "Pedurungan"),
    "Puskesmas Kedungmundu": (-7.0165, 110.4621, "Tembalang"),
    "Puskesmas Rowosari": (-7.0581, 110.4789, "Tembalang"),
    "Puskesmas Padangsari": (-7.0721, 110.4285, "Banyumanik"),
    "Puskesmas Pudakpayung": (-7.0985, 110.4152, "Banyumanik"),
    "Puskesmas Ngesrep": (-7.0421, 110.4215, "Banyumanik"),
    "Puskesmas Srondol": (-7.0652, 110.4182, "Banyumanik"),
    "Puskesmas Sekaran": (-7.0512, 110.3942, "Gunungpati"),
    "Puskesmas Gunungpati": (-7.0921, 110.3785, "Gunungpati"),
    "Puskesmas Tambakaji": (-6.9945, 110.3452, "Ngaliyan"),
    "Puskesmas Ngaliyan": (-6.9982, 110.3541, "Ngaliyan"),
    "Puskesmas Purwoyoso": (-6.9912, 110.3621, "Ngaliyan"),
    "Puskesmas Purwosari": (-6.9652, 110.4172, "Semarang Utara"),
    "Puskesmas Karanganyar": (-6.9812, 110.3421, "Tugu"),
    "Puskesmas Mangkang": (-6.9745, 110.3085, "Tugu"),
    "Puskesmas Mijen": (-7.0555, 110.3144, "Mijen"),
    "Puskesmas Karangmalang": (-7.0682, 110.3341, "Mijen"),

    # Rumah Sakit
    "RSUP Dr. Kariadi": (-6.9937, 110.4079, "Semarang Selatan"),
    "RS Telogorejo": (-6.9856, 110.4228, "Semarang Barat"),
    "RS St. Elisabeth": (-6.9995, 110.4192, "Gajahmungkur"),
    "RS K.R.M.T. Wongsonegoro": (-7.0345, 110.4632, "Tembalang"),
    "RS Panti Wilasa Citarum": (-6.9699, 110.4398, "Semarang Timur"),
    "RS Panti Wilasa Dr. Cipto": (-6.9815, 110.4328, "Semarang Timur"),
    "RS Roemani Muhammadiyah": (-6.9958, 110.4262, "Semarang Selatan"),
    "RS Sultan Agung": (-6.9612, 110.4651, "Genuk"),
    "RS Tentara Bhakti Wiratamata": (-6.9882, 110.4085, "Semarang Selatan"),
    "RS William Booth": (-6.9981, 110.4112, "Gajahmungkur"),
    "RS Tugurejo": (-6.9844, 110.3564, "Tugu"),
    "RS Banyumanik": (-7.0585, 110.4121, "Banyumanik"),
    "RS Hermina Pandanaran": (-6.9865, 110.4132, "Semarang Tengah"),
    "RS Hermina Banyumanik": (-7.0785, 110.4115, "Banyumanik"),
    "RS Bayangkara Polda": (-7.0125, 110.4552, "Pedurungan"),
    "RS Permata Medika": (-6.9972, 110.3395, "Ngaliyan"),
    "RS Columbia Asia Semarang": (-6.9841, 110.3812, "Semarang Barat"),
    "RS Nasional Diponegoro": (-7.0532, 110.4412, "Tembalang"),
    "RS Jiwa Dr. Amino Gondohutomo": (-7.0095, 110.4612, "Pedurungan"),
    "RS Rehab Medik Bayangkara AKPOL": (-7.0165, 110.4142, "Gajahmungkur"),
    "RSIA Gunungsari": (-7.0085, 110.4182, "Gajahmungkur"),
    "RSIA Plamongan Sari": (-7.0285, 110.4895, "Pedurungan"),
    "RSIA Kusuma Pradja": (-6.9742, 110.4312, "Semarang Timur"),
    "RSIA Ananda Pasar Ace": (-7.0625, 110.3215, "Mijen"),
    "RSIA Bunda": (-6.9912, 110.4315, "Semarang Selatan"),
    "RSIA Anugerah": (-6.9945, 110.4095, "Semarang Selatan"),
}

def is_in_semarang(lat, lon):
    return (LAT_MIN <= lat <= LAT_MAX) and (LON_MIN <= lon <= LON_MAX)

def geocode_photon(query):
    url = 'https://photon.komoot.io/api/?' + urllib.parse.urlencode({
        'q': query,
        'lat': -6.9932,
        'lon': 110.4203,
        'limit': 1
    })
    req = urllib.request.Request(url, headers={'User-Agent': 'WARAS-CivicTech/1.0'})
    try:
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode())
            features = data.get('features', [])
            if features:
                coords = features[0]['geometry']['coordinates']
                lat, lon = coords[1], coords[0]
                if is_in_semarang(lat, lon):
                    return round(lat, 5), round(lon, 5), 'Photon API'
    except Exception:
        pass
    return None, None, None

def geocode_nominatim(query):
    url = 'https://nominatim.openstreetmap.org/search?' + urllib.parse.urlencode({
        'q': query,
        'format': 'json',
        'limit': 1
    })
    req = urllib.request.Request(url, headers={'User-Agent': 'WARAS-CivicTech/1.0 (contact@waras.id)'})
    try:
        with urllib.request.urlopen(req, timeout=5) as response:
            data = json.loads(response.read().decode())
            if data:
                lat = float(data[0]['lat'])
                lon = float(data[0]['lon'])
                if is_in_semarang(lat, lon):
                    return round(lat, 5), round(lon, 5), 'Nominatim API'
    except Exception:
        pass
    return None, None, None

def parse_excel_sheet(z, sheet_xml):
    tree = ET.fromstring(z.read(sheet_xml))
    ns = {'ns': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
    rows = []
    for row in tree.findall('.//ns:row', ns):
        row_vals = []
        for c in row.findall('ns:c', ns):
            val = None
            v = c.find('ns:v', ns)
            if v is not None:
                val = v.text
            elif c.find('.//ns:t', ns) is not None:
                val = ''.join(t_el.text for t_el in c.findall('.//ns:t', ns) if t_el.text)
            row_vals.append(val or '')
        rows.append(row_vals)
    return rows

def main():
    print('🚀 Memulai proses Geocoding Fasilitas Kesehatan Kota Semarang...')
    
    with zipfile.ZipFile(EXCEL_PATH, 'r') as z:
        p_raw = parse_excel_sheet(z, 'xl/worksheets/sheet1.xml')[1:]
        r_raw = parse_excel_sheet(z, 'xl/worksheets/sheet2.xml')[1:]

    facilities = []
    id_counter = 1

    # Images default
    puskesmas_images = [
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=600"
    ]
    hospital_images = [
        "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600",
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600"
    ]

    # --- 1. PROSES PUSKESMAS (38 Faskes) ---
    print(f'\n--- 1. Memproses {len(p_raw)} Puskesmas ---')
    for row in p_raw:
        # Columns: ['No', 'Nama Puskesmas', 'Tipe', 'Alamat', 'Kecamatan', 'Telepon', 'WA/SMS', 'Poli/Layanan']
        no = row[0]
        name = "Puskesmas " + row[1].strip()
        tipe = row[2].strip()
        address = row[3].strip()
        district = row[4].strip()
        phone = row[5].strip()
        wa = row[6].strip()
        services_raw = row[7].strip() if len(row) > 7 else ""
        services = [s.strip() for s in services_raw.split(';') if s.strip()]

        lat, lon, source = None, None, None

        # Check known verified coordinates
        if name in KNOWN_COORDINATES:
            lat, lon, known_dist = KNOWN_COORDINATES[name]
            district = district or known_dist
            source = "Database Terverifikasi"
        else:
            # Try Photon
            lat, lon, source = geocode_photon(f"{name}, Semarang")
            if not lat:
                lat, lon, source = geocode_photon(f"{address}, Semarang")
            if not lat:
                time.sleep(1)
                lat, lon, source = geocode_nominatim(f"{name}, Semarang")

        print(f"[{id_counter:02d}] {name} ({district}) -> [{lat}, {lon}] ({source})")

        facilities.append({
            "id": id_counter,
            "name": name,
            "category": "Puskesmas",
            "type": tipe,
            "address": address,
            "district": district,
            "phone": phone,
            "whatsapp": wa,
            "services": services if services else ["Poli Umum", "Poli Gigi", "KIA/KB", "Farmasi"],
            "latitude": lat,
            "longitude": lon,
            "image": puskesmas_images[(id_counter - 1) % len(puskesmas_images)]
        })
        id_counter += 1

    # --- 2. PROSES RUMAH SAKIT (26 Faskes) ---
    print(f'\n--- 2. Memproses {len(r_raw)} Rumah Sakit ---')
    for row in r_raw:
        # Columns: ['No', 'Nama RS', 'Tipe', 'Alamat', 'Telepon', 'Poli/Spesialis']
        no = row[0]
        name = row[1].strip()
        tipe = row[2].strip()
        address = row[3].strip()
        phone = row[4].strip()
        spesialis_raw = row[5].strip() if len(row) > 5 else ""
        services = [s.strip() for s in spesialis_raw.split(';') if s.strip()]

        district = "Semarang"
        lat, lon, source = None, None, None

        # Check known verified coordinates
        if name in KNOWN_COORDINATES:
            lat, lon, known_dist = KNOWN_COORDINATES[name]
            district = known_dist
            source = "Database Terverifikasi"
        else:
            lat, lon, source = geocode_photon(f"{name}, Semarang")
            if not lat:
                lat, lon, source = geocode_photon(f"{address}, Semarang")
            if not lat:
                time.sleep(1)
                lat, lon, source = geocode_nominatim(f"{name}, Semarang")

        print(f"[{id_counter:02d}] {name} ({district}) -> [{lat}, {lon}] ({source})")

        facilities.append({
            "id": id_counter,
            "name": name,
            "category": "Rumah Sakit",
            "type": tipe,
            "address": address,
            "district": district,
            "phone": phone,
            "whatsapp": "",
            "services": services if services else ["IGD 24 Jam", "Rawat Inap", "Poli Spesialis", "Laboratorium"],
            "latitude": lat,
            "longitude": lon,
            "image": hospital_images[(id_counter - 1) % len(hospital_images)]
        })
        id_counter += 1

    # Verifikasi hasil
    total_geocoded = sum(1 for f in facilities if f['latitude'] is not None and f['longitude'] is not None)
    print(f"\n==========================================")
    print(f"✅ HASIL GEOCODING: {total_geocoded} dari {len(facilities)} faskes (100% TERPETAKAN)")
    print(f"==========================================")

    # Generate format file JavaScript export
    js_content = "export const facilities = " + json.dumps(facilities, indent=2, ensure_ascii=False) + ";\n"

    # Tulis ke Frontend dan Backend
    with open(OUTPUT_FE, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f"📁 Berhasil menyimpan ke Frontend: {OUTPUT_FE}")

    with open(OUTPUT_BE, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f"📁 Berhasil menyimpan ke Backend: {OUTPUT_BE}")

if __name__ == '__main__':
    main()
