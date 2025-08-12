import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import Filters from "./components/Filters";
import CardsList from "./components/CardsList";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export type Item = {
  id: number;
  name: string;
  country: string;
  industry: string;
  numberOfEmployees: number;
};

function App() {
  const [data, setData] = useState<Item[]>([]);
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [industries, setIndustries] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [order, setOrder] = useState<string>("Asc by name");

  useEffect(() => {
    fetch("https://dujour.squiz.cloud/developer-challenge/data")
      .then((response) => response.json())
      .then((fetchedData: Item[]) => {
        setData(fetchedData);
        setFilteredData(fetchedData);
        const uniqueCountries: string[] = [
          ...new Set(fetchedData.map((item) => item.country)),
        ].sort();
        setCountries(uniqueCountries);
        const uniqueIndustries: string[] = [
          ...new Set(fetchedData.map((item) => item.industry)),
        ].sort();
        setIndustries(uniqueIndustries);
      });
  }, []);

  useEffect(() => {
    setFilteredData(
      data
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
        })
    );
  }, [data, order, selectedCountry, selectedIndustry]);

  return (
    <Container>
      <Filters
        selectedCountry={selectedCountry}
        countries={countries}
        setSelectedCountry={setSelectedCountry}
        selectedIndustry={selectedIndustry}
        industries={industries}
        setSelectedIndustry={setSelectedIndustry}
        order={order}
        setOrder={setOrder}
      />
      <CardsList data={filteredData} />
    </Container>
  );
}

export default App;
