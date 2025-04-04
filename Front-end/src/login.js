const bt = document.getElementById("enterBT");
bt.addEventListener("click",()=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch('http://localhost:8080/users/login',{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({senha: password,email: email})
    })
    .then(data =>{
        alert(data);
    })
    .then(error =>{
        alert(error);
        console.log(error);
    });
    
        
})