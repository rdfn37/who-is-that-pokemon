const Footer = () => {
  return (
      <div className="container-fluid footer bg-dark text-white">
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div className="col-md-4 d-flex align-items-center">
            <span className="mb-3 mb-md-0 ">© 2022, Renato Dias</span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
              <a
                href="https://github.com/rdfn37"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fs-2 bi bi-github"></i>
              </a>
            </li>
            <li className="ms-3">
              <a
                href="https://www.linkedin.com/in/renato-dias-30489a181/"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fs-2 bi bi-linkedin"></i>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    
  );
};

export default Footer;
