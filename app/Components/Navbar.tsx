const NavBar = () => (
    <nav style={{
      backgroundColor: '#1e1e1e',
      padding: '10px 20px',
      borderBottom: '2px solid #ff0000',
      fontFamily: 'Arial, sans-serif',
    }}>
      <ul style={{
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        justifyContent: 'space-around',
        color: '#ffffff',
      }}>
        <li style={{ padding: '0 10px' }}><a href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>Home</a></li>
        <li style={{ padding: '0 10px' }}><a href="/categories" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>Categories</a></li>
        <li style={{ padding: '0 10px' }}><a href="/cart" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>Cart</a></li>
        <li style={{ padding: '0 10px' }}><a href="/contact" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: 'bold' }}>Contact Us</a></li>
      </ul>
    </nav>
  );
  
  export default NavBar;
  