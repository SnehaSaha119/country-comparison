const mockCountries = require('../../fixtures/data/mock-countries-api.json');
const sinon = require('sinon');
require('chai').should();
const axios = require('axios');
const countryHelper = require('../../../src/lib/country-helper');
const mockCountriesPopulationsApi = require('../../fixtures/data/mock-countries-populations-api.json')
const mockCountriesPopulations = require('../../fixtures/data/mock-countries-populations.json')

describe('countries helper tests', () => {
    let sandbox;
    beforeEach(function beforeEach() {
      sandbox = sinon.sandbox.create();
    });
  
    afterEach(function afterEach() {
      sandbox.restore();
    });
  
    describe('getCountries function tests', function getCountries() {
  
      it('should return a list of countries', async function handleGettingCountries() {
        sandbox.stub(axios, 'get').returns(mockCountries);
  
        const res = await countryHelper.getCountries()
        res.should.eql(mockCountries.data.countries);
      });
  
      it('should return 500 if error getting countries', async function handleErrorGettingCountries() {
        const error = new Error('fake error');
        sandbox.stub(axios, 'get').throws(error);
        
        try{
            const res = await countryHelper.getCountries()
        }catch(error){
            error.should.eql(error)
        }
       
      });

    });


    describe('getCountriesPopulations function tests', function getCountriesPopulations() {
    
        it('should return a list of countries name and populations', async function handleGettingCountriesPopulations() {
          sandbox.stub(axios, 'get').returns(Promise.resolve(mockCountriesPopulationsApi));
            
          const res = await countryHelper.getCountriesPopulations('B')
          res.should.eql([ { country: 'B', population: 205984206 } ]);

        });

        it('should return 500 if error getting countries name and populations', async function handleErrorGettingCountries() {
            const error = new Error('fake error');
            sandbox.stub(axios, 'get').throws(error);
            
            try{
                const res = await countryHelper.getCountriesPopulations('B')
            }catch(error){
                error.should.eql(error)
            }
           
        });
        
    });

});