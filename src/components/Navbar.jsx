import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, ShoppingCart } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isSectorsDropdownOpen, setIsSectorsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navLinks = [
    { name: "About", path: "/", hasDropdown: false },
    { name: "Services", path: "/services", hasDropdown: false },
    {name: "Products", path: "/products", hasDropdown: false },
    { name: "Staff Login", path: "/login", hasDropdown: false },
    { name: "Staff Pin", path: "/pin", hasDropdown: false }

  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src="/images/aea-logo.webp" className="h-8 me-3" alt="AEA Logo" /> 
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link.hasDropdown ? (
                  <>
                    <button 
                      className="flex items-center text-gray-700 hover:text-avery-red transition-colors"
                      onClick={() => {
                        if (link.name === "Products") setIsProductsDropdownOpen(!isProductsDropdownOpen);
                        if (link.name === "Sectors") setIsSectorsDropdownOpen(!isSectorsDropdownOpen);
                      }}
                    >
                      {link.name}
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 hidden group-hover:block">
                      {link.dropdownItems.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-avery-red transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link 
                    to={link.path} 
                    className="text-gray-700 hover:text-avery-red transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>

         {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-700 hover:text-avery-red transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4">
          {navLinks.map((link, index) => (
            <div key={index} className="py-2">
              {link.hasDropdown ? (
                <>
                  <button 
                    className="flex items-center justify-between w-full text-gray-700 hover:text-avery-red transition-colors"
                    onClick={() => {
                      if (link.name === "Products") setIsProductsDropdownOpen(!isProductsDropdownOpen);
                      if (link.name === "Sectors") setIsSectorsDropdownOpen(!isSectorsDropdownOpen);
                    }}
                  >
                    {link.name}
                    <ChevronDown size={16} />
                  </button>
                  {((link.name === "Products" && isProductsDropdownOpen) || 
                    (link.name === "Sectors" && isSectorsDropdownOpen)) && (
                    <div className="pl-4 mt-2 space-y-2">
                      {link.dropdownItems.map((item, idx) => (
                        <Link
                          key={idx}
                          to={item.path}
                          className="block text-sm text-gray-600 hover:text-avery-red transition-colors"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link 
                  to={link.path} 
                  className="block text-gray-700 hover:text-avery-red transition-colors"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          <div className="flex items-center space-x-6 pt-4 border-t border-gray-100 mt-4">
            <button className="text-gray-700 hover:text-avery-red transition-colors">
              <Search size={20} />
            </button>
            <Link to="/cart" className="text-gray-700 hover:text-avery-red transition-colors">
              <ShoppingCart size={20} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;