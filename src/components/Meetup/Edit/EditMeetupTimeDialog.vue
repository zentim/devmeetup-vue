<template>
  <v-dialog width="350px" persistent v-model="editDialog">

    <v-btn accent slot="activator">
      Edit Time
    </v-btn>

    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Time</v-card-title>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editableTime" style="width: 100%" actions>
              <template slot-scope="{save, cancel}">
                <v-spacer></v-spacer>
                <v-btn
                  class="blue--text darken-1"
                  falt
                  @click.native="editDialog = false">Close</v-btn>
                <v-btn
                  class="blue--text darken-1"
                  falt
                  @click.native="onSaveChanges">Save</v-btn>
                </v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>

      </v-container>
    </v-card>

  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        editDialog: false,
        editableTime: null
      }
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.meetup.date)

        const hours = this.editableTime.match(/^(\d+)/)[1]
        const minutes = this.editableTime.match(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate
        })
      }
    },
    created () {
      let time = new Date(this.meetup.date).toTimeString()
      let hours = time.match(/^(\d+)/)[1]
      let minutes = time.match(/:(\d+)/)[1]

      this.editableTime = hours + ':' + minutes
    }
  }
</script>
