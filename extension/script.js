window.onload = function () {
  chrome.storage.local.get(["toggles"], (result) => {
    document.getElementById("harmfulLanguage").checked = result.toggles[0];
    document.getElementById("toxicity").checked = result.toggles[1];
  });
};

const checkSettings = document.querySelector("#checkSettings");

checkSettings.addEventListener("click", (event) => {
  let checkboxes = document.querySelectorAll('input[name="toggle"]');
  let values = [];
  checkboxes.forEach((checkbox) => {
    values.push(checkbox.checked);
  });
  chrome.storage.local.set({ toggles: values }, () => {
    document.getElementById("success").innerText = "Successfully Saved";
  });
});
