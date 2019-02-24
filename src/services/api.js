import { API_ROOT } from "./constants";

function callAPI(endpoint, headers, body, schema) {
  const fullURL =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;
  console.log(endpoint, headers, body);
  return fetch(fullURL, { headers, body, method: body ? "POST" : "GET" }).then(
    response =>
      response
        .json()
        .then(json => ({ json, response }))
        .then(({ json, response }) => {
          if (!response.ok) {
            return Promise.reject(json);
          }
          return json;
        })
        .then(
          response => ({ response }),
          error => ({ error: error.message || "Somehing gone wrong" })
        )
  );
}

function getParams(data) {
  return Object.keys(data)
    .map(key => {
      return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    })
    .join("&");
}

export const getProducts = category => callAPI(`products/`);
export const getProduct = productId => callAPI(`product/${productId}`);
export const checkUser = token =>
  callAPI(`checkuser/`, { Authorization: `Bearer ${token}` });
export const getDepartments = () => callAPI("get-departments/");
export const getSubCategories = departmentId =>
  callAPI(
    "get-department-categories/",
    {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json; charset=utf-8"
    },
    getParams({ inDepartmentId: departmentId })
  );
export const getCategoryProducts = data =>
  callAPI(
    "get-department-products/",
    { "Content-Type": "application/x-www-form-urlencoded" },
    getParams({
      inDepartmentId: data.departmentId,
      inShortProductDescriptionLength: data.descriptionLength,
      inProductsPerPage: 10,
      inStartItem: 0
    })
  );
