const textTag = document.getElementById("test");
async function getPageURL() {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let pageURL = tabs[0].url;
  });

  return pageURL;
}
async function fetchData() {
  const pageInfo = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const pageInfoJSON = await pageInfo.json();

  // textTag.innerHTML = JSON.stringify(pageInfoJSON);
  console.log(pageInfoJSON);
}

fetchData();

let data = localStorage.getItem("RMTXData");
data = JSON.parse(data);
document.getElementById("harmfulLanguage").checked = data[0];
document.getElementById("toxicity").checked = data[1];
// const harmfulLanguage = document.querySelector('#harmfulLanguage');
// const toxicity = document.querySelector('#toxicity');

const checkSettings = document.querySelector("#checkSettings");

checkSettings.addEventListener("click", (event) => {
  let checkboxes = document.querySelectorAll('input[name="toggle"]');
  let values = [];
  checkboxes.forEach((checkbox) => {
    values.push(checkbox.checked);
  });
  localStorage.setItem("RMTXData", JSON.stringify(values));
});

// checkSettings.onclick = () => {
//    alert(`Censor Harmful Language: ${harmfulLanguage.checked}\nCensor Toxic Language: ${toxicity.checked}`)
// };
