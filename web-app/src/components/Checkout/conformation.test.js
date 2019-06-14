import React from 'react';
import { shallow } from 'enzyme';

import Conformation from './conformation';
describe("Conformation", () => {
  it("should render my Conformation", () => {
    const wrapper = shallow(<Conformation />);
    expect(wrapper).toMatchSnapshot();
  });
});
