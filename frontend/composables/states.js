export const useIsauth = () => useState("isauth", () => false);
export const useUser = () =>
  useState("user", () => ({
    name: undefined,
    profile: undefined,
    handle: undefined,
    legit: false
  }));
export const API_URL = () => useRuntimeConfig().public.API_URL;
