import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className={styles.navbar}>
            <Link to="/" className={styles.navbarBrand}>
                NewsReact
            </Link>
        </div>
    );
};

export default Header;