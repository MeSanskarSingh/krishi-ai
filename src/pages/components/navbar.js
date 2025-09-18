import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../personalStyles/Navbar.module.css';

const Navbar = () => {
  // State for the selected language
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  
  // New state to manage if the dropdown is open or closed
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // This function now accepts the language directly from the list item's click event
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setDropdownOpen(false); // Close the dropdown after a selection is made
  };

  return (
    <nav className={styles.navbar}>
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
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/features">Features</Link>
        </li>
        <li>
          <Link href="/mission">Our Mission</Link>
        </li>
      </ul>

      {/* Fully Custom and Stylable Language Selector */}
      <div className={styles.languageSelector}>
        <button
          className={styles.languageButton}
          onClick={() => setDropdownOpen(!isDropdownOpen)} // Toggles the dropdown menu
        >
          {selectedLanguage}
          <span className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.open : ''}`}>▼</span>
        </button>

        {isDropdownOpen && (
          <ul className={styles.dropdownMenu}>
            <li onClick={() => handleLanguageChange('English')}>English</li>
            {/* THIS LINE IS NOW CORRECT */}
            <li onClick={() => handleLanguageChange('Malayalam')}>Malayalam</li>
            {/* <li onClick={() => handleLanguageChange('Hindi')}>Hindi</li> */}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;