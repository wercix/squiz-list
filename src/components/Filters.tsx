import styled from "styled-components";
import Select from "./Select";

const Container = styled.div`
  padding: 24px;
`;

const orderOptions = [
  "Asc by name",
  "Desc by name",
  "Asc by number of employees",
  "Desc by number of employees",
];
type FiltersProps = {
  selectedCountry: string;
  countries: string[];
  setSelectedCountry: (value: string) => void;
  selectedIndustry: string;
  industries: string[];
  setSelectedIndustry: (value: string) => void;
  order: string;
  setOrder: (value: string) => void;
};

const Filters: React.FC<FiltersProps> = ({
  selectedCountry,
  countries,
  setSelectedCountry,
  selectedIndustry,
  industries,
  setSelectedIndustry,
  order,
  setOrder,
}) => {
  return (
    <Container>
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
    </Container>
  );
};
export default Filters;
