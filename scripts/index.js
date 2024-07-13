// função para ativar e desativar dark mode
function darkModeButton() {
    const button = document.createElement("button");
    button.id = "dark";
    button.innerText = "Modo Escuro";
    document.body.appendChild(button);
}
function lightMode(){
    const button = document.createElement("button");
    button.id = "light";
    button.innerText = "Modo Claro";
    document.body.appendChild(button);
}

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

    contactLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();  
            const href = link.getAttribute("href");
            copyToClipboard(href);

            window.alert(`${href} copiado para o clipboard.`);
        });
    });
});
