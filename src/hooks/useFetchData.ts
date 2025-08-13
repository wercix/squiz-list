import { useEffect, useState } from "react";
import type { Item } from "../App";

export function useFetchData() {
  const [data, setData] = useState<Item[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetch("https://dujour.squiz.cloud/developer-challenge/data")
      .then((response) => response.json())
      .then((fetchedData: Item[]) => {
        setData(fetchedData);
        setError("");

        const uniqueCountries: string[] = [
          ...new Set(fetchedData.map((item) => item.country)),
        ].sort();
        setCountries(uniqueCountries);

        const uniqueIndustries: string[] = [
          ...new Set(fetchedData.map((item) => item.industry)),
        ].sort();
        setIndustries(uniqueIndustries);
      })
      .catch(() => setError("Something went wrong. Please try again."));
  }, []);

  return { data, countries, industries, error };
}
