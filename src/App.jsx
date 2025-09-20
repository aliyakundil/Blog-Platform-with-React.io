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
import Profile from './auth/Profile';
import NewArticle from './pages/NewArticle';

function App() {
  const [user, setUser] = useState();
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
      <Navigator user={user} />
      <Hero />
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/new-article" element={user ? <NewArticle /> : <Navigate to="/" />} />
        <Route path="/sign-in" element={<Page setUser={setUser} />} />
        <Route path="/sign-up" element={<Register setUser={setUser} />} />
        <Route
          path="/profile"
          element={
            { user } ? (
              <Profile user={user} setUser={setUser} />
            ) : (
              <AuthForm user={user} setUser={setUser} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
