function toggleSettings() {
    const settingsPanel = document.getElementById('settingsPanel');
    const profilePanel = document.getElementById('profilePanel');

    settingsPanel.classList.toggle('open');
    profilePanel.classList.remove('open');
}

function toggleProfile() {
    const profilePanel = document.getElementById('profilePanel');
    const settingsPanel = document.getElementById('settingsPanel');

    profilePanel.classList.toggle('open');
    settingsPanel.classList.remove('open');
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
