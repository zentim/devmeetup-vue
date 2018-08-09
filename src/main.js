// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/es5/util/colors'
import axios from 'axios'
import { store } from './store'
import DateFilter from './filter/date'
// import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog'
import RegisterDialog from './components/Meetup/Registeration/RegisterDialog'

Vue.config.productionTip = false
Vue.prototype.$http = axios

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken1, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})

Vue.use(require('vue-moment'))

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    // firebase.initializeApp({
    //   apiKey: 'AIzaSyAvhb90sZjVlPQ3ygFaQgzm-716T0gOCFU',
    //   authDomain: 'devmeetup-77e79.firebaseapp.com',
    //   databaseURL: 'https://devmeetup-77e79.firebaseio.com',
    //   projectId: 'devmeetup-77e79',
    //   storageBucket: 'devmeetup-77e79.appspot.com'
    // })

    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.$store.dispatch('autoSignIn', user)
    //     this.$store.dispatch('fetchUserData')
    //   }
    // })

    this.$store.dispatch('loadMeetups')
  }
})
