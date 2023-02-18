export const useFetch = async (url, data) => {
  await fetch(url, data)
    .then((res) => res.json())
    .then((data) => data);
};
