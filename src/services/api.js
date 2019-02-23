import { API_ROOT } from "./constants";

function callAPI(endpoint, headers, schema) {
  console.log("call api");
  const fullURL =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;

  return fetch(fullURL, { headers }).then(response =>
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

export const getProducts = category => callAPI(`products/`);
export const getProduct = productId => callAPI(`product/${productId}`);
export const checkUser = token =>
  callAPI(`checkuser/`, { Authorization: `Bearer ${token}` });
export const getDepartments = () => callAPI("get-departments");
