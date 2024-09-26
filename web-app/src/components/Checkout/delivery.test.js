import React from 'react';
import { shallow } from 'enzyme';

import Delivery from './delivery';
describe("Delivery", () => {
  it("should render my Delivery", () => {
    const wrapper = shallow(<Delivery />);
    expect(wrapper).toMatchSnapshot();
  });
});
