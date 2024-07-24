document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.getElementById("dog-image-container");
    const breedList = document.getElementById("dog-breeds");
    const breedDropdown = document.getElementById("breed-dropdown");
  
    // Challenge 1: Fetch and display dog images
    fetch(imgUrl)
      .then(response => response.json())
      .then(data => {
        data.message.forEach(recvImg => {
          const img = document.createElement("img");
          img.src = recvImg;
          imageContainer.appendChild(img);
        });
      });
  
    // Challenge 2: Fetch and display dog breeds
    fetch(breedUrl)
      .then(response => response.json())
      .then(data => {
        const breeds = data.message;
        Object.keys(breeds).forEach(breed => {
          addBreedToList(breed);
        });
      });
  
    // Add breed to list
    function addBreedToList(breed) {
      const li = document.createElement("li");
      li.textContent = breed;
      li.addEventListener("click", () => {
        li.style.color = "blue";
      });
      breedList.appendChild(li);
    }
  
    // Challenge 4: Filter breeds by first letter
    breedDropdown.addEventListener("change", (event) => {
      const selectedLetter = event.target.value;
      breedList.innerHTML = "";
      fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
          const breeds = data.message;
          Object.keys(breeds).forEach(breed => {
            if (selectedLetter === "all" || breed.startsWith(selectedLetter)) {
              addBreedToList(breed);
            }
          });
        });
    });
  });
  