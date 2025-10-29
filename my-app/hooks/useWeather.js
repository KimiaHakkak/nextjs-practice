// hooks/useWeather.js
"use client";
import { useQuery } from "@tanstack/react-query";
import { getWeather } from "@/lib/getWeather";

export function useWeather(city) {
    return useQuery({
        queryKey: ["weather", city], // unique cache key per city
        queryFn: () => getWeather(city), // fetch function
        enabled: !!city, // only runs if city is not empty
        retry: 1, // retry once if failed
        staleTime: 1000 * 60 * 5, // cache stays fresh for 5 minutes
    });
}
