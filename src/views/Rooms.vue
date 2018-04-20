<template>
  <div>
    {{ firebaseGame }}
    <h1>winner : {{  winner }}</h1>

    <input type="text" v-model="player">
    <button type="submit" @click="addPlayer">Add</button>
    <button type="submit" @click="startGame">Start</button>
    <br>

    <button type="submit" @click="reset(firebaseGame[3]['.key'], firebaseGame[2]['.key'], firebaseGame[4]['.key'], firebaseGame[5]['.key'])">reset</button>
    <div>
      <div v-if="localplayer === firebaseGame[0].player">
        <h1>{{ firebaseGame[0].player }} </h1> {{ p1input }}
        <button @click="setInput('gunting', firebaseGame[4]['.key'])">Gunting</button>
        <button @click="setInput('batu', firebaseGame[4]['.key'])">Batu</button>
        <button @click="setInput('kertas', firebaseGame[4]['.key'])">Kertas</button>
        <p>{{ firebaseGame[0].janken }}</p>
      </div>
      <div v-if="localplayer === firebaseGame[1].player">
        <h1>{{ firebaseGame[1].player}}</h1> {{ P2input }}
        <button @click="setInput('gunting', firebaseGame[5]['.key'])">Gunting</button>
        <button @click="setInput('batu', firebaseGame[5]['.key'])">Batu</button>
        <button @click="setInput('kertas', firebaseGame[5]['.key'])">Kertas</button>
        <p>{{ firebaseGame[1].janken  }}</p>
      </div>
      <br><br>

      <button v-if="winner !== '      '" @click="nextGame">next game</button>
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
      isWinner: '',
      localplayer: localStorage.getItem('key')
    }
  },
  firebase: {
    firebaseRoom: roomsRef,
    firebaseGame: gamesRef
  },
  methods: {
    nextGame () {
      console.log('==============',this.loser)
      roomsRef.push({player: this.loser})

      gamesRef.child(this.firebaseGame[0]['.key']).update({
        player: this.winner
      })
      gamesRef.child(this.firebaseGame[1]['.key']).update({
        player: this.firebaseRoom[0].player
      })
       gamesRef.child(this.firebaseGame[2]['.key']).update({
        score: ''
      })
      gamesRef.child(this.firebaseGame[3]['.key']).update({
        score: ''
      })
      gamesRef.child(this.firebaseGame[4]['.key']).update({
        janken: ''
      })
      gamesRef.child(this.firebaseGame[5]['.key']).update({
        janken: ''
      })
      roomsRef.child(this.firebaseRoom[0]['.key']).remove()
      
    },
    setInput (input, key) {
      gamesRef.child(key).update({
        janken: input
      })
    },
    addPlayer: function () {
      roomsRef.push({player: this.player})
      localStorage.setItem('key', this.player)
    },
    startGame: function () {
      gamesRef.push({player: this.firebaseRoom[0].player})
      gamesRef.push({player: this.firebaseRoom[1].player})
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
    }
  },
  computed: {
    checkScore: function () {
      if (!this.firebaseGame)return 0
      if (this.firebaseGame[2].score === 1) {
        return this.firebaseGame[0].player
      } else if (this.firebaseGame[3].score === 1) {
        return this.firebaseGame[1].player
      }
    },

    winner: function () {
      if (!this.firebaseGame) return 0
      if (this.firebaseGame[4].janken === this.firebaseGame[5].janken) {
        return 'seri'
      } else if (this.firebaseGame[4].janken === 'gunting' && this.firebaseGame[5].janken === 'batu') {
        return this.firebaseGame[1].player
      } else if (this.firebaseGame[4].janken === 'gunting' && this.firebaseGame[5].janken === 'kertas') {
        return this.firebaseGame[0].player
      } else if (this.firebaseGame[4].janken === 'batu' && this.firebaseGame[5].janken === 'gunting') {
        return this.firebaseGame[0].player
      } else if (this.firebaseGame[4].janken === 'batu' && this.firebaseGame[5].janken === 'kertas') {
        return this.firebaseGame[1].player
      } else if (this.firebaseGame[4].janken === 'kertas' && this.firebaseGame[5].janken === 'gunting') {
        return this.firebaseGame[1].player
      } else if (this.firebaseGame[4].janken === 'kertas' && this.firebaseGame[5].janken === 'batu') {
        return this.firebaseGame[0].player
      }
    },
    loser: function () {
      if (!this.firebaseGame) return 0
      if (this.firebaseGame[4].janken === this.firebaseGame[5].janken) {
        return 'seri'
      } else if (this.firebaseGame[4].janken === 'gunting' && this.firebaseGame[5].janken === 'batu') {
        return this.firebaseGame[0].player
      } else if (this.firebaseGame[4].janken === 'gunting' && this.firebaseGame[5].janken === 'kertas') {
        return this.firebaseGame[1].player
      } else if (this.firebaseGame[4].janken === 'batu' && this.firebaseGame[5].janken === 'gunting') {
        return this.firebaseGame[1].player
      } else if (this.firebaseGame[4].janken === 'batu' && this.firebaseGame[5].janken === 'kertas') {
        return this.firebaseGame[0].player
      } else if (this.firebaseGame[4].janken === 'kertas' && this.firebaseGame[5].janken === 'gunting') {
        return this.firebaseGame[0].player
      } else if (this.firebaseGame[4].janken === 'kertas' && this.firebaseGame[5].janken === 'batu') {
        return this.firebaseGame[1].player
      }
    }
    
  },
  watch: {
    isWinner: function () {
      console.log(this.isWinner, 'hahaha')
      if (this.firebaseGame && this.winner === this.firebaseGame[0].player) {
        gamesRef.child(this.firebaseGame[2]['.key']).set({
          score: 1
        })
      } else if (this.firebaseGame && this.winner === this.firebaseGame[1].player) {
        gamesRef.child(this.firebaseGame[3]['.key']).set({
          score: 1
        })
      }
    }
  }
}
</script>

<style>

</style>
