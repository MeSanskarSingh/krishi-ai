import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import Image from "next/image";
import Link from "next/link";
import styles from "../personalStyles/HeroSection.module.css";

const HeroSection = () => {
  return (
    <div className="h-screen flex flex-col bg-[#FEF7EB] overflow-hidden">

      {/* Hero Section */}
      <main className="flex flex-1 items-center justify-center gap-16 px-10 lg:px-20">

        {/* Left Text Content */}
        <div className="max-w-xl space-y-8">

          <h1 className="text-5xl lg:text-6xl font-bold leading-[1.15] text-[#2f2f2f]">
            Your Digital <span className="text-[#3F9148]">Krishi Sathi</span>
          </h1>

          <p className="text-2xl lg:text-3xl mt-6 text-[#444] italic font-medium tracking-wide">
            Smarter farming starts here.
          </p>

          <Link href="/dashboard" className={styles.ctaButton}>
            LET&apos;S GET STARTED
          </Link>

        </div>

        {/* Right Image */}
        <div className="hidden md:flex items-center justify-center">
          <Image
            src="/images/farmer-main.png"
            alt="Illustration of a farmer in a field"
            width={420}
            height={600}
            className="object-contain max-h-[75vh]"
            priority
          />
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-[#3F9148] flex justify-between items-center px-10 lg:px-20 py-3 text-white">

        <p className="text-sm font-merritweather">
          Caution: Predictions are for assistance, not substitutes for expert advice.
        </p>

        <div className="flex gap-10 text-sm">

          <Link
            href="/about"
            className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
          >
            <PersonIcon fontSize="small" />
            About Us
          </Link>

          <Link
            href="mailto:sanskar.singh.168@gmail.com"
            className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
          >
            <EmailIcon fontSize="small" />
            Contact
          </Link>

        </div>

      </footer>
    </div>
  );
};

export default HeroSection;