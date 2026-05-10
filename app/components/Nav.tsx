export default function Nav() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 40px',
      background: '#000',
    }}>
      <ul style={{ display: 'flex', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
        {['Work', 'About', 'Contact'].map((item) => (
          <li key={item}>
            <a
              href="#"
              style={{
                color: 'white',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: 500,
                opacity: 0.85,
              }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
        <span style={{ fontFamily: 'HelveticaSBold', color: 'white', fontSize: '1.2rem', fontWeight: 'bold' }}>
          Tanner
        </span>
        <span style={{ fontFamily: 'BaskervvilleItalic', color: 'white', fontSize: '1.2rem', fontStyle: 'italic' }}>
          Curd
        </span>
      </div>
    </nav>
  )
}
