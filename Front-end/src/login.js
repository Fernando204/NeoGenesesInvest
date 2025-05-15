const bt = document.getElementById("enterBT");
bt.addEventListener("click",()=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Regex simples para o email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validações
    if (!email || !password) {
        alert("Por favor, preench todos os campos.");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("O e-mail inserido não é válido.");
        return;
    }

    if (password.length < 8) {
        alert("A senha deve ter pelo menos 8 caracteres.");
        return;
    }
    
    // Requisição
    fetch('https://localhost:8080/user/login',{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include", // essencial para aceitar cookies HttpOnly
        body: JSON.stringify({password: password,email: email})
    })
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        return response.text().then(text=>{
                throw new Error("Erro: "+text);
        });
    })                                                   
    .then(data =>{
        if (data && data.name && data.id) {
            alert(`${data.name} logado com sucesso`); 
            location.href = "index.html";
        } else {
            console.error("Resposta inesperada:", data);
            alert("Erro inesperado ao fazer login");
        }
    })
    .catch(error => {
    alert("Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
    console.error("Erro no login:", error);
    });
})
