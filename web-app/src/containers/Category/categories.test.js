import React from 'react';
import { shallow } from 'enzyme';

import Categories from './categories';
describe("All Categories", () => {
  it("should render all Categories", () => {
    const wrapper = shallow(<Categories />);
    expect(wrapper).toMatchSnapshot();
  });
});
