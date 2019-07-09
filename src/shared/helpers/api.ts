export const call = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);
  return response.json() as Promise<T>;
};
