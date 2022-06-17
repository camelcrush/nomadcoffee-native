import styled from "styled-components/native";

export const TextInput = styled.TextInput`
  width: 80%;
  background-color: white;
  padding: 15px 7px;
  border-radius: 4px;
  color: gray;
  margin-bottom: ${(props) => (props.lastOne ? "15" : 8)}px;
  padding: 10px 20px;
`;
