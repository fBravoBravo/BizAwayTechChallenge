export async function exploreTripsAPICall (origin: string, destination: string, sort_by: "fastest" | "cheapest") {
    const options = {
      method: 'GET',
    }
    const result = await fetch(`http://localhost:3000/tripExplorer?origin=${origin}&destination=${destination}&sort_by=${sort_by}`, options);
    const data = await result.json();
  
    return data;
}