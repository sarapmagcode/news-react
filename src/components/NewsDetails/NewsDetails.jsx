import { useEffect, useState } from 'react';
import styles from './NewsDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDate } from '/src/utils/helpers.js';


// Note: 
// - This component is not used.
// - Apparently, there's no endpoint for getting an article by id.

const NewsDetails = ({ baseUrl }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [article, setArticle] = useState({});

    useEffect(() => {
        const fetchNewsDetails = async () => {
            try {
                const response = await fetch(`${baseUrl}`);
                const data = await response.json();

                // console.log(data);

                if (response.ok) {
                    const selectedArticle = data.data.find(article => article.id === id);
                    setArticle(selectedArticle);

                    console.log(article);
                    
                } else {
                    console.error('Unexpected error:', response.status);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        
        fetchNewsDetails();
    }, []);

    const handleBackBtnClick = () => {
        navigate('/');
    };

    return (
        <div className="container">
            <button onClick={handleBackBtnClick} className={styles.backBtn}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 12L14 6V18L8 12Z"></path>
                </svg>
                Back to News
            </button>

            <article className={styles.newsArticle}>
                <header>
                    <h1 className={styles.newsTitle}>{article.title}</h1>
                    
                    <div className={styles.newsMeta}>
                        <span>Published {formatDate(article.pub_date)}</span>
                        <span>|</span>
                        <a
                            className={styles.sourceLink}
                            href={article.source_link}
                            target="_blank"
                        >
                            {article.source_title}
                        </a>
                    </div>
                </header>

                <p className={styles.newsDescription}>{article.description}</p>

                {article.media_thumbnail && (
                    <img
                        className={styles.newsImage}
                        src={article.media_thumbnail}
                        alt="Article image"
                    />
                )}

                <div className={styles.newsContent}>{article.content}</div>
            </article>
        </div>
    );
};

export default NewsDetails;