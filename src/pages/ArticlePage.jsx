import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const API_URL = "https://realworld.habsida.net/api/articles";

function ArticlePage() {
  const { slug } = useParams(); // Получаем slug статьи из URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${API_URL}/${slug}`);
        if (!res.ok) throw new Error("Ошибка загрузки статьи");
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

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!article) return <div>Статья не найдена</div>;

  const date = new Date(article.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="page">
      <h1>{article.title}</h1>
      <div className="author-name">
        <span>{article.author.username}</span> |<span>{date}</span>
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
    </div>
  );
}

export default ArticlePage;
