import React, { FC, memo } from 'react';

import './Preloader.scss';

const Preloader: FC = () => (
  <div className="Preloader">
    <div />
    <div />
    <div />
    <div />
  </div>
);

export default memo(Preloader);
