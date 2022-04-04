import {
  RECEIVE_API_FAILURE, RECEIVE_API_SUCCESS, REQUEST_API, RECEIVE_EXCHANGE_SUCCESS,
} from '../actions';

const initialState = {
  currencies: [],
  isFetching: false,
  error: '',
  expenses: [],
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_API_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  case RECEIVE_EXCHANGE_SUCCESS:
    return {
      ...state,
      expenses: [...state.expenses, ...action.expenses],
      isFetching: false,
    };
  case RECEIVE_API_FAILURE:
    return {
      ...state,
      isFetching: false,
      error: action.error,
    };
  default:
    return state;
  }
};

export default wallet;
