import React from "react";
import type { Item } from "../App";
import styled from "styled-components";

const Container = styled.div`
  border-radius: 5px;
  border: 1px solid #ddd;
  padding: 12px;
  margin: 10px;
  min-width: 190px;
  flex-basis: 27%;
`;

type CardProps = {
  item: Item;
};
const Card: React.FC<CardProps> = ({
  item: { name, country, industry, numberOfEmployees },
}) => {
  return (
    <Container>
      <p>{name}</p>
      <p>{country}</p>
      <p>{industry}</p>
      <p>{`Employees: ${numberOfEmployees}`}</p>
    </Container>
  );
};

export default React.memo(Card);
