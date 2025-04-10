import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2025 Vinay Store. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: { textAlign: 'center', padding: '10px', background: '#3498db', color: '#fff', position: 'fixed', bottom: 0, width: '100%' },
};

export default Footer;