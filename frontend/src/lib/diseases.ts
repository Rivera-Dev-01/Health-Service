import { supabase } from './supabase'

export type Disease = {
  disease_id: string
  name: string
  slug: string
  category: string
  short_description: string
  description: string
  icon: string
  overview: string
  causes: string[]
  symptoms: string[]
  prevention: string[]
  treatment: string[]
  when_to_see_doctor: string
  affected_groups?: string
  severity?: string
  related_slugs: string[]
  source: string
  source_url: string
  created_at: string
  updated_at: string
}

export type DiseaseTranslation = {
  translation_id: string
  disease_id: string
  language_code: string
  name: string
  slug: string
  short_description: string
  description: string
  overview: string
  symptoms: string[]
  causes: string[]
  prevention: string[]
  treatment: string[]
  when_to_see_doctor: string
  affected_groups?: string
  created_at: string
  updated_at: string
}

export type DiseaseWithTranslation = Disease & {
  translation?: DiseaseTranslation
}

export async function getAllDiseases(language: string = 'en'): Promise<DiseaseWithTranslation[]> {
  try {
    console.log('Fetching diseases from Supabase...')
    const { data, error } = await supabase
      .from('diseases')
      .select('*')
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching diseases:', error.message, error)
      return []
    }

    console.log('Fetched diseases:', data?.length || 0)
    
    // If English, return as is
    if (language === 'en' || !data) {
      return data || []
    }

    // Fetch all translations for this language
    const diseaseIds = data.map(d => d.disease_id)
    const { data: translations, error: translationError } = await supabase
      .from('diseases_translation')
      .select('*')
      .in('disease_id', diseaseIds)
      .eq('language_code', language)

    if (translationError) {
      console.error('Error fetching translations:', translationError.message)
      return data
    }

    // Map translations to diseases
    const translationMap = new Map(
      translations?.map(t => [t.disease_id, t]) || []
    )

    return data.map(disease => ({
      ...disease,
      translation: translationMap.get(disease.disease_id)
    }))
  } catch (err) {
    console.error('Exception in getAllDiseases:', err)
    return []
  }
}

export async function getDiseaseBySlug(slug: string, language: string = 'en'): Promise<DiseaseWithTranslation | null> {
  try {
    // First get the disease
    const { data: disease, error: diseaseError } = await supabase
      .from('diseases')
      .select('*')
      .eq('slug', slug)
      .single()

    if (diseaseError || !disease) {
      console.error('Error fetching disease:', diseaseError?.message)
      return null
    }

    // If English, return as is
    if (language === 'en') {
      return disease
    }

    // Try to get translation
    const { data: translation, error: translationError } = await supabase
      .from('diseases_translation')
      .select('*')
      .eq('disease_id', disease.disease_id)
      .eq('language_code', language)
      .maybeSingle() // Use maybeSingle instead of single to handle no results

    if (translationError) {
      console.log('Error fetching translation:', translationError.message)
      return disease
    }

    if (!translation) {
      console.log('No translation found, returning English version')
      return disease
    }

    // Return disease with translation
    return {
      ...disease,
      translation
    }
  } catch (err) {
    console.error('Exception in getDiseaseBySlug:', err)
    return null
  }
}

export async function getDiseasesByCategory(category: string): Promise<Disease[]> {
  const { data, error } = await supabase
    .from('diseases')
    .select('*')
    .eq('category', category)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error fetching diseases by category:', error)
    return []
  }

  return data || []
}

export async function searchDiseases(query: string): Promise<Disease[]> {
  const { data, error } = await supabase
    .from('diseases')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%,overview.ilike.%${query}%`)
    .order('name', { ascending: true })

  if (error) {
    console.error('Error searching diseases:', error)
    return []
  }

  return data || []
}

export async function getRelatedDiseases(slugs: string[]): Promise<Disease[]> {
  if (!slugs || slugs.length === 0) return []

  const { data, error } = await supabase
    .from('diseases')
    .select('*')
    .in('slug', slugs)

  if (error) {
    console.error('Error fetching related diseases:', error)
    return []
  }

  return data || []
}


export async function getDiseaseWithTranslation(slug: string, language: string = 'en'): Promise<DiseaseWithTranslation | null> {
  try {
    // First get the disease
    const { data: disease, error: diseaseError } = await supabase
      .from('diseases')
      .select('*')
      .eq('slug', slug)
      .single()

    if (diseaseError || !disease) {
      console.error('Error fetching disease:', diseaseError)
      return null
    }

    // If English, return as is
    if (language === 'en') {
      return disease
    }

    // Try to get translation
    const { data: translation, error: translationError } = await supabase
      .from('diseases_translation')
      .select('*')
      .eq('disease_id', disease.disease_id)
      .eq('language_code', language)
      .maybeSingle() // Use maybeSingle to handle no results gracefully

    if (translationError) {
      console.log('Error fetching translation:', translationError.message)
      return disease
    }

    if (!translation) {
      console.log('No translation found, returning English version')
      return disease
    }

    // Return disease with translation
    return {
      ...disease,
      translation
    }
  } catch (err) {
    console.error('Exception in getDiseaseWithTranslation:', err)
    return null
  }
}

// Helper function to get display text (translation or fallback to English)
export function getDisplayText(disease: DiseaseWithTranslation, field: keyof Disease): string | string[] {
  if (disease.translation && field in disease.translation) {
    const value = disease.translation[field as keyof DiseaseTranslation]
    
    if (value !== undefined && value !== null && value !== '') {
      // Ensure arrays are actually arrays (sometimes they come as strings from DB)
      if (field === 'symptoms' || field === 'causes' || field === 'prevention' || field === 'treatment') {
        if (typeof value === 'string') {
          // If it's a string, split by common delimiters
          // Try splitting by newlines first, then by periods with numbers, then by semicolons
          let items: string[] = []
          
          // Check if it contains numbered list pattern (1., 2., etc)
          if (value.match(/\d+\./)) {
            items = value.split(/\d+\./).map(s => s.trim()).filter(s => s)
          }
          // Check if it contains bullet points or dashes
          else if (value.match(/^[-•*]/m)) {
            items = value.split(/\n[-•*]/).map(s => s.replace(/^[-•*]\s*/, '').trim()).filter(s => s)
          }
          // Check if it contains newlines
          else if (value.includes('\n')) {
            items = value.split('\n').map(s => s.trim()).filter(s => s)
          }
          // Check if it contains semicolons
          else if (value.includes(';')) {
            items = value.split(';').map(s => s.trim()).filter(s => s)
          }
          // Check if it contains pipes
          else if (value.includes('|')) {
            items = value.split('|').map(s => s.trim()).filter(s => s)
          }
          // Last resort: split by periods (but be careful with abbreviations)
          else if (value.includes('. ')) {
            items = value.split(/\.\s+/).map(s => s.trim()).filter(s => s)
          }
          // If no delimiters found, return as single item array
          else {
            items = [value]
          }
          
          // Clean up each item
          return items.map(item => 
            item.replace(/ text\[\]$/, '').replace(/^[-•*]\s*/, '').trim()
          ).filter(item => item && item !== '')
        }
        // If it's already an array, check if items need further splitting
        if (Array.isArray(value)) {
          const processed = value.flatMap(item => {
            if (typeof item !== 'string') return item
            
            // Clean up the item first
            let cleaned = item.replace(/ text\[\]$/, '').trim()
            
            // If an individual item is very long (>150 chars), it might need splitting
            if (cleaned.length > 150) {
              // Try to split by common patterns
              if (cleaned.match(/\d+\./)) {
                return cleaned.split(/\d+\./).map(s => s.trim()).filter(s => s)
              } else if (cleaned.includes(' | ')) {
                return cleaned.split(' | ').map(s => s.trim()).filter(s => s)
              } else if (cleaned.match(/[.!?]\s+[A-Z]/)) {
                // Split by sentence boundaries (period/exclamation/question followed by capital letter)
                return cleaned.split(/([.!?])\s+(?=[A-Z])/).reduce((acc, part, i, arr) => {
                  if (i % 2 === 0) {
                    const sentence = part + (arr[i + 1] || '')
                    if (sentence.trim()) acc.push(sentence.trim())
                  }
                  return acc
                }, [])
              }
            }
            
            return cleaned
          }).filter(item => item && item !== '')
          
          return processed
        }
      }
      return value as string | string[]
    }
  }
  
  // Fallback to English - also handle if English data needs parsing
  const englishValue = disease[field]
  if (field === 'symptoms' || field === 'causes' || field === 'prevention' || field === 'treatment') {
    if (typeof englishValue === 'string') {
      // Apply same parsing logic to English data
      let items: string[] = []
      
      if (englishValue.match(/\d+\./)) {
        items = englishValue.split(/\d+\./).map(s => s.trim()).filter(s => s)
      } else if (englishValue.match(/^[-•*]/m)) {
        items = englishValue.split(/\n[-•*]/).map(s => s.replace(/^[-•*]\s*/, '').trim()).filter(s => s)
      } else if (englishValue.includes('\n')) {
        items = englishValue.split('\n').map(s => s.trim()).filter(s => s)
      } else if (englishValue.includes(';')) {
        items = englishValue.split(';').map(s => s.trim()).filter(s => s)
      } else if (englishValue.includes('|')) {
        items = englishValue.split('|').map(s => s.trim()).filter(s => s)
      } else if (englishValue.includes('. ')) {
        items = englishValue.split(/\.\s+/).map(s => s.trim()).filter(s => s)
      } else {
        items = [englishValue]
      }
      
      return items.map(item => item.trim()).filter(item => item && item !== '')
    }
  }
  
  return englishValue as string | string[]
}
