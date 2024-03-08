import React from 'react';
import { Link, useLocation  } from 'react-router-dom';


const navLinkStyleCSS = {
  color: 'white',
  textDecoration: 'none',
  marginRight: '20px',
};

const activeLinkStyleCSS = { color: 'yellow', padding: '10px', border: '2px solid yellow', borderRadius: '25px', textDecoration:'none'};
const LayoutNavbar = () => {
  
  const location = useLocation();
  return (
    <nav style={{ backgroundColor: '#242424', color: 'white', padding: '10px' }}>
      <div style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', align:'center', maxWidth: '1200px', margin: '0 auto',
        }}
      >
        {/* <Link to="/" style={navLinkStyleCSS}> Olympic Summary Home </Link> */}
        <Link to="/" style={location.pathname === '/' ? activeLinkStyleCSS : navLinkStyleCSS}> Olympic Summary Home </Link>

        <Link to="/country-comparison" style={location.pathname === '/country-comparison' ? activeLinkStyleCSS : navLinkStyleCSS}  > Country-wise Comparison      </Link>

        <Link to="/athlete-analysis" style={location.pathname === '/athlete-analysis' ? activeLinkStyleCSS : navLinkStyleCSS}    > Athlete Performance Analysis </Link>
        
        <Link to="/historical-trends" style={location.pathname === '/historical-trends' ? activeLinkStyleCSS : navLinkStyleCSS}   > Historical Trends            </Link>

        <Link to="/demographic-insights" style={location.pathname === '/demographic-insights' ? activeLinkStyleCSS : navLinkStyleCSS}> Demographic Insights         </Link>
      </div>
    </nav>
  );
};

export default LayoutNavbar;