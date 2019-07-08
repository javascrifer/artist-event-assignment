import React, { FC, memo } from 'react';

import { ArtistTitleProps } from '../../shared/artist-title-props';
import './ArtistTitle.scss';

const ArtistTitle: FC<ArtistTitleProps> = ({ imageSrc, name }) => {
  return (
    <div className="ArtistTitle">
      <img className="Image" src={imageSrc} alt={name} />
      <p className="ArtistName">{name}</p>
    </div>
  );
};

export default memo(ArtistTitle);
