export default async function fetcher<JSON = any>(input: RequestInfo, init?: RequestInit): Promise<JSON> {
  const res = await fetch(input, init)
  if (!res.ok) {
    throw new Error(`${res.status}: An error occurred while fetching the data.`, {
      cause: await res.json(),
    })
  }
  return res.json()
}