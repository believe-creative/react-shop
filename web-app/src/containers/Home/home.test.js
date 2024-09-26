import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Home from './home';
describe("MyComponent", () => {
  it("should render my component", () => {
    const wrapper = shallow(<Home />);
    // console.log("wrapper",wrapper.node.props);
    expect(wrapper).toMatchSnapshot();

  });
});
