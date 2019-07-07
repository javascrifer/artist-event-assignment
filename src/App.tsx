import React, { Fragment, lazy, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Nav from './components/Nav/Nav';
import Preloader from './components/Preloader/Preloader';
import ArtistSearch from './containers/ArtistSearch/ArtistSearch';

const ArtistPreview = lazy(() =>
  import('./containers/ArtistPreview/ArtistPreview'),
);

const App: React.FC = () => {
  return (
    <Fragment>
      <Nav />
      <Suspense fallback={<Preloader />}>
        <Switch>
          <Route path="/" exact={true} component={ArtistSearch} />
          <Route path="/:name/" exact={true} component={ArtistPreview} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Fragment>
  );
};

export default App;
