import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import News from './components/News/News.jsx';
import NewsDetails from './components/NewsDetails/NewsDetails.jsx';

const App = () => {
    // Replace with API Key
    const BASE_URL = '';

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<News baseUrl={BASE_URL} />} />

                {/* Not used */}
                <Route path="/news-details/:id" element={<NewsDetails />} />
            </Routes>
        </>
    );
};

export default App;