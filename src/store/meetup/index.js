// import * as firebase from 'firebase'
import axios from 'axios'

export default {
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Taipei_101_twilight.jpg',
        id: 'skdjflk',
        title: 'Meetup in Taipei',
        date: new Date(),
        location: 'Taipei',
        description: 'Taipei! Taipei!'
      },
      {
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3WZrhmtXt1pofeASgGd05S46_H-nSIghrVv6njBa_ROQWcw35kg',
        id: 'asdfadfawedkfj',
        title: 'Meetup in Yunlin',
        date: new Date(),
        location: 'New York',
        description: 'It is New York'
      }
    ]
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featureMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find(meetup => {
          return meetup.id.toString() === meetupId
        })
      }
    }
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    }
  },
  actions: {
    loadMeetups ({ commit }, payload) {
      commit('setLoading', true)

      async function createmeetup () {
        try {
          const response = await axios.get('/api/user/allMeetups')
          // console.log(response)
          const data = response.data
          const meetups = []
          data.forEach(obj => {
            // console.log(obj)
            meetups.push({
              id: obj.meetupId,
              title: obj.title,
              description: obj.description,
              location: obj.location,
              imageUrl: obj.imageUrl,
              date: obj.date,
              creatorId: obj.creatorId
            })
          })
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        } catch (error) {
          commit('setError', error)
          console.log(error)
          commit('setLoading', false)
        }
      }
      createmeetup()

      // firebase.database().ref('meetups').once('value')
      //   .then(
      //     data => {
      //       const meetups = []
      //       const obj = data.val()
      //       for (let key in obj) {
      //         meetups.push({
      //           id: key,
      //           title: obj[key].title,
      //           description: obj[key].description,
      //           location: obj[key].location,
      //           imageUrl: obj[key].imageUrl,
      //           date: obj[key].date,
      //           creatorId: obj[key].creatorId
      //         })
      //       }
      //       commit('setLoadedMeetups', meetups)
      //       commit('setLoading', false)
      //     }
      //   )
      //   .catch(
      //     error => {
      //       console.log(error)
      //       commit('setLoading', false)
      //     }
      //   )
    },
    createMeetup ({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id,
        imageUrl: payload.imageUrl
      }

      async function createmeetup () {
        try {
          const response = await axios.post('/api/user/addMeetup', meetup)
          commit('createMeetup', {
            ...meetup,
            id: response.data.insertId
          })
        } catch (error) {
          commit('setError', error)
          console.log(error)
        }
      }
      createmeetup()

      // let imageUrl
      // let key
      // firebase.database().ref('meetups').push(meetup)
      //   .then(
      //     data => {
      //       key = data.key
      //       return key
      //     }
      //   )
      //   .then(
      //     key => {
      //       const filename = payload.image.name
      //       const ext = filename.slice(filename.lastIndexOf('.'))
      //       return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
      //     }
      //   )
      //   .then(
      //     fileData => {
      //       imageUrl = fileData.metadata.downloadURLs[0]
      //       return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
      //     }
      //   )
      //   .then(
      //     commit('createMeetup', {
      //       ...meetup,
      //       imageUrl: imageUrl,
      //       id: key
      //     })
      //   )
      //   .catch(
      //     error => {
      //       console.log(error)
      //     }
      //   )
    },
    updateMeetupData ({ commit, getters }, payload) {
      commit('setLoading', true)

      let meetup = Object.assign({}, getters.loadedMeetup(payload.id))

      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }

      async function createmeetup () {
        try {
          const response = await axios.post('/api/user/updateMeetup', meetup)
          console.log(response)
          commit('updateMeetup', response.data)
        } catch (error) {
          commit('setError', error)
          console.log(error)
        }
      }
      createmeetup()
      // firebase.database().ref('meetups').child(payload.id).update(updateObj)
      //   .then(
      //     () => {
      //       commit('setLoading', false)
      //       commit('updateMeetup', payload)
      //     }
      //   )
      //   .catch(
      //     error => {
      //       console.log(error)
      //       commit('setLoading', false)
      //     }
      //   )
    }
  }
}
