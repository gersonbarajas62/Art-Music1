"use client";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#121212',
        color: '#fff',
        padding: '40px 20px',
        textAlign: 'center',
        borderTop: '1px solid #333',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Logo and Description */}
        <div>
          <h1 style={{ fontSize: '24px', margin: '0 0 10px' }}>Artmusic</h1>
          <p style={{ fontSize: '14px', color: '#bbb' }}>
            Your destination for the best rock and vinyl records. Explore genres, discover music, and find your next favorite record.
          </p>
        </div>

        {/* Navigation Links */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '30px',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#6c63ff')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#fff')}
          >
            Home
          </a>
          <a
            href="#"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#6c63ff')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#fff')}
          >
            Genres
          </a>
          <a
            href="#"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#6c63ff')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#fff')}
          >
            Vinyls
          </a>
          <a
            href="#"
            style={{
              color: '#fff',
              textDecoration: 'none',
              fontSize: '14px',
              transition: 'color 0.3s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#6c63ff')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#fff')}
          >
            Contact
          </a>
        </div>

        {/* Social Media Icons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <a href="#" aria-label="Facebook" style={{ color: '#fff', fontSize: '18px' }}>
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" aria-label="Twitter" style={{ color: '#fff', fontSize: '18px' }}>
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" aria-label="Instagram" style={{ color: '#fff', fontSize: '18px' }}>
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="YouTube" style={{ color: '#fff', fontSize: '18px' }}>
            <i className="fab fa-youtube"></i>
          </a>
        </div>

        {/* Footer Bottom */}
        <div
          style={{
            borderTop: '1px solid #333',
            padding: '20px 0',
            marginTop: '20px',
            fontSize: '12px',
            color: '#bbb',
          }}
        >
          <p>© 2025 ART Music. All rights reserved.</p>
          <p>
            Built with passion for music. <a href="#" style={{ color: '#6c63ff', textDecoration: 'none' }}>Privacy Policy</a> | <a href="#" style={{ color: '#6c63ff', textDecoration: 'none' }}>Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
