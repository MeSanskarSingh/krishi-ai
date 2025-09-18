

// const navbar = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// // export default navbar;
// const navbar = () => {
//   return (
//     <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#fff' }}>
//       <div style={{ display: 'flex', alignItems: 'center' }}>
//         {/* Placeholder for logo */}
//         <div style={{ width: 40, height: 40, backgroundColor: '#4CAF50', borderRadius: 8 }}></div>
//         <span style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 20 }}>Krishi AI</span>
//       </div>

//       <nav>
//         <ul style={{ display: 'flex', listStyle: 'none', gap: 20, margin: 0, padding: 0 }}>
//           <li style={{ cursor: 'pointer' }}>Home</li>
//           <li style={{ cursor: 'pointer' }}>Features</li>
//           <li style={{ cursor: 'pointer' }}>Our Mission</li>
//         </ul>
//       </nav>

//       <select style={{ padding: '5px 10px', borderRadius: 4, border: '1px solid #ccc' }}>
//         <option>English</option>
//         <option>Malyalam</option>
//       </select>
//     </header>
//   );
// };

// export default navbar;

// "use client";
// import React from "react";
import "../personalStyles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="../../krishi-ai/main-logo.png" alt="Krishi AI Logo" className="logo" />
        <span>Krishi AI</span>
      </div>
      <ul className="navbar-links">
        <li>Home</li>
        <li>Features</li>
        <li>Our Mission</li>
        <li>
          <select className="lang-dropdown">
            <option>English</option>
            <option>Malyalam</option>
          </select>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

