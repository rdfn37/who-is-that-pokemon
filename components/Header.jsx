import Image from 'next/image';
import Logo from '../assets/images/logo.png'

const Header = () => {
  return (
    <>
      <div className="container-fluid bg-light">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
          <a
            href="#"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
          >
            {/* <i className="bi bi-bootstrap-fill"></i> */}
            <Image src={Logo} alt="" height={80} width={500}/>
          </a>
        </header>
      </div>
    </>
  );
};

export default Header;
