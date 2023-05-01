import { Link, useLocation } from 'react-router-dom';
import style from './navBar.module.css';
import SearchBar from '../searchBar/searchBar';
import logo from '../img/logo.png'

const NavBar = () => {
    const location = useLocation();

    return (
        <nav>
            <ul className={style.navLinks}>
                <img width={100} src={logo} alt="Logo" />
                <li><Link to='/home'>HOME</Link></li>
                <li><Link to='/create'>CREATE</Link></li>
                <li>{location.pathname === '/home' && <SearchBar />}</li>
            </ul>
        </nav>
    )
};

export default NavBar;