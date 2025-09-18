

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
            LET'S GET STARTED
            {/* <span className={styles.arrow}>→</span>     */}

          </Link>
        </div>

        {/* Image Content */}
        <div className={styles.heroImageContainer}>
          <Image
            src="/images/farmer-main.png" // Path from 'public' directory
            alt="Illustration of a farmer in a field"
            width={340}
            height={510}
            // className={styles.heroImage}
          />
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.cautionText}>
          Caution: Predictions are for assistance, not substitutes for expert advice.
        </p>
        <div className={styles.footerLinks}>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default HeroSection;



{/* <div><a class="click-btn btn-style901" href="#">Hover me</a></div>

.btn-style901 {
  $btn-color: #dd7e2a;
  position: relative;
  background-color: $btn-color;
  border-color: $btn-color;
  color: #fff;
  overflow: hidden;
  &::before {
    width: 25px;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    content: "\f054";
    font-family: "FontAwesome";
    font-weight: bold;
    font-size: 10px;
    color: #fff;
    text-indent: 5px;
    border-radius: 0 50% 50% 0;
    background-color: rgb(223 183 148 / 73%);
    transform: translate(-20%, 0) scale(0, 1);
    transform-origin: left center;
    transition: all 0.25s;
    z-index: 1;
  }
  &:hover {
    text-indent: 20px;
    &::before {
      transform: translate(-20%, 0) scale(1, 1);
    }
  }
} */}