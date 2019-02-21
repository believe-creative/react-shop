const API_ROOT = "https://reactshop.amoha.co:5000/api/";

function callAPI(endpoint, schema) {
  console.log("call api");
  const fullURL =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;

  return fetch(fullURL).then(response =>
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
export const getUser = userId => callAPI(`user/${userId}`);
