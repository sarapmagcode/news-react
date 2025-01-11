import { useEffect, useState } from 'react';
import { useFetcher, useSearchParams } from 'react-router-dom';
import { formatDate, truncateText } from '/src/utils/helpers.js';
import styles from './News.module.css';

const News = ({ baseUrl }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [newsList, setNewsList] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [submittedSearchTerm, setSubmittedSearchTerm] = useState(() => {
        return searchParams.get('search') || '';
    });
    const [currentCursor, setCurrentCursor] = useState('');
    const [nextCursor, setNextCursor] = useState('');

    useEffect(() => {
        const getNews = async () => {
            try {
                const requestUrl = submittedSearchTerm
                    ? `${baseUrl}?language=en&q=${submittedSearchTerm}&cursor=${currentCursor}`
                    : `${baseUrl}?language=en&cursor=${currentCursor}`;
                
                const response = await fetch(requestUrl, {
                    headers: {
                        'X-Api-Key': '9h_ST1l_cyCn84eIuZtp1KhA1f14S2MtG0sRYsjPXWE'
                    }
                });
                const data = await response.json();
    
                if (response.ok) {
                    setTotalResults(data.total_results);
                    setNewsList(data.data);
                    setNextCursor(data.next_cursor);
                } else {
                    console.error('Unexpected error:', response.status);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        getNews();
    }, [submittedSearchTerm, currentCursor]);

    useEffect(() => {
        if (searchParams.get('search') === null) {
            clearSearch();
        }
    }, [searchParams.get('search')]);

    useEffect(() => {
        if (searchParams.get('cursor') === null) {
            setCurrentCursor('');
            setNextCursor('');
        }
    }, [searchParams.get('cursor')]);

    const handleSearchForm = (event) => {
        event.preventDefault();
        setSubmittedSearchTerm(searchTerm);
        setSearchParams({
            ...(searchTerm && { search: searchTerm })
        });
        setCurrentCursor('');
        setNextCursor('');
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSubmittedSearchTerm('');
        setSearchParams({});
        setCurrentCursor('');
        setNextCursor('');
    };

    const handleNewsItemClick = (articleLink) => {
        window.open(articleLink, '_blank');
    };

    const handleNextBtn = () => {
        setSearchParams({
            ...(searchTerm && { search: searchTerm }),
            cursor: nextCursor
        });
        setCurrentCursor(nextCursor);
        window.scrollTo(0, 0);
    };

    return (
        <div className="container">
            {/* Search News */}
            <form method="post" className={styles.searchForm} onSubmit={handleSearchForm}>
                <div>
                    <input
                        className={styles.searchInput}
                        type="text"
                        placeholder="Search news..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />

                    {submittedSearchTerm && (
                        <button
                            onClick={clearSearch}
                            className={styles.clearSearchBtn}
                            type="button"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
                            </svg>
                        </button>
                    )}
                </div>

                <button
                    className={styles.submitSearchBtn}
                    type="submit"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
                    </svg>
                </button>
            </form>

            {/* News List */}
            <div className={styles.newsList}>
                {newsList.length > 0 ? (
                    newsList.map((news) => (
                        <div key={news.id} className={styles.newsItem}>
                            <h2
                                className={styles.newsTitle}
                                onClick={() => handleNewsItemClick(news.article_link)}
                            >
                                {news.title}
                            </h2>
                            
                            <div className={styles.newsMeta}>
                                <span>
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                                    </svg>
                                    {news.source_title}
                                </span>

                                <span>
                                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {formatDate(news.pub_date)}
                                </span>
                            </div>

                            <p className={styles.newsDescription}>
                                {truncateText(news.description || news.content)}
                            </p>
                        </div>
                    ))
                ) : submittedSearchTerm ? (
                    <p >No news found matching "{submittedSearchTerm}"</p>
                ) : (
                    Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className={styles.newsItem}>
                            <div className={styles.newsTitleSkeleton}></div>
                            <div className={styles.newsMetaSkeleton}>
                                <div></div>
                                <div></div>
                            </div>
                            <div className={styles.newsDescSkeleton}></div>
                        </div>
                    ))
                )}
            </div>

            {/* Paginator */}
            {totalResults > 10 && (
                <div className={styles.paginatorActions}>
                    <button onClick={handleNextBtn} className={styles.nextBtn}>
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 12L10 18V6L16 12Z"></path>
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};

export default News;