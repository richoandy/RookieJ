<template>
  <div class="container jumbotron justify-content-center" id="body">
    <div class="row">
      <div class="col-md-8">
        <h1>You are : {{ localplayer }} </h1>
        <br>
        <h1>now playing : {{ firebaseGame[0].player}} vs {{ firebaseGame[1].player }} </h1>
        <h1>winner : {{  winner }}</h1>
        <br>
        <div>
          <div v-if="localplayer === firebaseGame[0].player">
            {{ p1input }}
            <img id="image" src="../assets/gunting.png" @click="setInput('gunting', firebaseGame[4]['.key'])" style="margin-right:30px"/>
            <img id="image" src="../assets/batu.png" @click="setInput('batu', firebaseGame[4]['.key'])" style="margin-right:30px"/>
            <img id="image" src="../assets/kertas.png" @click="setInput('kertas', firebaseGame[4]['.key'])"/>
            <p>{{ firebaseGame[0].janken }}</p>
          </div>
          <div>
            <h1>{{ firebaseGame[1].player}}</h1> {{ P2input }}
            <img id="image" src="../assets/gunting.png" @click="setInput('gunting', firebaseGame[5]['.key'])" style="margin-right:30px"/>
            <img id="image" src="../assets/batu.png" @click="setInput('batu', firebaseGame[5]['.key'])" style="margin-right:30px"/>
            <img id="image" src="../assets/kertas.png" @click="setInput('kertas', firebaseGame[5]['.key'])"/>
            <p>{{ firebaseGame[1].janken  }}</p>
          </div>
          <div v-if="localplayer !== firebaseGame[0].player">please wait for your turn ... </div>
          <br><br>
            <button v-if= "localplayer === winner" @click="nextGame">next game</button>
        </div>
      </div>
      <div class="col-md-4">
        <h5><strong>Queue</strong></h5>
        <ul class="list-group" v-for="(item,index) in firebaseRoom" :key="index">
          <li id="list-item" class="list-group-item">{{item.player}}</li>
        </ul>
      </div>
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
      console.log('==============', this.loser)
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
      if (!this.firebaseGame) return 0
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

<style scoped>
#image{
  padding: 50px;
  transition: transform .2s; /* Animation */
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
#image:hover{
  transform: scale(2);
}
#body {
  background-image: url(data:image/jpeg;base64,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);
}
#list-item{
  box-shadow: -5px 5px 20px 5px #000;
}
</style>
