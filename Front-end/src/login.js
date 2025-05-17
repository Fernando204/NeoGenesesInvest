const bt = document.getElementById("enterBT");
const errorLabel = document.getElementById("errorLabel");

bt.addEventListener("click",()=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        errorLabel.innerHTML = "Por favor preencha todos os campos";
        return;
    }

    fetch('http://localhost:8080/user/login',{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({password: password,email: email})
    })
    .then(response =>{
        if(response.ok){
            return response.json();
        }else{
            return response.text().then(text=>{
                errorLabel.innerHTML = ("erro: "+text);
                console.log(text)
            })
        }
    }).then(data =>{
        console.log(data);
        
        let dat = {user: null}

        if (localStorage.getItem("ngdb")) {
            localStorage.removeItem("ngdb");
        }
        
        const userDat = {
            name: data.name,
            id: data.id
        }
        dat.user = userDat;
        
        alert(data.name+" logado com sucesso");
        console.log(dat);
        localStorage.setItem("ngdb",JSON.stringify(dat));//salva no localStorage
        location.href = "index.html"
    })
    .catch(error =>{
        console.log(error);
    })
    
   
})
//hello
// word
// when day is gone
// today i will eat your ass with rice and beans ;
