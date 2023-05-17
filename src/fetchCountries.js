const BASE_URL = 'https://restcountries.com/v3.1/name/{name}';

const fields = 'capital,population,flags,languages';

function fetchCountries(name) {
    return fetch(`${BASE_URL}${name}${fields}`)
        .then(response => response.json())
        .catch(error => console.log(error));
};

export default fetchCountries;