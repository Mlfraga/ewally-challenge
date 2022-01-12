export function modulo10(bloco: string) {
  const codigo = bloco.split('').reverse();

  const somatorio = codigo.reduce((acc, current, index) => {
    let soma = Number(current) * (((index + 1) % 2) + 1);
    soma = soma > 9 ? Math.trunc(soma / 10) + (soma % 10) : soma;
    return acc + soma;
  }, 0);

  return Math.ceil(somatorio / 10) * 10 - somatorio;
}

export function modulo11(bloco: string) {
  const codigo = bloco.split('').reverse();

  let multiplicador = 2;

  const somatorio = codigo.reduce((acc, current) => {
    const soma = Number(current) * multiplicador;
    multiplicador = multiplicador === 9 ? 2 : multiplicador + 1;
    return acc + soma;
  }, 0);

  const restoDivisao = somatorio % 11;

  const DV = 11 - restoDivisao;

  if (DV === 0 || DV === 10 || DV === 11) return 1;

  return DV;
}

export const validateBoleto = (barcode: string) => {
  const validatorDigit = Number(barcode[4]);
  const bloco = barcode.substring(0, 4) + barcode.substring(5);
  const validatedValidatorDigit = modulo11(bloco);

  if (validatedValidatorDigit !== validatorDigit) {
    return false;
  }

  return true;
};

export const getBoleto = (cod: string) => {
  let formattedCode = '';

  formattedCode += cod.substring(0, 3);
  formattedCode += cod.substring(3, 4);
  formattedCode += cod.substring(32, 33);
  formattedCode += cod.substring(33, 37);
  formattedCode += cod.substring(37, 47);
  formattedCode += cod.substring(4, 9);
  formattedCode += cod.substring(10, 20);
  formattedCode += cod.substring(21, 31);

  return formattedCode;
};
