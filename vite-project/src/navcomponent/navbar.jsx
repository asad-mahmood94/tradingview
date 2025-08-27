import { useState, useEffect, useRef } from 'react';
import './navbar.css';
import { FaSearch, FaUserCircle, FaGlobe } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({ isLoginPage }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedItem, setHighlightedItem] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const searchRef = useRef(null);
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchFocus(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleSearch = () => {
    const foundItem = searchSuggestions.find(item =>
      item.symbol.toLowerCase() === searchTerm.toLowerCase()
    );
    setHighlightedItem(foundItem ? foundItem.symbol : null);
  };

  useEffect(() => {
    document.body.style.overflow = searchFocus ? 'hidden' : 'auto';
  }, [searchFocus]);

  const menuItems = [
    { label: 'Products', options: [
      { name: 'Supercharts', path: '/products/Supercharts', note: 'The one terminal to rule them all' },
      { name: 'INDIVIDUAL TOOLS', type: 'heading' },
      { name: 'Screeners', path: '/products/Screeners', note: 'Find anything with simple scan' },
      { name: 'Calenders', path: '/products/Calenders', note: 'Explore the world’s financial events' }
    ]},
    { label: 'Community', options: [
      { name: 'Trading ideas', path: '/Community/Trading-ideas', note: 'Get inspired for your next move' },
      { name: 'Indicators and strategies', path: '/Community/pine-script', note: 'Use analysis tools built in Pine Script' },
      { name: 'The leap', path: '/Community/charting-library', note: 'Compete for $50k prize pool and subscription extension' }
    ]},
    { label: 'Markets', options: [
      { name: 'Entire world', path: '/products/tradingview', note: 'A bird’s eye view of what’s moving' },
      { name: 'Countries', path: '/products/pine-script', note: 'All the world’s a trade' },
      { name: 'News', path: '/products/charting-library', note: 'Never miss a market beat' }
    ]},
    { label: 'Brokers', options: [
      { name: 'TradingView', path: '/products/tradingview' },
      { name: 'Pine Script', path: '/products/pine-script' },
      { name: 'Charting Library', path: '/products/charting-library' }
    ]},
    { label: 'More', options: [
      { name: 'Posts', path: '/More/Posts' },
      { name: 'Pine Script', path: '/products/pine-script' },
      { name: 'Charting Library', path: '/products/charting-library' }
    ]}
  ];

  const searchSuggestions = [
    { symbol: 'XAUUSD', name: 'GOLD' },
    { symbol: 'BTCUSDT', name: 'BITCOIN / TETHERUS' },
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF TRUST' },
    { symbol: 'NQ', name: 'E-MINI NASDAQ-100 FUTURES' },
    { symbol: 'TSLA', name: 'TESLA, INC.' },
    { symbol: 'NVDA', name: 'NVIDIA CORPORATION' }
  ];

  return (
    <>
      {!searchFocus && (
        <nav className="navbar">
          <div className="navbar-logo">
            <a href="/"><img src={logo} alt="Logo" /></a>
          </div>

          <div className="both-navbar">
            <div className="navbar-search" ref={searchRef}>
              <FaSearch className="search-icon" onClick={handleSearch} />
              <input
                type="text"
                placeholder="Search (Ctrl+K)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setSearchFocus(true)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            <div className="navbar-menu" ref={menuRef}>
              {menuItems.map((item) => (
                <div key={item.label} className="menu-item">
                  <button onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}>
                    {item.label}
                  </button>
                  {openDropdown === item.label && (
                    <div className="dropdown">
                      <ul>
                        {item.options.map((option, index) =>
                          option.type === 'heading' ? (
                            <div key={index} className="dropdown-heading">{option.name}</div>
                          ) : (
                            <li key={index}>
                              <Link to={option.path} className="dropdown-link" onClick={() => setOpenDropdown(null)}>
                                <div className="option-name">{option.name}</div>
                                {option.note && <div className="option-note">{option.note}</div>}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="navbar-right">
            <FaGlobe className="icon" />
            <FaUserCircle className="icon" />
            {isLoggedIn ? (
              <>
                <button onClick={handleLogout} className="get-started">Logout</button>
              </>
            ) : (
              <Link to="/registered" className="get-started">Get Started</Link>
            )}
          </div>
        </nav>
      )}

      {/* Overlay search UI */}
      <div className="outer" style={{ display: searchFocus ? 'block' : 'none' }}>
        <div className="outerNavbar">
          <div className="outer-search">
            <FaSearch className="outer-icon" />
            <input
              className="outer-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setSearchFocus(false)} className="outer-btn">x</button>
          </div>
        </div>

        <div className="outerBox">
          <ul className="ul">
            {searchSuggestions.map((item) => (
              <li
                key={item.symbol}
                style={{
                  backgroundColor: highlightedItem === item.symbol ? '#cce5ff' : 'transparent',
                  borderRadius: '5px',
                  padding: '10px',
                  cursor: 'pointer'
                }}
              >
                {item.symbol} - {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}