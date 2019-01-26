let name = 'token';

export const get = () => localStorage.getItem(name);

export const exists = () => get();
