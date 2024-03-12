import React from 'react'
import  Logo  from "../assets/logo_sc.png";

const Header = () => {
  return (
    <header className="  text-white px-4 py-8  flex justify-center items-center">
      <img
        src={Logo} 
        alt="Wateen Self Care"
        
      />
    </header>
  );
}

export default Header