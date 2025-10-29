export async function getWeather(city) {
    if (!city) throw new Error("City name is required");

    const res = await fetch(`/api/weather?q=${encodeURIComponent(city)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
          cache: "no-store", // ensures fresh data (Next.js fetch caching off)
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to fetch: ${res.status} - ${errorText}`);
    }

    return res.json();
}


//this file is the Weather Fetch Logic, we got it out of the ui. its an api call. the single source of truth for all API calls.