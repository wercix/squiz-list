import { useMemo } from "react";
import type { Item } from "../App";

export function useFilteredData(
    data: Item[],
    selectedCountry: string,
    selectedIndustry: string,
    order: string,
): Item[] {
    return useMemo(() => {
        return data
          .filter((item) => {
            const countryFilter =
              selectedCountry !== "" ? item.country === selectedCountry : true;
            const industryFilter =
              selectedIndustry !== "" ? item.industry === selectedIndustry : true;
            return countryFilter && industryFilter;
          })
          .sort((a, b) => {
            if (order === "Asc by name") {
              return a.name.localeCompare(b.name);
            } else if (order === "Desc by name") {
              return b.name.localeCompare(a.name);
            } else if (order === "Asc by number of employees") {
              return a.numberOfEmployees - b.numberOfEmployees;
            }
            return b.numberOfEmployees - a.numberOfEmployees;
          });
      }, [data, selectedCountry, selectedIndustry, order])
}