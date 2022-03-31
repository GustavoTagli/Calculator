const input = document.getElementById("result");
var tableCalc = document.querySelector("#tableCalc");
var inputOperation = document.querySelector("#operation");

document.onclick = function(){
  //manter o foco no "display" da calculadora
  document.getElementById("result").focus();
  
  //manter o cursor sempre no final
  var len = input.value.length;
  input.setSelectionRange(len, len);
}

input.addEventListener("keydown", function(e){
    mask();
  //impedir de digitar letras
  if(e.key !== "0" & e.key !== "1" & e.key !== "2" & e.key !== "3" & e.key !== "4" & e.key !== "5" & e.key !== "6" & e.key !== "7" & e.key !== "8" & e.key !== "9"){
    e.preventDefault();
    if(e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/" || e.key === "%"){
      var op = e.key.replace('*', '×');
      op = op.replace('/', '÷');
      if(inputOperation.value == "0 -"){
        inputOperation.value = "-" + input.value.replace(/\./g, '') + " " + op;
        input.value = '-' + input.value;
      }
      else{
        inputOperation.value = input.value.replace(/\./g, '') + " " + op;
      }
      document.getElementById("equal").classList.add("on");
    }
    if(e.key == "Delete"){
      input.value = "0";
      inputOperation.value = "";
      input.style.fontSize = "34px";
    }
    if(e.key == ","  & input.value.includes(',') === false){
      input.value = input.value + ",";
    }
    if(e.keyCode === 13){
      calculation();
    }
   
  }
  else{
    decreaseSize();
    if(input.value.replace(/\./g, '').replace(/,/g, '').length >= 15 & document.getElementById("equal").classList[2] != "on"){
      e.preventDefault();
    }else{
      if(input.value === "0" & e.key !== "0"){
        input.value = input.value.slice(0,-1);
        document.getElementById("backspace").classList.remove("lock");
      }
      if(document.getElementById("equal").classList[2] == "on"){
        input.value = "";
        document.getElementById("equal").classList.remove("on");
      }
      if(inputOperation.value.substring(inputOperation.value.length-1, inputOperation.value.length) == "="){
        input.value = "";
        inputOperation.value = "";
      }
      if(document.getElementById("equal").classList[2] == "cleanAll"){
        input.value = "";
        inputOperation.value = "";
        document.getElementById("equal").classList.remove("cleanAll");
      }
    }
  }
  //impedir de digitar o 0, estando o 0 inicial no display
  if(input.value === "0" & e.key === "0"){
    e.preventDefault();
  }
  //Backspace teclado
  if (e.keyCode === 8) {
    backspace();
  }
});

input.addEventListener("keyup", function(e){
  if(e.key !== "0" & e.key !== "1" & e.key !== "2" & e.key !== "3" & e.key !== "4" & e.key !== "5" & e.key !== "6" & e.key !== "7" & e.key !== "8" & e.key !== "9" & e.key !== ","){
    e.preventDefault();
  }else{
    mask();
  }
})


//identificar qual botão da calculadora o usuário está apretando
//target puxa as informações que desejar do elemento
tableCalc.addEventListener("click", function(e){
  var valId = e.target.id;
  var val = document.getElementById(valId).innerText;
  var valueDiv = document.getElementById(valId).getAttribute('value');

    //Mostrar número no "display" da calculadora
  if(isNaN(parseInt(val)) === false){
    document.getElementById("backspace").classList.remove("lock");
    if(document.getElementById("equal").classList[2] == "cleanAll"){
      input.value = val;
      inputOperation.value = "";
      document.getElementById("equal").classList.remove("cleanAll");
      mask();
    }else{
      if(input.value === "0" & val !== "0" || document.getElementById("equal").classList[2] == "on"){
        input.value = val;
        document.getElementById("equal").classList.remove("on");
        mask();
      }
      else{
        if(input.value.replace(/\./g, "").replace(/,/g, "").length < 15 & input.value !== "0"){
          input.value = input.value + val;
          mask();
        }
      } 
    }
    decreaseSize();
  }
  if(valueDiv == "+" || valueDiv == "-" || valueDiv == "×" || valueDiv == "÷" || valueDiv == "%"){
    if(input.value.substr(-1) == ","){
      input.value = input.value.slice(0,-1);
    }
    operationsDisplay();
  }
  //Vírgula
  if(valId == "comma" & input.value.includes(',') === false){
    input.value = input.value + ",";
  }
  //Negativo
  if(valId == "negative" & input.value.includes('-') === false){
    input.value = "-" + input.value;
  }
  //Backspace botão
  if(valId == "backspace"){
    backspace();
  }
  //Clear
  if(valId == "clear"){
    input.value = "0";
    inputOperation.value = "";
    input.style.fontSize = "34px";
  }
  //Ao pressionar igual...
  if(valId == "equal"){
    calculation();
  }
    
    
  //Operações no display
  function operationsDisplay(){
    if(inputOperation.value == "0 -"){
      inputOperation.value = "-" + input.value.replace(/\./g, '') + " " + valueDiv;
      input.value = '-' + input.value;
    }
    else{
      inputOperation.value = input.value.replace(/\./g, '') + " " + valueDiv;
    }
    document.getElementById("equal").classList.add("on");
  }
})


//função backspace
function backspace(){
  if(document.getElementById("backspace").classList[2] != "lock"){
    if(document.getElementById("equal").classList[2] != "on"){
      if(input.value != "" & inputOperation.value.substring(inputOperation.value.length-1, inputOperation.value.length) == "="){
        inputOperation.value = "";
        document.getElementById("backspace").classList.add("lock");
      }else{
        input.value = input.value.slice(0, -1);
        increaseSize();
      }
    }
  }
  if(input.value === ""){
    input.value = "0";
  } 
  mask();
}

//Cálculo
function calculation(){
  if(inputOperation.value !== ""){
    var len = "";
    var v1 = "";
    var v2 = "";
    var operator = "";
    var result = "";
    len = inputOperation.value.length;
    result = "";

    if(inputOperation.value.substring(inputOperation.value.length - 1, inputOperation.value.length) !== "="){
      v1 = parseFloat(inputOperation.value.substring(0, len-2).replace(',', '.'));
      v2 = parseFloat(input.value.replace(/\./g, '').replace(',', '.'));
      operator = inputOperation.value.substring(len-1, len);
    }
    else{
      var valOp = inputOperation.value;
      var idx = valOp.indexOf(" ");
      v1 = parseFloat(input.value.replace(/\./g, '').replace(',', '.'));
      v2 = parseFloat(inputOperation.value.substring(idx+2, valOp.lastIndexOf("")).replace(',', '.'));
      operator = inputOperation.value.substring(idx+1, idx+2);
    }

    if(operator == "+"){
      result = v1 + v2;
    }
    if(operator == "-"){
      result = v1 - v2;
    }
    if(operator == "÷"){
      result = v1/v2;
    }
    if(operator == "×"){
      result = v1*v2;
    }
    if(operator == "%"){
      result = v2*(v1/100)
    }

    if(inputOperation.value.substring(inputOperation.value.length - 1, inputOperation.value.length) !== "="){
      if(result.toString() == "Infinity"){
        input.value = "NaN";
      }else{
        inputOperation.value = inputOperation.value + " " + v2 + " =";
        input.value = result.toLocaleString("pt-BR").toString();
      }
    }else{
      inputOperation.value = input.value + " " + operator + " " + v2 + " =";
      input.value = result.toLocaleString("pt-BR").toString();
    }
    
    if(result.toString().length <= 12){
      input.style.fontSize = "34px";
    }else{
      input.style.fontSize = "26.6px";
    }

    document.getElementById("equal").classList.add("cleanAll");
  }
}

function mask(){
  if(input.value.includes(",") == false){
    var numero = input.value.replace(/\./g, "");
    numero = parseFloat(numero);
    numero = numero.toLocaleString("pt-BR");
    input.value = numero;
  }
}

//diminuir fonte
function decreaseSize(){
  var len = input.value.replace(/\./g, "").replace(/,/g, "").length;
  var style = window.getComputedStyle(input, null);
  var idx = style.getPropertyValue('font-size').indexOf('p');
  var size = parseFloat(style.getPropertyValue('font-size').substring('0', idx));
  if(len >= 11){
    input.style.fontSize = "clamp(26.5px, calc(" + size + "px - 2.5px), 34px)";
  }
}
//aumentar fonte
function increaseSize(){
  var len = input.value.replace(/\./g, "").replace(/,/g, "").length;
  var style = window.getComputedStyle(input, null);
  var idx = style.getPropertyValue('font-size').indexOf('p');
  var size = parseFloat(style.getPropertyValue('font-size').substring('0', idx));
  
  input.style.fontSize = "clamp(26.6px, calc(" + size + "px + 1.8px), 34px)";
}