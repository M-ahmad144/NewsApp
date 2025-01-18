import React, { useState, useEffect } from "react";
import "../style.css";
import Spinner from "./Spinner";
import NewsItem from "../Components/NewsItem";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Set fallback values for category and pageSize
  const category = props.category || "general"; // Default to "general" if undefined
  const pageSize = props.pageSize || 10; // Default to 10 if undefined

  useEffect(() => {
    if (!category) return; // Prevent execution if category is not passed
    document.title = `${
      category.charAt(0).toUpperCase() + category.slice(1)
    } - News`;
    fetchNews();
  }, [category]); // Depend on category to re-fetch if it changes

  const fetchNews = async (page = 1) => {
    props.setProgress(50);
    setLoading(true);

    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=11e8a3b8ec29467ab70d878333d8d56b`;

    try {
      const response = await fetch(url);
      props.setProgress(70);
      const parseData = await response.json();

      setArticles((prevArticles) =>
        page === 1
          ? parseData.articles
          : prevArticles.concat(parseData.articles)
      );
      setTotalResults(parseData.totalResults);
      setPage(page);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
      props.setProgress(100);
    }
  };

  const fetchMoreData = async () => {
    if (articles.length < totalResults && !loading) {
      fetchNews(page + 1);
    }
  };

  return (
    <div className="container my-2">
      <h2 className="my-5 text-center">
        <strong>
          Top Headlines - {category.charAt(0).toUpperCase() + category.slice(1)}
        </strong>
      </h2>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        {loading ? (
          <Spinner />
        ) : Array.isArray(articles) && articles.length > 0 ? (
          <div className="container">
            <div className="row">
              {articles.map((article, index) => (
                <div className="col-md-4" key={index}>
                  <NewsItem
                    title={article.title}
                    description={article.description}
                    imageUrl={article.urlToImage}
                    newsUrl={article.url}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>No articles available.</div>
        )}
      </InfiniteScroll>
    </div>
  );
};

export default News;
