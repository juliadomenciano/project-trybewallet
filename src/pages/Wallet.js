import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchExchangeRates } from '../actions';
import Expenses from './Expenses';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      total: 0,
    };
  }

  async componentDidMount() {
    const { getCurrencies } = this.props;
    await getCurrencies();
  }

  handleInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      [target.name]: value });
  }

  handleTotal = () => {
    const { expenses } = this.props;
    const totalExpenses = expenses.map((item) => parseFloat(item.value)).reduce(
      (previousValue, currentValue) => previousValue + currentValue,
    );
    this.setState({
      total: totalExpenses,
    });
  }

  handleButton = async () => {
    const { getExchage } = this.props;
    await getExchage(this.state);
    this.setState((previous) => ({
      id: previous.id + 1,
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',

    }));
    this.handleTotal();
  }

  render() {
    const { email, currencies } = this.props;
    const { total } = this.state;
    return (
      <>
        <header>
          <div>
            <p>TRYBE WALLET LOGIN</p>
          </div>
          <div>
            <p
              data-testid="email-field"
            >
              { `Email: ${email}` }
            </p>
            <p
              data-testid="total-field"
            >
              { `Despesa Total:${total}` }
            </p>
            <p
              data-testid="header-currency-field"
            >
              BRL
            </p>
          </div>
        </header>
        <form>
          <label htmlFor="value">
            Valor:
            <input
              type="number"
              data-testid="value-input"
              name="value"
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              name="description"
              onChange={ this.handleInputChange }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              onChange={ this.handleInputChange }
            >
              {
                currencies.map((item) => (
                  <option
                    key={ item }
                    value={ item }
                  >
                    {item}
                  </option>))
              }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento:
            <select
              name="method"
              id="method"
              data-testid="method-input"
              onChange={ this.handleInputChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categorias:
            <select
              name="tag"
              data-testid="tag-input"
              id="tag"
              onChange={ this.handleInputChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
        <button
          type="button"
          onClick={ this.handleButton }
        >
          Adicionar despesa
        </button>
        <br />
        <Expenses />

      </>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,

});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  getExchage: (state) => dispatch(fetchExchangeRates(state)),
});

Wallet.propTypes = {
  email: PropTypes.string,
  getCurrencies: PropTypes.func.isRequired,
  getExchage: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
  expenses: PropTypes.arrayOf(PropTypes.any),
};

Wallet.defaultProps = {
  email: '',
  currencies: [],
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
