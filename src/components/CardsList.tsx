import styled from "styled-components";
import type { Item } from "../App";
import Card from "./Card";

const DataList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex: 1;
`;
const CardsList: React.FC<{data: Item[]}> = ({data}) => (
  <DataList>
    {data.length ? (
      data.map((item) => <Card key={item.id} item={item} />)
    ) : (
      <p>No data</p>
    )}
  </DataList>
);

export default CardsList;
