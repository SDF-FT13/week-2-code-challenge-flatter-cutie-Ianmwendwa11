document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "http://localhost:3000/characters";
    const characterBar = document.getElementById("character-bar");
  
    
    fetch(baseURL)
      .then(response => response.json())
      .then(characters => {
        characters.forEach(character => {
          const span = document.createElement("span");
          span.textContent = character.name;
          span.style.cursor = "pointer"; 
          span.addEventListener("click", () => displayCharacterDetails(character));
          characterBar.appendChild(span);
        });
      });
  });


  function displayCharacterDetails(character) {
    const detailedInfo = document.getElementById("detailed-info");
    detailedInfo.innerHTML = `
      <h2>${character.name}</h2>
      <img src="${character.image}" alt="${character.name}">
      <p>Votes: <span id="vote-count">${character.votes}</span></p>
    `;
    
    
    detailedInfo.dataset.characterId = character.id;
    detailedInfo.dataset.currentVotes = character.votes;
  }

  document.getElementById("votes-form").addEventListener("submit", (event) => {
    event.preventDefault(); 
  
    const voteInput = document.getElementById("votes");
    const voteCount = document.getElementById("vote-count");
    const detailedInfo = document.getElementById("detailed-info");
  
    const newVotes = parseInt(voteCount.textContent) + parseInt(voteInput.value);
    
    
    voteCount.textContent = newVotes;
  
   
    voteInput.value = "";
  });
  
  document.getElementById("reset-btn").addEventListener("click", () => {
    const voteCount = document.getElementById("vote-count");
    voteCount.textContent = "0";
  });

  document.getElementById("character-form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const nameInput = document.getElementById("name");
    const imageInput = document.getElementById("image");
  
    const newCharacter = {
      name: nameInput.value,
      image: imageInput.value,
      votes: 0
    };
  
    
    const characterBar = document.getElementById("character-bar");
    const span = document.createElement("span");
    span.textContent = newCharacter.name;
    span.style.cursor = "pointer";
    span.addEventListener("click", () => displayCharacterDetails(newCharacter));
    characterBar.appendChild(span);
  
    displayCharacterDetails(newCharacter);
  
    nameInput.value = "";
    imageInput.value = "";
  });
  