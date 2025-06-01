import { isEqual } from 'lodash';

const getDinamicRiseCurrency = (oldRateCurrency, newRateCurrency) => {
  const timeLastUpdateUtc = newRateCurrency.timeLastUpdateUtc;
  const date = new Date(timeLastUpdateUtc);
  const shortFormat = date.toLocaleString('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short',
  });

  console.log(oldRateCurrency, newRateCurrency);

  if (
    !oldRateCurrency ||
    !oldRateCurrency.conversionRates ||
    oldRateCurrency.conversionRates.length === 0
  ) {
    return {
      timeLastUpdateUtc: shortFormat,
      conversionRates: newRateCurrency.conversionRates.map(([code, rate]) => [
        code,
        rate,
        'no_change',
      ]),
    };
  }

  const oldRatesArray = oldRateCurrency.conversionRates;
  const newRatesArray = newRateCurrency.conversionRates;

  const areRatesIdentical = isEqual(oldRatesArray, newRatesArray);
  if (areRatesIdentical) {
    return {
      timeLastUpdateUtc: shortFormat,
      conversionRates: newRatesArray.map(([code, rate]) => [
        code,
        rate,
        'no_change',
      ]),
    };
  }

  const oldRatesMap = new Map(
    oldRatesArray.map(([code, rate]) => [code, rate])
  );

  const finalConversionRates = newRatesArray.map(([code, newRate]) => {
    const oldRate = oldRatesMap.get(code);

    if (oldRate === undefined) {
      return [code, newRate, 'no_change'];
    }

    if (oldRate < newRate) {
      return [code, newRate, 'currency_rise'];
    } else if (oldRate > newRate) {
      return [code, newRate, 'currency_fall'];
    } else {
      return [code, newRate, 'no_change'];
    }
  });

  return {
    timeLastUpdateUtc: shortFormat,
    conversionRates: finalConversionRates,
  };
};

export default getDinamicRiseCurrency;
