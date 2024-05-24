const OLLAMA_HOST = 'ollama.host';

export const loadOllamaHost = () => {
  // get the host of localStorage
  const host = localStorage.getItem(OLLAMA_HOST);
  return host;
}

export const saveOllamaHost = (host: string) => {
  localStorage.setItem(OLLAMA_HOST, host);
}

export const savePromot = async (promots: any) => {
  if (!Array.isArray(promots)) {
    throw new Error('Parameter is not an array');
  }
  console.log('save promot', promots);
  console.log('json', JSON.stringify(promots));
  await localStorage.setItem('promots', JSON.stringify(promots));
}

export const loadPromot = () => {
  const promot = localStorage.getItem('promots');
  console.log('load promot', promot);
  let arr = JSON.parse(promot || '[]');
  if (!Array.isArray(arr)) {
    console.warn('Promot item in local storage is not an array, returning empty array');
    return [];
  }
  return arr;
}
