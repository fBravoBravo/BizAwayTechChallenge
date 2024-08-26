export async function exploreTripsAPICall (origin: string, destination: string, sort_by: "fastest" | "cheapest") {
    const options = {
      method: 'GET',
    }
    const result = await fetch(`http://localhost:3000/api/trips/exploreTrips?origin=${origin}&destination=${destination}&sort_by=${sort_by}`, options);
    const data = await result.json();
  
    return data;
}

export async function listTripsAPICall (tripID?: string[]) {
    const options = {
      method: 'GET',
    }

    if (tripID) {
        const idsString = tripID.join(',');
        const result = await fetch(`http://localhost:3000/api/trips/listTrips?tripIds=${JSON.stringify(idsString)}`, options);
        const data = await result.json();
        return data;
    }else{
        const result = await fetch(`http://localhost:3000/api/trips/listTrips`, options);
        const data = await result.json();
        return data;
    }
}


export async function createTripsAPICall (origin?: string, destination?: string, cost?: number, duration?: number, type?: string, display_name?: string) {
  
  const body = {origin, destination, cost, duration, type, display_name};
  
  const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }
    
    const result = await fetch(`http://localhost:3000/api/trips/create`, options);
    const data = await result.json();
    return data;
    
}


export async function deleteTripsAPICall (tripID?: string) {
    const options = {
      method: 'DELETE',
    }

    const result = await fetch(`http://localhost:3000/api/trips/${tripID}`, options);
    const data = await result.json();
    return data;
}