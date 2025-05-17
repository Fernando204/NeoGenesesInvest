

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

const toolsPanel = document.querySelector(".tools");
const mainpage = document.querySelector(".mainpage");
const toggleTools = ()=>{
    if (toolsPanel.style.display != "none") {
        toolsPanel.style.display = "none";
        mainpage.style.display = "flex";
    }else{
        toolsPanel.style.display = "flex";
        mainpage.style.display = "none";
    }
}

const checkboxDarkmode = document.getElementById("toggleCheckbox-darkmode");


//vê se o darkmode está ativado no LocalStorage
if (localStorage.getItem("darkmode") === "enabled") {
    document.body.classList.add("darkmode");
    checkboxDarkmode.checked = true;
}else if(!localStorage.getItem("darkmode")){
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
        case 2:
            nextPage = "investimentos.html";
        default:
            break;
            
    }
    item.addEventListener('click',()=>{
        window.location.href = nextPage;
        console.log(index);
    });
})



/*
configuração do localStorage:

"ngdb":{
    "user":{
        "name": "example",
        "id": 345
    }
}
*/