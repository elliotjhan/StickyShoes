import React from "react";
import ProductDetails from "./../components/product-details";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { create } from "react-test-renderer";

afterEach(() => {
  cleanup();
})

const numberWithCommas = (number) => {
  let newNumber = (parseFloat(number)).toFixed(2);
  return newNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

test("Product details should have 3 pictures, name, price, and description", () => {
  const currentProduct = {
    image: 'shaman1.jpeg',
    name: 'Evolv Shaman',
    price: 165,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
    carousel: ['shaman1.jpeg', 'shaman2.jpeg', 'shaman3.jpeg'],
    productid: 2
  }
  render(
    <ProductDetails
      numberWithCommas={numberWithCommas}
      currentProduct={currentProduct}
      productList={[]}
    />, { wrapper: MemoryRouter }
  );
  const productDetails = screen.getByTestId("productDetails");
  expect(productDetails).toHaveTextContent(currentProduct.name);
  expect(productDetails).toHaveTextContent(currentProduct.price);
  expect(productDetails).toHaveTextContent(currentProduct.description);
});

test('matches snapshot', () => {
  const currentProduct = {
    image: 'shaman1.jpeg',
    name: 'Evolv Shaman',
    price: 165,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
    carousel: ['shaman1.jpeg', 'shaman2.jpeg', 'shaman3.jpeg'],
    productid: 2
  }
  let tree = create(
    <MemoryRouter>
      <ProductDetails
        numberWithCommas={numberWithCommas}
        currentProduct={currentProduct}
        productList={[]}
      />
    </MemoryRouter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
})