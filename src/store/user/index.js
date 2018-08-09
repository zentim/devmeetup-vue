// import * as firebase from 'firebase'
import axios from 'axios'

export default {
  state: {
    user: null
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: {
    registerUserForMeetup (state, payload) {
      const id = payload.id.toString()
      if (state.user.registeredMeetups.findIndex(meetup => meetup.id.toString() === id) >= 0) {
        return
      }
      state.user.registeredMeetups.push(id)
      // state.user.firebaseKey[id] = payload.firebaseKey
    },
    unregisterUserFromMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.toString() === payload.toString()), 1)
      // Reflect.deleteProperty(state.user.firebaseKey, payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    registerUserForMeetup ({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user

      async function registeruserformeetup () {
        try {
          const obj = {
            meetupId: payload,
            userId: user.id
          }
          console.log(obj)
          const response = await axios.post('/api/user/addRegisteration', obj)
          console.log(response)
          const newRegisteration = {
            id: payload
          }
          console.log(newRegisteration)
          commit('registerUserForMeetup', newRegisteration)
          commit('setLoading', false)
        } catch (error) {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      }
      registeruserformeetup()

      // firebase.database().ref('/users/' + user.id).child('/registerations/').push(payload)
      //   .then(
      //     data => {
      //       commit('setLoading', false)
      //       commit('registerUserForMeetup', {id: payload, firebaseKey: data.key})
      //     }
      //   )
      //   .catch(
      //     error => {
      //       console.log(error)
      //       commit('setLoading', false)
      //     }
      //   )
    },
    unregisterUserFromMeetup ({ commit, getters }, payload) {
      commit('setLoading', true)
      const user = getters.user
      // if (!user.firebaseKey) {
      //   return
      // }
      // const firebaseKey = user.firebaseKey[payload]

      async function unregisteruserfrommeetup () {
        try {
          let obj = {
            meetupId: parseInt(payload),
            userId: parseInt(user.id)
          }
          const response = await axios.post('/api/user/deleteRegisteration', obj)
          console.log(response)
          commit('unregisterUserFromMeetup', obj.meetupId)
          commit('setLoading', false)
        } catch (error) {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      }
      unregisteruserfrommeetup()

      // firebase.database().ref('/users/' + user.id + '/registerations/').child(firebaseKey).remove()
      //   .then(
      //     () => {
      //       commit('setLoading', false)
      //       commit('unregisterUserFromMeetup', payload)
      //     }
      //   )
      //   .catch(
      //     error => {
      //       console.log(error)
      //       commit('setLoading', false)
      //     }
      //   )
    },
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')

      async function signuserup () {
        try {
          const obj = {
            email: payload.email,
            password: payload.password
          }
          const response = await axios.post('/api/user/addUser', obj)
          const newUser = {
            id: response.data.insertId,
            registeredMeetups: []
          }
          commit('setUser', newUser)
          commit('setLoading', false)
        } catch (error) {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      }
      signuserup()

      // firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      //   .then(
      //     user => {
      //       commit('setLoading', false)
      //       const newUser = {
      //         id: user.uid,
      //         registeredMeetups: [],
      //         firebaseKey: {}
      //       }
      //       commit('setUser', newUser)
      //     }
      //   )
      //   .catch(
      //     error => {
      //       commit('setLoading', false)
      //       commit('setError', error)
      //       console.log(error)
      //     }
      //   )
    },
    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')

      async function signuserin () {
        try {
          const obj = {
            email: payload.email,
            password: payload.password
          }
          const response = await axios.post('/api/user/getUser', obj)
          console.log(response)
          if (response.data.length === 0) {
            commit('setError', 'account does not exist')
            commit('setLoading', false)
            return
          }
          const response2 = await axios.post('/api/user/getRegisterationForUser', {userId: response.data[0].userId})
          console.log('response2')
          console.log(response2)
          let registeration = []
          response2.data.forEach(obj => {
            registeration.push(obj.meetupId)
          })
          const newUser = {
            id: response.data[0].userId,
            registeredMeetups: registeration
          }
          commit('setUser', newUser)
          commit('setLoading', false)
        } catch (error) {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      }
      signuserin()

      // firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      //   .then(
      //     user => {
      //       commit('setLoading', false)
      //       const newUser = {
      //         id: user.uid,
      //         registeredMeetups: [],
      //         firebaseKey: {}
      //       }
      //       commit('setUser', newUser)
      //     }
      //   )
      //   .catch(
      //     error => {
      //       commit('setLoading', false)
      //       commit('setError', error)
      //       console.log(error)
      //     }
      //   )
    },
    autoSignIn ({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: [],
        firebaseKey: {}
      })
    },
    fetchUserData ({ commit, getters }) {
      commit('setLoading', true)

      async function fetchuserdata () {
        try {
          const response = await axios.get('/api/user/getRegisterationForUser')

          console.log(response)
          console.log('need to code')

          // const newRegisteration = {
          //   id: response.data.meetupId,
          //   firebaseKey: response.data.insertId
          // }

          // let registeredMeetups = []
          // let swappedPairs = {}
          // for (let key in dataPairs) {
          //   registeredMeetups.push(dataPairs[key])
          //   swappedPairs[dataPairs[key]] = key
          // }
          // const updateUser = {
          //   id: getters.user.id,
          //   registeredMeetups: registeredMeetups,
          //   firebaseKey: swappedPairs
          // }
          // commit('setUser', updateUser)
          // commit('registerUserForMeetup', newRegisteration)
          commit('setLoading', false)
        } catch (error) {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      }
      fetchuserdata()

      // firebase.database().ref('/users/' + getters.user.id + '/registerations/').once('value')
      //   .then(
      //     data => {
      //       const dataPairs = data.val()
      //       let registeredMeetups = []
      //       let swappedPairs = {}
      //       for (let key in dataPairs) {
      //         registeredMeetups.push(dataPairs[key])
      //         swappedPairs[dataPairs[key]] = key
      //       }
      //       const updateUser = {
      //         id: getters.user.id,
      //         registeredMeetups: registeredMeetups,
      //         firebaseKey: swappedPairs
      //       }
      //       commit('setLoading', false)
      //       commit('setUser', updateUser)
      //     }
      //   )
      //   .catch(
      //     error => {
      //       commit('setLoading', false)
      //       console.log(error)
      //     }
      //   )
    },
    logout ({ commit }) {
      // firebase.auth().signOut()
      commit('setUser', null)
    }
  }
}
