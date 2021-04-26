import React from "react";
import { shallow } from "enzyme";
import UserNew from "./UserNew";

describe("UserNew", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<UserNew />);
    expect(wrapper).toMatchSnapshot();
  });
});
