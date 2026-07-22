'use client'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'src/hooks/useCompatRouter'
import { LazyPhoneInputField as PhoneInputField } from 'src/app/components/ClientWrappers'
import Link from 'next/link'
import { phoneSchema, submitEnquiry } from './formUtils'


const schema = z.object({
  fullName: z.string().trim().min(1, 'Full Name is required'),
  email: z.string().trim().email('Invalid email address'),
  contact_number: phoneSchema,
  course: z.string().min(1, 'Course selection is required'),
  city: z.string().min(1, 'City selection is required'),
  bank: z.string().min(1, 'Bank selection is required'),
  notes: z.string().trim().min(1, 'Notes is required').max(500, 'Notes must be 500 characters or less'),
  terms: z.boolean().refine(v => v, 'You must accept the terms and conditions'),
})

type FormValues = z.infer<typeof schema>

export default function EducationLoanPage() {
  const router = useRouter()
  const {
    register, control, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: '', email: '', contact_number: '', course: '', city: '', bank: '', notes: '', terms: false },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      toast.loading('Processing')
      const ok = await submitEnquiry({
        name: values.fullName,
        email: values.email,
        contact_number: values.contact_number,
        location: values.city,
        course_in_mind: values.course,
        bank_name: values.bank,
        description: values.notes,
      })
      toast.dismiss()
      if (ok) {
        toast.success('Thank you. We will get back to you.')
        reset()
        router.push('/thank-you')
      } else {
        toast.error('Please try again later!')
      }
    } catch {
      toast.dismiss()
      toast.error('Please try again later!')
    }
  }

  const courses = [
        {
            group: "Popular Courses",
            options: [
                { id: "18-10-BE/B.Tech", name: "BE/B.Tech - Bachelors (Technology)" },
                { id: "120-13-MBA/PGDM", name: "MBA/PGDM - Masters (Business Administration)" },
                { id: "15-13-BBA/BBM", name: "BBA/BBM - Bachelors (Business Administration)" },
                { id: "2-5-B.Com", name: "B.Com - Bachelors (Commerce)" },
                { id: "12-3-BA", name: "BA - Bachelors (Arts)" },
                { id: "117-3-MA", name: "MA - Masters (Arts)" },
                { id: "121-6-MBBS", name: "MBBS - Bachelors (Medicine and Surgery)" },
                { id: "16-6-BCA", name: "BCA - Bachelors (Computer Applications)" },
                { id: "122-10-MCA", name: "MCA - Masters (Computer Applications)" },
                { id: "125-18-ME/M.Tech", name: "ME/M.Tech - Masters (Technology)" },
                { id: "6-18-B.Sc", name: "B.Sc - Bachelors (Science)" },
                { id: "111-18-M.Sc", name: "M.Sc - Masters (Science)" },
            ],
        },
        {
            group: "Bachelor",
            options: [
                { name: "B.Arch - Bachelor (Architecture)" },
                { name: "BVSc - Bachelor (Veterinary Sciences)" },
                { name: "Bachelor of Animation - Bachelor (Animation)" },
                { name: "BSW - Bachelor (Arts)" },
                { name: "LLB - Bachelor (Law)" },
                { name: "BPH - Bachelor (Medical)" },
                { name: "B.F.Sc - Bachelor (Science)" },
                { name: "Bachelors (Animation & Graphic Design) - Bachelor (Arts)" },
                { name: "B.P.Ed - Bachelor (Education)" },
                { name: "BFA - Bachelor (Arts)" },
                { name: "BUMS - Bachelor (Medical)" },
                { name: "Bachelor of Physiotherapy (BPT) - Bachelor (Medical)" },
                { name: "B.Planning - Bachelor (Architecture)" },
                { name: "BHMS - Bachelor (Medical)" },
                { name: "BBA (Aviation) - Bachelor (Aviation)" },
                { name: "BMM - Bachelor (Mass Communications)" },
                { name: "BHM - Bachelor (Hotel Management)" },
                { name: "B.Com - Bachelors (Commerce)" },
                { name: "B.Des - Bachelor (Design)" },
                { name: "B.Ed - Bachelor (Education)" },
                { name: "B.Pharm - Bachelor (Pharmacy)" },
                { name: "B.Sc - Bachelors (Science)" },
                { name: "B.Sc (Agriculture) - Bachelor (Agriculture)" },
                { name: "B.Sc (Medicine) - Bachelor (Medical)" },
                { name: "B.Sc (Nursing) - Bachelor (Paramedical)" },
                { name: "BA - Bachelors (Arts)" },
                { name: "Bachelors in Vocational Courses - Bachelor (Vocational Courses)" },
                { name: "BAMS - Bachelor (Medical)" },
                { name: "BCA - Bachelors (Computer Applications)" },
                { name: "BE/B.Tech - Bachelors (Technology)" },
                { name: "BDS - Bachelor (Dental)" },
            ],
        },
        {
            group: "Doctorate",
            options: [
                { name: "M.Phil/Ph.D in Paramedical - Doctorate (Paramedical)" },
                { name: "M.Phil/Ph.D in Medicine - Doctorate (Medical)" },
                { name: "M.Phil/Ph.D in Pharmacy - Doctorate (Pharmacy)" },
                { name: "M.Phil/Ph.D in Science - Doctorate (Science)" },
                { name: "MD - Doctorate (Medical)" },
                { name: "Ph.D in Veterinary Science - Doctorate (Veterinary Sciences)" },
                { name: "M.Phil/Ph.D in Mass Communication - Doctorate (Mass Communications)" },
                { name: "M.Phil/Ph.D in Management - Doctorate (Management)" },
                { name: "M.Phil/Ph.D in Law - Doctorate (Law)" },
                { name: "M.Phil/Ph.D in Architecture - Doctorate (Architecture)" },
                { name: "M.Phil/Ph.D in Arts - Doctorate (Arts)" },
                { name: "M.Phil/Ph.D in Commerce - Doctorate (Commerce)" },
                { name: "M.Phil/Ph.D in Computer Applications - Doctorate (Computer Applications)" },
                { name: "M.Phil/Ph.D in Dental - Doctorate (Dental)" },
                { name: "M.Phil/Ph.D in Agriculture - Doctorate (Agriculture)" },
                { name: "M.Phil/Ph.D in Design - Doctorate (Design)" },
                { name: "M.Phil/Ph.D in Hotel Management - Doctorate (Hotel Management)" },
                { name: "M.Phil/Ph.D in Engineering - Doctorate (Engineering)" },
                { name: "M.Phil/Ph.D in Education - Doctorate (Education)" },
                { name: "D.Litt - Doctorate (Arts)" },
            ],
        },
        {
            group: "Masters",
            options: [
                { name: "M.Des - Masters (Design)" },
                { name: "M.P.Ed - Masters (Education)" },
                { name: "MHA - Masters (Management)" },
                { name: "M.Ed - Masters (Education)" },
                { name: "M.Com - Masters (Commerce)" },
                { name: "Executive MBA - Masters (Management)" },
                { name: "MVSc - Masters (Veterinary Sciences)" },
                { name: "Master of Animation - Masters (Animation)" },
                { name: "M.Ch - Masters (Medical)" },
                { name: "M.Arch - Masters (Architecture)" },
                { name: "M.F.Sc - Masters (Science)" },
                { name: "MPH - Masters (Medical)" },
                { name: "LLM - Masters (Law)" },
                { name: "MSW - Masters (Arts)" },
                { name: "MMS - Masters (Management)" },
                { name: "M.Pharm - Masters (Pharmacy)" },
                { name: "MS - Masters (Medical)" },
                { name: "M.Sc - Masters (Science)" },
                { name: "M.Sc (Agriculture) - Masters (Agriculture)" },
                { name: "M.Sc (Aviation) - Masters (Aviation)" },
                { name: "M.Sc (Medicine) - Masters (Medical)" },
                { name: "M.Sc (Nursing) - Masters (Paramedical)" },
                { name: "MA - Masters (Arts)" },
                { name: "Master of Physiotherapy (MPT) - Masters (Medical)" },
                { name: "Masters in Vocational Courses - Masters (Vocational Courses)" },
                { name: "MBA/PGDM - Masters (Business Administration)" },
                { name: "MCA - Masters (Computer Applications)" },
                { name: "MDS - Masters (Dental)" },
                { name: "ME/M.Tech - Masters (Technology)" },
                { name: "MHM - Masters (Hotel Management)" },
                { name: "MMC - Masters (Mass Communications)" },
                { name: "M.Planning - Masters (Architecture)" },

            ],
        },
    ];
    const cities2 = [
        {
            group: "Major Cities",
            options: [
                { name: "New Delhi" },
                { name: "Ahmedabad" },
                { name: "Bangalore" },
                { name: "Chennai" },
                { name: "Hyderabad" },
                { name: "Kolkata" },
                { name: "Mumbai" },
                { name: "Pune" },

            ],
        },
        {
            group: "Andman & Nicobar Island",
            options: [
                { name: "Andman & Nicobar Island" },
            ],
        },
        {
            group: "Andhra Pradesh",
            options: [
                { name: "Adilabad" },
                { name: "Anantapur" },
                { name: "Chittoor" },
                { name: "East Godavari" },
                { name: "Hyderabad" },
                { name: "Kadapa" },
                { name: "Karimnagar" },
                { name: "Khammam" },
                { name: "Krishna" },
                { name: "Kurnool" },
                { name: "Mahbubnagar" },
                { name: "Medak" },
                { name: "Nalgonda" },
                { name: "Nellore" },
                { name: "Nizamabad" },
                { name: "Prakasam" },
                { name: "Rangareddi" },
                { name: "Srikakulam" },
                { name: "Visakhapatnam" },
                { name: "Vizianagaram" },
                { name: "Warangal" },
                { name: "West Godavari" },
                { name: "Anjaw" },
            ],
        },
        {

            group: "Arunachal Pradesh",
            options: [
                { name: "Changlang" },
                { name: "East Kameng" },
                { name: "East Siang" },
                { name: "Kurung Kumey" },
                { name: "Lohit" },
                { name: "Lower Dibang Valley" },
                { name: "Lower Subansiri" },
                { name: "Papum Pare" },
                { name: "Tawang" },
                { name: "Tirap" },
                { name: "Upper Dibang Valley" },
                { name: "Upper Siang" },
                { name: "Upper Subansiri" },
                { name: "West Kameng" },
                { name: "West Siang" },
            ],
        },
        {
            group: "Assam",
            options: [
                { name: "Baksa" },
                { name: "Barpeta" },
                { name: "Bongaigaon" },
                { name: "Cachar" },
                { name: "Chirang" },
                { name: "Darrang" },
                { name: "Dhemaji" },
                { name: "Dhubri" },
                { name: "Dibrugarh" },
                { name: "Goalpara" },
                { name: "Golaghat" },
                { name: "Hailakandi" },
                { name: "Jorhat" },
                { name: "Kamrup" },
                { name: "Karbi Anglong" },
                { name: "Karimganj" },
                { name: "Kokrajhar" },
                { name: "Lakhimpur" },
                { name: "Marigaon" },
                { name: "Nagaon" },
                { name: "Nalbari" },
                { name: "North Cachar Hills" },
                { name: "Sibsagar" },
                { name: "Sonitpur" },
                { name: "Tinsukia" },
                { name: "Udalguri" },
            ],
        },
        {
            group: "Bihar",
            options: [
                { name: "Araria" },
                { name: "Arwal" },
                { name: "Aurangabad - Bi" },
                { name: "Banka" },
                { name: "Begusarai" },
                { name: "Bhagalpur" },
                { name: "Bhojpur" },
                { name: "Buxar" },
                { name: "Darbhanga" },
                { name: "East Champaran" },
                { name: "Gaya" },
                { name: "Gopalganj" },
                { name: "Jamui" },
                { name: "Jehanabad" },
                { name: "Kaimur" },
                { name: "Katihar" },
                { name: "Khagaria" },
                { name: "Kishanganj" },
                { name: "Lakhisarai" },
                { name: "Madhepura" },
                { name: "Madhubani" },
                { name: "Munger" },
                { name: "Muzaffarpur" },
                { name: "Nalanda" },
                { name: "Nawada" },
                { name: "Patna" },
                { name: "Purnia" },
                { name: "Rohtas" },
                { name: "Saharsa" },
                { name: "Samastipur" },
                { name: "Saran" },
                { name: "Sheikhpura" },
                { name: "Sheohar" },
                { name: "Sitamarhi" },
                { name: "Siwan" },
                { name: "Supaul" },
                { name: "Vaishali" },
                { name: "West Champaran" },

            ],
        },
        {
            group: "Chattisgarh",
            options: [
                { name: "Bastar" },
                { name: "Bilaspur" },
                { name: "Dantewada" },
                { name: "Dhamtari" },
                { name: "Durg" },
                { name: "Janjgir" },
                { name: "Jashpur" },
                { name: "Kanker" },
                { name: "Kabir Dham" },
                { name: "Korba" },
                { name: "Koriya" },
                { name: "Mahasamund" },
                { name: "Raigarh" },
                { name: "Raipur" },
                { name: "Rajnandgaon" },
                { name: "Surguja" },
            ],
        },
        {
            group: "Chandigarh",
            options: [
                { name: "Chandigarh" },
            ],
        },
        {
            group: "Daman & Diu",
            options: [


                { name: "Daman" },
                { name: "Diu" },
            ],
        },
        {
            group: "Delhi",
            options: [{ name: "Central" },
            { name: "City Zone" },
            { name: "Civili Line" },
            { name: "Karol Bagh" },
            { name: "Najafgarh" },
            { name: "Narela" },
            { name: "Rohini" },
            { name: "S.Pahar Ganj" },
            { name: "Shahadra(N)" },
            { name: "Shahadra(S)" },
            { name: "South" },
            { name: "West" },
            ],
        },
        {
            group: "Dadar & Nagar Havali",
            options: [
                { name: "Dadar & Nagar Havali" },
            ],
        },
        {
            group: "Goa",
            options: [
                { name: "Goa" },
            ],
        },
        {
            group: "Gujarat",
            options: [

                { name: "Ahmedabad" },
                { name: "Amreli" },
                { name: "Anand" },
                { name: "Banaskantha" },
                { name: "Bharuch" },
                { name: "Bhavnagar" },
                { name: "Dahod" },
                { name: "Dang" },
                { name: "Gandhinagar" },
                { name: "Godhara" },
                { name: "Jamnagar" },
                { name: "Junagadh" },
                { name: "Kheda" },
                { name: "Kutch" },
                { name: "Mahesana" },
                { name: "Narmada" },
                { name: "Navsari" },
                { name: "Patan" },
                { name: "Porbandar" },
                { name: "Rajkot" },
                { name: "Sabarkantha" },
                { name: "Surat" },
                { name: "Surendranagar" },
                { name: "Vadodara" },
                { name: "Valsad" },
                { name: "Tapi" },
            ],
        },
        {

            group: "Himachal Pradesh",
            options: [
                { name: "Bilaspur - Hp" },
                { name: "Chamba" },
                { name: "Hamirpur - Hp" },
                { name: "Kangra" },
                { name: "Kullu" },
                { name: "Mandi" },
                { name: "Shimla" },
                { name: "Sirmaur" },
                { name: "Solan" },
                { name: "Una" },
            ],
        },
        {
            group: "Haryana",
            options: [
                { name: "Ambala" },
                { name: "Bhiwani" },
                { name: "Faridabad" },
                { name: "Fatehabad" },
                { name: "Gurgaon" },
                { name: "Hisar" },
                { name: "Jhajjar" },
                { name: "Jind" },
                { name: "Kaithal" },
                { name: "Karnal" },
                { name: "Kurukshetra" },
                { name: "Mewat" },
                { name: "Narnaul" },
                { name: "Palwal" },
                { name: "Panchkula" },
                { name: "Panipat" },
                { name: "Rewari" },
                { name: "Rohtak" },
                { name: "Sirsa" },
                { name: "Sonipat" },
                { name: "Yamunanagar" },
            ],
        },
        {
            group: "Jharkhand",
            options: [
                { name: "Bokaro" },
                { name: "Chatra" },
                { name: "Deogarh" },
                { name: "Dhanbad" },
                { name: "Dumka" },
                { name: "East Singhbhum" },
                { name: "Garhwa" },
                { name: "Giridih" },
                { name: "Godda" },
                { name: "Gumla" },
                { name: "Hazaribagh" },
                { name: "Jamtara" },
                { name: "Kodarma" },
                { name: "Lathehar" },
                { name: "Lohardaga" },
                { name: "Pakur" },
                { name: "Palamu" },
                { name: "Ranchi" },
                { name: "Sahibganj" },
                { name: "Saraikela - Kharsawan" },
                { name: "Simdega" },
                { name: "West Singhbhum" },
            ],
        },
        {
            group: "Jammu & Kashmir",
            options: [
                { name: "Baramula" },
                { name: "Doda" },
                { name: "Jammu" },
                { name: "Kathua" },
                { name: "Kishtwar" },
                { name: "Poonch" },
                { name: "Rajouri" },
                { name: "Ramban" },
                { name: "Reasi" },
                { name: "Sambha" },
                { name: "Udhampur" },
            ],
        },
        {
            group: "Karnataka",
            options: [
                { name: "Bagalkot" },
                { name: "Bangalore Rural" },
                { name: "Bangalore Urban" },
                { name: "Belgaum" },
                { name: "Bellary" },
                { name: "Bidar" },
                { name: "Bijapur" },
                { name: "Chamarajanagar" },
                { name: "Chikkaballapur" },
                { name: "Chikmagalur" },
                { name: "Chitradurga" },
                { name: "Dakshina Kannada" },
                { name: "Davanagere" },
                { name: "Dharwad" },
                { name: "Gadag" },
                { name: "Gulbarga" },
                { name: "Hassan" },
                { name: "Haveri" },
                { name: "Kodagu" },
                { name: "Kolar" },
                { name: "Koppal" },
                { name: "Mandya" },
                { name: "Mysore" },
                { name: "Raichur" },
                { name: "Ramanagara" },
                { name: "Shimoga" },
                { name: "Tumkur" },
                { name: "Udupi" },
                { name: "Uttara Kannada" },
            ],
        },
        {
            group: "Karnataka",
            options: [
                { name: "Alappuzha" },
                { name: "Ernakulam" },
                { name: "Idukki" },
                { name: "Kannur" },
                { name: "Kasaragod" },
                { name: "Kollam" },
                { name: "Kottayam" },
                { name: "Kozhikode" },
                { name: "Malappuram" },
                { name: "Palakkad" },
                { name: "Pathanamthitta" },
                { name: "Thiruvananthapuram" },
                { name: "Thrissur" },
                { name: "Wayanad" },
            ],
        },
        {
            group: "Lakshadweep",
            options: [
                { name: "Lakshadweep" },
            ],
        },
        {
            group: "Meghalaya",
            options: [
                { name: "Bhoi" },
                { name: "East Garo Hills" },
                { name: "East Khasi Hills" },
                { name: "Jaintia Hills" },
                { name: "South Garo Hills" },
                { name: "West Garo Hills" },
                { name: "West Khasi Hills" },
            ],
        },
        {
            group: "Maharashtra",
            options: [
                { name: "Ahmednagar" },
                { name: "Akola" },
                { name: "Amaravati" },
                { name: "Aurangabad" },
                { name: "Beed" },
                { name: "Bhandara" },
                { name: "Buldana" },
                { name: "Chandrapur" },
                { name: "Dhule" },
                { name: "Gadchiroli" },
                { name: "Gondia" },
                { name: "Hingoli" },
                { name: "Jalgaon" },
                { name: "Jalna" },
                { name: "Kolhapur" },
                { name: "Latur" },
                { name: "Nagpur" },
                { name: "Nanded" },
                { name: "Nandurbar" },
                { name: "Nasik" },
                { name: "Osmanabad" },
                { name: "Parbhani" },
                { name: "Pune" },
                { name: "Raigad" },
                { name: "Ratnagiri" },
                { name: "Sangli" },
                { name: "Satara" },
                { name: "Sindhudurg" },
                { name: "Solapur" },
                { name: "Thane" },
                { name: "Wardha" },
                { name: "Washim" },
                { name: "Yawatmal" },
            ],
        },
        {
            group: "Manipur",
            options: [
                { name: "Bishnupur" },
                { name: "Chandel" },
                { name: "Churachandpur" },
                { name: "Imphal East" },
                { name: "Imphal West" },
                { name: "Kangpokpi" },
                { name: "Senapati" },
                { name: "Tamenglong" },
                { name: "Thoubal" },
                { name: "Ukhrul" },
            ],
        },
        {
            group: "Madhya Pradesh",
            options: [
                { name: "Anupur" },
                { name: "Ashok Nagar" },
                { name: "Balaghat" },
                { name: "Barwani" },
                { name: "Betul" },
                { name: "Bhind" },
                { name: "Bhopal" },
                { name: "Burhanpur" },
                { name: "Chhatarpur" },
                { name: "Chhindwara" },
                { name: "Damoh" },
                { name: "Datia" },
                { name: "Dewas" },
                { name: "Dhar" },
                { name: "Dindori" },
                { name: "Guna" },
                { name: "Gwalior" },
                { name: "Harda" },
                { name: "Hoshangabad" },
                { name: "Indore" },
                { name: "Jabalpur" },
                { name: "Jhabua" },
                { name: "Katni" },
                { name: "Khandwa" },
                { name: "Khargone" },
                { name: "Mandla" },
                { name: "Mandsaur" },
                { name: "Morena" },
                { name: "Narsinghpur" },
                { name: "Neemuch" },
                { name: "Panna" },
                { name: "Raisen" },
                { name: "Rajgarh" },
                { name: "Ratlam" },
                { name: "Rewa" },
                { name: "Sagar" },
                { name: "Satna" },
                { name: "Seoni" },
                { name: "Shahdol" },
                { name: "Shajapur" },
                { name: "Sheopur" },
                { name: "Shivpuri" },
                { name: "Sidhi" },
                { name: "Tikamgarh" },
                { name: "Ujjain" },
                { name: "Umaria" },
                { name: "Vidisha" },
            ],
        },
        {
            group: "Mizoram",
            options: [
                { name: "Aizawal West" },
                { name: "Aizawl East" },
                { name: "Champhai" },
                { name: "Kolasib" },
                { name: "Lawngtlai" },
                { name: "Lunglei" },
                { name: "Mamit" },
                { name: "Saiha" },
                { name: "Serchhip" },
            ],
        },
        {
            group: "Nagaland",
            options: [
                { name: "Dimapur" },
                { name: "Kiphire" },
                { name: "Kohima" },
                { name: "Longleng" },
                { name: "Mokokchung" },
                { name: "Mon" },
                { name: "Peren" },
                { name: "Phek" },
                { name: "Tuensang" },
                { name: "Wokha" },
                { name: "Zunheboto" },
            ],
        },
        {
            group: "Orissa",
            options: [

                { name: "Angul" },
                { name: "Balangir" },
                { name: "Baleshwar" },
                { name: "Bargarh" },
                { name: "Baudh" },
                { name: "Bhadrak" },
                { name: "Cuttack" },
                { name: "Debagarh" },
                { name: "Dhenkanal" },
                { name: "Gajapati" },
                { name: "Ganjam" },
                { name: "Jagatsinghapur" },
                { name: "Jajpur" },
                { name: "Jharsuguda" },
                { name: "Kalahandi" },
                { name: "Kandhamal" },
                { name: "Kendrapara" },
                { name: "Keonjhar" },
                { name: "Khurda" },
                { name: "Koraput" },
                { name: "Malkangiri" },
                { name: "Mayurbhanj" },
                { name: "Nabarangapur" },
                { name: "Nayagarh" },
                { name: "Nuapada" },
                { name: "Puri" },
                { name: "Rayagada" },
                { name: "Sambalpur" },
                { name: "Sonapur" },
                { name: "Sundargarh" },
            ],
        },
        {
            group: "Pondicherry",
            options: [
                { name: "Pondicherry" },
            ],
        },
        {
            group: "Punjab",
            options: [
                { name: "Amritsar" },
                { name: "Bathinda" },
                { name: "Barnala" },
                { name: "Faridkot" },
                { name: "Fategarh Sahib" },
                { name: "Firozpur" },
                { name: "Gurdaspur" },
                { name: "Hoshiarpur" },
                { name: "Jalandhar" },
                { name: "Kapurthala" },
                { name: "Ludhiana" },
                { name: "Mansa - Pu" },
                { name: "Moga" },
                { name: "Mohali" },
                { name: "Mukatsar" },
                { name: "Nawanshahr" },
                { name: "Patiala" },
                { name: "Rupnagar" },
                { name: "Sangrur" },
                { name: "Tarn Taran" },
            ],
        },
        {
            group: "Rajasthan",
            options: [
                { name: "Ajmer" },
                { name: "Alwar" },
                { name: "Banswara" },
                { name: "Baran" },
                { name: "Barmer" },
                { name: "Bharatpur" },
                { name: "Bhilwara" },
                { name: "Bikaner" },
                { name: "Bundi" },
                { name: "Chittaurgarh" },
                { name: "Churu" },
                { name: "Dausa" },
                { name: "Dhaulpur" },
                { name: "Dungarpur" },
                { name: "Ganganagar" },
                { name: "Hanumangarh" },
                { name: "Jaipur" },
                { name: "Jaisalmer" },
                { name: "Jalore" },
                { name: "Jhalawar" },
                { name: "Jhunjhunun" },
                { name: "Jodhpur" },
                { name: "Karauli" },
                { name: "Kota" },
                { name: "Nagaur" },
                { name: "Pali" },
                { name: "Pratapgarh" },
                { name: "Rajsamand" },
                { name: "Sawai Madhopur" },
                { name: "Sikar" },
                { name: "Sirohi" },
                { name: "Tonk" },
                { name: "Udaipur" },
            ],
        },
        {
            group: "Sikkim",
            options: [
                { name: "East" },
                { name: "North" },
                { name: "South" },
                { name: "West" },
            ],
        },
        {
            group: "Tamilnadu",
            options: [
                { name: "Kancheepuram" },
                { name: "Saidapet" },
                { name: "Thiruvallore" },
                { name: "Poonamallee" },
                { name: "Vellore" },
                { name: "Thiruppattur" },
                { name: "Tiruvannamalai" },
                { name: "Cheyyar" },
                { name: "Cuddalore" },
                { name: "Villupuram" },
                { name: "Kallakurichi" },
                { name: "Thanjavur" },
                { name: "Thiruvarur" },
                { name: "Nagapattinam" },
                { name: "Thiruchirapalli" },
                { name: "Karur" },
                { name: "Perambalur" },
                { name: "Pudukottai" },
                { name: "Aranthangi" },
                { name: "Madurai" },
                { name: "Theni" },
                { name: "Dindigul" },
                { name: "Palani" },
                { name: "Ramanathapuram" },
                { name: "Paramakudi" },
                { name: "Sivaganga" },
                { name: "Virudhunagar" },
                { name: "Sivakasi" },
                { name: "Thirunelveli" },
                { name: "Sankarankoil" },
                { name: "Thoothukudi" },
                { name: "Kovilpatti" },
                { name: "Nagercoil" },
                { name: "Salem" },
                { name: "Namakkal" },
                { name: "Dharmapuri" },
                { name: "Krishnagiri" },
                { name: "Coimbatore" },
                { name: "Thiruppur" },
                { name: "Erode" },
                { name: "Dharapuram" },
                { name: "The Nilgiris" },
                { name: "Chennai Corp" },
            ],
        },
        {
            group: "Tripura",
            options: [
                { name: "East Tripura" },
                { name: "North Tripura" },
                { name: "South Tripura" },
                { name: "West Tripura" },
            ],
        },
        {
            group: "Uttar Pradesh",
            options: [
                { name: "Agra" },
                { name: "Aligarh" },
                { name: "Allahabad" },
                { name: "Ambedkar Nagar" },
                { name: "Auraiya" },
                { name: "Azamgarh" },
                { name: "Baghpat" },
                { name: "Bahraich" },
                { name: "Ballia" },
                { name: "Balrampur" },
                { name: "Banda" },
                { name: "Barabanki" },
                { name: "Bareilly" },
                { name: "Basti" },
                { name: "Bijnor" },
                { name: "Budaun" },
                { name: "Bulandshahar" },
                { name: "Chandauli" },
                { name: "Chitrakoot" },
                { name: "Deoria" },
                { name: "Etah" },
                { name: "Etawah" },
                { name: "Faizabad" },
                { name: "Farrukhabad" },
                { name: "Fatehpur" },
                { name: "Firozabad" },
                { name: "Gautam Budh Nagar" },
                { name: "Ghaziabad" },
                { name: "Ghazipur" },
                { name: "Gonda" },
                { name: "Gorakhpur" },
                { name: "Hamirpur - Up" },
                { name: "Hardoi" },
                { name: "Hathras" },
                { name: "Jalaun" },
                { name: "Jaunpur" },
                { name: "Jhansi" },
                { name: "Jyotiba Phule Nagar" },
                { name: "Kannauj" },
                { name: "Kanpur Nagar" },
                { name: "Kanpur Dehat" },
                { name: "Kaushambi" },
                { name: "Kheri" },
                { name: "Kushinagar" },
                { name: "Lalitpur" },
                { name: "Lucknow" },
                { name: "Maharajganj" },
                { name: "Mahoba" },
                { name: "Mainpuri" },
                { name: "Mathura" },
                { name: "Mau" },
                { name: "Meerut" },
                { name: "Mirzapur" },
                { name: "Moradabad" },
                { name: "Muzaffarnagar" },
                { name: "Pilibhit" },
                { name: "Pratapgarh" },
                { name: "Raebareli" },
                { name: "Rampur" },
                { name: "Saharanpur" },
                { name: "Sant Kabir Nagar" },
                { name: "Sant Ravidas Nagar" },
                { name: "Shahjahanpur" },
                { name: "Shravasti" },
                { name: "Siddharthnagar" },
                { name: "Sitapur" },
                { name: "Sonbhadra" },
                { name: "Sultanpur" },
                { name: "Unnao" },
                { name: "Varanasi" },
            ],
        },
        {
            group: "Uttrakhand",
            options: [
                { name: "Almora" },
                { name: "Bageshwar" },
                { name: "Chamoli" },
                { name: "Champawat" },
                { name: "Dehradun" },
                { name: "Pauri Garhwal" },
                { name: "Hardwar" },
                { name: "Nainital" },
                { name: "Pithoragarh" },
                { name: "Rudraprayag" },
                { name: "Tehri Garhwal" },
                { name: "Udham Singh Nagar" },
                { name: "Uttarkashi" },
            ],
        },
        {
            group: "West Bengal",
            options: [
                { name: "Bankura" },
                { name: "Barddhaman" },
                { name: "Birbhum" },
                { name: "Cooch Behar" },
                { name: "Dakshin Dinaj" },
                { name: "Darjiling" },
                { name: "East Medinipur" },
                { name: "Howrah" },
                { name: "Hugly" },
                { name: "Jalpaiguri" },
                { name: "Kolkata" },
                { name: "Maldah" },
                { name: "Murshidabad" },
                { name: "Nadia" },
                { name: "North 24 Parganas" },
                { name: "Puruliya" },
                { name: "South 24 Parganas" },
                { name: "Uttar Dinajpur" },
                { name: "West Mednapur" },

            ]

        },




    ]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-12 mb-3">
          <input type="text" className="form-control" placeholder="Your Full Name" {...register('fullName')} />
          {errors.fullName && <div className="text-danger">{errors.fullName.message}</div>}
        </div>
        <div className="col-12 mb-3">
          <input type="email" className="form-control" placeholder="Your Email Id" {...register('email')} />
          {errors.email && <div className="text-danger">{errors.email.message}</div>}
        </div>
        <div className="col-12 mb-3">
          <Controller name="contact_number" control={control} render={({ field }) => <PhoneInputField field={field} />} />
          {errors.contact_number && <div className="error text-danger">{errors.contact_number.message}</div>}
        </div>
        <div className="col-12 mb-3">
          <div style={{ position: 'relative' }}>
            <select className="form-control" {...register('course')}>
              <option value="">Select a Course</option>
              {courses.map((group) => (
                <optgroup key={group.group} label={group.group}>
                  {group.options.map((course, index) => (
                    <option key={index} value={course.name}>{course.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <div style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)' }}>
              <i className="bi bi-caret-down-fill caret-down" />
            </div>
            {errors.course && <div className="text-danger">{errors.course.message}</div>}
          </div>
        </div>
        <div className="col-12 mb-3">
          <div style={{ position: 'relative' }}>
            <select className="form-control" {...register('city')}>
              <option value="">Select a city</option>
              {cities2.map((group, groupIndex) => (
                <optgroup key={groupIndex} label={group.group}>
                  {group.options.map((val, index) => (
                    <option key={index} value={val.name}>{val.name}</option>
                  ))}
                </optgroup>
              ))}
            </select>
            <div style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)' }}>
              <i className="bi bi-caret-down-fill caret-down" />
            </div>
            {errors.city && <div className="text-danger">{errors.city.message}</div>}
          </div>
        </div>
        <div className="col-12 mb-3">
          <div style={{ position: 'relative' }}>
            <select className="form-control" {...register('bank')}>
              <option value="">Select a Bank</option>
              <option value="Prodigy Finance">Prodigy Finance</option>
              <option value="SBI">SBI</option>
              <option value="PNB">PNB</option>
              <option value="HDFC">HDFC</option>
              <option value="Axis">Axis</option>
              <option value="ICICI">ICICI</option>
              <option value="Canara">Canara</option>
              <option value="Bank of Baroda">Bank of Baroda</option>
              <option value="Allahabad Bank">Allahabad Bank</option>
              <option value="Indian Bank">Indian Bank</option>
              <option value="IDBI">IDBI</option>
              <option value="Karnataka Bank">Karnataka Bank</option>
              <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
              <option value="Oriental Bank of Commerce">Oriental Bank of Commerce</option>
              <option value="Syndicate bank">Syndicate bank</option>
              <option value="Saraswat Bank">Saraswat Bank</option>
              <option value="UCO Bank">UCO Bank</option>
              <option value="Union Bank of India">Union Bank of India</option>
              <option value="Vijaya Bank">Vijaya Bank</option>
              <option value="Bank of Maharashtra">Bank of Maharashtra</option>
              <option value="Central Bank of India">Central Bank of India</option>
              <option value="Dena Bank">Dena Bank</option>
              <option value="Dhanlaxmi Bank">Dhanlaxmi Bank</option>
              <option value="Bank of India">Bank of India</option>
              <option value="RBL Bank">RBL Bank</option>
              <option value="Dombivli Nagari Sahakari Bank Ltd.">Dombivli Nagari Sahakari Bank Ltd.</option>
              <option value="Federal Bank">Federal Bank</option>
              <option value="Corporation Bank">Corporation Bank</option>
              <option value="Indian Overseas Bank">Indian Overseas Bank</option>
              <option value="Abhyudaya Bank">Abhyudaya Bank</option>
              <option value="South Indian Bank">South Indian Bank</option>
              <option value="GP Parsik Sahakari Bank">GP Parsik Sahakari Bank</option>
              <option value="Pragathi Krishna Gramin Bank">Pragathi Krishna Gramin Bank</option>
              <option value="Karur Vysya Bank">Karur Vysya Bank</option>
              <option value="New India Co-Operative Bank">New India Co-Operative Bank</option>
              <option value="Andhra Bank">Andhra Bank</option>
              <option value="Punjab and Sind Bank">Punjab and Sind Bank</option>
              <option value="Tamilnad Mercantile Bank">Tamilnad Mercantile Bank</option>
              <option value="Jammu and Kashmir Bank">Jammu and Kashmir Bank</option>
              <option value="United Bank of India">United Bank of India</option>
              <option value="InCred">InCred</option>
              <option value="Auxilo">Auxilo</option>
              <option value="Avanse">Avanse</option>
              <option value="Bajaj Finance Limited">Bajaj Finance Limited</option>
              <option value="Tata Capital Finance Limited">Tata Capital Finance Limited</option>
              <option value="Fullerton India Credit Company Limited">Fullerton India Credit Company Limited</option>
              <option value="MPower Financing">MPower Financing</option>
              <option value="Propelld">Propelld</option>
            </select>
            <div style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)' }}>
              <i className="bi bi-caret-down-fill caret-down" />
            </div>
            {errors.bank && <div className="text-danger">{errors.bank.message}</div>}
          </div>
        </div>
        <div className="col-lg-12 mb-3">
          <textarea className="form-control" placeholder="Notes" {...register('notes')} />
          {errors.notes && <div className="text-danger">{errors.notes.message}</div>}
        </div>
        <div className="col-12 mb-3">
          <div className="form-check">
            <input type="checkbox" className="form-check-input border-black" id="terms-loan" {...register('terms')} />
            <label className="form-check-label" htmlFor="terms-loan">
              By Clicking this, I agree to the{' '}
              <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
            </label>
          </div>
          {errors.terms && <div className="error text-danger">{errors.terms.message}</div>}
        </div>
        <div className="text-center">
          <button type="submit" disabled={isSubmitting} className="btn submitBtn">Submit</button>
        </div>
      </div>
    </form>
  )
}
