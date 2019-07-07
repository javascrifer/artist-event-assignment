import React, { Fragment } from 'react';

import Nav from './components/Nav/Nav';
import ArtistSearch from './containers/ArtistSearch/ArtistSearch';

const App: React.FC = () => {
  return (
    <Fragment>
      <Nav />
      <ArtistSearch />
    </Fragment>
  );
};

export default App;
