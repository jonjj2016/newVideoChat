const socket = io();
const message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    output = document.getElementById('output'),
    button = document.getElementById('button'),
    formSignin = document.querySelector('.form-signin'),
    typing = document.getElementById('typing');

message.addEventListener('keypress', (e) => {
    socket.emit('userTyping', handle.value);
});
formSignin.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('userMessage', {
        hendle: handle.value,
        message: message.value,
    });
    message.value = '';
});
// button.addEventListener("click", (e) => {
//     e.preventDefault()
//     socket.emit("userMessage", {
//         hendle: handle.value,
//         message: message.value
//     })
//     message.value = ""
//         // message.value = ""
// })

socket.on('userMessage', (data) => {
    console.log(data);
    typing.textContent = '';
    output.innerHTML += `
    <p> <strong>  ${data.hendle.toUpperCase()}</strong>
        ${data.message}</p>
    `;
});
socket.on('userTyping', (data) => {
    typing.innerHTML = `<p><em>${data}  is typing ...</em></p>`;
});

// get local video and display with peer permission
function getLocalVideo(callBacks) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    const constraints = {
        audio: true,
        video: true,
        hide: true,
    };
    navigator.getUserMedia(constraints, callBacks.success, callBacks.error);
}

function receiveStream(stream, elemid) {
    const video = document.getElementById(elemid);
    video.srcObject = stream;
    window.peer_stream = stream;
}
getLocalVideo({
    success: function(stream) {
        window.localStream = stream;
        receiveStream(stream, 'lVideo');
    },
    error: function(err) {
        alert('cannot access your camera');
        console.log(err);
    },
});
//create a peer connection with peer obj

// display the peer on the dom

//onclick with the connection btn expose ice info

//call on click (offer and answer is exchangd)

//ask to call

//accept the call

//display the remote video and local video on the client