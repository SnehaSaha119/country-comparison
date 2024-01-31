'use strict';

const co = require('co');
const errors = require('restify-errors');
const countryHelper = require('../../lib/country-helper');

exports.getCountries = co.wrap(function* getCountries(req, res, next) {
  try {
    console.log("countries.controller | getCountries | Start")

    // const countries = countryHelper.getCountries();

    console.log("countries.controller | getCountries | Start | countryHelper.getCountries")

    // Typescript: async and await concept
    const countries = yield countryHelper.getCountries()

    console.log("countries.controller | getCountries | End | countryHelper.getCountries")

    console.log("countries.controller | getCountries | Start")

    res.json(countries);
    return next();

  } catch (err) {

    console.error("countries.controller | getCountries | Error | ", err)
    return next(new errors.InternalServerError(err, 'Server error retrieving countries.'));
  }
});

exports.getCountriesPopulations = co.wrap(function* getCountriesPopulations(req, res, next) {
  try {

    console.log("countries.controller | getCountriesPopulations | Start")

    //Typescript: type assertion 'as String[]' concept
    const countries = req?.query?.countries?.split(",")?.filter((value) => value != '')
    const order = req?.query?.sort

    //Request validation
    if (!countries)
      return next(new errors.BadRequestError('Missing parameter countries'))

    //Request validation
    if (order && order !== 'ASC' && order !== 'DESC')
      return next(new errors.BadRequestError('Parameter sort should be ASC or DESC'))

    console.log("countries.controller | getCountriesPopulations | Start | countryHelper.getCountriesPopulations")

    // Typescript: async and await concept
    const countriesPopulation = yield countryHelper.getCountriesPopulations(countries, order)

    console.log("countries.controller | getCountriesPopulations | End | countryHelper.getCountriesPopulations")

    console.log("countries.controller | getCountriesPopulations | End")

    res.json(countriesPopulation);
    return next();

  } catch (err) {

    console.error("countries.controller | getCountriesPopulations | Error | ", err)
    return next(new errors.InternalServerError(err, 'Server error retrieving countries populations'));
  }
});


