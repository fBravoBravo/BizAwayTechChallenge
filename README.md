# BizAwayTechChallenge

BizAway interview tech challenge solution proposal.

## Author

- Name: Francisco Bravo Bravo
- Github: github.com/fBravoBravo
- Linkedin: linkedin.com/in/fbravobravo

# How to run

- Make sure to be using the specified node version (19.0.0 LTS).
- clone the project.
- Run npm install in the root of the project.
- Run `sudo npm run start`

This steps will spin up the server and it will be ready to start recieving requests.

# How to run the tests

- Spin up the server using the steps describe above.
- Run `npm run test`

# Documentation

Swagger is used in this project to create the documenation for the endpoints exposed. You can find it spinning up the server and going to [localhost:3000/docs](localhost:3000/docs).

==Find more documentation about the project below==

# Description of the project

## End points

### Main functionality of the challenge

- **Explore Trips**: Main part of the technical challenge. This endpoint covers the part of the test for implementing an endpoint that takes an origin, a destination and a sort_by intruction and returns all the trips found for that itinerary sorted with whatever strategy comes in the sort_by parameter

### Bonus

- **Create trip**:

- **Delete trip**:

- **List trips**:

## Extra functionality

### Cache

A small cache has been developed for the `explore trips` endpoint. It stores the results of previous queries using the origin and destination as keys. If a call is performed to the endpoint with the same origin and destination the app returns the match found in the database. A ttl of one minute is added to every entry so they get deleted after that time and they have to be refetched again in the next call for that combination of origin and destination.

## Tests cases coverage
