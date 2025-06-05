import { useState, type ChangeEvent } from "react";
import "./App.css";

function App() {
  const [cpf, setCpf] = useState<string>("");
  const [invalido, setInvalido] = useState<number | undefined>(undefined);
  const [tamanhoCpf, setTamanhoCpf] = useState("");
  const [cpfFormatado, setCpfFormatado] = useState("");
  var erro: number | undefined = undefined;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

    setCpf(event.target.value);

  };
  function handleButton() {
    var arrayCpfNum: number[] = [];
    var verificador1: number = 0;
    var verificador2: number = 0;
    var cpfMul: number[] = [];
    var cpfSoma: number = 0;
    var stringCpf: string = JSON.stringify(cpf);
    var arrayCpfString = stringCpf.split("");
    arrayCpfNum[0] = parseInt(arrayCpfString[1]);
    for (var i = 2; i < 12; i++) {
      arrayCpfNum.push(parseInt(arrayCpfString[i]));
    }
    for (var i = 10, j = 0; i > 1; i--, j++) {
      cpfMul[j] = arrayCpfNum[j] * i;
    }
    for (var f = 0; f < 9; f++) {
      cpfSoma += cpfMul[f];
    }
    verificador1 = cpfSoma % 11;
    if (verificador1 < 2) {
      verificador1 = 0;
    } else {
      verificador1 = 11 - verificador1;
    }
    if (verificador1 != arrayCpfNum[9]) {
      erro = 1;
    }
    arrayCpfNum[9] = verificador1;
    for (var i = 10, j = 1; j < 10; i--, j++) {
      cpfMul[j] = arrayCpfNum[j] * i;
    }
    cpfSoma = 0;
    for (var f = 1; f < 10; f++) {
      cpfSoma += cpfMul[f];
    }
    verificador2 = cpfSoma % 11;
    if (verificador2 < 2) {
      verificador2 = 0;
    } else {
      verificador2 = 11 - verificador2;
    }
    if (verificador2 != arrayCpfNum[10]) {
      erro = 1;
    }   
    if (verificador1 == arrayCpfNum[9] && verificador2 == arrayCpfNum[10] ) {
      erro = 0;
    }
    if (arrayCpfString.length != 13 ) {
      setTamanhoCpf("Tamanho do CPF inválido. 11 Digitos são necessários");
      erro = 1;
    } else {
      setTamanhoCpf("");
    }
    if (erro == 0 || undefined) {
      setCpfFormatado(
        arrayCpfNum[0]?.toString() +
          arrayCpfNum[1]?.toString() +
          arrayCpfNum[2]?.toString() +
          "." +
          arrayCpfNum[3]?.toString() +
          arrayCpfNum[4]?.toString() +
          arrayCpfNum[5]?.toString() +
          "." +
          arrayCpfNum[6]?.toString() +
          arrayCpfNum[7]?.toString() +
          arrayCpfNum[8]?.toString() +
          "-" +
          arrayCpfNum[9]?.toString() +
          arrayCpfNum[10]?.toString()
      );
    }
    if (erro == 1) {
      setInvalido(1);
    } else if (erro == 0) {
      setInvalido(0);
    } else {
      setInvalido(undefined);
    }
    arrayCpfNum = [];
  }
  return (
    <>
      <div>
        <input
          type="number"
          maxLength={12}
          value={cpf}
          onChange={handleChange}
        />
        <br></br>
        <button onClick={handleButton}>Testar CPF</button>
      </div>
      <div>
        {invalido == 0 ? (
          <p className="cpf-Formatado">CPF: {cpfFormatado}</p>
        ) : invalido == 1 ? null : null}
        <br></br>
        {invalido == 1 ? (
          <p>CPF inválido</p>
        ) : invalido == 0 ? (
          <p>CPF válido</p>
        ) : invalido == undefined ? null : null}
        <br></br>
        <p className="tamanho">{tamanhoCpf}</p>
      </div>
    </>
  );
}
export default App;
