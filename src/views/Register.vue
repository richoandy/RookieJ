<template>
  <div>
    {{ firebaseRoom }}
    <input type="text" v-model="player"> <br>
    <button @click="addPlayer">add me</button>
  </div>
</template>

<script>
import { roomsRef, gamesRef } from '@/firebase'

export default {
  data () {
    return {
      player: ''
    }
  },
  methods: {
    addPlayer () {
      this.firebaseRoom.push(this.player)
    }
  },
  firebase: {
    firebaseRoom: roomsRef,
    firebaseGame: gamesRef
  }
}
</script>

<style>

</style>
