import config from '../config';

export async function getOrdini(pageIndex, pageSize, filters) {
  const page = pageIndex + 1
  let url = config.api_url+`/ordini?paginate=true&page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}`
  if (filters.length > 0) {
    url += `&filters=${encodeURIComponent(JSON.stringify(filters))}`
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Authorization': 'Bearer '+localStorage.getItem('settings')
    }),
  })

  return await response.json();
}