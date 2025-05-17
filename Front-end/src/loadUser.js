const LocalData = JSON.parse(localStorage.getItem("ngdb") || "{}");
if (LocalData) {
    console.log(LocalData)
}
if (LocalData && LocalData.user) {
    document.getElementById('loginBT').innerHTML = LocalData.user.name;
    console.log(LocalData.user.name);
}else{
    console.log("nenhum usuario logado");
}

const closeSection = ()=>{
    localStorage.removeItem("ngdb");
    console.log("saiu");

    location.reload();
}