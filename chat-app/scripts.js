const ws = new WebSocket('ws://localhost:3000');
const chatBox = document.querySelector('#chat');
const messageBox = document.querySelector('#message');
const sendButton = document.querySelector('#sendBtn');

function addMessage(message) {
  const node = document.createElement('p');
  const text = document.createTextNode(message);

  node.appendChild(text);
  node.classList.add('text-gray-700', 'py-1');
  chatBox.appendChild(node);
}

ws.addEventListener('message', (event) => {
  const text = JSON.parse(event.data);

  if (text.type === 'message') {
    addMessage(text.data);
  }
});

function sendMessage() {
  const message = messageBox.value;

  if (!message) {
    console.error('There is no message typed');
    return false;
  }
  ws.send(JSON.stringify({ type: 'message', data: message }));

  addMessage(message);
  messageBox.value = '';
  return true;
}

sendButton.addEventListener('click', sendMessage);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});
