import { Artist } from './artist';
import { EventDate } from './event-date.enum';

const url = 'https://rest.bandsintown.com';
const appId = process.env.REACT_APP_APP_ID;

/**
 * API does not returns other HTTP status code apart 200.
 * Response is object which matches Artist or { error: string; } interface.
 * Furthermore, some times API returns ""
 */
export const getArtist = async (artistName: string): Promise<Artist | null> => {
  const response = await fetch(
    `${url}/artists/${encodeURIComponent(artistName)}?app_id=${appId}`,
  );
  const responseJson = await response.json();

  return !responseJson || !!responseJson.error ? null : responseJson;
};

export const getEvents = async (
  artistName: string,
  date: EventDate,
): Promise<any[]> => {
  const queryParams = `app_id=${appId}&date=${date}`;
  const response = await fetch(
    `${url}/artists/${encodeURIComponent(artistName)}/events?${queryParams}`,
  );

  return response.json();
};
