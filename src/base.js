var Rebase = require("re-base");
var firebase = require("firebase");
var app = firebase.initializeApp({
  apiKey: "AIzaSyBeVV8xlAf0-rpky6FnwTmruz9E_Wd_X7c",
  authDomain: "restaurant-picker-6a534.firebaseapp.com",
  databaseURL: "https://restaurant-picker-6a534.firebaseio.com",
  storageBucket: "restaurant-picker-6a534.appspot.com",
  messagingSenderId: "628568041053"
});
var base = Rebase.createClass(app.database());
export default base;