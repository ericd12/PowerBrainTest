import styled from "styled-components";
import ComponentWrapper from "./components/ComponentWrapper";

export const CoolTableHead = styled.th`
  text-align: left;
  width: 40px;
`;

export const StyledTableRow = styled.tr`
  td {
    text-align: left;
  }
`;

export const TrackContainer = styled(ComponentWrapper)`
  margin-left: auto;
  margin-right: auto;
  width: 95%; 
`;
