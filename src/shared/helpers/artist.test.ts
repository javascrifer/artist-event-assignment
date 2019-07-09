import { ReactText } from 'react';

import { Artist } from '../artist';
import { Event } from '../event';
import { EventDate } from '../event-date.enum';
import * as api from './api';
import { getArtist, getEvents } from './artist';

describe('helpers/artist', () => {
  let apiSpy: jest.SpyInstance;

  afterEach(() => {
    apiSpy.mockClear();
  });

  describe('getArtist', () => {
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

    beforeEach(() => {
      apiSpy = jest.spyOn(api, 'call');
      apiSpy.mockImplementation(async () => artist);
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

  describe('getEvents', () => {
    const events: Event[] = [
      {
        datetime: '2013-07-21T16:30:00',
        description: 'event-description',
        id: 1,
        venue: {
          city: 'venue-city-1',
          country: 'venue-country-1',
          name: 'venue-name-1',
        },
      },
      {
        datetime: '2014-01-14T20:00:00',
        id: 2,
        venue: {
          city: 'venue-city-2',
          country: 'venue-country-2',
          name: 'venue-name-2',
        },
      },
    ];

    beforeEach(() => {
      apiSpy = jest.spyOn(api, 'call');
      apiSpy.mockImplementation(async () => events);
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
