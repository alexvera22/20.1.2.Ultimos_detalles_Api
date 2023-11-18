const apiUrl = "https://api.thecatapi.com/v1/images/search";

const randomCatButton = document.getElementById("randomCatButton");

const catImage = document.getElementById("catImage");


randomCatButton.addEventListener("click", () => {
  fetch(apiUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`La solicitud no fue exitosa. Código de estado: ${response.status}`);
      }
    })
    .then((data) => {
      const catImageUrl = data[0].url;
      catImage.src = catImageUrl;
    })
    .catch((error) => {
      console.error("Error de solicitud:", error);
    });
});