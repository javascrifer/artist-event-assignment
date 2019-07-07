import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import artistIcon from '../../assets/artist.png';
import './Nav.scss';

const Nav: FC = () => {
  return (
    <nav className="Nav">
      <Link to="/">
        <img className="Logo" src={artistIcon} alt="Artist" />
        <span>Artist events assignment</span>
      </Link>
    </nav>
  );
};

export default Nav;
