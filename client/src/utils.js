function isNull(value) {
  return value === null || value === undefined;
};
const PORT = 5050
const baseUrl = "http://localhost:" + PORT + "/api"
const supportedMethods = ["GET", "POST"]

export async function request(endpoint, method, data) {
  if (!isNull(endpoint) && !isNull(method) && supportedMethods.includes(method)) {
    if (typeof endpoint === "string" && endpoint.startsWith("/")) {
      switch (method) {
        case "GET":
          return await fetch(
            baseUrl + endpoint + "?" + new URLSearchParams(data).toString(),
            {
              method: method,
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
        case "POST":
          return await fetch(
            baseUrl + endpoint,
            {
              method: method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data)
            }
          )
      }
    } else {
      return Promise.reject(`endpoint '${endpoint}' needs to start with '/'`)
    }
  } else {
    return Promise.reject(`Unsupported method: ${method}`)
  }
}