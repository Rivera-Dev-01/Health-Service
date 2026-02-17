# Philippine Health Information System

A comprehensive health information platform providing detailed information about the 20 priority diseases in the Philippines, with full English and Tagalog language support.

## Features

- **20 Priority Diseases**: Comprehensive database covering the most critical health conditions in the Philippines
- **Bilingual Support**: Full English and Tagalog translations for all disease information
- **Detailed Information**: Each disease includes:
  - Overview and description
  - Symptoms (with visual badges)
  - Causes
  - Prevention tips
  - Treatment information
  - When to see a doctor
  - Affected groups
- **Modern UI**: Clean, responsive design with smooth animations
- **Search & Filter**: Easy navigation with category filters and search functionality
- **Real-time Language Toggle**: Switch between English and Tagalog instantly

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Framer Motion** - Smooth animations
- **Lucide Icons** - Beautiful icon library

### Backend
- **Supabase** - PostgreSQL database with real-time capabilities
- **Python** - Data ingestion scripts for Google Colab

## Project Structure

```
.
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── diseases/          # Disease listing and detail pages
│   │   │   ├── api/                # API routes
│   │   │   └── ...
│   │   ├── components/             # Reusable UI components
│   │   └── lib/
│   │       ├── diseases.ts         # Disease data fetching logic
│   │       ├── language-context.tsx # Language state management
│   │       └── supabase.ts         # Supabase client
│   └── ...
├── Health.txt                      # English disease data (20 diseases)
├── Tagalog_Translations.txt        # Tagalog translations (diseases 1-10)
├── Tagalog_Part2_Diseases11-15.txt # Tagalog translations (diseases 11-15)
├── Tagalog_Part3_Diseases16-20.txt # Tagalog translations (diseases 16-20)
├── txt_ingestion_pipeline.py      # Script to ingest English data
├── translation_ingestion_fixed.py  # Script to ingest Tagalog translations
└── TRANSLATION_SCHEMA.sql          # Database schema
```

## Database Schema

### `diseases` Table
Stores English disease information with fields:
- Basic info: name, slug, category, icon
- Descriptions: short_description, description, overview
- Medical info: symptoms, causes, prevention, treatment
- Additional: when_to_see_doctor, affected_groups, severity
- Metadata: source, source_url, timestamps

### `diseases_translation` Table
Stores translations with fields:
- Reference: disease_id (foreign key), language_code
- Translated content: name, slug, descriptions, symptoms, causes, prevention, treatment
- Same structure as diseases table for consistency

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Google Colab (for data ingestion)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Set up environment variables
Create `frontend/.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Set up the database
- Run `TRANSLATION_SCHEMA.sql` in your Supabase SQL Editor
- This creates both `diseases` and `diseases_translation` tables

5. Ingest the data (using Google Colab)
```python
# Upload and run txt_ingestion_pipeline.py
# Upload Health.txt when prompted

# Then upload and run translation_ingestion_fixed.py
# Upload all 3 Tagalog translation files when prompted
```

6. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Data Ingestion

### English Disease Data
Use `txt_ingestion_pipeline.py` in Google Colab:
- Parses `Health.txt` containing 20 diseases
- Splits by `================` separators
- Handles pipe-separated arrays for symptoms, causes, prevention, treatment
- Uploads to `diseases` table

### Tagalog Translations
Use `translation_ingestion_fixed.py` in Google Colab:
- Parses 3 Tagalog translation files
- Maps translations to existing diseases via slug
- Handles both pipe-separated and comma-separated arrays
- Uploads to `diseases_translation` table with language_code='tl'

## Language System

The application uses React Context for global language state:
- `LanguageContext` provides language state and toggle function
- Language preference persists in localStorage
- All pages respond to language changes instantly
- `getDisplayText()` helper function handles fallback to English

## 20 Priority Diseases

1. Ischemic Heart Disease
2. Cerebrovascular Disease (Stroke)
3. Cancer (Neoplasms)
4. Diabetes Mellitus
5. Hypertension
6. Chronic Obstructive Pulmonary Disease (COPD)
7. Chronic Kidney Disease
8. Asthma
9. Thyroid Disorders
10. Systemic Lupus Erythematosus (Lupus)
11. Pneumonia
12. Tuberculosis (TB)
13. Dengue
14. Acute Respiratory Infections (ARI)
15. Diarrheal Diseases
16. Influenza
17. Hepatitis A
18. Leptospirosis
19. Measles
20. Skin Diseases & Infections

## Development Notes

- All disease data is stored in TXT files with structured format
- Symptoms, causes, prevention, and treatment are pipe-separated (`|`)
- The ingestion scripts handle parsing and uploading to Supabase
- Frontend fetches data via Supabase client with automatic translation support
- Language toggle works globally across all pages

## Future Enhancements

- [ ] Add more languages (Cebuano, Ilocano, etc.)
- [ ] Implement user accounts and saved diseases
- [ ] Add health tips and news section
- [ ] Mobile app version
- [ ] Offline support with PWA
- [ ] Admin panel for content management

## License

This project is developed for public health education in the Philippines.

## Acknowledgments

- Disease information sourced from WHO, DOH Philippines, and medical literature
- Built with modern web technologies for accessibility and performance
- Translations reviewed for medical accuracy
