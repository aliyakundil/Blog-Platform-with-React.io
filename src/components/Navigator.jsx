import 'boxicons/css/boxicons.min.css';
import { useNavigate, Link } from 'react-router-dom';

function Navigator({ user, setUser }) {
  const navigate = useNavigate();
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
              <Link to="/new-article" className="nav-link">
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
              {user ? (
                <div className="nav-link">
                  <Link to="/profile" className="username-link">
                    <i className="bx bxs-user" />
                    {user.username}
                  </Link>

                  <div className="logout-wrapper">
                    <button
                      type="button"
                      className="logout-btn"
                      onClick={() => {
                        localStorage.removeItem('user');
                        // window.location.reload();
                        setUser(null); // очищаем состояние пользователя
                        navigate('/'); // перенаправляем на главную
                      }}
                    >
                      Log out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="nav-link">
                  {user ? (
                    <Link to="/profile">
                      <i className="bx bxs-user" />
                      {' '}
                      {user.username}
                    </Link>
                  ) : (
                    <Link to="/sign-in">
                      <i className="bx bxs-user" />
                      {' '}
                      Sign In
                    </Link>
                  )}
                </div>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Navigator;
