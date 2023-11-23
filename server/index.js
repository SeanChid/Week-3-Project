import express from 'express'
import session from 'express-session'
import cors from 'cors'
import characters from './db.json' assert {type: 'json'}
import handlerFunctions from './controller.js'

