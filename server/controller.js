import characters from './db.json' assert {type: 'json'}

let globalId = 4

const handlerFunctions = {

    getCharacters: (req, res) => {
        res.send(characters)
    },

    getOneCharacter: (req, res) => {
        const {index} = req.params
        res.send(characters[req.params.index])
    },

    addCharacter: (req, res) => {
        const {characterName, characterPic, characterAge, characterPhrase} = req.body

        let newObj = {
            id: globalId,
            name: characterName,
            picture: characterPic,
            age: characterAge,
            catchphrase: characterPhrase,
            votes: 0
        }

        characters.push(newObj)
        
        globalId++

        res.send(characters)
    },

    deleteCharacter: (req, res) => {
        const {id} = req.params

        for (let i=0; i < characters.length; i++) {
            if (characters[i].id === +req.params.id) {
                characters.splice(i, 1)
                break
            }
        }

        res.send(characters)
    }

}

export default handlerFunctions