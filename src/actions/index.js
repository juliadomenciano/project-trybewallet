export const REQUEST_API = 'REQUEST_API';
export const RECEIVE_API_SUCCESS = 'RECEIVE_API_SUCCESS';
export const RECEIVE_API_FAILURE = 'RECEIVE_API_FAILURE';
export const RECEIVE_EXCHANGE_SUCCESS = 'RECEIVE_EXCHANGE_SUCCESS';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const UPDATE_TOTAL = 'UPDATE_TOTAL';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const CHANGE_EXPENSE = 'CHANGE_EXPENSE';

const loginInfo = (value) => ({ type: 'LOGIN', value });

export const requestApi = () => ({
  type: REQUEST_API,
});

export const receiveApiSuccess = (currencies) => ({
  type: RECEIVE_API_SUCCESS,
  currencies,

});
export const receiveExchangeRatesSuccess = (exchangeRates, state) => ({
  type: RECEIVE_EXCHANGE_SUCCESS,
  expenses: [{ ...state,
    exchangeRates }],

});
export const receiveApiFailure = (error) => ({
  type: RECEIVE_API_FAILURE,
  error,
});

export const updateTotal = (total) => ({
  type: UPDATE_TOTAL,
  total,
});

export const deleteExpense = (expensesLeft) => ({
  type: DELETE_EXPENSE,
  expensesLeft,
});

export const editMode = (id, ask) => ({
  type: EDIT_EXPENSE,
  id,
  ask,
});

export const changeExpense = () => ({
/*   type: CHANGE_EXPENSE,
  expenses: [{ ...state,
    exchangeRates }], */

});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestApi());
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await request.json();
    const currenciesfiltered = Object.keys(data).filter((item) => item !== 'USDT');
    dispatch(receiveApiSuccess(currenciesfiltered));
  } catch (error) {
    dispatch(receiveApiFailure(error));
  }
};

export const fetchExchangeRates = (state) => async (dispatch) => {
  dispatch(requestApi());
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await request.json();
    dispatch(receiveExchangeRatesSuccess(data, state));
  } catch (error) {
    dispatch(receiveApiFailure(error));
  }
};

export default loginInfo;
