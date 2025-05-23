const bt = document.getElementById("enterBT");
const errorLabel = document.getElementById("errorLabel");
bt.addEventListener("click",()=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("UserName").value;

    if(!email){
        errorLabel.innerHTML = "Digite um Email valido";
        return;
    }else if (!name) {
        errorLabel.innerHTML = "Digite um nome de usuário valido";
        return;
    }
    else if(password.length < 8){
        errorLabel.innerHTML = "Digite uma senha com no minimo 8 caracteres";
        return;
    }   

    fetch('http://localhost:8080/user/register',{
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({password: password,email: email, name: name})
    })
    .then(response =>{
        if (response.ok) {
            return response.json();
        }else{
            return response.text().then(text =>{
                errorLabel.innerHTML = text;
                throw new Error(text);
            })
        }
    })
    .then(data =>{
        
        errorLabel.innerHTML = (data.name+" registrado com sucesso");
        console.log("registrado com sucesso");

        location.href = "index.html"
    });
    
})