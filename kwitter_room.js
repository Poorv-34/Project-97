var firebaseConfig = {
    apiKey: "AIzaSyBRulxwpRj9Wyh38Z05VD202H8tyJcXnsI", 
    authDomain: "kwitter-6e34b.firebaseapp.com", 
    projectId: "kwitter-6e34b", 
    databaseURL: "https://kwitter-6e34b-default-rtdb.firebaseio.com", 
    storageBucket: "kwitter-6e34b.appspot.com", 
    messagingSenderId: "64732949389", 
    appId: "1:64732949389:web:a6753a19c93bb590d9abc4"
};

firebase.initializeApp(firebaseConfig);
document.getElementById("user_name").innerHTML = "Welcome" + localStorage.getItem("user_name") + "!";
function redirectToRoomName(name) {
    console.log(name);
    localStorage.setItem("room_name", name);
    window.location = "kwitter_page.html";
}
function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;

            console.log("Room name = " + Room_names);
            row = "<div class='room_name' id=" + Room_names + "onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div><hr>";
            document.getElementById("output").innerHTML += row;

        });
    });
}
getData();

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}
function addRoom() {
    room_name = document.getElementById("add_room").value;
    firebase.database().ref("/").child(room_name).update({
        purpose : "adding room name"
    });
    localStorage.setItem("room_name", room_name);
    window.location = "kwitter_page.html";
}