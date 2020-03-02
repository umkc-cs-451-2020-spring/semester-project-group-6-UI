//We are assuming one endpoint for API. If setting for multiple environments, 
//we would dynamically determine hostname to set API URL

let backendHost = "api-dot-commercebank-451r.appspot.com";

export const API_ROOT = "https://" + backendHost + "/api";