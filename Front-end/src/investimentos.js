const invesType = document.getElementById("invest-type");//select com os tipos de investimento
const quantity = document.getElementById("quantity");
const unityValue = document.getElementById("unityValue");
const investName = document.getElementById("investName");
const observacoes = document.getElementById("observações");
const valorInvestido = document.querySelector("#valor-investido");
const investCards = document.querySelector(".investCards");
const moedaOptions = document.querySelectorAll(".moedaOption");
const criptoDiv = document.getElementById("criptoDiv");

document.getElementById("logo").addEventListener("click",()=>{
    location.href = "index.html";    
})

const variableDiv = document.querySelector(".variable");
invesType.addEventListener("change",()=>{
    if (invesType.value == "ação" || invesType.value == "fundo" ){
        variableDiv.style.display = "flex";
        document.getElementById("viDiv").style.display = "none";

    }else if(invesType.value == "cripto"){
        document.getElementById("viDiv").style.display = "none";
        criptoDiv.style.display = "flex"

    }else{
        variableDiv.style.display = "none";
        document.getElementById("viDiv").style.display = "block";

    }
});

let userExists = false;
const playerInfo = JSON.parse(localStorage.getItem("ngdb"));

const getInvests = async ()=>{
    if (!playerInfo || !playerInfo.user) return;

    userExists = true;
    document.querySelector(".aviso").innerHTML = "Seus Investimentos:";
    try{

        const response =  await fetch("http://localhost:8080/invest/getInvest?userId="+playerInfo.user.id)
        if(!response.ok){
            document.querySelector(".aviso").innerHTML = "você não tem investimentos registrados no momento";
            throw new Error("erro na requisição");
        }
        playerInfo.user.invests = await response.json();
        console.log(response);
    }catch(error){
        console.error(error);
    }

    if (playerInfo.user.invests) {
        const inv =  playerInfo.user.invests;
        console.log(inv)
        index = 0;
        while(true){
            if (!inv[index]) {
                console.log("acabou");
                break;
            };

            const obj = inv[index];
            if (obj.lucro == null) obj.lucro = 0;

            let card = document.createElement("div");
            card.classList.add("card");

            let infos = document.createElement("div");
            infos.classList.add("shadow");

            let cardInvestName = document.createElement("h1");
            cardInvestName.innerHTML = obj.name;
            infos.appendChild(cardInvestName);

            let cardInvestCoin = document.createElement("h3");
            cardInvestCoin.innerHTML = "Moeda: "+obj.moeda;
            infos.appendChild(cardInvestCoin);

            let cardInvestType = document.createElement("h3");
            cardInvestType.innerHTML ="Tipo de investimento: "+obj.type;
            infos.appendChild(cardInvestType);

            let cardInvestvalue = document.createElement("h3");
            cardInvestvalue.innerHTML = "Total investido: "+obj.valorTotal;
            infos.appendChild(cardInvestvalue);

            let cardLucro = document.createElement("h3");
            cardLucro.innerHTML = "Lucro: "+obj.lucro;
            infos.appendChild(cardLucro);

            let cardinvestDate = document.createElement("h3");
            cardinvestDate.innerHTML = "Data do investimento: "+obj.date;
            infos.appendChild(cardinvestDate);
            card.appendChild(infos);

            let edit = document.createElement("div");
            edit.classList.add("card-edit");
            edit.classList.add("shadow")

            const titulo = document.createElement("h1");
            titulo.innerHTML = "Editar Investimento:";
            edit.appendChild(titulo);
            
            const label1 = document.createElement("h3")
            label1.innerHTML = "Atualizar Valor";
            edit.appendChild(label1);
            
            const newValue = document.createElement("input");
            edit.appendChild(newValue);
            
            const label2 = document.createElement("h3");
            edit.appendChild(label2);
            
            const aporte = document.createElement("input");
            edit.appendChild(aporte);
            
            const botões = document.createElement("div");
            
            const saveBt = document.createElement("button");
            saveBt.innerHTML = "Salvar Investimento";
            botões.appendChild(saveBt);
            
            const excludebt = document.createElement("button");
            excludebt.innerHTML = "Excluir Investimento";
            botões.appendChild(excludebt);

            excludebt.addEventListener("click",()=>{
                fetch("http://localhost:8080/invest/"+obj.id,{
                    method: "DELETE"
                })
                .then(response =>{
                    if (response.ok) {
                        alert("item deletado com sucesso")
                        investCards.removeChild(card);
                    }else{
                        alert("Erro ao deletar item");
                    }
                })
                .catch(error =>{
                    console.error("erro na requisição: "+error);
                })
            });

            let updateHistoric = document.createElement("div");
            updateHistoric.classList.add("shadow");
            updateHistoric.classList.add("uph");


            let historicDIv = document.createElement("div")
            historicDIv.classList.add("historico");

            let label3 = document.createElement("h1");
            label3.innerHTML = "Histórico de Investimento:"

            updateHistoric.appendChild(label3);
            updateHistoric.appendChild(historicDIv);

            edit.appendChild(botões);
            card.appendChild(edit);
            card.appendChild(updateHistoric);
            
            let l1,l2;
            if (obj.type != "ação" && obj.type != "fundo") {
                label1.innerHTML = "Atualizar Valor";
                label2.innerHTML = "Adicionar aporte"

            }else{
                label1.innerHTML = "Quantidade de Ações/Cotas";
                label2.innerHTML = "valor por Cota/Ação";
            }
            
            investCards.appendChild(card);
            

            index ++
        }
    }else{
        console.log("não tem investimentos");
    }
}
getInvests();

const setInvest = ()=>{
    if (userExists){
        let quantidade;
        let valor;
        if (invesType.value == "ação" || invesType.value == "fundo") {
            quantidade = quantity.value;
            valor = unityValue.value;
        }else{
            quantidade = 1;
            valor = valorInvestido.value;
        }
        
        fetch("http://localhost:8080/invest/setInvest",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({type: invesType.value,name: investName.value,quantity: quantidade, valor: valor,userId: playerInfo.user.id})
        }).then(response =>{
        if (response.ok) {
            alert("investimento salvo");
        }else{
            return response.text().then(text =>{
                errorLabel.innerHTML = text;
                throw new Error(text);
            })
        }
    })
    }
}