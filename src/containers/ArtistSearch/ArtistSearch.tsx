import React, {
  ChangeEvent,
  FC,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from 'react';

import Input from '../../components/Input/Input';
import { Artist } from '../../shared/artist';
import { getArtist } from '../../shared/artist.service';
import './ArtistSearch.scss';

const ArtistSearch: FC = () => {
  const [artistsName, setArtistsName] = useState<string>('');
  const [artist, setArtist] = useState<Artist | null>(null);
  const onArtistNameChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      setArtistsName(value);
    },
    [],
  );

  useEffect(() => {
    if (artistsName.length) {
      (async () => {
        setArtist(await getArtist(artistsName));
      })();
    } else {
      setArtist(null);
    }
  }, [artistsName]);

  useEffect(() => {
    console.log(artist);
  }, [artist]);

  return (
    <Fragment>
      <h1 className="Title">Find your artist</h1>
      <div className="InputContainer">
        <Input
          placeholder="Type artists name..."
          value={artistsName}
          onChange={onArtistNameChange}
        />
      </div>
      <div>{JSON.stringify(artist)}</div>
    </Fragment>
  );
};

export default ArtistSearch;
