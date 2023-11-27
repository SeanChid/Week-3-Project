console.log('JS is running')

const baseUrl = 'http://localhost:8000'

const characterDisplay = document.querySelector('#characterDisplay')
const characterForm = document.querySelector('form')

const createCharacter = (characterObject) => {

    const newCharacter = document.createElement('section')

    newCharacter.innerHTML = `
        <img src=${characterObject.picture} alt='character picture'/>
        <p>${characterObject.name}</p>

        <p>Age: ${characterObject.age}</p>

        <p>Catchphrase: ${characterObject.catchphrase}</p>

        </br>

        <section>
            <button>-</button>
            Popularity: ${characterObject.votes}
            <button>+</button>
        </section>

        </br>
        </br>

        <button onclick="deleteCharacter(${characterObject.id})">Delete Me</button>

        </br>
        </br>
    `

    characterDisplay.appendChild(newCharacter)
}

const displayAllCharacters = (arr) => {
    for (let i=0; i < arr.length; i++) {
        createCharacter(arr[i])
    }
}

const getAllCharacters = () => {
    axios.get(`${baseUrl}/characters`)
    .then((response) => {
        displayAllCharacters(response.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const handleSubmit = (e) => {
    e.preventDefault()

    characterDisplay.innerHTML = ''

    let name = document.querySelector('#characterName')
    let picture = document.querySelector('#characterPicture')
    let age = document.querySelector('#characterAge')
    let phrase = document.querySelector('#characterCatchphrase')

    let bodyObj = {
        characterName: name.value,
        characterPic: picture.value,
        characterAge: age.value,
        characterPhrase: phrase.value
    }

    axios.post(`${baseUrl}/character`, bodyObj)
    .then((response) => {
        displayAllCharacters(response.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

const deleteCharacter = (id) => {
    axios.delete(`${baseUrl}/character/${id}`)
    .then((res) => {
        characterDisplay.innerHTML = ''
        displayAllCharacters(res.data)
    })
}

characterForm.addEventListener('submit', handleSubmit)

getAllCharacters()