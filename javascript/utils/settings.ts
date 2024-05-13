const OLLAMA_HOST = 'ollama.host';

export const loadOllamaHost = () => {
  // get the host of localStorage
  const host = localStorage.getItem(OLLAMA_HOST);
  return host;
}

export const saveOllamaHost = (host: string) => {
  localStorage.setItem(OLLAMA_HOST, host);
}
