import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const API_URL = 'https://realworld.habsida.net/api/articles';

function ArticlePage({ user, toggleFavorite, isFavorite }) {
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

  if (loading) {
    return (
      <div className="article-page__spin">
        <i className="bx bx-revision spin" />
        <div className="article-loading">Loading</div>
      </div>
    );
  }
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!article) return <div>Article not found</div>;

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

  console.log(isFavorite(article.slug));

  return (
    <div className="article-page-open">
      <div className="page-open">
        <div className="page-open-title">
          <h1>{article.title}</h1>
        </div>
        <div className="page-author">
          <div className="page-author-icon">
            <i className="bx bx-user-circle" />
          </div>
          <div className="page-author-card">
            <div className="author-name">{article.author.username}</div>
            <div className="page-date">{date}</div>
          </div>
        </div>
      </div>
      <div className="page">
        <div className="article-content">
          <ReactMarkdown>{article.body}</ReactMarkdown>
        </div>

        <div className="page-tag__article">
          {article.tagList
            && article.tagList.map(
              (tag) => article.tagList && (
              <div key={tag} className="article-tag">
                {tag}
              </div>
              ),
            )}
        </div>

        <div className="article-fav">
          {user && user.username === article.author.username && (
            <div className="fav-button">
              <button type="button" className="fav-artl" onClick={handleEdit}>
                Edit
              </button>
              <button
                type="button"
                className="fav-artl"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          )}

          <div className="article-fav-add">
            <div className="page-author fav">
              <div className="page-author-icon">
                <i className="bx bx-user-circle" />
              </div>
              <div className="page-author-card">
                <div className="author-name">{article.author.username}</div>
                <div className="page-date">{date}</div>
              </div>
            </div>
            <div className="page-author fav">
              <button type="button" className={!isFavorite(article.slug) ? 'fav-artl-none' : 'fav-artl-yes'} onClick={() => toggleFavorite(article.slug)}>
                Favorite article
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
