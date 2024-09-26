import React from 'react';
import { shallow } from 'enzyme';

import AddressPopupForm from './addressPopupForm';
describe("AddressPopupForm", () => {
  it("should render my AddressPopupForm", () => {
    const wrapper = shallow(<AddressPopupForm />);
    expect(wrapper).toMatchSnapshot();
  });
  it("should create an entry in component state", () => {
    // given
    const component = shallow(<AddressPopupForm />);
    const form = component.find('input');
    // console.log("form",form.root.renderer);
    // // when
    // form.props().onChange({target: {
    //    name: 'myName',
    //    value: 'myValue'
    // }});
    // // then
    // expect(component.state('input')).toBeDefined();
});
});
