import {Currency} from 'interfaces/currency';
import {useNavigate} from 'hooks/use-navigate';
import {useEffect, useMemo, useRef, useState} from 'react';
import {SCREENS} from 'navigation';
import {calculateConversion} from 'screens/converter/utils';

interface ConverterValuesProps<K extends string> {
  initialValues: Record<K, string>;
  initialCurrencies?: Record<K, Currency>;
  inputId?: K;
  selectedCurrency?: Currency;
}

const getCurrencyEmptyObject = <K extends string>(initial: Record<K, string>) =>
  Object.keys(initial).reduce(
    (acc, key) => ({
      ...acc,
      [key]: null,
    }),
    {},
  );

const validateInput = (input: string) => {
  return input.match(/^[0-9]*\.?[0-9]*$/);
};

/**
 * Hook for managing converter values and currency selection in a currency converter application.
 * This hook initializes and manages state for currency values and their respective handlers,
 * and facilitates navigation to currency selection screens.
 *
 * @template K - Type of the keys used for identifying each input field.
 * @param {ConverterValuesProps<K>} params - Configuration parameters for the hook, including initial values and optional initial currencies.
 *
 * @returns {Object} A collection of state values, handlers, and setters for managing currency conversion.
 *
 * @remarks This hook is still under development and may require additional features and refinements,
 * such as better error handling, performance optimization, and support for dynamic currency updates.
 */
export const useConverterValues = <K extends string>({
  initialValues,
  initialCurrencies,
  inputId,
  selectedCurrency,
}: ConverterValuesProps<K>) => {
  const navigate = useNavigate();

  const currencyValuesRef = useRef(initialValues);

  const [currencies, setCurrencies] = useState(
    initialCurrencies ||
      (getCurrencyEmptyObject(initialValues) as Record<K, Currency | null>),
  );

  const [values, setValues] = useState(initialValues);

  const currencyHandlers = useMemo(() => {
    const handlers = (Object.keys(initialValues) as K[]).reduce(
      (acc, key) => ({
        ...acc,
        [key]: () => navigate(SCREENS.currencySelector, {inputId: key}),
      }),
      {},
    ) as Record<K, () => void>;

    return handlers;
  }, [initialValues, navigate]);

  const onChangeHandlers: Record<K, (value: string) => void> = useMemo(() => {
    const setValue = (field: K, value: string) => {
      setValues(prevValues => ({
        ...prevValues,
        [field]: value,
      }));
    };

    const handlers: Record<string, (value: string) => void> = {};

    (Object.keys(initialValues) as K[]).forEach((key: K) => {
      handlers[key] = (value: string) => {
        if (validateInput(value)) {
          setValue(key, value);

          const currencyEntries = Object.entries(currencies) as [
            K,
            Currency | null,
          ][];

          currencyEntries.forEach(([otherKey, otherCurrency]) => {
            if (
              otherCurrency &&
              otherCurrency.values.USD.price &&
              otherKey !== key
            ) {
              const currentCurrencyPrice = currencies[key]?.values.USD.price;
              if (currentCurrencyPrice) {
                const conversion = calculateConversion(
                  value,
                  currentCurrencyPrice,
                  otherCurrency.values.USD.price,
                );

                setValue(otherKey, conversion);
              }
            }
          });
        }
      };
    });

    return handlers;
  }, [initialValues, currencies]);

  useEffect(() => {
    if (selectedCurrency && inputId) {
      setCurrencies(state => {
        const newState = {
          ...state,
          [inputId]: selectedCurrency,
        };

        const isPricesExist = Object.values(newState).every(Boolean);

        if (isPricesExist) {
          Object.entries(newState).forEach(([key, currency]) => {
            if (currency && currency.values.USD.price && key !== inputId) {
              const otherCurrency = newState[key as keyof typeof newState];

              if (otherCurrency?.values.USD.price) {
                const conversionValue = calculateConversion(
                  currencyValuesRef.current[inputId],
                  currency.values.USD.price,
                  otherCurrency.values.USD.price,
                );

                setValues(prevValues => ({
                  ...prevValues,
                  [inputId]: conversionValue,
                  [key]: currencyValuesRef.current[key as K],
                }));
              }
            }
          });
        }

        return newState;
      });
    }
  }, [inputId, selectedCurrency]);

  return {
    values,
    currencies,
    currencyHandlers,
    onChangeHandlers,
    setters: {setValues, setCurrencies},
    currencyValuesRef,
  };
};
