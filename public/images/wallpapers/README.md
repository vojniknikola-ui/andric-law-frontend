# Wallpaper Images

## 📁 Struktura

```
wallpapers/
├── original/          # Originalne slike (dodaj ovdje)
└── optimized/         # Optimizovane slike (generiše script)
    ├── small/         # 640px - Mobile
    ├── medium/        # 1024px - Tablet
    ├── large/         # 1920px - Desktop
    └── xlarge/        # 2560px - 4K
```

## 🚀 Kako Dodati Nove Slike

1. **Dodaj originalnu sliku** u `original/` folder
   - Format: JPG, PNG ili WebP
   - Preporučena veličina: 2560px+ širina
   - Ime: `hero-law-office.jpg` (ili bilo koje ime)

2. **Instaliraj Sharp** (ako nije već)
   ```bash
   npm install sharp --save-dev
   ```

3. **Pokreni optimizaciju**
   ```bash
   node scripts/optimize-images.js
   ```

4. **Proveri rezultate** u `optimized/` folderima

## 📊 Preporučene Karakteristike Slika

- **Dimenzije**: Minimum 2560px širina
- **Aspect Ratio**: 16:9 ili 21:9
- **Format**: JPG ili PNG (script konvertuje u WebP)
- **Kvalitet**: Visok (script će optimizovati)
- **Sadržaj**: 
  - Profesionalna kancelarija
  - Pravni dokumenti/knjige
  - Sarajevo panorama
  - Apstraktno/geometrija
- **Boje**: Neutralne (plava, siva, tamna)
- **Kontrast**: Dobar za bijeli tekst

## 🎨 Primjeri Dobrih Slika

1. Moderna kancelarija sa knjigama
2. Pravna vaga sa dokumentima
3. Sarajevo panorama (večernja)
4. Minimalistički geometrijski pattern
5. Tamna elegantna pozadina

## ⚠️ Napomena

- Ne commituj originalne slike (prevelike)
- Commituj samo optimizovane WebP verzije
- Proveri `.gitignore` za `original/` folder
