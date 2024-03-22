let { signal, component } = reef;

// Create a signal
let data = signal({
  heading: "My Todos",
  todos: ["Swim", "Climb", "Jump", "Play"],
  emoji: "👋🎉",
});

// Create a template
function template() {
  let { heading, todos, emoji } = data;
  return `
        <h1>${heading} ${emoji}</h1>
        <menu>
            ${todos
              .map(function (todo) {
                return `<li id="${todo
                  .toLowerCase()
                  .replaceAll(" ", "-")}">${todo}</li>`;
              })
              .join("")}
        </menu>`;
}

// Listen for render events
document.addEventListener("reef:render", function (event) {
  console.log(`The #${event.target.id} element was rendered.`);
});

// Create a reactive component
// It automatically renders into the UI
component("#main", template);

// After two seconds, add an item to the todo list
setTimeout(function () {
  data.todos.push("Take a nap... zzzz");
  data.todos.push("Wake up");
  data.todos.push("Repeat");
}, 2000);
