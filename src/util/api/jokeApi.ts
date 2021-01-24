import axios, { AxiosRequestConfig } from 'axios';

const jokeApiInstance = axios.create({
  baseURL: 'https://v2.jokeapi.dev/',
  params: {
    'safe-mode': '',
  },
});

const apiRequest = (method: AxiosRequestConfig['method'], url: string, params: any) => {
  return jokeApiInstance
    .request({
      method,
      url,
      params: params,
    })
    .then((response) => console.log(response))
    .catch((error) => console.error(error));
};

const getJokes = (amount?, category?) => {
  const jokeAmount = amount ? amount : 10;
  const jokeCategory = category ? category : 'Any';

  return apiRequest('GET', `/joke/${jokeCategory}`, { amount: jokeAmount });
};

export = {
  getJokes,
};
