export async function getWeather(city) {
  const res = await fetch(`/api/weather?q=${encodeURIComponent(city)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return res.json();
}


//this file is the Weather Fetch Logic, we got it out of the ui. its an api call.