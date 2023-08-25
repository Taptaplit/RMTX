window.onload = async () => {
  document.getElementsByClassName("mt-two")[0].innerText =
    "You son of a racist god looking monkey!";
  console.log(document.getElementsByClassName("text-6xl"));

  let textTags = [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "span",
    "p",
    "li",
    "strong",
    "b",
    "a",
    "ul",
    "ol",
    "em",
    "strong",
    "i",
    "b",
    "a",
    "blockquote",
    "figcaption",
    "code",
    "pre",
    "table",
    "thead",
    "tbody",
    "th",
    "td",
    "button",
    "s",
  ];

  let curse_words = ["fake"];

  class Element {
    constructor(element) {
      this.element = element;
      this.text = element.innerText;
      this.id = element.id;
      this.sentences = this.text.split(". ");
    }
    removeCurseWords() {
      for (let sentence of this.sentences) {
        for (let curse of curse_words) {
          if (sentence.toLowerCase().includes(curse)) {
            let index = this.sentences.indexOf(sentence);
            let cursePattern = new RegExp(curse, "gi");
            this.sentences[index] = this.sentences[index].replace(
              cursePattern,
              " [[CENSORED]] "
            );
            console.log(this.sentences[index]);
          }
        }
        this.element.innerText = this.sentences.join(". ");
      }
    }
    async removeToxicLanguage() {
      for (let sentence of this.sentences) {
        if (sentence.startsWith("You son of a racist god")) {
          const response = await chrome.runtime.sendMessage({ phrase: sentence });
          console.log(`Sent to service worker with response ${response}`);

          if (response.toxic === true) {
            this.sentences[index] = this.sentences[index].replace(
              cursePattern,
              " [[CENSORED]] "
            );
          }
        }
      }
      this.element.innerText = this.sentences.join(". ");
    }
  }

  let pageElements = [];

  for (tag of textTags) {
    // retrieve the DOM information for every one of those tags
    let siteTags = document.querySelectorAll(tag);

    for (let siteTag of siteTags) {
      let element = new Element(siteTag);
      chrome.storage.local.get(["toggles"], (result) => {
        if (result.toggles[0]) {
          element.removeCurseWords();
        }
        if (result.toggles[1]) {
          element.removeToxicLanguage();
        }
      });
      pageElements.push(element);
    }
  }
};
