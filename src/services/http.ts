export const http = {
  get: (url: string, options?: RequestInit) =>
    fetch(url, { ...options, method: "GET" }),
};
