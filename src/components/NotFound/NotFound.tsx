import React, { FC, memo } from 'react';

import sadIcon from '../../assets/sad.png';
import './NotFound.scss';

const NotFound: FC<{ message: string }> = ({ message }) => {
  return (
    <div className="NotFound">
      <img className="Image" src={sadIcon} alt="Sad face" />
      <p className="Message">{message}</p>
    </div>
  );
};

export default memo(NotFound);
