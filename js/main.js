let { signal, component } = reef;

// Create a signal
let data = signal({
  heading: "Projekt Files",
  todos: ["Swim", "Climb", "Jump", "Play"],
  emoji: "👋🎉",
  fileDb: [],
  codeOut: ''
});

function fetchFile(url) {
  return fetch(url)
    .then((r) => r.json())
    .then((d) => d)
    .catch((e) => e);
}


async function getCode({file}) {
  const url = `./public/data/${file}`
  const json = await fetchFile(url)
  console.clear()
  console.log({json});
  data.codeOut = json
}

function handleFetchReq(event) {
  const file = event.target.value;
  getCode({ file });
}

function selectTemp(data) {
  let { fileDb } = data;
  return `
        <select onchange="handleFetchReq()">
          <option>Auswahl</option>
            ${fileDb
              .map(function (data, id) {
                return `<option value="${data.file}">${data.title}</option>`;
              })
              .join("")}
        </select>
    `;
}
function listTemp(data) {
  let { fileDb } = data;
  return `
        <menu>
            ${fileDb
              .map(function (data, id) {
                return `<li id="file-list-${id}">${data.title}</li>`;
              })
              .join("")}
        </menu>`;
}

function layoutTemp(data) {
  let { heading, todos, emoji } = data;
  return `
  <h1>${heading}</h1>
  <div class="s-grid" style="--padding: 1rem 0; --gap: 2rem;">
      <div>
          <div style="--span:2;">
          <div> ${selectTemp(data)}</div>
          <hr>
             <div>
              <details>
                  <summary role="button">List</summary> ${listTemp(data)}
              </details>
          </div> 
          
          </div>
          <div style="--span:2;">
       
          <div>
          <label>
            <input type="checkbox" role="switch" />
            Switch Checkbox
            </label>
          </div>
          <div>
            <label>
              <textarea rows="${data.codeOut ? 13 : 3}">${data.codeOut ? JSON.stringify(data.codeOut, null, 2) : ``}</textarea>
            </label>
          </div>
          </div>
      </div>
  </div>
        `;
}

document.addEventListener("reef:render", function (event) {
  // console.log(`The #${event.target.id} element was rendered.`);
});

async function initData() {
  const req = await fetchFile("./public/data/libary.json");
  console.log({ data: req });
  data.fileDb = req.data;
}

const run = () => {
  console.log("app run");
  component("#main", () => layoutTemp(data), {
    events: { handleFetchReq },
  });
  setTimeout(function () {
    initData();
  }, 2000);
};

const clickHandler = (event) => {
  let el1 = event.target.closest("[data-json]");
  if (el1) {
    event.preventDefault();
    console.log("Json Fetch", el1.dataset.json);
  }
};

const submitHandler = (event) => {
  if (event.target.matches("form")) {
    event.preventDefault();
    console.log("Form try to submit", event.target);
  }
};
document.addEventListener("submit", submitHandler);
document.addEventListener("click", clickHandler);
window.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  run();
});
