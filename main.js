async function loadFromHash() {
  const file = await getFileToLoadFromHash();
  await loadFile(file);
  setJournalMenu();
}


async function getFileToLoadFromHash() {
  if (!window.location.hash) {
    return "main.htm";
  }
  let file = window.location.hash.substring(1);
  if (file.startsWith("/")) {
    file = file.substring(1);
  }
  if (!file) {
    return "main.htm";
  }
  if (!file.includes(".htm")) {
    file += ".htm";
  }
  return file;
}


/**
 * @param {string} title 
 * @param {string} html 
 * @returns {HTMLDivElement} Article
 */
async function loadFile(fileName) {
  const html = await getFileHtml(fileName);
  document.getElementById("main").innerHTML = html;
}

async function getFileHtml(fileDir) {
  const response = await fetch("./" + fileDir);
  if (response.status === 200) {
    const html = await response.text();
    return html;
  }
  else {
    return "";
  }
}


window.addEventListener("hashchange", loadFromHash);
document.addEventListener("DOMContentLoaded", loadFromHash);


function setJournalMenu() {
  const menu = document.getElementById("journal-menu");
  if (menu) {
    const sections = [...document.getElementsByClassName("entry")];
    sections.forEach((section, i) => {
      const fakeAnchor = document.createElement("div");
      fakeAnchor.innerText = ("Entry " + section.id.replace("entry", ""));
      fakeAnchor.classList.add("entry-menu-item");
      fakeAnchor.onclick = () => section.scrollIntoView()
      menu.appendChild(fakeAnchor);
      // if (i < sections.length - 1) {
      //   menu.appendChild(getDelimiter());
      // }
    });
  }
}

// function getDelimiter() {
//   const span = document.createElement("span");
//   span.innerText = "|";
//   span.classList.add("delimiter");
//   return span;
// }

function handwriting(myBool) {
  const myDiv = document.getElementById("journal");
  if (myBool) {
    myDiv.classList.add("handwriting");
  }
  else {
    myDiv.classList.remove("handwriting");
  }
}

function toggleMenu() {
  const existing = document.getElementById("popup-menu");
  if (existing) {
    existing.remove();
    return;
  }
  const menu = document.getElementById("main-menu").cloneNode(true);
  menu.id = "popup-menu";
  menu.style.display = "block";
  menu.style.top = document.getElementById("top-menu").offsetHeight;
  menu.style.position = "absolute";
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.style.height = "auto";
  wrapper.appendChild(menu);
  document.getElementById("top-wrap").append(menu);
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", (e) => {
    const menuButton = document.getElementById("top-menu");
    if (menuButton.contains(e.target)) {
      return;
    }
    const popupMenu = document.getElementById("popup-menu");
    if (popupMenu) {
      if (popupMenu.contains(e.target)) {
        if(event.target.tagName.toLowerCase() === 'a'){
          popupMenu.remove();
        }
      }
      else {
        popupMenu.remove();
      }
    }
  })
});