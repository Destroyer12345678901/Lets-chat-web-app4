
var firebaseConfig = {
  apiKey: "AIzaSyADI5i38tRoxmas3c_fZWjXDVss4xHscDk",
  authDomain: "cityguy-jyeg.firebaseapp.com",
  databaseURL: "https://cityguy-jyeg-default-rtdb.firebaseio.com",
  projectId: "cityguy-jyeg",
  storageBucket: "cityguy-jyeg.appspot.com",
  messagingSenderId: "195496305375",
  appId: "1:195496305375:web:80038c881484b114f2bf6a"
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
document.getElementById("show_name").innerText = "Welcome " + user_name + "!";
function addRoom() {
  room_name = document.getElementById("room_name").value;
  localStorage.setItem("room_name", room_name);
  window.location = "kwitter_page.html";
  firebase.database().ref("/").child(room_name).update({
    purpose: "Adding Room Name"
  });
}
function getData() {
  firebase.database().ref("/").on('value',
    function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        Room_names = childKey;
        //Start code
        console.log("room_name -" + Room_names);
        row = "<div class = 'room_name' id = " + Room_names + " onclick = 'redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
        document.getElementById("output").innerHTML += row;

        //End code
      });
    });
}
getData();
function redirectToRoomName() {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";

}
function logOut() {
  localStorage.removeItem("room_name");
  localStorage.removeItem("user_name");
  window.location = "index.html";
}