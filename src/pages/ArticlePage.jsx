import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const API_URL = 'https://realworld.habsida.net/api/articles';

function ArticlePage({ user }) {
  const navigate = useNavigate();
  const { slug } = useParams(); // Получаем slug статьи из URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${API_URL}/${slug}`);
        if (!res.ok) throw new Error('Ошибка загрузки статьи');
        const data = await res.json();
        setArticle(data.article);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) return <div className="article-page">Загрузка...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!article) return <div>Статья не найдена</div>;

  const date = new Date(article.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleEdit = () => {
    navigate(`/articles/${article.slug}/edit`, { state: { article } });
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Вы уверены, что хотите удалить эту статью?',
    );
    if (!confirmed) return;
    try {
      const response = await fetch(`${API_URL}/${slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${user.token}`,
        },
      });

      if (!response.ok) {
        console.log('Ошибка сервера:', response);
        return;
      }

      navigate('/');
    } catch (err) {
      if (err.errors && err.errors.body) {
        // выводим ошибки, которые пришли с сервера
        console.log('Ошибки сервера:', err.errors.body.join(', '));
      } else {
        console.log('Другая ошибка:', err.message);
      }
    }
  };

  return (
    <div className="article-page">
      <div className="page">
        <h1>{article.title}</h1>
        <div className="author-name">
          <span>{article.author.username}</span>
          {' '}
          |
          <span>{date}</span>
        </div>
        <div className="article-tags">
          {article.tagList.map((tag) => (
            <span key={tag} className="article-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="article-content">
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>

        <div className="article-change">
          {user && <button onClick={handleEdit}>Редактировать</button>}

          {user && <button onClick={handleDelete}>Удалить</button>}
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
