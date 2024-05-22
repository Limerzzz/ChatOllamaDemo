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
  console.log('save promot', promots);
  await localStorage.setItem('promot', JSON.stringify(promots));
}

export const loadPromot = () => {
  if (typeof localStorage !== 'undefined') {
    const promot = localStorage.getItem('promot');
    console.log('load promot', promot);
    return JSON.parse(promot || '[]');
  } else {
    console.error('localStorage is not available');
  }
  return [];
}
