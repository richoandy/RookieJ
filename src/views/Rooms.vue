<template>
  <div>
    <p>{{ firebaseRoom }}</p>
    <p>{{ firebaseGame }}</p>
    <p>{{ firebaseGame[0]['.value'] }} = {{ firebaseGame[2].score }}</p>
    <p>{{ firebaseGame[1]['.value'] }} = {{ firebaseGame[3].score }}</p>
    <p>{{ checkScore }}</p>
    <input type="text" v-model="player">
    <button type="submit" @click="addPlayer">Add</button>
    <button type="submit" @click="startGame">Start</button>
    <br>
    <button type="submit" @click="tambahScoreP1(firebaseGame[2]['.key'])">Tambah Score P1</button>
    <button type="submit" @click="tambahScoreP2(firebaseGame[3]['.key'])">Tambah Score P2</button>
    <button type="submit" @click="reset(firebaseGame[3]['.key'], firebaseGame[2]['.key'], firebaseGame[4]['.key'], firebaseGame[5]['.key'])">reset</button>
    <p>{{ winner }}</p>
    <div>

      <h1>player 1</h1> {{ p1input }}
      <button @click="setInput('gunting', firebaseGame[4]['.key'])">Gunting</button>
      <button @click="setInput('batu', firebaseGame[4]['.key'])">Batu</button>
      <button @click="setInput('kertas', firebaseGame[4]['.key'])">Kertas</button>
      <p>{{ firebaseGame[0].janken }}</p>
      <h1>player 2</h1> {{ P2input }}
      <button @click="setInput('gunting', firebaseGame[5]['.key'])">Gunting</button>
      <button @click="setInput('batu', firebaseGame[5]['.key'])">Batu</button>
      <button @click="setInput('kertas', firebaseGame[5]['.key'])">Kertas</button>
      <p>{{ firebaseGame[1].janken }}</p>
      <br><br>
      <p>{{ winner }}</p>
    </div>
  </div>
</template>

<script>
import { roomsRef, gamesRef } from '@/firebase'

export default {
  data () {
    return {
      p1input: '',
      P2input: '',
      player: '',
      isWinner: ''
    }
  },
  firebase: {
    firebaseRoom: roomsRef,
    firebaseGame: gamesRef
  },
  methods: {

    setInput (janken, jankenKey, scoreKey) {
      // if (player === 1) {
      //   this.p1input = input
      // } else {
      //   this.P2input = input
      // }
      gamesRef.child(jankenKey).update({
        janken
      })
      // gamesRef.child(key).child('janken').set(janken)
    },

    addPlayer: function () {
      roomsRef.push(this.player)
      this.player = ''
    },
    startGame: function () {
      // console.log(this.firebaseRoom[0]['.value'])
      gamesRef.push(this.firebaseRoom[0]['.value'])
      gamesRef.push(this.firebaseRoom[1]['.value'])
      gamesRef.push({score: 0})
      gamesRef.push({score: 0})
      gamesRef.push({janken: ''})
      gamesRef.push({janken: ''})
    },
    tambahScoreP1: function (key) {
      gamesRef.child(key).update({
       score: 1
      })
    },
    tambahScoreP2: function (key) {
      gamesRef.child(key).update({
       score: 1
      })
    },
    reset: function (key1, key2, key3, key4) {
      gamesRef.child(key1).update({
        score: 0
      })
      gamesRef.child(key2).update({
        score: 0
      })
      gamesRef.child(key3).update({
        janken: ''
      })
      gamesRef.child(key4).update({
        janken: ''
      })
    }
  },
  computed: {
    checkScore: function () {
      if (this.firebaseGame[2].score == 1) {
        return this.firebaseGame[0]['.value']
      } else if (this.firebaseGame[3].score == 1) {
        return this.firebaseGame[1]['.value']
      }
    },

    winner: function () {
      if (this.firebaseGame[4].janken === this.firebaseGame[5].janken) {
        return 'rematch'
      } else if (this.firebaseGame[4].janken === 'gunting' && this.firebaseGame[5].janken === 'batu') {
        return this.isWinner = this.firebaseGame[1]['.value']
      } else if (this.firebaseGame[4].janken === 'gunting' && this.firebaseGame[5].janken === 'kertas') {
        return this.isWinner = this.firebaseGame[0]['.value']
      } else if (this.firebaseGame[4].janken === 'batu' && this.firebaseGame[5].janken === 'gunting') {
        return this.isWinner = this.firebaseGame[0]['.value']
      } else if (this.firebaseGame[4].janken === 'batu' && this.firebaseGame[5].janken === 'kertas') {
        return this.isWinner = this.firebaseGame[1]['.value']
      } else if (this.firebaseGame[4].janken === 'kertas' && this.firebaseGame[5].janken === 'gunting') {
        return this.isWinner = this.firebaseGame[1]['.value']
      } else if (this.firebaseGame[4].janken === 'kertas' && this.firebaseGame[5].janken === 'batu') {
        return this.isWinner = this.firebaseGame[0]['.value']
      }
    }
  },
  watch: {
    isWinner: function () {
      console.log(this.isWinner);
      console.log('=======>', this.firebaseGame[0]['.value']);
      
      if (this.isWinner == this.firebaseGame[0]['.value']) {
        gamesRef.child(this.firebaseGame[2]['.key']).update({
          score: 1
        })
      } else if (this.isWinner == this.firebaseGame[1]['.value']) {
        gamesRef.child(this.firebaseGame[3]['.key']).update({
          score: 1
        })
      }
    }
  }
}
</script>

<style>

</style>
