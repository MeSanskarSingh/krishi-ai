import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../personalStyles/Navbar.module.css';
import { useTranslation } from 'next-i18next';




const Navbar = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setDropdownOpen(false);
  };

  return (
    <nav className={`${styles.navbar} fixed top-0 w-full z-50 border-b-2 border-[#5A3C34]`}>
      {/* Logo Section */}
      <Link href="/" className={styles.logo}>
        <Image
          src="/images/main-logo.png"
          alt="Krishi AI Logo"
          width={50}
          height={50}
        />
        <span className={styles.logoText}>Krishi AI</span>
      </Link>

      {/* Navigation Links */}
      <ul className={styles.navLinks}>
        <li>
          <Link 
            href="/" 
            className={`font-merritweather ${router.pathname === '/' ? 'text-green-600 border-b-2 border-green-600' : ''}`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            href="/dashboard" 
            className={`font-merritweather ${router.pathname === '/dashboard' ? 'text-green-600 border-b-2 border-green-600' : ''}`}
          >
            Features
          </Link>
        </li>
        <li>
          <Link 
            href="/mission" 
            className={`font-merritweather ${router.pathname === '/mission' ? 'text-green-600 border-b-2 border-green-600' : ''}`}
          >
            Our Mission
          </Link>
        </li>
      </ul>

      {/* Language Selector */}
      <div className={styles.languageSelector}>
        <button
          className={styles.languageButton}
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          {selectedLanguage}
          <span className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.open : ''}`}>▼</span>
        </button>

        {isDropdownOpen && (
          <ul className={styles.dropdownMenu}>
            <li onClick={() => handleLanguageChange('English')}>English</li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
