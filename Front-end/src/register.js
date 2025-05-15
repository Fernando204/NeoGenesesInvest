const bt = document.getElementById("enterBT");

bt.addEventListener("click", () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const name = document.getElementById("UserName").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validações
    if (!email || !password || !name) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    if (password.length < 8) {
        alert("A senha deve ter no mínimo 8 caracteres.");
        return;
    }

    if (name.length < 3) {
        alert("O nome deve ter pelo menos 3 letras.");
        return;
    }

    // Envio ao servidor
    fetch('http://localhost:8080/user/register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // <- cookies futuros
        body: JSON.stringify({ email, password, name })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.text().then(text => {
                alert("Erro ao registrar. Tente novamente.");
                console.error("Erro detalhado:", text);
                throw new Error(text);
            });
        }
    })
    .then(data => {
        if (data && data.name && data.id) {
            alert(`${data.name}, registro realizado com sucesso!`);
            location.href = "index.html";
        } else {
            alert("Erro inesperado no registro.");
        }
    })
    .catch(error => {
        console.error("Erro de rede ou do servidor:", error);
        alert("Erro de comunicação. Tente novamente mais tarde.");
    });
});

