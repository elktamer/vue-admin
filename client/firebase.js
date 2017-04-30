import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  authDomain: 'localhost:8080',
  databaseURL: 'https://earnest-fuze-165417.firebaseio.com'
})

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()
