# BizAway Tech Challenge

Tech Challenge Solution Proposal

## Author

- Name: Francisco Bravo Bravo
- Github: github.com/fBravoBravo
- Linkedin: linkedin.com/in/fbravobravo

# Running the project

## Spinning up the server

- Make sure to use the specified node version (20 LTS).
- Add the API key (BizAway's endpoint API key) to the env file as specified in `.example.env`.
- Clone the project.
- Run `npm install` in the root of the project.
- Run `sudo npm run start`

These steps will spin up the server and it will be ready to start receiving requests.

## Running the tests

- Spin up the server using the steps described above.
- Run `npm run test`

## Making calls to the API

The server is deployed in localhost on port `3000`. To make calls to the API first add the `api` subdirectory to the query and then add the resource you want to access (for this test there is only one resource `trips`).

Examples

Trip creation:

> http://localhost:3000/api/trips/create

Trip exploration:

> http://localhost:3000/api/trips/explore

Trip listing:

> http://localhost:3000/api/trips/list

or

> http://localhost:3000/api/trips/list?ids=${tripIds separated by commas}

Trip deletion:

> http://localhost:3000/api/trips/${tripId}

# Documentation

Swagger is used in this project to create the documentation for the endpoints exposed. You can find it spinning up the server and going to [localhost:3000/docs](localhost:3000/docs).

# Description of the project

## Endpoints

### Main functionality of the challenge

- **Explore Trips**: This endpoint covers the main part of the challenge and is designed to retrieve and sort travel itineraries based on specified criteria. Users can provide an origin, a destination and a sorting method. The endpoint will then return all matching trips, sorted according to the chosen sorting strategy.

For enhanced performance a cache has been implemented. This cache stores recent search results allowing for faster response times for repeated queries with the same parameters. Please refer to the 'Extra functionality' section for more details on the cache implementation.

### Bonus

- **Create trip (POST)**: Given all the properties as a JSON in the body (origin, destination, duration, cost, display_name and type) it will create a new trip and insert it in the database.

- **Delete trip (DELETE)**: Using the ID of the trip used in the path it erases the trip from the database.

- **List trips (GET)**: If no trip IDs are passed as parameters it returns all trips found in the database. If else it returns only the ones matching the IDs passed.

## Extra functionality

### Cache

To optimize performance, we've implemented a small cache for the explore trips endpoint. This cache stores recent search results using the origin and destination as keys. When a user makes a request with the same origin and destination, the app quickly returns the cached results instead of performing a new search.

To ensure data freshness, each cached entry has a time-to-live (TTL) of one minute. After this time, the entry is automatically removed, and subsequent requests for the same origin and destination will trigger a new search.

The benefits of caching are evident in performance benchmarks. For instance, when making two consecutive calls to the endpoint with the same parameters (e.g., http://localhost:3000/api/trips/exploreTrips?origin=MAD&destination=JFK&sort_by=cheapest), the first call might take around 6 seconds. However, the second call will be significantly faster, typically completing in under 500 milliseconds.

## Tests cases coverage

- Explore trips:

  - JSON response contains the correct properties
  - Sort by cheapest orders the trips accordingly
  - Sort by fastest orders the trips accordingly
  - If parameters are missing an error is returned from the server
  - Correct parameters are passed but they are not allowed (e.g. IATA code not in the list specified in the Bizaway Tech Challenge readme)

- Create trip:

  - If correct parameters are passed the trip is created successfully
  - If some parameters are missing an error is returned

- Delete trip:

  - Trips are deleted successfully
  - If no trip ID is introduced in the path the server returns an error

- List trips:
  - If no trip IDs are passed as parameters it returns all trips found in the database
  - If trip IDs are passed it returns only those trips
