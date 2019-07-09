import { Artist } from '../artist';
import { Event } from '../event';
import { EventDate } from '../event-date.enum';
import { call } from './api';

const url = 'https://rest.bandsintown.com';
const appId = process.env.REACT_APP_APP_ID;

/**
 * API does not returns other HTTP status code apart 200.
 * Response is object which matches Artist or { error: string; } interface.
 * Furthermore, some times API returns ""
 */
export const getArtist = async (artistName: string): Promise<Artist | null> => {
  const json = await call<Artist>(
    `${url}/artists/${encodeURIComponent(artistName)}?app_id=${appId}`,
  );

  return !json || !!(json as any).error ? null : json;
};

export const getEvents = async (
  artistName: string,
  date: EventDate,
): Promise<Event[]> => {
  const queryParams = `app_id=${appId}&date=${date}`;

  return call<Event[]>(
    `${url}/artists/${encodeURIComponent(artistName)}/events?${queryParams}`,
  );
};
