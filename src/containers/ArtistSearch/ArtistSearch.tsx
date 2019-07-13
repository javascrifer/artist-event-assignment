import React, {
  ChangeEvent,
  FC,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDebounce } from 'use-debounce';

import ArtistCard from '../../components/ArtistCard/ArtistCard';
import Input from '../../components/Input/Input';
import NotFound from '../../components/NotFound/NotFound';
import Preloader from '../../components/Preloader/Preloader';
import { Artist } from '../../shared/artist';
import { getArtist, getDefaultArtist } from '../../shared/helpers';
import './ArtistSearch.scss';

const ArtistSearch: FC = () => {
  const [artistsName, setArtistsName] = useState<string>('');
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [_artistName] = useDebounce(artistsName, 500);
  const onArtistNameChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setArtistsName(value);
    },
    [],
  );

  useEffect(() => {
    setIsLoading(true);
  }, [artistsName]);

  useEffect(() => {
    if (_artistName.length) {
      (async () => {
        setArtist(await getArtist(_artistName));
        setIsLoading(false);
      })();
    } else {
      setArtist(null);
      setIsLoading(false);
    }
  }, [_artistName]);

  useEffect(() => {
    const _artist = getDefaultArtist();

    if (_artist) {
      setArtist(_artist);
    }
  }, []);

  return (
    <Fragment>
      <h1 className="Title">Find your artist</h1>
      <div className="Container">
        <Input
          placeholder="Type artists name..."
          value={artistsName}
          onChange={onArtistNameChange}
        />
        {isLoading ? <Preloader /> : null}
        {!isLoading && artist ? <ArtistCard {...(artist as Artist)} /> : null}
        {!isLoading && !artist && _artistName ? (
          <NotFound message="Artist not found" />
        ) : null}
      </div>
    </Fragment>
  );
};

export default ArtistSearch;
