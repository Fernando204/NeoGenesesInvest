//referenciando elementos html
const atualValue = document.querySelectorAll(".atualValue")//para mostrar valor atual da moeda em questão
const maxValues = document.querySelectorAll('.maxValue');//para mostrar o maior valor nas ultimas 24H
const minValues = document.querySelectorAll('.minValue');//para mostrar o menor valor nas ultimas 24H
const conversores = document.querySelectorAll('.convert');
const porcentagem = document.querySelectorAll('.percentage');
const input1 = document.querySelectorAll('.valor1');
const input2 = document.querySelectorAll('.valor2');
const comparador = document.getElementById("comparator");

let valorDeComparacao = comparador.value;

const simb = ['BRL',"EUR","USD"];
const coins = ["btc","eth","sol"];

//valor atual das moedas
let usdValues = [];
let eurValues = [];
let btcValues = [];
let ethValues = [];
let solValues = [];

//maior valor das moedas nas ultimas 24H
let MaxUsd = [];
let MaxEur = [];
let MaxBtc = [];
let MaxEth = [];
let MaxSol = [];

//menor valor das moedas nas ultimas 24H
let MinUsd = [];
let MinEur = [];
let MinBtc = [];
let MinEth = [];
let MinSol = [];

let allMax = [MaxUsd,MaxEur,MaxBtc,MaxEth,MaxSol];
let allValues = [usdValues,eurValues,btcValues,ethValues,solValues];
let allMin = [MinUsd,MinEur,MinBtc,MinEth,MinEth];

const updateValues = ()=>{
  atualValue.forEach((item,index)=>{//itera nos titulos que mostram os valores atuais
    /**
 *  index | moeda
 *        |
 *     0  | Dollar
 *     1  | Euro
 *     2  | Bitcoin
 *     3  | Ethereum
 *     4  | Solana
 */
        item.innerHTML = allValues[index][parseInt(comparador.value)]+" "+simb[parseInt(comparador.value)];
        input2[index].placeholder = usdValues[parseInt(comparador.value)];

        const minimo = allMin[index][parseInt(valorDeComparacao)];
        const maximo = allMax[index][parseInt(valorDeComparacao)];

        porcentagem[index].innerHTML = (100 * (1 - (minimo / maximo))).toFixed(2)+"%";

        maxValues[index].innerHTML = maximo;
        minValues[index].innerHTML = minimo; 

        input2[index].placeholder = allValues[index][parseInt(comparador.value)];
  })
}

comparador.addEventListener("change",()=>{
  document.querySelectorAll(".coinName").forEach((item)=>{
    item.innerHTML = simb[parseInt(comparador.value)];
  })

  valorDeComparacao = comparador.value;
  updateValues();
  atualizeValues();
});

const getValue = async (coin)=>{
    try{
      const response = await fetch("http://localhost:8080/coin?base="+coin);
      if (!response.ok) {
        throw new Error("erro na requisição");
      }
      const data = await response.json();
      return data;
    }catch(error){
      console.error(error);
    };
      
}

const getMinValue = async (coin)=>{
  try{
    const response = await fetch("http://localhost:8080/coin/min?base="+coin);
    if (!response.ok) {
      throw new Error("erro na requisição");
    }
    const data = await response.json();
    return data;
  }catch(error){
    console.error(error);
  };
}
const getMaxValue = async (coin)=>{
  try{
    const response = await fetch("http://localhost:8080/coin/max?base="+coin.toUpperCase());
    if (!response.ok) {
      throw new Error("erro na requisição");
    }
    const data = await response.json();
    return data;
  }catch(error){
    console.error(error);
  };
}
const carregarValores = async () => {

  let usd = await getValue("usd");
  let eur = await getValue("eur");
  let btc = await getValue("btc");
  let eth = await getValue("eth");
  let sol = await getValue("sol");

  let btcMin = await getMinValue("btc");
  let usdMin = await getMinValue("usd");
  let eurMin = await getMinValue("eur");
  let ethMin = await getMinValue("eth");
  let solMin = await getMinValue("sol");
  console.log(solMin);

  let btcMax = await getMaxValue("btc");
  let usdMax = await getMaxValue("usd");
  let eurMax = await getMaxValue("eur");
  let ethMax = await getMaxValue("eth");
  let solMax = await getMaxValue("sol");

  usdValues = [usd.BRLtoUSD,usd.EURtoUSD,1,(1/btc.usdtoBTC),];
  eurValues = [eur.BRLtoEUR,1,eur.USDtoEUR,(1/btc.eurtoBTC)];
  btcValues = [btc.brltoBTC,btc.eurtoBTC,btc.usdtoBTC];
  ethValues = [eth.brltoETH,eth.eurtoETH,eth.usdtoETH];
  solValues = [sol.brltoSOL,sol.eurtoSOL,sol.usdtoSOL];

  MaxUsd = [usdMax.BRLtoUSD,usdMax.EURtoUSD,1,(1/btcMax.usdtoBTC),];
  MaxEur = [eurMax.BRLtoEUR,1,eurMax.USDtoEUR,(1/btcMax.eurtoBTC)];
  MaxBtc = [btcMax.brltoBTC,btcMax.eurtoBTC,btcMax.usdtoBTC];
  MaxEth = [ethMax.brltoETH,ethMax.eurtoETH,ethMax.usdtoETH];
  MaxSol = [solMax.brltoSOL,solMax.eurtoSOL,solMax.usdtoSOL];

  MinUsd = [usdMin.BRLtoUSD,usdMin.EURtoUSD,1,(1/btcMin.usdtoBTC),];
  MinEur = [eurMin.BRLtoEUR,1,eurMin.USDtoEUR,(1/btcMin.eurtoBTC)];
  MinBtc = [btcMin.brltoBTC,btcMin.eurtoBTC,btcMin.usdtoBTC];
  MinEth = [ethMin.brltoETH,ethMin.eurtoETH,MinEth.usdtoETH];
  MinSol = [solMin.brltoSOL,solMin.eurtoSOL,solMin.usdtoSOL];

  allMin =[MinUsd,MinEur,MinBtc,MinEth,MinSol]
  allValues = [usdValues,eurValues,btcValues,ethValues,solValues];
  allMax = [MaxUsd,MaxEur,MaxBtc,MaxEth,MaxSol]

 updateValues();
};

window.onload = carregarValores;


document.getElementById('logo').addEventListener('click',()=>{
  window.location.href = "index.html";
})

const atualizeValues = ()=>{
  input1.forEach((item,index)=>{
    let inputvalue = parseFloat(item.value);
    let result = inputvalue * allValues[index][parseInt(comparador.value)]
    result = result < 1 ? result.toFixed(8) : result.toFixed(2);
    input2[index].value = result;
  })
  input2.forEach((item,index)=>{
    let inputvalue = parseFloat(item.value);
    let result = inputvalue * (1/ allValues[index][parseInt(comparador.value)])
    result = result < 1 ? result.toFixed(8) :  result.toFixed(2);
    input1[index].value = result;
  })
}
const fiatPage = document.getElementById('fiatPage');
const criptoPage = document.getElementById('criptosPage');
const bar = document.querySelector('.bar');
const toggleType = (t)=>{
  switch(t){
    case "f":
      bar.style.marginLeft = "0";
      fiatPage.style.display = "flex";
      criptoPage.style.display = "none";
      break;
      case "c":
        bar.style.marginLeft = "50vw";
        fiatPage.style.display = "none";
        criptoPage.style.display = "flex";
        break;
      }
      
    }
    
    input1.forEach((item,index)=>{
      item.addEventListener('input',()=>{
        let inputvalue = parseFloat(item.value);
        let result = inputvalue *  allValues[index][parseInt(comparador.value)]
        result = result < 1 ? result.toFixed(8) : result.toFixed(2);
        input2[index].value = result;
      })
    })
    input2.forEach((item,index)=>{
      item.addEventListener('input',()=>{
        let inputvalue = parseFloat(item.value);
        let result = inputvalue * (1/ allValues[index][parseInt(comparador.value)])
        result = result < 1 ? result.toFixed(8) :  result.toFixed(2);
        input1[index].value = result;
      })
    })
    const data = JSON.parse(localStorage.getItem("ngdb"));
    if (data && data.userName) {
        document.getElementById('loginBt').innerHTML = data.userName;//coloca no botão o nome de usuário se estiver logado
        console.log(data.userName);
    }