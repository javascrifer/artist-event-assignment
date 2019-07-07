import React, { FC } from 'react';

import artistIcon from '../../assets/artist.png';
import './Nav.scss';

const Nav: FC = () => {
  return (
    <nav className="Nav">
      <a href="#">
        <img className="Logo" src={artistIcon} alt="Artist" />
        <span>Artist events assignment</span>
      </a>
    </nav>
  );
};

export default Nav;
