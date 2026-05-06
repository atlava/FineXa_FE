import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="logo">Logo App</div>
      <ul className="nav-menu">
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;