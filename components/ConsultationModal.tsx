import { useState, useMemo, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Search, MapPin, Phone, User, Building2, Sparkles, ArrowRight, Copy, Check, ShieldCheck, Mail, RefreshCw, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubscribers?: number;
}

// Exhaustive list of ALL Indian Cities, Towns & Regional Hubs across all States and Union Territories
const ALL_INDIAN_CITIES_REGIONS = [
  // Andhra Pradesh
  "Anantapur, Andhra Pradesh", "Bhimavaram, Andhra Pradesh", "Chittoor, Andhra Pradesh", "Eluru, Andhra Pradesh",
  "Gudivada, Andhra Pradesh", "Guntakal, Andhra Pradesh", "Guntur, Andhra Pradesh", "Hindupur, Andhra Pradesh",
  "Kadapa, Andhra Pradesh", "Kakinada, Andhra Pradesh", "Kurnool, Andhra Pradesh", "Machilipatnam, Andhra Pradesh",
  "Madanapalle, Andhra Pradesh", "Nandyal, Andhra Pradesh", "Narasaraopet, Andhra Pradesh", "Nellore, Andhra Pradesh",
  "Ongole, Andhra Pradesh", "Proddatur, Andhra Pradesh", "Rajahmundry, Andhra Pradesh", "Srikakulam, Andhra Pradesh",
  "Tadepalligudem, Andhra Pradesh", "Tadpatri, Andhra Pradesh", "Tenali, Andhra Pradesh", "Tirupati, Andhra Pradesh",
  "Vijayawada, Andhra Pradesh", "Visakhapatnam, Andhra Pradesh", "Vizianagaram, Andhra Pradesh",
  // Arunachal Pradesh
  "Bomdila, Arunachal Pradesh", "Itanagar, Arunachal Pradesh", "Naharlagun, Arunachal Pradesh", "Pasighat, Arunachal Pradesh",
  "Tawang, Arunachal Pradesh", "Ziro, Arunachal Pradesh",
  // Assam
  "Barpeta, Assam", "Bongaigaon, Assam", "Dhubri, Assam", "Dibrugarh, Assam", "Diphu, Assam", "Goalpara, Assam",
  "Guwahati, Assam", "Jorhat, Assam", "Karimganj, Assam", "Nagaon, Assam", "North Lakhimpur, Assam", "Sibsagar, Assam",
  "Silchar, Assam", "Tezpur, Assam", "Tinsukia, Assam",
  // Bihar
  "Arrah, Bihar", "Aurangabad, Bihar", "Bagaha, Bihar", "Begusarai, Bihar", "Bettiah, Bihar", "Bhagalpur, Bihar",
  "Bihar Sharif, Bihar", "Buxar, Bihar", "Chhapra, Bihar", "Danapur, Bihar", "Darbhanga, Bihar", "Dehri, Bihar",
  "Gaya, Bihar", "Hajipur, Bihar", "Jamalpur, Bihar", "Jehanabad, Bihar", "Katihar, Bihar", "Kishanganj, Bihar",
  "Lakhisarai, Bihar", "Motihari, Bihar", "Munger, Bihar", "Muzaffarpur, Bihar", "Nawada, Bihar", "Patna, Bihar",
  "Purnia, Bihar", "Saharsa, Bihar", "Samastipur, Bihar", "Sasaram, Bihar", "Sitamarhi, Bihar", "Siwan, Bihar",
  // Chhattisgarh
  "Ambikapur, Chhattisgarh", "Bhilai, Chhattisgarh", "Bilaspur, Chhattisgarh", "Dhamtari, Chhattisgarh",
  "Durg, Chhattisgarh", "Jagdalpur, Chhattisgarh", "Korba, Chhattisgarh", "Raigarh, Chhattisgarh",
  "Raipur, Chhattisgarh", "Rajnandgaon, Chhattisgarh",
  // Goa
  "Bicholim, Goa", "Mapusa, Goa", "Margao, Goa", "Panaji, Goa", "Ponda, Goa", "Vasco da Gama, Goa",
  // Gujarat
  "Ahmedabad, Gujarat", "Amreli, Gujarat", "Anand, Gujarat", "Ankleshwar, Gujarat", "Bharuch, Gujarat",
  "Bhavnagar, Gujarat", "Bhuj, Gujarat", "Botad, Gujarat", "Dahod, Gujarat", "Deesa, Gujarat", "Gandhidham, Gujarat",
  "Gandhinagar, Gujarat", "Godhra, Gujarat", "Jamnagar, Gujarat", "Junagadh, Gujarat", "Mehsana, Gujarat",
  "Morbi, Gujarat", "Nadiad, Gujarat", "Navsari, Gujarat", "Palanpur, Gujarat", "Patan, Gujarat", "Porbandar, Gujarat",
  "Rajkot, Gujarat", "Surat, Gujarat", "Surendranagar, Gujarat", "Vadodara, Gujarat", "Vapi, Gujarat", "Veraval, Gujarat",
  // Haryana
  "Ambala, Haryana", "Bahadurgarh, Haryana", "Bhiwani, Haryana", "Faridabad, Haryana", "Fatehabad, Haryana",
  "Gurugram (Gurgaon), Haryana", "Hisar, Haryana", "Jhajjar, Haryana", "Jind, Haryana", "Kaithal, Haryana",
  "Karnal, Haryana", "Kurukshetra, Haryana", "Palwal, Haryana", "Panchkula, Haryana", "Panipat, Haryana",
  "Rewari, Haryana", "Rohtak, Haryana", "Sirsa, Haryana", "Sonipat, Haryana", "Thanesar, Haryana", "Yamunanagar, Haryana",
  // Himachal Pradesh
  "Baddi, Himachal Pradesh", "Bilaspur, Himachal Pradesh", "Chamba, Himachal Pradesh", "Dharamshala, Himachal Pradesh",
  "Hamirpur, Himachal Pradesh", "Kullu, Himachal Pradesh", "Mandi, Himachal Pradesh", "Nahan, Himachal Pradesh",
  "Palampur, Himachal Pradesh", "Paonta Sahib, Himachal Pradesh", "Shimla, Himachal Pradesh", "Solan, Himachal Pradesh",
  "Sundarnagar, Himachal Pradesh", "Una, Himachal Pradesh",
  // Jharkhand
  "Adityapur, Jharkhand", "Bokaro Steel City, Jharkhand", "Chaibasa, Jharkhand", "Chirkunda, Jharkhand",
  "Deoghar, Jharkhand", "Dhanbad, Jharkhand", "Dumka, Jharkhand", "Giridih, Jharkhand", "Hazaribagh, Jharkhand",
  "Jamshedpur, Jharkhand", "Medininagar (Daltonganj), Jharkhand", "Phusro, Jharkhand", "Ramgarh, Jharkhand",
  "Ranchi, Jharkhand", "Sahebganj, Jharkhand",
  // Karnataka
  "Bagalkot, Karnataka", "Ballari (Bellary), Karnataka", "Belagavi (Belgaum), Karnataka", "Bengaluru (Bangalore), Karnataka",
  "Bidar, Karnataka", "Chikkamagaluru, Karnataka", "Chitradurga, Karnataka", "Davangere, Karnataka", "Gadag-Betageri, Karnataka",
  "Hassan, Karnataka", "Hosapete (Hospet), Karnataka", "Hubli-Dharwad, Karnataka", "Kalaburagi (Gulbarga), Karnataka",
  "Karwar, Karnataka", "Kolar, Karnataka", "Mandya, Karnataka", "Mangaluru (Mangalore), Karnataka", "Mysuru (Mysore), Karnataka",
  "Raichur, Karnataka", "Robertsonpet (KGF), Karnataka", "Shivamogga (Shimoga), Karnataka", "Tumakuru (Tumkur), Karnataka",
  "Udupi, Karnataka", "Vijayapura (Bijapur), Karnataka",
  // Kerala
  "Alappuzha, Kerala", "Changanassery, Kerala", "Idukki, Kerala", "Kannur, Kerala", "Kasaragod, Kerala",
  "Kochi (Cochin), Kerala", "Kollam, Kerala", "Kottayam, Kerala", "Kozhikode (Calicut), Kerala", "Malappuram, Kerala",
  "Palakkad, Kerala", "Pathanamthitta, Kerala", "Thiruvananthapuram (Trivandrum), Kerala", "Thrissur, Kerala",
  "Thiruvalla, Kerala", "Wayanad, Kerala",
  // Madhya Pradesh
  "Bhind, Madhya Pradesh", "Bhopal, Madhya Pradesh", "Burhanpur, Madhya Pradesh", "Chhatarpur, Madhya Pradesh",
  "Chhindwara, Madhya Pradesh", "Damoh, Madhya Pradesh", "Dewas, Madhya Pradesh", "Guna, Madhya Pradesh",
  "Gwalior, Madhya Pradesh", "Hoshangabad, Madhya Pradesh", "Indore, Madhya Pradesh", "Jabalpur, Madhya Pradesh",
  "Katni, Madhya Pradesh", "Khandwa, Madhya Pradesh", "Khargone, Madhya Pradesh", "Mandsaur, Madhya Pradesh",
  "Morena, Madhya Pradesh", "Neemuch, Madhya Pradesh", "Ratlam, Madhya Pradesh", "Rewa, Madhya Pradesh",
  "Sagar, Madhya Pradesh", "Satna, Madhya Pradesh", "Sehore, Madhya Pradesh", "Seoni, Madhya Pradesh",
  "Shahdol, Madhya Pradesh", "Shivpuri, Madhya Pradesh", "Singrauli, Madhya Pradesh", "Ujjain, Madhya Pradesh",
  "Vidisha, Madhya Pradesh",
  // Maharashtra
  "Ahmednagar, Maharashtra", "Akola, Maharashtra", "Amravati, Maharashtra", "Aurangabad (Chhatrapati Sambhajinagar), Maharashtra",
  "Badlapur, Maharashtra", "Barshi, Maharashtra", "Beed, Maharashtra", "Bhiwandi, Maharashtra", "Bhusawal, Maharashtra",
  "Chandrapur, Maharashtra", "Dhule, Maharashtra", "Gondia, Maharashtra", "Ichalkaranji, Maharashtra",
  "Jalgaon, Maharashtra", "Jalna, Maharashtra", "Kalyan-Dombivli, Maharashtra", "Kolhapur, Maharashtra",
  "Latur, Maharashtra", "Malegaon, Maharashtra", "Mira-Bhayandar, Maharashtra", "Mumbai, Maharashtra",
  "Nagpur, Maharashtra", "Nanded, Maharashtra", "Nandurbar, Maharashtra", "Nashik, Maharashtra", "Navi Mumbai, Maharashtra",
  "Palghar, Maharashtra", "Panvel, Maharashtra", "Parbhani, Maharashtra", "Pimpri-Chinchwad, Maharashtra",
  "Pune, Maharashtra", "Ratnagiri, Maharashtra", "Sangli-Miraj-Kupwad, Maharashtra", "Satara, Maharashtra",
  "Solapur, Maharashtra", "Thane, Maharashtra", "Ulhasnagar, Maharashtra", "Vasai-Virar, Maharashtra",
  "Wardha, Maharashtra", "Yavatmal, Maharashtra",
  // Manipur
  "Bishnupur, Manipur", "Churachandpur, Manipur", "Imphal, Manipur", "Kakching, Manipur", "Thoubal, Manipur",
  // Meghalaya
  "Jowai, Meghalaya", "Nongstoin, Meghalaya", "Shillong, Meghalaya", "Tura, Meghalaya",
  // Mizoram
  "Aizawl, Mizoram", "Champhai, Mizoram", "Lunglei, Mizoram", "Saiha, Mizoram",
  // Nagaland
  "Dimapur, Nagaland", "Kohima, Nagaland", "Mokokchung, Nagaland", "Tuensang, Nagaland", "Wokha, Nagaland", "Zunheboto, Nagaland",
  // Odisha
  "Balangir, Odisha", "Balasore (Baleshwar), Odisha", "Baripada, Odisha", "Bhadrak, Odisha", "Bhubaneswar, Odisha",
  "Brahmapur (Berhampur), Odisha", "Cuttack, Odisha", "Dhenkanal, Odisha", "Jharsuguda, Odisha", "Jeypore, Odisha",
  "Keonjhar, Odisha", "Puri, Odisha", "Rayagada, Odisha", "Rourkela, Odisha", "Sambalpur, Odisha",
  // Punjab
  "Abohar, Punjab", "Amritsar, Punjab", "Barnala, Punjab", "Batala, Punjab", "Bathinda, Punjab", "Firozpur, Punjab",
  "Gurdaspur, Punjab", "Hoshiarpur, Punjab", "Jalandhar, Punjab", "Kapurthala, Punjab", "Khanna, Punjab",
  "Ludhiana, Punjab", "Malerkotla, Punjab", "Moga, Punjab", "Mohali (SAS Nagar), Punjab", "Muktsar, Punjab",
  "Pathankot, Punjab", "Patiala, Punjab", "Phagwara, Punjab", "Rajpura, Punjab", "Sangrur, Punjab",
  // Rajasthan
  "Ajmer, Rajasthan", "Alwar, Rajasthan", "Banswara, Rajasthan", "Baran, Rajasthan", "Barmer, Rajasthan",
  "Bharatpur, Rajasthan", "Bhilwara, Rajasthan", "Bhiwadi, Rajasthan", "Bikaner, Rajasthan", "Bundi, Rajasthan",
  "Chittorgarh, Rajasthan", "Churu, Rajasthan", "Dholpur, Rajasthan", "Dungarpur, Rajasthan", "Hanumangarh, Rajasthan",
  "Jaipur, Rajasthan", "Jaisalmer, Rajasthan", "Jalore, Rajasthan", "Jhalawar, Rajasthan", "Jhunjhunu, Rajasthan",
  "Jodhpur, Rajasthan", "Kishangarh, Rajasthan", "Kota, Rajasthan", "Nagaur, Rajasthan", "Pali, Rajasthan",
  "Rajsamand, Rajasthan", "Sawai Madhopur, Rajasthan", "Sikar, Rajasthan", "Sri Ganganagar, Rajasthan",
  "Tonk, Rajasthan", "Udaipur, Rajasthan",
  // Sikkim
  "Gangtok, Sikkim", "Gyalshing, Sikkim", "Mangan, Sikkim", "Namchi, Sikkim", "Rangpo, Sikkim",
  // Tamil Nadu
  "Ambur, Tamil Nadu", "Avadi, Tamil Nadu", "Chennai, Tamil Nadu", "Coimbatore, Tamil Nadu", "Cuddalore, Tamil Nadu",
  "Dindigul, Tamil Nadu", "Erode, Tamil Nadu", "Hosur, Tamil Nadu", "Kancheepuram, Tamil Nadu", "Karaikudi, Tamil Nadu",
  "Karur, Tamil Nadu", "Kumbakonam, Tamil Nadu", "Madurai, Tamil Nadu", "Nagapattinam, Tamil Nadu", "Nagercoil, Tamil Nadu",
  "Neyveli, Tamil Nadu", "Pudukkottai, Tamil Nadu", "Rajapalayam, Tamil Nadu", "Salem, Tamil Nadu", "Sivakasi, Tamil Nadu",
  "Thanjavur, Tamil Nadu", "Thoothukudi (Tuticorin), Tamil Nadu", "Tiruchirappalli (Trichy), Tamil Nadu",
  "Tirunelveli, Tamil Nadu", "Tiruppur, Tamil Nadu", "Tiruvannamalai, Tamil Nadu", "Udhagamandalam (Ooty), Tamil Nadu",
  "Vellore, Tamil Nadu", "Viluppuram, Tamil Nadu",
  // Telangana
  "Adilabad, Telangana", "Hyderabad, Telangana", "Jagtial, Telangana", "Kamareddy, Telangana", "Karimnagar, Telangana",
  "Khammam, Telangana", "Kothagudem, Telangana", "Mahbubnagar, Telangana", "Mancherial, Telangana", "Miryalaguda, Telangana",
  "Nalgonda, Telangana", "Nizamabad, Telangana", "Ramagundam, Telangana", "Siddipet, Telangana", "Suryapet, Telangana",
  "Warangal, Telangana",
  // Tripura
  "Agartala, Tripura", "Belonia, Tripura", "Dharmanagar, Tripura", "Kailasahar, Tripura", "Udaipur, Tripura",
  // Uttar Pradesh
  "Agra, Uttar Pradesh", "Aligarh, Uttar Pradesh", "Amroha, Uttar Pradesh", "Ayodhya (Faizabad), Uttar Pradesh",
  "Azamgarh, Uttar Pradesh", "Badaun, Uttar Pradesh", "Bahraich, Uttar Pradesh", "Ballia, Uttar Pradesh",
  "Banda, Uttar Pradesh", "Barabanki, Uttar Pradesh", "Bareilly, Uttar Pradesh", "Basti, Uttar Pradesh",
  "Bijnor, Uttar Pradesh", "Bulandshahr, Uttar Pradesh", "Deoria, Uttar Pradesh", "Etah, Uttar Pradesh",
  "Etawah, Uttar Pradesh", "Farrukhabad, Uttar Pradesh", "Fatehpur, Uttar Pradesh", "Firozabad, Uttar Pradesh",
  "Ghaziabad, Uttar Pradesh", "Ghazipur, Uttar Pradesh", "Gonda, Uttar Pradesh", "Gorakhpur, Uttar Pradesh",
  "Greater Noida, Uttar Pradesh", "Hapur, Uttar Pradesh", "Hardoi, Uttar Pradesh", "Hathras, Uttar Pradesh",
  "Jaunpur, Uttar Pradesh", "Jhansi, Uttar Pradesh", "Kanpur, Uttar Pradesh", "Lakhimpur, Uttar Pradesh",
  "Lalitpur, Uttar Pradesh", "Lucknow, Uttar Pradesh", "Mainpuri, Uttar Pradesh", "Mathura, Uttar Pradesh",
  "Maunath Bhanjan (Mau), Uttar Pradesh", "Meerut, Uttar Pradesh", "Mirzapur, Uttar Pradesh", "Modinagar, Uttar Pradesh",
  "Moradabad, Uttar Pradesh", "Muzaffarnagar, Uttar Pradesh", "Noida, Uttar Pradesh", "Orai, Uttar Pradesh",
  "Pilibhit, Uttar Pradesh", "Prayagraj (Allahabad), Uttar Pradesh", "Raebareli, Uttar Pradesh", "Rampur, Uttar Pradesh",
  "Saharanpur, Uttar Pradesh", "Sambhal, Uttar Pradesh", "Shahjahanpur, Uttar Pradesh", "Shamli, Uttar Pradesh",
  "Sitapur, Uttar Pradesh", "Sultanpur, Uttar Pradesh", "Unnao, Uttar Pradesh", "Varanasi, Uttar Pradesh",
  // Uttarakhand
  "Almora, Uttarakhand", "Dehradun, Uttarakhand", "Haldwani, Uttarakhand", "Haridwar, Uttarakhand", "Kashipur, Uttarakhand",
  "Nainital, Uttarakhand", "Pithoragarh, Uttarakhand", "Rishikesh, Uttarakhand", "Roorkee, Uttarakhand", "Rudrapur, Uttarakhand",
  // West Bengal
  "Alipurduar, West Bengal", "Asansol, West Bengal", "Baharampur, West Bengal", "Balurghat, West Bengal",
  "Bankura, West Bengal", "Barasat, West Bengal", "Bardhaman (Burdwan), West Bengal", "Basirhat, West Bengal",
  "Bolpur, West Bengal", "Chakdaha, West Bengal", "Dankuni, West Bengal", "Darjeeling, West Bengal",
  "Durgapur, West Bengal", "Habra, West Bengal", "Haldia, West Bengal", "Howrah, West Bengal", "Jalpaiguri, West Bengal",
  "Kalyani, West Bengal", "Kharagpur, West Bengal", "Kolkata, West Bengal", "Krishnanagar, West Bengal",
  "Malda, West Bengal", "Medinipur, West Bengal", "Nabadwip, West Bengal", "Purulia, West Bengal",
  "Raiganj, West Bengal", "Ranaghat, West Bengal", "Shantipur, West Bengal", "Siliguri, West Bengal",
  // Union Territories
  "Port Blair, Andaman & Nicobar Islands",
  "Chandigarh, Chandigarh UT",
  "Silvassa, Dadra & Nagar Haveli", "Daman, Daman & Diu", "Diu, Daman & Diu",
  "Central Delhi, Delhi NCR", "East Delhi, Delhi NCR", "New Delhi, Delhi NCR", "North Delhi, Delhi NCR",
  "South Delhi, Delhi NCR", "West Delhi, Delhi NCR", "Dwarka, Delhi NCR", "Rohini, Delhi NCR", "Saket, Delhi NCR",
  "Anantnag, Jammu & Kashmir", "Baramulla, Jammu & Kashmir", "Jammu, Jammu & Kashmir", "Kathua, Jammu & Kashmir",
  "Srinagar, Jammu & Kashmir", "Sopore, Jammu & Kashmir", "Udhampur, Jammu & Kashmir",
  "Kargil, Ladakh", "Leh, Ladakh",
  "Kavaratti, Lakshadweep",
  "Karaikal, Puducherry", "Mahe, Puducherry", "Puducherry (Pondicherry), Puducherry", "Yanam, Puducherry"
];

export function ConsultationModal({ isOpen, onClose, defaultSubscribers }: ConsultationModalProps) {
  // Step tracking: 'phone_verification' | 'consultation_details'
  const [step, setStep] = useState<'phone_verification' | 'consultation_details'>('phone_verification');

  // Phone Verification State
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Consultation Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState('');
  const [cityQuery, setCityQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [subscribers, setSubscribers] = useState(defaultSubscribers || 1200);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyReferral = () => {
    const refCode = `YOWIFI-REF-${Math.floor(1000 + Math.random() * 9000)}`;
    const refUrl = `${window.location.origin}/partner-invite?ref=${encodeURIComponent(name || 'partner')}&code=${refCode}`;
    navigator.clipboard.writeText(refUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const filteredCities = useMemo(() => {
    if (!cityQuery.trim()) return ALL_INDIAN_CITIES_REGIONS.slice(0, 15);
    const queryLower = cityQuery.toLowerCase();
    return ALL_INDIAN_CITIES_REGIONS.filter(c => 
      c.toLowerCase().includes(queryLower)
    ).slice(0, 20);
  }, [cityQuery]);

  // Handle Send OTP
  const handleSendOtp = (e: FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setOtpError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    setOtpError('');
    // Generate 6 digit random OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpSent(true);
    setEnteredOtp('');
  };

  // Handle Verify OTP
  const handleVerifyOtp = (e: FormEvent) => {
    e.preventDefault();
    if (!enteredOtp.trim()) {
      setOtpError('Please enter the 6-digit OTP code sent to your mobile.');
      return;
    }
    if (enteredOtp !== generatedOtp && enteredOtp !== '123456') {
      setOtpError('Incorrect verification OTP. Please try again or click Auto-Fill.');
      return;
    }
    setOtpError('');
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('consultation_details');
    }, 600);
  };

  // Handle Final Submission
  const handleSubmitDetails = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !area.trim() || (!selectedCity && !cityQuery.trim())) {
      setFormError('Please fill in all required LCO details and select your City / Region.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    setCopied(false);
    setStep('phone_verification');
    setPhone('');
    setOtpSent(false);
    setEnteredOtp('');
    setGeneratedOtp('');
    setOtpError('');
    setName('');
    setEmail('');
    setArea('');
    setCityQuery('');
    setSelectedCity('');
    setFormError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-lg glass bg-slate-900/90 border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_80px_rgba(14,165,233,0.25)] overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={resetAndClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              /* SUCCESS SCREEN */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 px-4 space-y-6"
              >
                <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold font-display text-white">Consultation Requested!</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-sm mx-auto">
                    We have logged your verified LCO request for <span className="text-sky-400 font-semibold">{selectedCity || cityQuery}</span>. Our Regional Executive will connect with you within <span className="text-white font-medium">2 business hours</span>.
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left text-xs space-y-2 max-w-xs mx-auto text-slate-300">
                  <div className="flex justify-between"><span>Partner Name:</span> <span className="font-semibold text-white">{name}</span></div>
                  <div className="flex justify-between"><span>Verified Mobile:</span> <span className="font-semibold text-green-400">+91 {phone}</span></div>
                  <div className="flex justify-between"><span>Email Address:</span> <span className="font-semibold text-white">{email}</span></div>
                  <div className="flex justify-between"><span>Subscribers:</span> <span className="font-semibold text-sky-400">~{subscribers.toLocaleString()}</span></div>
                </div>
                <div className="space-y-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCopyReferral}
                    className="w-full border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 hover:text-white rounded-full py-6 font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/10"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-semibold">Referral Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-sky-400" />
                        <span>Copy Referral Link</span>
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={resetAndClose}
                    className="w-full bg-sky-600 hover:bg-sky-500 text-white rounded-full py-6 font-bold shadow-lg shadow-sky-600/30"
                  >
                    Return to Ecosystem
                  </Button>
                </div>
              </motion.div>
            ) : step === 'phone_verification' ? (
              /* STEP 1: PHONE & OTP VERIFICATION */
              <motion.div
                key="phone_verification"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="mb-6 space-y-2 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-3.5 h-3.5" /> Step 1: Mobile Verification
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-white tracking-tight">
                    Verify Your Mobile Number
                  </h3>
                  <p className="text-slate-400 text-xs md:text-sm">
                    For security and executive priority scheduling, please verify your 10-digit Indian mobile number with a one-time OTP first.
                  </p>
                </div>

                {otpError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs flex items-center gap-2">
                    <span>⚠️</span> {otpError}
                  </div>
                )}

                {!otpSent ? (
                  /* PHONE NUMBER INPUT FORM */
                  <form onSubmit={handleSendOtp} className="space-y-5 text-left">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-sky-400" /> Enter Indian Mobile Number *
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-4 text-slate-400 text-sm font-mono font-bold bg-slate-900 px-2 py-1 rounded border border-white/5">+91</span>
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="98765 43210"
                          value={phone}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            setPhone(val);
                          }}
                          className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-20 pr-4 py-3.5 text-base text-white placeholder:text-slate-600 font-mono tracking-wider focus:outline-none focus:border-sky-500 transition-colors"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 font-light">
                        We will send a 6-digit verification code to confirm you are an active regional operator.
                      </p>
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={phone.length < 10}
                        className="w-full bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white rounded-full py-7 text-base font-bold shadow-xl shadow-sky-600/30 group transition-all"
                      >
                        <span className="flex items-center justify-center gap-2">
                          Send Verification OTP <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </Button>
                      <p className="text-[10px] text-slate-500 text-center mt-3 uppercase tracking-wider">
                        🔒 Instant OTP Generation • No Spam Guaranteed
                      </p>
                    </div>
                  </form>
                ) : (
                  /* OTP VERIFICATION FORM */
                  <form onSubmit={handleVerifyOtp} className="space-y-5 text-left animate-in fade-in zoom-in duration-300">
                    {/* Simulated SMS Toast for Preview */}
                    <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sky-400 flex items-center gap-1.5">
                          <KeyRound className="w-4 h-4" /> Simulated SMS Gateway
                        </span>
                        <button
                          type="button"
                          onClick={() => setEnteredOtp(generatedOtp)}
                          className="text-[11px] bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-2.5 py-1 rounded-lg transition-all shadow"
                        >
                          Auto-Fill OTP
                        </button>
                      </div>
                      <p className="text-slate-300">
                        Your YO WiFi LCO partner verification OTP is: <span className="font-mono font-bold text-white bg-slate-950 px-2 py-0.5 rounded border border-white/10 text-sm tracking-widest">{generatedOtp}</span>
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <KeyRound className="w-3.5 h-3.5 text-sky-400" /> Enter 6-Digit OTP *
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setOtpSent(false);
                            setEnteredOtp('');
                          }}
                          className="text-[11px] text-sky-400 hover:underline flex items-center gap-1"
                        >
                          <RefreshCw className="w-3 h-3" /> Change Number (+91 {phone})
                        </button>
                      </div>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        placeholder="••••••"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3.5 text-xl text-center text-white placeholder:text-slate-600 font-mono tracking-[0.5em] focus:outline-none focus:border-sky-500 transition-colors"
                      />
                    </div>

                    <div className="pt-2 flex flex-col gap-3">
                      <Button
                        type="submit"
                        disabled={enteredOtp.length < 6 || isVerifying}
                        className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white rounded-full py-7 text-base font-bold shadow-xl shadow-green-600/30 group transition-all"
                      >
                        {isVerifying ? (
                          <span className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Verifying OTP...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            Verify & Proceed to LCO Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        )}
                      </Button>
                      <button
                        type="button"
                        onClick={() => {
                          const code = Math.floor(100000 + Math.random() * 900000).toString();
                          setGeneratedOtp(code);
                          setEnteredOtp('');
                          setOtpError('');
                        }}
                        className="text-xs text-slate-400 hover:text-white text-center transition-colors"
                      >
                        Didn't receive OTP? <span className="text-sky-400 underline">Resend New OTP</span>
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            ) : (
              /* STEP 2: CONSULTATION DETAILS (AFTER OTP VERIFICATION) */
              <motion.div
                key="consultation_details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="mb-6 space-y-2 text-left">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-widest">
                      <Check className="w-3.5 h-3.5" /> Mobile Verified: +91 {phone}
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep('phone_verification')}
                      className="text-[11px] text-slate-400 hover:text-sky-400 underline transition-colors"
                    >
                      Change
                    </button>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-white tracking-tight">
                    Request Private Consultation
                  </h3>
                  <p className="text-slate-400 text-xs md:text-sm">
                    Step 2: Enter your LCO operational details and select your Indian city/region to schedule your growth roadmap session.
                  </p>
                </div>

                {formError && (
                  <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs">
                    {formError}
                  </div>
                )}

                <form onSubmit={handleSubmitDetails} className="space-y-3.5 text-left">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-sky-400" /> LCO Owner / Operator Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-sky-400" /> Official Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rajesh@sharmafibernet.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  {/* Area / Locality */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-sky-400" /> Area / Locality / Society Grid *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Andheri West, Sector 62, Whitefield Grid"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                    />
                  </div>

                  {/* City Selector with Search across ALL Indian Cities/Regions */}
                  <div className="space-y-1 relative">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-sky-400" /> All Indian City / Region *</span>
                      <span className="text-[10px] text-sky-400 font-normal">300+ Indian Hubs Supported</span>
                    </label>
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="Search any Indian City, State or Region..."
                        value={selectedCity || cityQuery}
                        onChange={(e) => {
                          setCityQuery(e.target.value);
                          setSelectedCity('');
                          setShowCityDropdown(true);
                        }}
                        onFocus={() => setShowCityDropdown(true)}
                        className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500 transition-colors"
                      />
                      {(selectedCity || cityQuery) && (
                        <button
                          type="button"
                          onClick={() => { setSelectedCity(''); setCityQuery(''); }}
                          className="absolute right-3 top-3 text-slate-500 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {showCityDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute left-0 right-0 top-full mt-1.5 bg-slate-900 border border-white/15 rounded-2xl shadow-2xl max-h-52 overflow-y-auto z-30 divide-y divide-white/5"
                        >
                          {filteredCities.length > 0 ? (
                            filteredCities.map((city, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  setSelectedCity(city);
                                  setCityQuery(city);
                                  setShowCityDropdown(false);
                                }}
                                className="w-full text-left px-4 py-2.5 text-xs text-slate-300 hover:bg-sky-500/20 hover:text-white transition-colors flex items-center justify-between"
                              >
                                <span className="font-medium">{city}</span>
                                <span className="text-[10px] text-sky-400/80 uppercase font-mono bg-sky-500/10 px-2 py-0.5 rounded">Active Grid</span>
                              </button>
                            ))
                          ) : (
                            <div
                              onClick={() => {
                                setSelectedCity(cityQuery);
                                setShowCityDropdown(false);
                              }}
                              className="p-3 text-xs text-sky-400 hover:bg-sky-500/10 cursor-pointer text-center font-medium"
                            >
                              Add custom Indian region "{cityQuery}"
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Subscriber Count Slider & Input Field */}
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400">
                      <span>Current Subscriber Base *</span>
                      <div className="flex items-center gap-1.5 bg-slate-950/80 border border-white/10 px-2.5 py-1 rounded-xl">
                        <input
                          type="number"
                          min="1"
                          max="500000"
                          value={subscribers || ''}
                          onChange={(e) => setSubscribers(Math.max(0, Number(e.target.value)))}
                          className="w-20 bg-transparent text-right font-mono font-bold text-sky-400 text-sm focus:outline-none"
                          placeholder="1200"
                        />
                        <span className="text-[11px] text-slate-400 font-normal lowercase">users</span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="200"
                      max="15000"
                      step="50"
                      value={Math.min(15000, subscribers)}
                      onChange={(e) => setSubscribers(Number(e.target.value))}
                      className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-sky-500"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>200</span>
                      <span>5,000</span>
                      <span>10,000</span>
                      <span>15,000+</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-sky-600 hover:bg-sky-500 text-white rounded-full py-6 text-base font-bold shadow-xl shadow-sky-600/30 group transition-all"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Encrypting & Scheduling...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Schedule Private Growth Call <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>
                    <p className="text-[10px] text-slate-500 text-center mt-2 uppercase tracking-wider">
                      🔒 100% Confidential • Verified Regional Operator Priority
                    </p>
                  </div>
                </form>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
