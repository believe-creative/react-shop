/**
 * @jest-environment node
 */

import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import axios from "axios";
import Login from './login';
import Link from './Link';

describe("Login", () => {
  let response="";
  it("should render my component", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toMatchSnapshot();

  });

  it("should get my token", async () => {
    response= await axios.get("http://localhost:5000/api/get_token");
    expect(response.data.status).toEqual("success");
  });

  it("should render my Login", async () => {
    // mockAxios.get.mockImplementationOnce(()=>
    //   Promise.resolve({
    //     data:{status:"success",token:"success"}
    //   }));
    // const wrapper = shallow(<Login />);
    const loginDetails= await axios.post("http://localhost:5000/api/login",{
          email: "jag@teamdevx.com",
          pwd: "jagadish"
        },
        { headers: { Authorization: `Bearer ${response.data.token}` } }
      );
    expect(loginDetails.data.user.name).toEqual("Jagadish Konduru");
    // expect(axios.get).toHaveBeenCalledTimes(1);
     // expect(response).toHaveBeenCalledWith("http://localhost:5000/api/get_token");
    // console.log(mockAxios.get.mockName());
  });

  it('renders correctly', () => {
  const tree = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

});
