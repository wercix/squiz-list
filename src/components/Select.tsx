import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 12px;
  width: 350px;
`;

type SelectProps = {
  id: string;
  label: string;
  value: string;
  options: string[];
  handleOnClick: (value: string) => void;
};

const Select: React.FC<SelectProps> = ({
  id,
  label,
  value,
  options,
  handleOnClick,
}) => {
  return (
    <Container>
      <span>{label}: </span>
      <select
        id={id}
        value={value}
        onChange={(e) => handleOnClick(e.target.value)}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Container>
  );
};

export default Select;
