<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center">
        <div>
          <h1>{{ msg }}</h1>
          <form>
            <input type="text" name="email" v-model="userObj.email"><br>
            <input type="text" name="password" v-model="userObj.password"><br>
            <input type="submit" @click.prevent="addUser">
          </form>
          <v-btn @click="allUsers">Get All Users</v-btn>
          <br>
          <ul v-for="user in users">
            <li>{{ user.id }} : {{ user.name }} - {{ user.password }}</li>
          </ul>
        </div>
      </v-flex>

      <v-flex xs12 sm6 class="text-xs-center">
        <div>
          <h1>{{ msg }}</h1>
          <form>
            <input type="text" name="title" v-model="meetupObj.title"><br>
            <input type="text" name="description" v-model="meetupObj.description"><br>
            <input type="text" name="imageUrl" v-model="meetupObj.imageUrl"><br>
            <input type="text" name="location" v-model="meetupObj.location"><br>
            <input type="text" name="date" v-model="meetupObj.date"><br>
            <input type="text" name="creatorId" v-model="meetupObj.creatorId"><br>
            <input type="submit" @click.prevent="addMeetup">
          </form>
          <v-btn @click="allMeetups">Get All Meetups</v-btn>
          <br>
          <ul v-for="meetup in meetups">
            <li>{{ meetup.id }} : {{ meetup.title }} - {{ meetup.date }}</li>
          </ul>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to your vue.js app',
      users: null,
      userObj: {
        id: '',
        email: '',
        password: ''
      },
      meetups: null,
      meetupObj: {
        id: '',
        title: '',
        description: '',
        imageUrl: '',
        location: '',
        date: '',
        creatorId: ''
      }
    }
  },
  methods: {
    allUsers () {
      let thiz = this
      async function getUser () {
        try {
          const response = await thiz.$http.get('/api/user/allUsers')
          console.log(response.data)
          thiz.users = response.data
        } catch (error) {
          console.log(error)
        }
      }
      getUser()
    },
    addUser () {
      let obj = this.userObj
      this.$http.post('/api/user/addUser', obj)
        .then(function (response) {
          console.log(response)
        }).catch(function (error) {
          console.log(error)
        })
    },
    allMeetups () {
      let thiz = this
      async function getMeetup () {
        try {
          const response = await thiz.$http.get('/api/user/allMeetups')
          console.log(response.data)
          thiz.meetups = response.data
        } catch (error) {
          console.log(error)
        }
      }
      getMeetup()
    },
    addMeetup () {
      let obj = this.meetupObj
      this.$http.post('/api/user/addMeetup', obj)
        .then(function (response) {
          console.log(response)
        }).catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
input {
  border: 1px solid black;
}
</style>
