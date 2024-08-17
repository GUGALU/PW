// função para ativar e desativar dark mode
document.getElementById("theme-toggle").addEventListener("click", function () {
  const body = document.body;
  const temaAtual = body.getAttribute("data-theme");
  const novoTema = temaAtual === "light" ? "dark" : "light";
  body.setAttribute("data-theme", novoTema);
  localStorage.setItem("data-theme", novoTema);
});

// Carregar o estado do tema do armazenamento local quando a página for carregada
document.addEventListener("DOMContentLoaded", function () {
  const temaSalvo = localStorage.getItem("data-theme");
  if (temaSalvo) {
    document.body.setAttribute("data-theme", temaSalvo);
  }
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

      window.alert(`${href} copiado para a área de transferência.`);
    });
  });
});

const repositories = document.querySelector(".api-response");

if (repositories) {
  fetchRepositories();
}

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
                        <a href="${
                          item.html_url
                        }" target="_blank" class="github-api-itens">
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

function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]/g, ""); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
}

document.getElementById("cpf-Form").addEventListener("submit", function () {
  event.preventDefault();

  const cpf = document.getElementById("cpf").value;
  const resultado = document.getElementById("resultado");

  if (validarCPF(cpf)) {
    resultado.textContent = "CPF válido";
    resultado.className = "valido";
  } else {
    resultado.textContent = "CPF inválido";
    resultado.className = "invalido";
  }
});

function voltar() {
  window.location.href = "index.html";
}
