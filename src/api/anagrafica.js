import config from '../config';

export async function getClienti(pageIndex, pageSize, filters, paginate=true) {
  const page = pageIndex + 1
  let url = config.api_url+`/anagrafica/clienti-finali?paginate=${paginate}&page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}`
  if (filters.length > 0) {
    url += `&filters=${encodeURIComponent(JSON.stringify(filters))}`
  }
  const response = await fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Authorization': 'Bearer '+localStorage.getItem('settings')
    }),
  })


}

export async function getCommittenti(pageIndex, pageSize, filters, paginate=true) {
  const page = pageIndex + 1
  let url = config.api_url+`/anagrafica/committenti?paginate=${paginate}&page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}`
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

export async function getResponsabiliAcquisti(pageIndex, pageSize, filters, paginate=true) {
  const page = pageIndex + 1
  let url = config.api_url+`/anagrafica/responsabili-acquisti?paginate=${paginate}&page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}`
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

export async function getContratti(pageIndex, pageSize, filters, paginate=true) {
  const page = pageIndex + 1
  let url = config.api_url+`/anagrafica/contratti?paginate=${paginate}&page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}`
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

export async function getDipendenti(pageIndex=0, pageSize=0, filters=[], paginate=true) {
  const page = pageIndex + 1
  let url = config.api_url+`/anagrafica/operatori?paginate=${paginate}&page=${encodeURIComponent(page)}&pageSize=${encodeURIComponent(pageSize)}`
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
