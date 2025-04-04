const bt = document.getElementById("enterBT");
bt.addEventListener("click",()=>{
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById("UserName").value;

    fetch('http://localhost:8080/users/Register',{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({senha: password,email: email, userName: name})
    })
    .then(data =>{
        alert(data);
    })
    .then(error =>{
        alert(error);
        console.log(error);
    });
    
        
})