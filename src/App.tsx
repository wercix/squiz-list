import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import Card from "./components/Card";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const DataList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
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

  useEffect(() => {
    fetch("https://dujour.squiz.cloud/developer-challenge/data")
      .then((response) => response.json())
      .then((fetchedData) => setData(fetchedData));
  }, []);

  return (
    <Container>
      <DataList>
        {data ? data.map((item) => <Card item={item} />) : <p>No data</p>}
      </DataList>
    </Container>
  );
}

export default App;
