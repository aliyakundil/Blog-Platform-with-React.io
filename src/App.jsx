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

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) setUser(savedUser);
  }, []);

  return (
    <BrowserRouter>
      <Navigator />
      <Hero user={user} />
      <Routes>
        <Route path="/" element={<ArticlesPage />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        {/* <Route path="/profile" element={<AuthForm />} />
        <Route path="/sign-up" element={<Register />} /> */}

        <Route path="/sign-in" element={<Register setUser={setUser} />} />
        <Route path="/sign-up" element={<Register setUser={setUser} />} />
        <Route
          path="/profile"
          element={
            user ? (
              <AuthForm user={user} setUser={setUser} />
            ) : (
              <Navigate to="/sign-in" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
