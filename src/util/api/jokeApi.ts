const jokeApiConfig = {
  url: 'https://v2.jokeapi.dev',
};

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
          console.log(key + ': ' + value);
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

const getJokes = (category, searchValue?, amount?) => {
  let params;
  const jokeAmount = amount ? amount : 10;

  if (searchValue && searchValue !== '') {
    params = { amount: jokeAmount, contains: searchValue };
  } else {
    params = { amount: jokeAmount };
  }

  return jokeAPIRequest(`/joke/${category}`, params, 'GET');
};

const getCategories = () => {
  return jokeAPIRequest(`/categories`, {}, 'GET');
};

const jokeApi = {
  getJokes,
  getCategories,
};

export default jokeApi;
