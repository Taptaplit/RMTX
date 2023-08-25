chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log("Received message from content script");
  if (request.phrase) {
    const res = await (
      await fetch("http://127.0.0.1:8000/removeToxic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          sentence_for_analysis: request.phrase,
        }),
      })
    ).json();
    console.log(res)
    sendResponse(res);
  }
});

// const respond = async (response) => {
//   const [tab] = await chrome.tabs.query({
//     active: true,
//     lastFocusedWindow: true,
//   });
//   const response = await chrome.tabs.sendMessage(tab.id, { result: response });
// };
