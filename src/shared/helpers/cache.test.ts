import { Artist } from '../artist';
import { cacheDecorator, getItem } from './cache';

Object.defineProperty(window, 'localStorage', {
  value: { setItem: jest.fn(), getItem: jest.fn() },
});

describe('helpers/cache', () => {
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

  describe('cacheDecorator', () => {
    const wrapperFn = jest.fn(async () => artist);
    const keyFn = jest.fn(() => `cache-key`);
    const compareFn = jest.fn(() => true);
    const isCacheNeededFn = jest.fn(() => true);

    let getItemSpy: jest.SpyInstance;
    let setItemSpy: jest.SpyInstance;

    beforeEach(() => {
      getItemSpy = jest.spyOn(localStorage, 'getItem');
      getItemSpy.mockImplementationOnce(() => JSON.stringify(artist));
      setItemSpy = jest.spyOn(localStorage, 'setItem');
      setItemSpy.mockImplementationOnce(() => null);
    });

    afterEach(() => {
      wrapperFn.mockClear();
      keyFn.mockClear();
      compareFn.mockClear();
      isCacheNeededFn.mockClear();
      getItemSpy.mockClear();
      setItemSpy.mockClear();
    });

    test('should call local storage with key from key function', async () => {
      // GIVEN
      const fn = cacheDecorator(wrapperFn, keyFn, compareFn, isCacheNeededFn);

      // WHEN
      await fn('john', 'doe');

      // THEN
      expect(keyFn).toHaveBeenCalledTimes(1);
      expect(keyFn).toHaveBeenCalledWith('john', 'doe');
      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
      expect(localStorage.getItem).toHaveBeenCalledWith('cache-key');
    });

    test('should return response from local storage if compare fn response is truthy', async () => {
      // GIVEN
      const fn = cacheDecorator(wrapperFn, keyFn, compareFn, isCacheNeededFn);

      // WHEN
      const _artist = await fn('hello', 'world');

      // THEN
      expect(compareFn).toHaveBeenCalledTimes(1);
      expect(compareFn).toHaveBeenCalledWith(artist, 'hello', 'world');
      expect(_artist).toEqual(artist);
    });

    test('should cache response if is cache needed fn is truthy', async () => {
      // GIVEN
      const fn = cacheDecorator(wrapperFn, keyFn, compareFn, isCacheNeededFn);

      // WHEN
      compareFn.mockReturnValueOnce(false);
      const _artist = await fn('hello', 'world');

      // THEN
      expect(isCacheNeededFn).toHaveBeenCalledTimes(1);
      expect(isCacheNeededFn).toHaveBeenCalledWith(_artist, 'hello', 'world');
      expect(setItemSpy).toHaveBeenCalledTimes(1);
      expect(setItemSpy).toHaveBeenCalledWith(
        `cache-key`,
        JSON.stringify(_artist),
      );
    });
  });

  describe('getItem', () => {
    let getItemSpy: jest.SpyInstance;

    beforeEach(() => {
      getItemSpy = jest.spyOn(localStorage, 'getItem');
    });

    afterEach(() => {
      getItemSpy.mockClear();
    });

    test('should return parsed value from local storage', () => {
      // WHEN
      getItemSpy.mockImplementationOnce(() => JSON.stringify(artist));
      const _artist = getItem<Artist | null>('artist', null);

      // THEN
      expect(getItemSpy).toHaveBeenCalledTimes(1);
      expect(getItemSpy).toHaveBeenCalledWith('artist');
      expect(_artist).toEqual(artist);
    });

    test('should return default value if item is not stored in local storage', () => {
      // WHEN
      getItemSpy.mockImplementationOnce(() => null);
      const _artist = getItem<Artist | null>('artist', null);

      // THEN
      expect(_artist).toBe(null);
    });
  });
});
