export const cacheDecorator = <T>(
  wrappedFn: (...args: string[]) => Promise<T>,
  keyFn: (...args: string[]) => string,
  compareFn: (...args: any[]) => boolean,
  isCacheNeededFn: (item: T, ...args: string[]) => boolean,
): ((...args: string[]) => Promise<T>) => {
  return async (...args: any[]): Promise<T> => {
    const key = keyFn(...args);
    const item = localStorage.getItem(key);
    const cachedResponse: T = !!item ? JSON.parse(item) : null;

    if (compareFn(cachedResponse, ...args)) {
      return cachedResponse;
    }

    const wrapperResponse = await wrappedFn(...args);

    if (isCacheNeededFn(wrapperResponse, ...args)) {
      localStorage.setItem(key, JSON.stringify(wrapperResponse));
    }

    return wrapperResponse;
  };
};

export const getItem = <T>(key: string, defaultValue: T): T => {
  const item = localStorage.getItem(key);
  return !!item ? JSON.parse(item) : defaultValue;
};
