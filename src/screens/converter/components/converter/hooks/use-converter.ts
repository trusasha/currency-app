import {useNavigate} from 'hooks/use-navigate';
import {Currency} from 'interfaces/currency';
import {SCREENS} from 'navigation';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Keyboard} from 'react-native';
import {calculateConversion, validateInput} from '../../../utils';

/**
 * Custom hook to manage currency conversion between two currencies.
 * It handles state updates, navigation, and input validation.
 *
 * @param {Object} params - The parameters for configuring the converter.
 * @param {Object} params.initialValues - The initial values for the 'from' and 'to' input fields.
 * @param {Object} params.initialCurrencies - The initial currency objects for 'from' and 'to'.
 * @param {string} params.inputId - The current input being modified ('from' or 'to').
 * @param {Currency} params.selectedCurrency - The newly selected currency object.
 * @returns {Object} The hook returns an object containing various utility functions and state values.
 */
export const useConverter = ({
  initialValues,
  initialCurrencies,
  inputId,
  selectedCurrency,
}: {
  initialValues: {from: string; to: string};
  initialCurrencies?: {from: Currency; to: Currency};
  inputId?: 'to' | 'from';
  selectedCurrency?: Currency;
}) => {
  const navigate = useNavigate();

  const currencyValuesRef = useRef(initialValues);

  // State to manage the current currency objects for 'from' and 'to'.
  const [currencies, setCurrencies] = useState<{
    from: Currency | null;
    to: Currency | null;
  }>({
    from: initialCurrencies?.from || null,
    to: initialCurrencies?.to || null,
  });

  // State to manage the values in 'from' and 'to' inputs.
  const [fromValue, setFromValue] = useState(initialValues.from);
  const [toValue, setToValue] = useState(initialValues.to);

  // Extract USD prices for easy access.
  const fromPriceUSD = currencies.from?.values.USD?.price;
  const toPriceUSD = currencies.to?.values.USD?.price;

  /**
   * Memorized callbacks for handling navigation and currency switching.
   * These ensure minimal re-creation of functions unless dependencies change.
   */
  const {onFromCurrency, onToCurrency, onSwitchCurrencies} = useMemo(
    () => ({
      onFromCurrency: () => {
        Keyboard.dismiss();

        navigate(SCREENS.currencySelector, {inputId: 'from'});
      },
      onToCurrency: () => {
        Keyboard.dismiss();

        navigate(SCREENS.currencySelector, {inputId: 'to'});
      },
      onSwitchCurrencies: () => {
        Keyboard.dismiss();

        setCurrencies(state => {
          const newState = {
            from: state.to,
            to: state.from,
          };

          if (newState.from && newState.to) {
            const newToValue = calculateConversion(
              currencyValuesRef.current?.from,
              newState.from.values.USD.price,
              newState.to.values.USD.price,
            );

            setToValue(newToValue);
          }

          return newState;
        });
      },
    }),
    [navigate],
  );

  /**
   * Memoized handlers for input changes that validate the input and calculate conversions.
   */
  const {onChangeTo, onChangeFrom} = useMemo(
    () => ({
      onChangeTo: (value: string) => {
        if (validateInput(value)) {
          setToValue(value);

          if (fromPriceUSD && toPriceUSD) {
            const conversion = calculateConversion(
              value,
              toPriceUSD,
              fromPriceUSD,
            );

            setFromValue(conversion);
          }
        }
      },
      onChangeFrom: (value: string) => {
        if (validateInput(value)) {
          setFromValue(value);

          if (fromPriceUSD && toPriceUSD) {
            const conversion = calculateConversion(
              value,
              fromPriceUSD,
              toPriceUSD,
            );

            setToValue(conversion);
          }
        }
      },
    }),
    [fromPriceUSD, toPriceUSD],
  );

  // Effect to update currency states when a new currency is selected.
  useEffect(() => {
    if (selectedCurrency && inputId) {
      setCurrencies(state => {
        const newState = {
          ...state,
          [inputId]: selectedCurrency,
        };

        const newPriceUSD = selectedCurrency.values.USD?.price;
        const otherKey = inputId === 'from' ? 'to' : 'from';
        const otherCurrency = state[otherKey];
        const otherPriceUSD = otherCurrency?.values.USD?.price;

        if (newPriceUSD && otherCurrency && otherPriceUSD) {
          if (inputId === 'from') {
            const newToValue = calculateConversion(
              currencyValuesRef.current.from,
              newPriceUSD,
              otherPriceUSD,
            );
            setToValue(newToValue);
          } else {
            const newToValue = calculateConversion(
              currencyValuesRef.current.from,
              otherPriceUSD,
              newPriceUSD,
            );
            setToValue(newToValue);
          }
        }

        return newState;
      });
    }
  }, [inputId, selectedCurrency, setCurrencies, setFromValue, setToValue]);

  /**
   * Effect to automatically calculate the initial value for 'to' input field
   * when the component mounts. This calculation is based on the initial values
   * provided for 'from' currency and its amount.
   * Only runs on the initial render due to an empty dependency array,
   * ensuring that the calculation only happens once, using the initial prices.
   */
  useEffect(() => {
    if (
      initialCurrencies?.from &&
      initialCurrencies?.to &&
      initialValues.from
    ) {
      const newFromPriceUSD = initialCurrencies.from.values.USD?.price;
      const newToPriceUSD = initialCurrencies.to.values.USD?.price;

      if (newFromPriceUSD && newToPriceUSD) {
        const initialToValue = calculateConversion(
          initialValues.from,
          newFromPriceUSD,
          newToPriceUSD,
        );
        setToValue(initialToValue);
      }
    }
  }, [initialCurrencies, initialValues.from]);

  // Effect to sync ref with state values.
  useEffect(() => {
    currencyValuesRef.current = {from: fromValue, to: toValue};
  }, [fromValue, toValue]);

  return {
    onChangeText: {
      from: onChangeFrom,
      to: onChangeTo,
    },
    onPressCurrency: {
      from: onFromCurrency,
      to: onToCurrency,
    },
    setValue: {
      from: setFromValue,
      to: setToValue,
    },
    callbacks: {
      onSwitchCurrencies,
    },
    values: {from: fromValue, to: toValue},
    currencies,
    currencyValuesRef,
  };
};
