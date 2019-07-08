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
import { Artist } from '../../shared/artist';
import { getArtist } from '../../shared/artist.service';
import './ArtistSearch.scss';

const ArtistSearch: FC = () => {
  const [artistsName, setArtistsName] = useState<string>('');
  const [artist, setArtist] = useState<Artist | null>(null);
  const [_artistName] = useDebounce(artistsName, 500);
  const onArtistNameChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setArtistsName(value);
    },
    [],
  );

  useEffect(() => {
    if (_artistName.length) {
      (async () => {
        setArtist(await getArtist(_artistName));
      })();
    } else {
      setArtist(null);
    }
  }, [_artistName]);

  return (
    <Fragment>
      <h1 className="Title">Find your artist</h1>
      <div className="Container">
        <Input
          placeholder="Type artists name..."
          value={artistsName}
          onChange={onArtistNameChange}
        />
        {artist ? <ArtistCard {...(artist as Artist)} /> : null}
      </div>
    </Fragment>
  );
};

export default ArtistSearch;
