const param1 = "usd";
const param2 = "brl";

import {Conection} from './conn.mjs';

const conn = new Conection;

fetch('http://192.168.18.132:8080/coin/bitcoin?moeda=bitcoin&valor=brl')
    .then(response => response.text())
    .then(data => {
        console.log("Resposta do backend:"+data);  
    })
    .catch(error => console.error("Erro na requisição:", error));