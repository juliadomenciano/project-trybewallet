import {
  RECEIVE_API_FAILURE, RECEIVE_API_SUCCESS,
  REQUEST_API, RECEIVE_EXCHANGE_SUCCESS,
  DELETE_EXPENSE, UPDATE_TOTAL, EDIT_EXPENSE,
} from '../actions';

const initialState = {
  currencies: [],
  isFetching: false,
  error: '',
  expenses: [],
  total: 0,
  editingInfo: [],
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
  case UPDATE_TOTAL:
    return {
      ...state,
      total: action.total,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expensesLeft,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editingInfo: [action.id, action.ask],
    };

  default:
    return state;
  }
};

export default wallet;
