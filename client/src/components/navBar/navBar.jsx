import {Link} from 'react-router-dom';
import style from './navBar.module.css';

const NavBar = () => {
    return (
        <div className={style.navBar} >
            <Link to='/home'>HOME</Link>
            <Link to='/create'>CREATE</Link>
        </div>
    )
};

export default NavBar;