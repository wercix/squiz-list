import { useState } from "react";
import "./App.css";
import styled from "styled-components";
import Filters from "./components/Filters";
import CardsList from "./components/CardsList";
import { useFilteredData } from "./hooks/useFilteredData";
import { useFetchData } from "./hooks/useFetchData";

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
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [order, setOrder] = useState<string>("Asc by name");

 const { data, countries, industries, error } = useFetchData();

  const filteredData = useFilteredData(
    data,
    selectedCountry,
    selectedIndustry,
    order
  );

  if (error) {
    return <p>{error}</p>
  }
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
