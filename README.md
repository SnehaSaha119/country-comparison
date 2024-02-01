<img src="atom.png"  width="200" height="60">

## Country Comparison API

### What is this?

The Country Comparison API will use data from a 3rd party provider, [api.population.io](http://api.population.io)<sup>[1](#footnote1)</sup>, to provide comparisons on population statistics.  Your colleague Joe Coder started the implementation (in Node.js v10 using restify), and now it's your turn to bring it to the next level.  

Our current stack is primarily built in Node.js, Golang, and .NET.  Since this service is just getting off the ground, if you'd rather implement this in a different language, feel free to do so.

### Setup

1. Download the repo
2. Run `npm install` to install dependencies
3. Run `npm test` to run unit tests
4. Set your NODE_ENV to `dev`
5. Run `npm start` to start the server

### Change in set-up:

1. Download the zip and un-zip the content
2. Run `npm install` to install dependencies
3. Run `npm test` to run unit tests [Note: If it doesnt work please remove cross-env from package.json -> scripts -> test command]
4. Either
  - Set your NODE_ENV to `dev`
  - Run `npm start` to start the server
5. Or
  - docker build -t country-comparison-app .
  - docker run -p 3000:3000 country-comparison-app

### Requirements

Joe created one endpoint that retrieves a list of country names, using mock data.

1. Update the endpoint to pull country data from http://api.population.io/1.0/countries.
2. The endpoint http://api.population.io/1.0/population/:country/:date returns the total population for a given country on a given date.  Design and implement an endpoint in our API that will allow a consumer to specify an arbitrary set of countries and an optional sort order, and receive back a list of countries and their population based on the current date.  If a sort order was specified, return the list sorted on population size, according to the consumer's requested sort order.

Try to be consistent with Joe's implementation in terms of:
* unit tests
* documentation
* error handling
* response codes
* validation
* etc.

Zip your solution, upload it somewhere, and send us a link to the zipped file.

### Bonus
1. Some scenarios to consider (leave your thoughts inline in your code or edit the README):
  * How efficient is your code?  What are some ways that you could improve performance?
  1. We can create in-memeory cache to store all the response data we received from the api call. And if needed we can set expiration in 1 day or update latest data from api call.
  2. Throttling in the 3rd party api call

  * Suppose we expect this API to be hit 1000s of times a second.  How can we handle the load?
  1. Running multiple instances
  2. Concept of de-bouncing & throttling

  * What if the 3rd party provider is not available?  How resilient is our API?
  1. Retry in sometimes and few times
  2. Using setTimeout
  
  * What if the requirement for the new endpoint was to also allow the consumer to compare populations for any given date.  How would you modify your implementation?
  Scenerio 1:
    1. Taking date as optional query parameter and keeping condition if date not send as query parameter then fetch using current date
  Scenerio 2:
    1. To compare population of a country with 2 different dates, take 2 inputs of date in query parameters
    2. compare on current population
    3. According to REST api guideline its better to have seperate endpoint

  * What if we have a database of users and we wanted to make our API smarter by defaulting comparisons to always include the population of the current user's country.  How could we accomplish this?
  1. Always including the current user's country information

  * What if we wanted to keep a tally of the most frequently requested countries and have this be available to consumers.  How could we accomplish this?
  1. cache technique
  2. Using map to store countires as well as timestamp to detect the most frequently requested countries

2. Dockerize the API

  - docker build -t country-comparison-app .
  - docker run -p 3000:3000 country-comparison-app

<br>
<i><a name="footnote1"><sup>1</sup></a> Joe says that api.population.io is down, so try https://d6wn6bmjj722w.population.io/ as the host instead.<i>
