export const getCitiesList = () =>
  fetch("https://624d935653326d0cfe4f0ab4.mockapi.io/api/v1/cities")
    .then((response) => response.json())
    .then((citiesList) => Object.values(citiesList));

export const sendForm = () =>
  fetch("https://624d935653326d0cfe4f0ab4.mockapi.io/api/v1/send-form", {
    method: "POST",
  }).then((response) => response.json());
