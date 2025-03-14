function save<T>(key: string, data: T) {
  const contents = JSON.stringify(data);
  localStorage.setItem(key, contents);
}

function load<T>(key: string): T | undefined {
  const contents = localStorage.getItem(key);
  if (contents === null) return undefined;
  return JSON.parse(contents);
}

function clear(key: string) {
  localStorage.removeItem(key);
}

export const localStoragePersistenceService = {
  save,
  load,
  clear,
} as const;
