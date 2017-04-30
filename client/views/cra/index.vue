<template>
  <div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <article class="tile is-child box">
          <ul is="transition-group">
              <li v-for="user in users" class="user" :key="user['.key']">
                  <span>{{user.name}} - {{user.email}}</span>
                  <button v-on:click="removeUser(user)">X</button>
                </li>
          </ul>
          <form id="form" v-on:submit.prevent="addUser">
    <input type="text" v-model="newUser.name" placeholder="Username">
    <input type="email" v-model="newUser.email" placeholder="email@email.com">
    <input type="submit" value="Add User">
  </form>
  <ul class="errors">
    <li v-show="!validation.name">Name cannot be empty.</li>
    <li v-show="!validation.email">Please provide a valid email address.</li>
  </ul>
          <h4 class="title">Table Responsive</h4>
          <div class="table-responsive">
            <table class="table is-bordered is-striped is-narrow">
              <thead>
                <tr>
                  <th></th>
                  <th>Open source projects</th>
                  <th>Year started</th>
                  <th colspan="3">Links</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Totals</th>
                  <th>Thurston</th>
                  <th>Ryan</th>
                  <th colspan="3">Nitz</th>
                </tr>
              </tfoot>
              <tbody>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
<script>
// Setup Firebase
var emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyAi_yuJciPXLFr_PYPeU3eTvtXf8jbJ8zw',
  authDomain: 'localhost:8080',
  databaseURL: 'https://earnest-fuze-165417.firebaseio.com'
}
firebase.initializeApp(config)

var usersRef = firebase.database().ref('users')


  data: {
    newUser: {
      name: '',
      email:''
    }
  },
  firebase: {
    users: usersRef
  },
  computed: {
    validation: function () {
      return {
        name: !!this.newUser.name.trim(),
        email: emailRE.test(this.newUser.email)
      }
    },
    isValid: function () {
      var validation = this.validation
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  methods: {
    addUser: function () {
      if (this.isValid) {
        usersRef.push(this.newUser)
        this.newUser.name = ''
        this.newUser.email = ''
      }
    },
    removeUser: function (user) {
      usersRef.child(user['.key']).remove()
    }
  }

</script>
<style lang="scss">
.table-responsive {
  display: block;
  width: 100%;
  min-height: .01%;
  overflow-x: auto;
}
</style>
