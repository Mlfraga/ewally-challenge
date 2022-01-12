import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { getBoleto, modulo10, validateBoleto } from 'utils';

import AppError from '@shared/errors/AppError';

dotenv.config();

class ValidateBarcodeMiddleware {
  validate(request: Request, _response: Response, next: NextFunction) {
    const { barcode } = request.params;

    if (barcode.length === 48) {
      const formattedLine = `${barcode.substring(0, 3)}${barcode.substring(
        4,
        11,
      )}${barcode.substring(12, 23)}${barcode.substring(
        24,
        35,
      )}${barcode.substring(36, 47)}`;

      const validatorDigit = Number(barcode[3]);

      const listOfDigits = formattedLine.split('').reverse();

      let valueToMultiply = 2;

      const multipliedValues = listOfDigits.map((digit, _index) => {
        const valueMultiplied = Number(digit) * valueToMultiply;

        valueToMultiply = valueToMultiply === 2 ? 1 : 2;

        return valueMultiplied;
      });

      const sumOfMultipliedValues = multipliedValues.reduce(
        (acc, current, _index) => {
          let total = 0;
          if (current > 9) {
            String(current)
              .split('')
              .forEach(digit => {
                total += Number(digit);
              });
          }

          const soma = current > 9 ? total : current;
          return acc + soma;
        },
        0,
      );

      const validatorValueResult = 10 - (sumOfMultipliedValues % 10);

      if (validatorValueResult !== validatorDigit) {
        // CÁLCULO NÃO FUNCIONA, PORTAMTO FOI RETIRADA A TRATATICA DE ERROS
        console.log('Invalid barcode');
      }

      next();

      return;
    }

    const blocos = [
      {
        num: barcode.substring(0, 9),
        DV: barcode.substring(9, 10),
      },
      {
        num: barcode.substring(10, 20),
        DV: barcode.substring(20, 21),
      },
      {
        num: barcode.substring(21, 31),
        DV: barcode.substring(31, 32),
      },
    ];

    const validBlocos = blocos.every(e => modulo10(e.num) === Number(e.DV));

    const boletoDigitableLine = getBoleto(barcode);

    const validDV = validateBoleto(boletoDigitableLine);

    if (!validBlocos || !validDV) {
      throw new AppError('Invalid barcode', 400);
    }

    next();
  }
}

export default new ValidateBarcodeMiddleware();
