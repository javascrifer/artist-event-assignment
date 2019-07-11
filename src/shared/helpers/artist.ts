import { Artist } from '../artist';
import { Event } from '../event';
import { call } from './api';
import { cacheDecorator } from './cache';

const url = 'https://rest.bandsintown.com';
const appId = process.env.REACT_APP_APP_ID;

/**
 * API does not returns other HTTP status code apart 200.
 * Response is object which matches Artist or { error: string; } interface.
 * Furthermore, some times API returns ""
 */
const _getArtist = async (artistName: string): Promise<Artist | null> => {
  const json = await call<Artist>(
    `${url}/artists/${encodeURIComponent(artistName)}?app_id=${appId}`,
  );

  return !json || !!(json as any).error ? null : json;
};

const _getEvents = async (
  artistName: string,
  date: string,
): Promise<Event[]> => {
  const queryParams = `app_id=${appId}&date=${date}`;

  return call<Event[]>(
    `${url}/artists/${encodeURIComponent(artistName)}/events?${queryParams}`,
  );
};

export const getArtist = cacheDecorator<Artist | null>(
  _getArtist,
  () => 'artist',
  (artist: Artist | null, artistName: string) => {
    return !!artist && artist.name.toLowerCase() === artistName.toLowerCase();
  },
  (artist: Artist | null) => !!artist,
);

export const getEvents = cacheDecorator<Event[]>(
  _getEvents,
  (_: string, date: string) => `events-${date}`,
  (events: Event[], artistName: string) => {
    return (
      !!events &&
      !!events.length &&
      !!events[0].lineup.find(
        _artistName => artistName.toLowerCase() === _artistName.toLowerCase(),
      )
    );
  },
  (events: Event[]) => !!events.length,
);
