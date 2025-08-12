import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import Card from "./components/Card";
import Select from "./components/Select";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const DataList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex: 1;
`;
const FiltersComponent = styled.div`
  padding: 24px;
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
      data.filter((item) => {
        const countryFilter =
          selectedCountry !== "" ? item.country === selectedCountry : true;
        const industryFilter =
          selectedIndustry !== "" ? item.industry === selectedIndustry : true;
        return countryFilter && industryFilter;
      })
    );
  }, [data, selectedCountry, selectedIndustry]);

  return (
    <Container>
      <FiltersComponent>
        <h2>Filters</h2>
        <Select
          id="country"
          label="Country"
          value={selectedCountry}
          options={countries}
          handleOnClick={setSelectedCountry}
        />
        <Select
          id="industry"
          label="Industry"
          value={selectedIndustry}
          options={industries}
          handleOnClick={setSelectedIndustry}
        />
      </FiltersComponent>
      <DataList>
        {filteredData.length ? (
          filteredData.map((item) => <Card key={item.id} item={item} />)
        ) : (
          <p>No data</p>
        )}
      </DataList>
    </Container>
  );
}

export default App;
