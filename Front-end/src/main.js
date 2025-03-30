function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    panel.classList.toggle('open');
}

const checkboxDarkmode = document.getElementById("toggleCheckbox-darkmode");


//vê se o darkmode está ativado no LocalStorage
if (localStorage.getItem("darkmode") === "enabled") {
    document.body.classList.add("darkmode");
    checkboxDarkmode.checked = true;
}

//Evento para alternar e salvar preferência
checkboxDarkmode.addEventListener("change", function() {
    if (this.checked) {
        document.body.classList.add("darkmode");
        localStorage.setItem("darkmode", "enabled");
    } else {
        document.body.classList.remove("darkmode");
        localStorage.setItem("darkmode", "disabled");
    }
});
