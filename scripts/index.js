// Selecione o botão no DOM
function darkModeButton() {
    const button = document.createElement('button');
    button.id = 'dark-mode-button';
    button.innerText = 'Modo Escuro';
    document.body.appendChild(button);
}