const fetcher = async <T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  const res = await fetch(input, init);
  if (!res.ok) {
    throw new Error(
      `${res.status}: An error occurred while fetching the data.`,
      {
        cause: await res.json(),
      }
    );
  }
  return await res.json();
};

export default fetcher;