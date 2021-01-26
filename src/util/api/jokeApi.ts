const jokeApiConfig = {
  url: 'https://v2.jokeapi.dev',
};

interface ISubmitPayload {
  formatVersion: number;
  category: string;
  type: string;
  joke: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  lang: string;
}

const jokeAPIRequest = async (url: string, params: any, method: string, body?: any, dryRunEnabled?: boolean) => {
  try {
    const getURLParamString = () => {
      let urlParamString = '?';
      if (url.includes('joke')) {
        urlParamString += 'safe-mode';
      }
      if (dryRunEnabled) {
        urlParamString += '&dry-run';
      }
      if (Object.keys(params).length !== 0) {
        for (const [key, value] of Object.entries(params)) {
          urlParamString += `&${key}=${value}`;
        }
      }
      return urlParamString === '?' ? '' : urlParamString;
    };

    const response = await fetch(`${jokeApiConfig.url}${url}${getURLParamString()}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = response.json();
    return response.ok
      ? data
      : Promise.reject({
          ...data,
          statusCode: response.status,
        });
  } catch (error) {
    throw new Error('This is an error' + error);
  }
};

const getJokes = (category: string, searchValue?: string, amount?: number): Promise<any> => {
  let params;
  const jokeAmount = amount ? amount : 10;

  if (searchValue && searchValue !== '') {
    params = { amount: jokeAmount, contains: searchValue };
  } else {
    params = { amount: jokeAmount };
  }

  return jokeAPIRequest(`/joke/${category}`, params, 'GET');
};

const getCategories = (): Promise<any> => {
  return jokeAPIRequest(`/categories`, {}, 'GET');
};

const submitJoke = (body: ISubmitPayload): Promise<any> => {
  return jokeAPIRequest(`/submit`, {}, 'POST', body, true);
};

const jokeApi = {
  getJokes,
  getCategories,
  submitJoke,
};

export default jokeApi;
