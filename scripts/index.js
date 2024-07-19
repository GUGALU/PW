// função para ativar e desativar dark mode
document.getElementById("theme-toggle").addEventListener("click", function () {
  const body = document.body;
  const temaAtual = body.getAttribute("data-theme");
  const novoTema = temaAtual === "light" ? "dark" : "light";
  body.setAttribute("data-theme", novoTema);
});

// função para copiar contatos para o clipboard/area de transferência
document.addEventListener("DOMContentLoaded", (event) => {
  function copyToClipboard(text) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }

  const contactLinks = document.querySelectorAll(".div-contatos a");

  contactLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const href = link.getAttribute("href");
      copyToClipboard(href);

      window.alert(`${href} copiado para o clipboard.`);
    });
  });
});

const repositories = document.querySelector(".api-response");

function fetchRepositories() {
  fetch("https://api.github.com/users/GUGALU/repos")
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Erro ao buscar repositórios.");
      }

      const data = await response.json();

      data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      data.map((item) => {
        let project = document.createElement("div");

        project.innerHTML = `
          <a href="${item.html_url}" target="_blank" class="github-api-itens">
              <div>
                  <h4 class="projects-title">${item.name}</h4>
                  <span class="projects-date">${Intl.DateTimeFormat(
                    "pt-br"
                  ).format(new Date(item.created_at))}</span>
              </div>
              <div>
                  <span class="projects-language">
                      <span class="projects-circle"></span>
                      ${item.language}
                  </span>
              </div>
          </a>
        `;

        repositories.appendChild(project);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

fetchRepositories();

// função para exibir o ano atual no footer
document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("current-year");
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
});
