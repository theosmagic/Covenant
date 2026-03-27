import Image from 'next/image';
import Logo from 'public/logo.svg';

const Header = () => {
  return (
    <div className="app-header-container">
      <div className="covenant-header-mark">
        <Image src={Logo} alt="logo" />
        <div className="covenant-header-title">Covenant</div>
        <div className="covenant-header-subtitle">The First Day</div>
      </div>
      <div className="covenant-header-copy">
        <p>
          Light is placed within the void, and the shell separates what is revealed from what remains in depth:
          sovereign, record, energy, and manifestation.
        </p>
      </div>
    </div>
  );
};

export default Header;
