# BizAway tech challenge

BizAway interview tech challenge solution proposal.

## Author

- Name: Francisco Bravo Bravo
- Github: github.com/fBravoBravo
- Linkedin: linkedin.com/in/fbravobravo

# Running the project

## Spinning up the server

- Make sure to be using the specified node version (20.0.0 LTS).
- Add the API key (BizAway's endpoint API key) to the env file as specified in `.example.env`.
- clone the project.
- Run npm install in the root of the project.
- Run `sudo npm run start`

This steps will spin up the server and it will be ready to start recieving requests.

## Running the tests

- Spin up the server using the steps describe above.
- Run `npm run test`

## Making calls to the API

The is deployed in localhost using the port `3000`. To make calls to the api first add the `api` subdirectory to the query and then add the resoruce you want to access ( for this test there is only one resource `trips`).

Examples:

Trip creation:

> http://localhost:3000/api/trips/create

Trip exploration:

> http://localhost:3000/api/trips/exploreTrips

List Trips:

> http://localhost:3000/api/trips/listTrips

or

> http://localhost:3000/api/trips/listTrips?tripIds=${tripIds separated by commas}

Trip deletion:

> http://localhost:3000/api/trips/${tripId}

# Documentation

Swagger is used in this project to create the documenation for the endpoints exposed. You can find it spinning up the server and going to [localhost:3000/docs](localhost:3000/docs).

==Find more documentation about the project below==

# Description of the project

## End points

### Main functionality of the challenge

- **Explore Trips**: Main part of the technical challenge. This endpoint covers the part of the test for implementing an endpoint that takes an origin, a destination and a sort_by intruction and returns all the trips found for that itinerary sorted with whatever strategy comes in the sort_by parameter. A cache has been added to this endpoint as an extra to the challenge. Go to the Extra functionality section to know more.

### Bonus

- **Create trip (POST)**: Given all the properties as a JSON in the body (origin, destination, duration, cost, display_name and type) it will create a new trip and insert it in the database.

- **Delete trip (DELETE)**: Using the id of the trip used in the path it erased the trip from the database.

- **List trips (GET)**: If no tripids are passed as parameters it returns all trips found in the database if else then it returns only the ones matching the ids passed.

## Extra functionality

### Cache

A small cache has been developed for the `explore trips` endpoint. It stores the results of previous queries using the origin and destination as keys. If a call is performed to the endpoint with the same origin and destination the app returns the match found in the database. A ttl of one minute is added to every entry so they get deleted after that time and they have to be refetched again in the next call for that combination of origin and destination.

## Tests cases coverage
