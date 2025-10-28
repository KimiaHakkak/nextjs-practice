
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
            const { searchParams } = new URL(req.url);
            const q = searchParams.get("q");
            if (!q) {
                return NextResponse.json({ error: "Missing query parameter `q`" }, { status: 400 });
            }

    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "Missing API key on server" }, { status: 500 });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        q
    )}&appid=${apiKey}&units=metric`;

    // server-side fetch: safe, API key stays on server
    const res = await fetch(url);
    if (!res.ok) {
        const text = await res.text();
        return NextResponse.json(
            { error: `OpenWeather error: ${res.status} ${res.statusText}`, details: text },
            { status: 502 }
        );
    }

    const data = await res.json();
    // return the JSON from the third-party API (you can reshape it here if you like)
        return NextResponse.json(data);
    } catch (err) {
        console.error("API route error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
