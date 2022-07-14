import React from "react";
import Header from "./../components/header";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

test("Header should display the cart length prop", () => {
  render(<Header cartLength={5} />, { wrapper: MemoryRouter });
  const length = screen.getByTestId("cartLength");
  expect(length).toBeInTheDocument();
  expect(length).toHaveTextContent(5);
});
