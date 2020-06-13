import React from "react";
import { Link } from "react-router-dom";
import { Form, Col, Button } from "react-bootstrap";

const ElementForm = ({
  onSubmit,
  onChange,
  elementNumber,
  elementLabel,
  elementDescription,
  elementFormat,
  elementDuration,
  elementCategory,
  elementSubCategory,
  elementMarket,
  elementCogRating,
  elementPhysRating,
  elementLink,
  categories,
  markets,
  formats,
  buttonText,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="elementNumber">
          <Form.Label>Number</Form.Label>
          <Form.Control
            name="elementNumber"
            onChange={onChange}
            placeholder="add #"
            required
            type="text"
            value={elementNumber}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="elementLabel">
          <Form.Label>Label</Form.Label>
          <Form.Control
            name="elementLabel"
            onChange={onChange}
            placeholder="add label"
            required
            type="text"
            value={elementLabel}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="elementDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="elementDescription"
            onChange={onChange}
            placeholder="add description"
            required
            type="text"
            value={elementDescription}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="elementFormat">
          <Form.Label>Format</Form.Label>
          <Form.Control
            as="select"
            name="elementFormat"
            onChange={onChange}
            required
            value={elementFormat}
          >
            {formats.map(format => {
              return (
                <option key={format} value={format}>
                  {format}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="elementDuration">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            name="elementDuration"
            onChange={onChange}
            placeholder="min:secs"
            required
            type="text"
            value={elementDuration}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="elementCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="elementCategory"
            onChange={onChange}
            required
            value={elementCategory}
          >
            {categories.map(categorie => {
              return (
                <option key={categorie} value={categorie}>
                  {categorie}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="elementSubCategory">
          <Form.Label>Subcategory</Form.Label>
          <Form.Control
            name="elementSubCategory"
            onChange={onChange}
            placeholder="insert subcategory"
            required
            type="text"
            value={elementSubCategory}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="elementMarket">
          <Form.Label>Market</Form.Label>
          <Form.Control
            as="select"
            name="elementMarket"
            onChange={onChange}
            required
            value={elementMarket}
          >
            {markets.map(market => {
              return (
                <option key={market} value={market}>
                  {market}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="elementCogRating">
          <Form.Label>Cognitive Rating</Form.Label>
          <Form.Control
            as="select"
            name="elementCogRating"
            onChange={onChange}
            required
            value={elementCogRating}
          >
            <option defaultValue>Choose...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="elementPhysRating">
          <Form.Label>Physical Rating</Form.Label>
          <Form.Control
            as="select"
            name="elementPhysRating"
            onChange={onChange}
            required
            value={elementPhysRating}
          >
            <option defaultValue>Choose...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="elementLink">
          <Form.Label>Vimeo Link</Form.Label>
          <Form.Control
            name="elementLink"
            onChange={onChange}
            placeholder="insert address"
            required
            type="text"
            value={elementLink}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row
        style={{
          justifyContent: "flex-end",
        }}
      >
        <Button as={Link} to="./" variant="link">
          Go Back
        </Button>
        <Button type="submit" variant="primary">
          {buttonText}
        </Button>
      </Form.Row>
    </Form>
  );
};

export default ElementForm;
