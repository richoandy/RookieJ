import { initializeApp } from 'firebase'

const app = initializeApp({
  apiKey: 'AIzaSyDTXUcZm4BxsuxSXSInpWhuNZ2SPhD9Drc',
  authDomain: 'janken-d1d10.firebaseapp.com',
  databaseURL: 'https://janken-d1d10.firebaseio.com',
  projectId: 'janken-d1d10',
  storageBucket: '',
  messagingSenderId: '537583967556'
})

export const db = app.database()
export const roomsRef = db.ref('rooms')
export const gamesRef = db.ref('games')
