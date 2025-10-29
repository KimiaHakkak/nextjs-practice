export async function getWeather(city) {
    if (!city) throw new Error("City is required");

    const res = await fetch(`/api/weather?q=${encodeURIComponent(city)}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to fetch weather");
    return data;
}

//this file is the Weather Fetch Logic, we got it out of the ui.