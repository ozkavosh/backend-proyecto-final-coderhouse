const socket = io();

socket.on('getMessages', (messages) => renderMessages(messages));

const sendMessage = (e) => {
    e.preventDefault();
    const { message } = e.target;

    socket.emit("postMessage", { body: message.value, email: email });
    e.target.reset();
}

const renderMessages = (messagesArray) => {
    const messagesContainer = document.querySelector("#messagesContainer");
    messagesContainer.innerHTML = '';
    messagesArray.forEach((message) => {
        messagesContainer.innerHTML += `<div class="row flex-row mb-2 ${message.email === email ? "justify-content-end" : ""}">
        <div class="col-auto" style="max-width: 95%;">
          <div class="row bg-dark">
            <div class="col-auto d-flex align-items-center">
              <h5 class="text-primary fw-bold m-0 p-2">
                ${message.email} /
                <span style="color: brown">${message.createdAt}</span>
              </h5>
            </div>
          </div>
      
          <div class="row bg-light">
              <div class="col">
                  <p class="fst-italic text-success p-2 text-break">${message.body}</p>
              </div>
          </div>
        </div>
      </div>`
    })

    const lastMessage = document.querySelector("#messagesContainer > div:last-child");
    lastMessage.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener("submit", (e) => {
    sendMessage(e);
})