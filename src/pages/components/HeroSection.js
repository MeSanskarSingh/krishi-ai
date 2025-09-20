import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../personalStyles/HeroSection.module.css';

const HeroSection = () => {
  return (
    <div className={styles.wrapper}>
      <main className={styles.heroSection}>
        {/* Text Content */}
        <div className={styles.heroText}>
          <h1 className={styles.mainHeading}>
            Your Digital Krishi Sathi – Farming made smarter, easier and profitable
          </h1>
          <Link href="/dashboard" className={styles.ctaButton}>
            LET&apos;S GET STARTED
            {/* <span className={styles.arrow}>→</span>     */}

          </Link>
        </div>

        {/* Image Content */}
        <div className={styles.heroImageContainer}>
          <Image
            src="/images/farmer-main.png" // Path from 'public' directory
            alt="Illustration of a farmer in a field"
            width={380}
            height={570}
            id="farmer-image"
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.cautionText}>
          Caution: Predictions are for assistance, not substitutes for expert advice.
        </p>
        <div className={styles.footerLinks}>
          <Link href="/about" className='hover:scale-110 font-merritweather'><PersonIcon />&nbsp;About Us</Link>
          <Link href="mailto:sanskar.singh.168@gmail.com" className='hover:scale-110 font-merritweather'><EmailIcon />&nbsp; Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default HeroSection;