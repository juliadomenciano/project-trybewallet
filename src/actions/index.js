export const REQUEST_API = 'REQUEST_API';
export const RECEIVE_API_SUCCESS = 'RECEIVE_API_SUCCESS';
export const RECEIVE_API_FAILURE = 'RECEIVE_API_FAILURE';

const loginInfo = (value) => ({ type: 'LOGIN', value });

export const requestApi = () => ({
  type: REQUEST_API,
});

export const receiveApiSuccess = (currencies) => ({
  type: RECEIVE_API_SUCCESS,
  currencies,

});

export const receiveApiFailure = (error) => ({
  type: RECEIVE_API_FAILURE,
  error,
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

export default loginInfo;
