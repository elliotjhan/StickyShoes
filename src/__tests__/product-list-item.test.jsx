import React from "react";
import ProductListItem from "./../components/product-list-item";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
  cleanup();
})

test("Each component should display the picture, name, and price", () => {
  const product = {
      image: 'shaman1.jpeg',
      name: 'Evolv Shaman',
      price: 175,
  }
  const numberWithCommas = (number) => {
    let newNumber = (parseFloat(number)).toFixed(2);
    return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  render(<ProductListItem numberWithCommas={numberWithCommas} product={product} />, { wrapper: MemoryRouter });
  const productListItem = screen.getByTestId("productListItem");
  expect(productListItem).toHaveTextContent('Evolv Shaman');
  expect(productListItem).toHaveTextContent(175);
});

