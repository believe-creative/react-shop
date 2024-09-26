var assert = require('assert');
const expect = require('chai').expect;
const axios = require('axios');


describe('Using Mocha, Chai framework to Test the project server API Calls and other testcases related to the Server_mongo.js file[ NodeJs and Mongodb BackEnd Project]', function() {
  describe('Login Test Cases', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });

    it("should get my token", async () => {
      response= await axios.get("http://localhost:5000/api/get_token");
      expect(response.data.status).to.equal("success");
    });

    it("should render my Login", async () => {
       const loginDetails= await axios.post("http://localhost:5000/api/login",{
          email: "srinu@teamdevx.com",
          pwd: "admin"
        },{ headers: { Authorization: `Bearer ${response.data.token}` } }
       );
     expect(loginDetails.data.user.name).to.equal("Admin User");
  });
  it("get Departments", async () => {
     const departments= await axios.post("http://localhost:5000/api/get-departments",{ headers: { Authorization: `Bearer ${response.data.token}` } }
     );
     console.log(departments);
     expect(departments.data.departments.name).to.equal("Regional");
  });

  it('double done', function(done) {
  // Calling `done()` twice is an error
  setImmediate(done);
  // setImmediate(done);
  });
});
});
