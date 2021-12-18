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
room_name = localStorage.getItem("room_name");
user_name = localStorage.getItem("user_name");
console.log("room name " + room_name);
console.log("user name " + user_name);

function logOut() {
  localStorage.removeItem("roomname");
  localStorage.removeItem("username");
  window.location = "index.html";
}

function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
    name: user_name,
    message: msg,
    like: 0
  });
  document.getElementById("msg").value = "";
}

function getData() {
  firebase.database().ref("/" + room_name).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebase_message_id = childKey;
        message_data = childData;
        console.log(firebase_message_id);
        console.log(message_data);
        name = message_data['name'];
        message = message_data['message'];
        like = message_data['like'];
        name_with_tag = "<h4>" + name + "<img class ='user_tick' style = 'height: 30px; width: 30px;' src = 'tick 2.png'></h4>";
        message_with_tag = "<h4 class = 'message_h4' >" + message + "</h4>";
        like_button = "<button class = 'btn btn-warning' id = " + firebase_message_id + "value = " + like + " onclick = 'updateLike(this.id);'>";
        span_with_tag = "<span class = 'glyphicon glyphicon-thumbs-up'> Like:" + like + "<span></button><hr>";
        row = name_with_tag + message_with_tag + like_button + span_with_tag;
        document.getElementById("output").innerHTML = row;
      }
    });
  });
}
getData();

function updateLike(message_id) {
  console.log("clicked on like button - " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);
  firebase.database().ref(room_name).child(message_id).update({
    like: updated_likes
  });
}