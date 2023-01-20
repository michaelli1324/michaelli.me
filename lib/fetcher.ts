const fetcher = async <T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  try {
    const res = await fetch(input, init);
    return await res.json();
  } catch (error) {
    throw new Error(`An error occurred while fetching the data.`, {
      cause: error,
    });
  }
};

export default fetcher;
