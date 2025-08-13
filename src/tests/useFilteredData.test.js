import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useFilteredData } from "../hooks/useFilteredData";

const exampleData = [
  {
    id: 20,
    name: "Shuffledrive",
    country: "China",
    industry: "Major Banks",
    numberOfEmployees: 33,
  },
  {
    id: 3,
    name: "Myworks",
    country: "United States",
    industry: "Other Specialty Stores",
    numberOfEmployees: 24,
  },
  {
    id: 14,
    name: "Tagchat",
    country: "China",
    industry: "Electric Utilities: Central",
    numberOfEmployees: 69,
  },
];
describe("useFilteredData", () => {
  it("should filter by country", () => {
    const { result } = renderHook(() =>
      useFilteredData(exampleData, "China", "", "Asc by name")
    );
    expect(result.current).toHaveLength(2);
  });
  it("should filter by country and industry", () => {
    const { result } = renderHook(() =>
      useFilteredData(exampleData, "China", "Major Banks", "Asc by name")
    );
    expect(result.current).toHaveLength(1);
  });
  it("should order desc by number of employees", () => {
    const { result } = renderHook(() =>
      useFilteredData(exampleData, "", "", "Desc by number of employees")
    );
    expect(result.current[0]).toStrictEqual({
      id: 14,
      name: "Tagchat",
      country: "China",
      industry: "Electric Utilities: Central",
      numberOfEmployees: 69,
    });
  });
});
