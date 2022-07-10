import React from "react";
import ReactDOM from "react-dom";
import Footer from "./../components/footer";
import { render } from "@testing-library/react";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Footer></Footer>, div);
});

it("renders footer correctly", () => {
  const { getByTestId } = render(<Footer></Footer>);
  expect(getByTestId("footer")).toHaveTextContent(
    `${new Date().getFullYear()} | stickyshoes.elliotjhan.com | All Rights Reserved`
  );
});
