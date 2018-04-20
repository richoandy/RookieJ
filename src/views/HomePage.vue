<template>
    <div class="container jumbotron justify-content-center" id="body" >
      <div class="row" style="margin-top:100px">
         <h1>
          <span><strong>R</strong></span>
          <span><strong>O</strong></span>
          <span><strong>O</strong></span>
          <span><strong>K</strong></span>
          <span><strong>I</strong></span>
          <span><strong>E</strong></span>
          <span><strong>-</strong></span>
          <span><strong>J</strong></span>
        </h1>
      </div>
      <div class="row justify-content-center" style="margin-top:100px;margin-bottom:200px">
        <div class="form-group col-md-8">
          <label for="exampleInputEmail1" id="inputlabel"><strong>Input Your Name Here</strong></label>
          <input v-model="username" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <button class="btn btn-primary" type="submit" @click="addPlayer" style= "margin-top:10px">Go In</button>
        </div>
      </div>
    </div>
</template>

<script>
import { roomsRef, gamesRef } from '@/firebase'
export default {
  data () {
    return {
      username: ''
    }
  },
  firebase: {
    firebaseRoom: roomsRef,
    firebaseGame: gamesRef
  },
  methods: {
    addPlayer: function () {
      roomsRef.push({player: this.username})
      localStorage.setItem('key', this.username)
      this.$router.push('/rooms')
    }
  }
}
</script>

<style scoped>
#body {
    background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsRxQOEzgrbawIx-sUnIhnV87KlkdDqFZVen3cyXS2erX3r96r);
}
#inputlabel{
  color:#fff;
  font-family:arial;
}
h1 {
    margin:0;
    padding:0;
    position: relative;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
}
h1 span {
    color:#17a2b8;
    background:#fff;
    padding:10px 20px;
    font-family:arial;
    display:table-cell;
    box-shadow:inset 0 0 5px rgba(0,0,0,.3) , 0 5px 0 #ccc;
    animation: animate .5s infinite;
}
@keyframes animate
{
    0%
    {
     transform: translateY(0px);
    }
    50%
    {
     transform: translateY(-20px);
    }
    100%
    {
     transform: translateY(0px);
    }
}
h1 span:nth-child(1)
{
    animation-delay:.2s;
}
h1 span:nth-child(2)
{
    animation-delay:.4s;
}
h1 span:nth-child(3)
{
    animation-delay:.6s;
}
h1 span:nth-child(4)
{
    animation-delay:.8s;
}
h1 span:nth-child(5)
{
    animation-delay:.10s;
}
h1 span:nth-child(6)
{
    animation-delay:.2s;
}
h1 span:nth-child(7)
{
    animation-delay:.4s;
}
</style>
