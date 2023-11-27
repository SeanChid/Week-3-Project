import express from 'express'
import session from 'express-session'
import cors from 'cors'
import characters from './db.json' assert {type: 'json'}
import handlerFunctions from './controller.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.static('client'))
app.use(session({
    secret: 'Thisisasupersecret',
    saveUninitialized: true,
    resave: false
}))

const {getCharacters, getOneCharacter, addCharacter, deleteCharacter} = handlerFunctions

app.get('/characters', getCharacters)
app.get('/oneCharacter/:index', getOneCharacter)
app.post('/character', addCharacter)
app.delete('/character/:id', deleteCharacter)

app.listen(8000, () => console.log('Server is running'))