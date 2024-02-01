'use strict';
const axios = require('axios')

const countries = [
  'Afghanistan',
  'AFRICA',
  'Albania',
  'Algeria',
  'Angola',
  'Antigua and Barbuda',
  'Arab Rep of Egypt',
  'Argentina',
  'Armenia',
  'Aruba',
  'ASIA',
  'Australia',
  'Australia/New Zealand',
  'Austria',
  'Azerbaijan'
];

const countriesUrl = 'https://d6wn6bmjj722w.population.io:443/1.0/countries'
const populationUrl = 'https://d6wn6bmjj722w.population.io:443/1.0/population/'

exports.getCountries = async function getCountries() {
  console.log("country-helper | getCountries | Start")

  let maxRetries = 2;
  let maxTime = 1000;

  for (let i = 0; i < maxRetries; i++) {
    try {

      // // using mock data for now
      // return countries;

      //using given endpoint

      console.log("country-helper | getCountries | Start | Axios call to external API")

      const response = await axios.get(countriesUrl)

      console.log("country-helper | getCountries | End | Axios call to external API")

      console.log("country-helper | getCountries | End")

      return response?.data?.countries;
    } catch (error) {

      console.error("country-helper | getCountries | Error | ", error)

      if (i === maxRetries - 1) {
        console.error("country-helper | getCountries | Retry failed");
        throw error;
      }

      await new Promise(resolve => setTimeout(resolve, maxTime));
    }
  }
};

exports.getCountriesPopulations = async function getCountriesPopulations(countries, order) {
  try {

    console.log("country-helper | getCountriesPopulations | Start")

    //using given endpoint

    let countriesPopulationList = []

    //Considering current date and formatting
    const currentDate = new Date()
    const currentDateFormatted = currentDate.getFullYear() + '-' + currentDate.getMonth() + 1 + '-' + currentDate.getDate()

    for (let i = 0; i < countries.length; i++) {

      const country = countries[i]

      console.log("country-helper | getCountriesPopulations | Start | Axios call to external API")

      const url =  populationUrl + country + '/' + currentDateFormatted + '/'

      await axios.get(url).then((response) => {
        countriesPopulationList.push({ 'country': country, 'population': response?.data?.total_population?.population })
      }).catch((error) => {
        //Response is 400 ignoring
        console.error("country-helper | getCountriesPopulations | Error occured while fetching country population")
      })

      console.log("country-helper | getCountriesPopulations | End | Axios call to external API")

    };

    //Sorting when optional parameter order has value
    if (order && countriesPopulationList.length > 0) {
      if (order === 'ASC')
        countriesPopulationList.sort((a, b) => a.population - b.population)
      else if (order === 'DESC')
        countriesPopulationList.sort((a, b) => b.population - a.population)
    }

    console.log("country-helper | getCountriesPopulations | End")

    return countriesPopulationList
  } catch (error) {

    console.error("country-helper | getCountriesPopulations | Error | ", error)
    throw error
  }
};
