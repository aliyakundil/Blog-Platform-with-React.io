import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ArticlePage from "./ArticlePage";
import PopularTags from "./PopularTags";
import Pagination from "./Pagination";

const API_URL = "https://realworld.habsida.net/api/articles";

function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((err) => console.error("Ошибка загрузки", err));
  }, []);

  /* Пагинация */
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 3;

  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `${API_URL}?limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`,
        );
        if (!res.ok) throw new Error("Ошибка загрузки");
        const data = await res.json();

        setArticles(data.articles || []);
        setTotalPages(
          Math.ceil(
            (data.articlesCount || data.articles.length) / itemsPerPage,
          ),
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage]);

  return (
    <div className="articles-page">
      {/* Теги */}
      <PopularTags />

      {loading && <div>Загрузка...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Статьи */}
      {!loading &&
        !error &&
        articles.map((article) => {
          const date = new Date(article.createdAt);
          const formattedDate = date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });

          return (
            <div key={article.slug} className="page">
              <div className="page-header">
                <div className="page-author">
                  <div className="page-author-icon">
                    <i className="bx bxs-user"></i>
                  </div>
                  <div class EName="page-author-card">
                    <div className="author-name">{article.author.username}</div>
                    <div className="page-date">{formattedDate}</div>
                  </div>
                </div>
                <div className="page-likes">
                  <i className="bx bxs-heart"></i>
                </div>
              </div>

              <div className="page-card">
                <div className="page-title">
                  <Link to={`/articles/${article.slug}`}>{article.title}</Link>
                </div>
                <div className="page-description">{article.description}</div>
                <div className="page-tag__article">
                  {article.tagList.map(
                    (tag) =>
                      article.tagList && (
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
export default ArticlesPage;
