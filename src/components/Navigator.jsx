import "boxicons/css/boxicons.min.css";
import { Link } from "react-router-dom";

function Navigator() {
  return (
    <div>
      <header className="header-blog">
        <h1 className="header-blog__title">Realworld Blog</h1>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/editor" className="nav-link">
                <i className="bx bx-pencil" />
                New Post
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/settings" className="nav-link">
                <i className="bx bxs-cog" />
                Settings
              </Link>
            </li>
            <li className="nav-item user-profile">
              <a href="/profile" className="nav-link">
                <i className="bx bxs-user" />
                eni9mu5
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navigator;
