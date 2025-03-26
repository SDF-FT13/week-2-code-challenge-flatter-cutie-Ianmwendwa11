document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar");
    const detailedInfo = document.getElementById("detailed-info");
    const votesForm = document.getElementById("votes-form");
    const votesInput = document.getElementById("votes");
    let currentCharacter = null;

    
    fetch("http://localhost:3000/characters")
        .then(response => response.json())
        .then(characters => {
            characters.forEach(character => {
                const span = document.createElement("span");
                span.textContent = character.name;
                span.classList.add("character-name");
                span.addEventListener("click", () => displayCharacterDetails(character));
                characterBar.appendChild(span);
            });
        });

   
    function displayCharacterDetails(character) {
        currentCharacter = character;
        detailedInfo.innerHTML = `
            <h2>${character.name}</h2>
            <img src="${character.image}" alt="${character.name}">
            <p>Votes: <span id="vote-count">${character.votes}</span></p>
        `;
    }

    
    votesForm.addEventListener("submit", event => {
        event.preventDefault();
        if (currentCharacter) {
            let voteCount = document.getElementById("vote-count");
            let newVotes = parseInt(votesInput.value) || 0;
            let updatedVotes = currentCharacter.votes + newVotes;
            currentCharacter.votes = updatedVotes;
            voteCount.textContent = updatedVotes;
            votesInput.value = ""; 
        }
    });
});
