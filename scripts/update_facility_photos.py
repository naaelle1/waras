import json
import re

md_file = "DAFTAR_FASILITAS_KESEHATAN_FOTO.md"
fe_file = "src/data/facilities.js"
be_file = "backend/src/data/facilities.js"

photo_map = {}
current_id = None

with open(md_file, "r", encoding="utf-8") as f:
    for line in f:
        # Match heading: ### [x] No. 01 — Puskesmas Poncol
        id_match = re.search(r"###\s*\[[ xX]?\]\s*No\.\s*(\d+)", line)
        if id_match:
            current_id = int(id_match.group(1))

        # Match photo line: - **Foto Baru:** "https://..." or `...` or ""
        if "- **Foto Baru:**" in line:
            parts = line.split("- **Foto Baru:**")
            if len(parts) > 1 and current_id is not None:
                val = parts[1].strip()
                # Clean up quotes and backticks
                val = val.strip('"`').strip()
                if val and val != '""' and len(val) > 5:
                    if "bandarharjo" in val.lower() and not val.startswith("http"):
                        val = "https://dinkes.semarangkota.go.id/asset/4x3/puskesmas/bandarharjo.jpg"
                    photo_map[current_id] = val

print(f"Total photos found: {len(photo_map)}")
for k in sorted(photo_map.keys()):
    print(f"No. {k:02d}: {photo_map[k][:70]}...")

# Read existing frontend facilities
with open(fe_file, "r", encoding="utf-8") as f:
    text = f.read()

json_str = text.split("export const facilities = ")[1].strip().rstrip(";")
facilities = json.loads(json_str)

updated_count = 0
for fac in facilities:
    fac_id = fac["id"]
    if fac_id in photo_map:
        fac["image"] = photo_map[fac_id]
        updated_count += 1

print(f"Successfully updated {updated_count} facilities in dataset.")

output_code = "export const facilities = " + json.dumps(facilities, indent=2, ensure_ascii=False) + ";\n"

with open(fe_file, "w", encoding="utf-8") as f:
    f.write(output_code)

with open(be_file, "w", encoding="utf-8") as f:
    f.write(output_code)

print("Saved to src/data/facilities.js and backend/src/data/facilities.js.")
