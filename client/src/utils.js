/**
 * Checks if the given object is null or undefined with === for both
 * @param {any} value
 * @return {Boolean}
 */
function isNull(value) {
  return value === null || value === undefined;
}
const PORT = 5050;
const URL = import.meta.env.VITE_PROD_URL || "http://localhost:";
const baseUrl = URL + "api";
const supportedMethods = ["GET", "POST"];

/**
 * Wrapper for doing requests using fetch, simplifies call and removes code repetition
 * "URL:POST/api" will be prepended to the endpoint. The given method will be used. Only
 * GET, POST are supported as of now. The data will be passed according to the standards
 * of the method
 * @export
 * @param {String} endpoint endpoint i
 * @param {String} method GET, POST
 * @param {Object} data data to be passed in the request following its standards/limitations
 * @return {Promise<Object>} response
 */
export async function request(endpoint, method, data) {
  if (
    !isNull(endpoint) &&
    !isNull(method) &&
    supportedMethods.includes(method)
  ) {
    if (typeof endpoint === "string" && endpoint.startsWith("/")) {
      const commonHeaders = {
        "Content-Type": "application/json",
      };
      switch (method) {
        case "GET":
          return await fetch(
            baseUrl + endpoint + "?" + new URLSearchParams(data).toString(),
            {
              method: method,
              headers: commonHeaders,
            }
          );
        case "POST":
          return await fetch(baseUrl + endpoint, {
            method: method,
            headers: commonHeaders,
            body: JSON.stringify(data),
          });
      }
    } else {
      return Promise.reject(`endpoint '${endpoint}' needs to start with '/'`);
    }
  } else {
    return Promise.reject(`Unsupported method: ${method}`);
  }
}
