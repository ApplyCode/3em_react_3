import config from '../config';

export async function getEngineeringSite(pageIndex, pageSize) {
  const page = pageIndex + 1
  const response = await fetch(config.api_url+`/engineering/site?paginate=true&page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}`, {
    method: 'GET',
    headers: new Headers({
      'Authorization': 'Bearer '+localStorage.getItem('settings')
    }),
  })
  return await response.json();
}
