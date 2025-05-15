// Verifica sessão ao carregar a página
fetch('https://localhost:8080/user/session', {
    method: 'GET',
    credentials: 'include' // garante envio do cookie de sessão
})
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Nenhum usuário autenticado.");
    }
})
.then(data => {
    // Exibe o nome do usuário no botão
    if (data && data.name) {
        document.getElementById('loginBT').innerHTML = data.name;
        console.log("Usuário logado:", data.name);
    }
})
.catch(err => {
    console.log("Usuário não logado:", err.message);
});

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

const toggleTools = ()=>{
    const toolsPanel = document.querySelector(".tools");

    if (toolsPanel.style.display != "none") {
        toolsPanel.style.display = "none";
    }else{
        toolsPanel.style.display = "flex";
    }
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

const toolItens = document.querySelectorAll(".tool-item");
toolItens.forEach((item,index)=>{
    let nextPage;
    switch(index){
        case 0:
            nextPage = "RDcalc.html";
            break;
        case 1:
            nextPage = "convert.html";
            break;
        default:
            break;
            
    }
    item.addEventListener('click',()=>{
        window.location.href = nextPage;
        console.log(index);
    });
})


function closeSession() {
    fetch('https://localhost:8080/user/logout', {
        method: 'POST',
        credentials: 'include'
    })
    .then(() => {
        location.reload(); // ou redireciona para login
    })
    .catch(err => {
        console.error("Erro ao encerrar sessão:", err);
    });
}
