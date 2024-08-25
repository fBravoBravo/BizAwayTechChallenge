export async function exploreTripsAPICall (origin: string, destination: string, sort_by: "fastest" | "cheapest") {
    const options = {
      method: 'GET',
    }
    const result = await fetch(`http://localhost:3000/api/trips/tripExplorer?origin=${origin}&destination=${destination}&sort_by=${sort_by}`, options);
    const data = await result.json();
  
    return data;
}

export async function listTripsAPICall (tripID?: string[]) {
    const options = {
      method: 'GET',
    }

    if (tripID) {
        const result = await fetch(`http://localhost:3000/api/trips/listTrips?tripIds=${JSON.stringify(tripID)}`, options);
        const data = await result.json();
        return data;
    }else{
        const result = await fetch(`http://localhost:3000/api/trips/listTrips`, options);
        const data = await result.json();
        return data;
    }
}