import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import ArticlePage from './ArticlePage';
import PopularTags from './PopularTags';
import Pagination from './Pagination';

const API_URL = 'https://realworld.habsida.net/api/articles';

function Profile({ user }) {
  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState('my');

  /* Пагинация */
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}?limit=100`); // загружаем все статьи
        if (!res.ok) throw new Error('Ошибка загрузки');
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const itemsPerPage = 3;

  const articlesToShow = articles.filter((article) => {
    const isMine = article.author.username === user?.username;
    const isFavorite = user?.favoriteArticles?.includes(article.slug);
    return isMine || isFavorite;
  });

  const totalPages = Math.ceil(articlesToShow.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedArticles = articlesToShow.slice(startIndex, endIndex);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  // Лайки
  const handleLikes = (slug) => {
    setArticles((prevArticles) => prevArticles.map((article) => {
      if (article.slug === slug) {
        const liked = article.clicked || false; // если ещё не лайкали
        return {
          ...article,
          favoritesCount: liked
            ? article.favoritesCount - 1
            : article.favoritesCount + 1,
          clicked: !liked, // переключаем состояние
        };
      }
      return article;
    }));
  };

  return (
    <div className="articles-page profile">

      <div className="user">
        <div className="user-avatar">
          <img
            src="https://pm1.aminoapps.com/7620/1e77e3a13124a5f7b3bf5484eb5c2da285b3d02cr1-700-690v2_hq.jpg"
            alt="User Avatar"
            style={{ width: '132px', height: '132px', borderRadius: '50%' }}
          />
        </div>
        <div className="user-name">
          <h3>{user.username}</h3>
        </div>
        <div className="user-text">
          <button type="button" className="btn-text">
            <div className="heart">
              <i className="bx bx-heart-circle" />
            </div>
            <div className="text">
              Text
            </div>
          </button>
        </div>
      </div>
      {/* Теги */}
      <PopularTags />

      {loading && (
      <div>
        <div className="article-page__spin">
          <i className="bx bx-revision spin" />
          <div className="article-loading">Loading</div>
        </div>
      </div>
      )}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Статьи */}
      {!loading
          && !error
          && paginatedArticles.map((article) => {
            const date = new Date(article.createdAt);
            const formattedDate = date.toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });

            return (
              <div key={article.slug} className="page">
                <div className="page-header">
                  <div className="page-author">
                    <div className="page-author-icon">
                      <i className="bx bxs-user" />
                    </div>
                    <div className="page-author-card">
                      <div className="author-name">
                        {article.author.username}
                      </div>
                      <div className="page-date">{formattedDate}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleLikes(article.slug)}
                    className="button-likes"
                  >
                    <div className="page-likes">
                      <i className="bx bxs-heart" />
                      {' '}
                      {article.favoritesCount}
                    </div>
                  </button>
                </div>

                <div className="page-card">
                  <div className="page-title">
                    <Link to={`/articles/${article.slug}`}>
                      {article.title}
                    </Link>
                  </div>
                  <div className="page-description">{article.description}</div>
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
                </div>
              </div>
            );
          })}

      {/* Pagination внизу страницы */}
      <div className="paginator">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          pages={pages}
        />
      </div>
    </div>
  );
}
export default Profile;
