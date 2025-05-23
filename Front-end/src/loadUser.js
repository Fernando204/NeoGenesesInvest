// const LocalData = JSON.parse(localStorage.getItem("ngdb") || "{}");
// if (LocalData) {
//     console.log(LocalData)
// }
// if (LocalData && LocalData.user) {
//     document.getElementById('loginBT').innerHTML = LocalData.user.name;
//     console.log(LocalData.user.name);
// }else{
//     console.log("nenhum usuario logado");
// }

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

fetch('http://localhost:8080/user/session', {
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
//http://localhost:5500/index.html