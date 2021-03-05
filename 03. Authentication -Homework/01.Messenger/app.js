function attachEvents() {
  document.getElementById("submit").addEventListener("click", async () => {
    const author = document.querySelectorAll("input")[0].value;
    const content = document.querySelectorAll("input")[1].value;

    await sendMessage({ author, content });

    document.querySelectorAll("input").value = "";
    document.querySelectorAll("input").value = "";

    getMessages();
  });
  document.querySelectorAll("input")[3].addEventListener("click", getMessages);
}

attachEvents();

async function getMessages() {
  const response = await fetch("http://localhost:3030/jsonstore/messenger");
  const data = await response.json();

  const messages = Object.values(data)
    .map((v) => `${v.author}: ${v.content}`)
    .join("\n");
  document.getElementById("messages").value = messages;
}

async function sendMessage(message) {
  const response = await fetch("http://localhost:3030/jsonstore/messenger", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(message),
  });
  const data = await response.json();
}

//Step 0: add eventLisener in the main to author and content fields,add event lissener to the submit and refresh button
//Step 1: fetch reqest to the server + await response json()
//Step 2: set value of 'MESSAGES' to our new information from the fetch request
//Step 3: new function createMessage(message)
