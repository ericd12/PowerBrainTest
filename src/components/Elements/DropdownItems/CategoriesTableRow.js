import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "react-bootstrap";

const StyledTableRow = styled.tr`
  td {
    text-align: center;
  }
`;

const CategoriesTableRow = ({ elementCategory, _id, deleteCategory }) => (
  <StyledTableRow>
    <td>{elementCategory}</td>
    <td>
      <Link to={`/categories/edit/${_id}`}>
        <Button size="sm" variant="outline-warning">
          edit
        </Button>
      </Link>
      <span> | </span>
      <Button
        onClick={() => {
          deleteCategory(_id);
        }}
        size="sm"
        variant="outline-danger"
      >
        delete
      </Button>
    </td>
  </StyledTableRow>
);

export default CategoriesTableRow;
