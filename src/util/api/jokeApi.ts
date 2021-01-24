const jokeApiConfig = {
  url: 'https://v2.jokeapi.dev',
};

const jokeAPIRequest = async (url: string, params: any, method: string, body?: any) => {
  try {
    const getURLParamString = () => {
      let urlParamString = '';
      for (const [key, value] of Object.entries(params)) {
        console.log(key + ': ' + value);
        urlParamString += `&${key}=${value}`;
      }
      return urlParamString;
    };

    const response = await fetch(`${jokeApiConfig.url}${url}?safe-mode${getURLParamString()}`, {
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

const getJokes = (amount?, category?) => {
  const jokeAmount = amount ? amount : 10;
  const jokeCategory = category ? category : 'Any';

  return jokeAPIRequest(`/joke/${jokeCategory}`, { amount: jokeAmount }, 'GET');
};

const jokeApi = {
  getJokes,
};

export default jokeApi;
