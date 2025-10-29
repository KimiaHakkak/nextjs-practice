// hooks/useWeather.js
"use client";
import { useQuery } from "@tanstack/react-query";
import { getWeather } from "@/lib/api";


export function useWeather(city) {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => getWeather(city),
    enabled: false, // only fetch when refetch() is manually called
    retry: 1,
    staleTime: 1000 * 60 * 10, // cache valid for 10 minutes
  });
}

//enabled: !!city, // only runs if city is not empty
//enabled: false,