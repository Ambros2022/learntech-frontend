import 'public/css/symbiosisdubailandingpage.css'
import SymbiosisDubaiPage from 'src/views/SymbiosisDubaiPage'
import JsonLd from 'src/app/components/JsonLd'

export const metadata = {
  title: 'Symbiosis International University Dubai | Admission 2026–27',
  description: 'Apply to Symbiosis International University Dubai for world-class UG & PG programs, industry-oriented curriculum, and global career opportunities. Enquire now!',
  alternates: {
    canonical: 'https://learntechww.com/symbiosis-international-university-dubai',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are degrees from Symbiosis International University, Dubai globally recognised?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Degrees are awarded by Symbiosis International (Deemed University), a globally ranked institution recognised for academic excellence and international credibility.'
      }
    },
    {
      '@type': 'Question',
      name: 'What programmes are offered at Symbiosis International University, Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The university offers undergraduate programmes including BBA, BBA Dual Degree, BCA, BAMC, B.Com (with ACCA), B.Com (Hons) with ACCA, BSc Psychology (Hons), B.Tech in Computer Engineering, and a postgraduate MBA programme.'
      }
    },
    {
      '@type': 'Question',
      name: 'What is the admission process for undergraduate and postgraduate programmes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The process includes application submission, document review, issuance of a conditional offer (if eligible), fee payment for confirmation, provisional admission, and final admission confirmation upon completion of required payments and document verification.'
      }
    },
    {
      '@type': 'Question',
      name: 'Is English proficiency mandatory for admission?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Applicants must meet the required English proficiency criteria (IELTS / TOEFL) or equivalent academic English requirements, depending on the programme level.'
      }
    },
    {
      '@type': 'Question',
      name: 'Does the university provide scholarship opportunities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, eligible students may receive a Symbiosis International University, Dubai scholarship based on academic performance, predicted grades, or previous qualifications.'
      }
    }
  ]
}

export default function Page() {
  return (
    <>
      <JsonLd id="symbiosis-faq-schema" schema={faqSchema} />
      <SymbiosisDubaiPage />
    </>
  )
}
