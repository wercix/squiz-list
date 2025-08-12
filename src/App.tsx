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

const orderOptions = [
  "Asc by name",
  "Desc by name",
  "Asc by number of employees",
  "Desc by number of employees",
];

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
      <FiltersComponent>
        <h2>Filters</h2>
        <Select
          id="country"
          label="Country"
          value={selectedCountry}
          options={countries}
          handleOnClick={setSelectedCountry}
          hasAllOption={true}
        />
        <Select
          id="industry"
          label="Industry"
          value={selectedIndustry}
          options={industries}
          handleOnClick={setSelectedIndustry}
          hasAllOption={true}
        />
        <Select
          id="order"
          label="Order"
          value={order}
          options={orderOptions}
          handleOnClick={setOrder}
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
