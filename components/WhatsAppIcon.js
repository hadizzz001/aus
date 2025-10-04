// components/WhatsAppIcon.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const WhatsAppIcon = () => {
  return (
<a
  href="https://wa.me/+96178776168"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    position: 'fixed',
    bottom: '10px',
    right: '10px',
    width: '80px',
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  }}
>
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <img
      src="https://res.cloudinary.com/dgram5txd/image/upload/v1751072046/Animation_-_1751071813414_vvsnmj.gif"
      alt="WhatsApp Animation"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'contain',
      }}
    />
    <img
      src="https://res.cloudinary.com/dgram5txd/image/upload/v1751071481/images-removebg-preview_1_ebbveh.png"
      alt="Overlay Icon"
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30%',
        height: '30%',
        objectFit: 'contain',
        pointerEvents: 'none',
      }}
    />
  </div>
</a>


  );
};

export default WhatsAppIcon;
