import './App.css';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Navigator from './components/Navigator';
import ArticlePage from './pages/ArticlePage';
import ArticlesPage from './pages/ArticlesPage';
import AuthForm from './auth/AuthForm';
import Register from './auth/Register';
import Page from './auth/Page';
import Settings from './auth/Settings';
import NewArticle from './pages/NewArticle';
import EditArticle from './pages/EditArticle';
import Profile from './pages/Profile';

function App() {
  const [user, setUser] = useState(null);

  const toggleFavorite = (articleSlug) => {
    if (!user) return;

    const updatedFavorites = user.favoriteArticles?.includes(articleSlug)
      ? user.favoriteArticles.filter((slug) => slug !== articleSlug)
      : [...(user.favoriteArticles || []), articleSlug];

    const updatedUser = { ...user, favoriteArticles: updatedFavorites };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const isFavorite = (articleSlug) => user?.favoriteArticles?.includes(articleSlug);

  console.log(isFavorite)

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Ошибка чтения пользователя из localStorage', e);
        localStorage.removeItem('user'); // очищаем неправильное значение
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Navigator user={user} setUser={setUser} />
      {/* <Hero /> */}
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route
          path="/articles/:slug"
          element={(
            <ArticlePage
              user={user}
              toggleFavorite={toggleFavorite}
              isFavorite={isFavorite}
            />
          )}
        />
        <Route
          path="/new-article"
          element={
            user ? (
              <NewArticle user={user} setUser={setUser} />
            ) : (
              <Page setUser={setUser} />
            )
          }
        />
        <Route
          path="/articles/:slug/edit"
          element={
            user ? (
              <EditArticle user={user} setUser={setUser} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/sign-in" element={<Page setUser={setUser} />} />
        <Route path="/sign-up" element={<Register setUser={setUser} />} />
        <Route
          path="/settings"
          element={
            user ? (
              <Settings user={user} setUser={setUser} />
            ) : (
              <AuthForm user={user} setUser={setUser} />
            )
          }
        />
        <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
