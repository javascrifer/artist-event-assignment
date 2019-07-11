import { ReactText } from 'react';

import { Artist } from '../artist';
import { Event } from '../event';
import { EventDate } from '../event-date.enum';
import * as api from './api';
import {
  getArtist,
  getArtistCacheKey,
  getEvents,
  getEventsCacheKey,
  isArtistCacheNeeded,
  isArtistCacheValid,
  isEventsCacheNeeded,
  isEventsCacheValid,
} from './artist';

jest.mock('./cache', () => ({
  cacheDecorator: <T>(fn: Promise<T>): Promise<T> => fn,
}));

describe('helpers/artist', () => {
  const artist: Artist = {
    facebook_page_url: 'facebook-url',
    id: 1,
    image_url: 'image-url',
    mbid: 1,
    name: 'John Doe',
    thumb_url: 'thumb-url',
    tracker_count: 5,
    upcoming_event_count: 10,
    url: 'url',
  };

  const events: Event[] = [
    {
      datetime: '2013-07-21T16:30:00',
      description: 'event-description',
      id: 1,
      lineup: ['John Doe'],
      venue: {
        city: 'venue-city-1',
        country: 'venue-country-1',
        name: 'venue-name-1',
      },
    },
    {
      datetime: '2014-01-14T20:00:00',
      id: 2,
      lineup: ['john doe'],
      venue: {
        city: 'venue-city-2',
        country: 'venue-country-2',
        name: 'venue-name-2',
      },
    },
    {
      datetime: '2010-01-19T20:00:00',
      id: 2,
      lineup: ['john'],
      venue: {
        city: 'venue-city-2',
        country: 'venue-country-2',
        name: 'venue-name-2',
      },
    },
  ];

  let apiSpy: jest.SpyInstance;

  describe('getArtist', () => {
    beforeEach(() => {
      apiSpy = jest.spyOn(api, 'call');
      apiSpy.mockImplementation(async () => artist);
    });

    afterEach(() => {
      apiSpy.mockClear();
    });

    test('should call api with artist name in url params and app id in query', async () => {
      // WHEN
      await getArtist('John Doe');

      // THEN
      expect(apiSpy).toHaveBeenCalledTimes(1);
      expect(apiSpy).toHaveBeenCalledWith(
        'https://rest.bandsintown.com/artists/John%20Doe?app_id=artist-event-assignment',
      );
    });

    describe('response', () => {
      const nullCases: ReactText[][] = [
        [null, null],
        ['', null],
        [{ error: 'message' }, null],
      ] as ReactText[][];

      test.each(nullCases)(
        'should for response %p return %p',
        async (mockResponse: ReactText, expectedResponse: ReactText) => {
          // GIVEN
          apiSpy.mockImplementation(async () => mockResponse);

          // WHEN
          const receivedResponse = await getArtist('');

          // THEN
          expect(receivedResponse).toBe(expectedResponse);
        },
      );

      test('should for successful response return artist', async () => {
        // WHEN
        const receivedResponse = await getArtist('');

        // THEN
        expect(receivedResponse).toBe(artist);
      });
    });
  });

  describe('getArtistCacheKey', () => {
    test('should return artist as a cache key', () => {
      // WHEN
      const key = getArtistCacheKey();

      // THEN
      expect(key).toBe('artist');
    });
  });

  describe('isArtistCacheValid', () => {
    const cases: any[] = [
      [true, 'john doe'],
      [true, 'John Doe'],
      [false, 'john'],
    ];

    test('should return false for falsy authors', () => {
      // THEN
      expect(isArtistCacheValid(null, '')).toBeFalsy();
    });

    test.each(cases)(
      `should return %p for %p input and ${artist.name} combo`,
      (expectedResponse: boolean, artistName: string) => {
        // THEN
        expect(isArtistCacheValid(artist, artistName)).toBe(expectedResponse);
      },
    );
  });

  describe('isArtistCacheNeeded', () => {
    test('should return true for truthy authors', () => {
      // THEN
      expect(isArtistCacheNeeded(artist)).toBeTruthy();
    });

    test('should return false for falsy authors', () => {
      // THEN
      expect(isArtistCacheNeeded(null)).toBeFalsy();
    });
  });

  describe('getEventsCacheKey', () => {
    const cases = [
      [`events-${EventDate.All}`, EventDate.All],
      [`events-${EventDate.Past}`, EventDate.Past],
      [`events-${EventDate.Upcoming}`, EventDate.Upcoming],
    ];

    test.each(cases)(
      'should return %p for input %p',
      (expectedCacheKey: string, date: string) => {
        // WHEN
        const key = getEventsCacheKey('', date);

        // THEN
        expect(key).toBe(expectedCacheKey);
      },
    );
  });

  describe('isEventsCacheValid', () => {
    test('should return false for empty events', () => {
      // THEN
      expect(isEventsCacheValid([], '')).toBeFalsy();
    });

    test('should return true only for events where artist is in first lineup', () => {
      expect(isEventsCacheValid([events[0]], artist.name)).toBeTruthy();
      expect(isEventsCacheValid([events[1]], artist.name)).toBeTruthy();
      expect(isEventsCacheValid([events[2]], artist.name)).toBeFalsy();
    });
  });

  describe('isEventsCacheNeeded', () => {
    test('should return true for non empty array', () => {
      // THEN
      expect(isEventsCacheNeeded(events)).toBeTruthy();
    });

    test('should return false for falsy authors', () => {
      // THEN
      expect(isEventsCacheNeeded([])).toBeFalsy();
    });
  });

  describe('getEvents', () => {
    beforeEach(() => {
      apiSpy = jest.spyOn(api, 'call');
      apiSpy.mockImplementation(async () => events);
    });

    afterEach(() => {
      apiSpy.mockClear();
    });

    test('should call api with artist name in url params and app id, date in query', async () => {
      // WHEN
      await getEvents('John Doe', EventDate.Upcoming);

      // THEN
      expect(apiSpy).toHaveBeenCalledTimes(1);
      expect(apiSpy).toHaveBeenCalledWith(
        'https://rest.bandsintown.com/artists/John%20Doe/events?app_id=artist-event-assignment&date=upcoming',
      );
    });

    test('should return events from api response', async () => {
      // WHEN
      const receivedResponse = await getEvents('John Doe', EventDate.Upcoming);

      // THEN
      expect(receivedResponse).toEqual(events);
    });
  });
});
