import React from 'react';
import { Link} from 'react-router-dom';
import style from './Home.module.css'

function Home () {
    return (
        <React.Fragment>
            <ul className={style['link-button-container']}>
            <li className={style['link-button']}>
                <Link to="/create-user">Create User</Link>
            </li>
            <li className={style['link-button']}>
                <Link to="/chat-room">Chat Room</Link>
            </li>
            </ul>
      </React.Fragment>
    )
}

export default Home;