const ws = new WebSocket('ws://localhost:3000');
const chatBox = document.querySelector('#chat');
const messageBox = document.querySelector('#message');

function addMessage(message) {
  const node = document.createElement('p');
  const text = document.createTextNode(message);

  node.appendChild(text);
  node.classList.add('text-gray-700', 'py-1');
  chatBox.appendChild(node);
}

ws.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'message') {
    addMessage(data.data);
  }
});

function sendMessage() {
  const message = messageBox.value;

  if (!message) {
    return false;
  }
  //   ws.send(JSON.stringify({ type: 'message', data: message }));

  addMessage(message);
  messageBox.value = '';
}
