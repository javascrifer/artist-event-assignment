import React, { FC, useCallback, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import ArtistTitle from '../../components/ArtistTitle/ArtistTitle';
import EventFilters from '../../components/EventFilters/EventFilters';
import Events from '../../components/Events/Events';
import Preloader from '../../components/Preloader/Preloader';
import { Artist } from '../../shared/artist';
import { ArtistRouteParams } from '../../shared/artist-route-params';
import { getArtist, getEvents } from '../../shared/artist.service';
import { EventDate } from '../../shared/event-date.enum';

const ArtistPreview: FC<RouteComponentProps<ArtistRouteParams>> = ({
  match: {
    params: { name },
  },
  history,
}) => {
  const artistName = decodeURIComponent(name);

  const [artist, setArtist] = useState<Artist | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [eventDate, setEventDate] = useState<EventDate>(EventDate.Upcoming);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onEventFilterClick = useCallback(
    ({ target }) => setEventDate(target.dataset.value),
    [],
  );

  useEffect(() => {
    (async () => {
      const _artist = await getArtist(artistName);

      if (!_artist) {
        return history.push('/');
      }

      setIsLoading(true);
      setArtist(_artist);
      setEvents(await getEvents(artistName, eventDate));
      setIsLoading(false);
    })();
  }, [artistName, eventDate, history]);

  return artist ? (
    <div className="Container">
      <ArtistTitle name={artist.name} imageSrc={artist.image_url} />
      <EventFilters eventDate={eventDate} onClick={onEventFilterClick} />
      {isLoading ? <Preloader /> : <Events events={events} />}
    </div>
  ) : (
    <Preloader />
  );
};

export default ArtistPreview;
