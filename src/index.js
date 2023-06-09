import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));

function onCountryInput() {
    const name = searchInput.value.trim();
    if (name === '') {
        return (countryList.innerHTML = ''), (countryInfo.innerHTML = '');
    }

    fetchCountries(name) 
        .then(countries => {
            countryList.innerHTML = '';
            countryInfo.innerHTML = '';
            if (countries.length === 1) {
                countryList.insertAdjacentHTML('beforeend', renderCountryList(countries));
                countryInfo.insertAdjacentHTML('beforeend', renderCountryInfo(countries));
            } else if (countries.length >= 10) {
                onFetchInfo();
            } else {
                countryList.insertAdjacentHTML('beforeend', renderCountryList(countries));
            }
        })
        .catch(onFetchError);
}

function renderCountryList(countries) {
    const markup = countries
        .map(({ name, flags }) => {
            return `
                <li class="country-list__item">
                    <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width="50px" height="50px">
                    <h2 class="country-list__name">${name.official}</h2>
                </li>
              `
        })
        .join('');
    return markup;
}

function renderCountryInfo(countries) {
    const markup = countries
        .map(({ capital, population, languages }) => {
            return `
                <ul class="country-info__list">
                    <li class="country-info__item"><p><b>Capital: </b>${capital}</p></li>
                    <li class="country-info__item"><p><b>Population: </b>${population}</p></li>
                    <li class="country-info__item"><p><b>Languages: </b>${languages}</p></li>
                </ul>
            `
        })
        .join('');
    return markup;
}

function onFetchInfo() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}

function onFetchError() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}



