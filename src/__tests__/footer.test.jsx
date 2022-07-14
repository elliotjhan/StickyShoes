import React from "react";
import Footer from "./../components/footer";
import { render, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";

test(" on initial render", () => {
  render(<Footer />);
  const tree = renderer.create(<Footer />).toJSON();
  expect(tree).toMatchSnapshot();
  cleanup();
});

