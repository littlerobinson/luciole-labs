const pages = [
  "accueil",
  "prestations",
  "process",
  "tarifs",
  "grille",
  "faq",
  "contact",
  "apropos",
  "mentions",
];

const alias = {
  methode: "process",
  prix: "grille",
  method: "process",
  ls: "prestations",
  home: "accueil",
  legal: "mentions",
};

const out = document.getElementById("out");
const input = document.getElementById("cmd");
const mode = document.getElementById("mode");

function go(id) {
  if (!pages.includes(id)) return false;

  for (const page of pages) {
    document.getElementById(page)?.classList.toggle("on", page === id);
  }

  document.querySelectorAll("nav [data-go]").forEach((button) => {
    button.setAttribute(
      "aria-current",
      button.dataset.go === id ? "true" : "false",
    );
  });

  if (mode) mode.textContent = `PAGE: ${id}`;
  return true;
}

function say(text, className) {
  if (!out) return;
  const line = document.createElement("div");
  line.textContent = text;
  if (className) line.className = className;
  out.appendChild(line);
}

document.querySelectorAll("[data-go]").forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();
    go(el.dataset.go);
    if (out) out.innerHTML = "";
  });
});

input?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;

  let value = input.value.trim().toLowerCase();
  input.value = "";
  if (!value) return;

  if (out) out.innerHTML = "";
  say(`$ ${value}`, "dim");
  value = alias[value] || value;

  if (value === "help") {
    say(
      "Commandes : accueil, prestations, methode, tarifs, grille, faq, contact, apropos, mentions, clear, theme",
    );
  } else if (value === "clear") {
    if (out) out.innerHTML = "";
  } else if (value === "theme") {
    const select = document.getElementById("accent");
    if (!select) return;
    select.selectedIndex = (select.selectedIndex + 1) % select.options.length;
    select.dispatchEvent(new Event("change"));
    say(`Thème : ${select.options[select.selectedIndex].text}`);
  } else if (go(value)) {
    say(`Ouverture de ${value}…`);
  } else {
    say(`commande introuvable : ${value} (tape help)`, "warn");
  }
});

document.getElementById("accent")?.addEventListener("change", (event) => {
  const root = document.documentElement;
  const value = event.target.value;
  if (value) root.setAttribute("data-accent", value);
  else root.removeAttribute("data-accent");
});

const crt = document.getElementById("crt");
crt?.addEventListener("click", () => {
  const on = document.body.classList.toggle("crt");
  crt.setAttribute("aria-pressed", String(on));
});

const big = document.getElementById("big");
big?.addEventListener("click", () => {
  const on = document.body.classList.toggle("big");
  big.setAttribute("aria-pressed", String(on));
  big.textContent = on ? "A−" : "A+";
});

function tick() {
  const clock = document.getElementById("clock");
  if (clock) {
    clock.textContent = `${new Date().toLocaleTimeString("fr-FR")} LOCAL`;
  }
}

tick();
setInterval(tick, 1000);
