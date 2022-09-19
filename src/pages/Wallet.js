import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { updateTotal, fetchCurrencies, fetchExchangeRates } from '../actions';
import EditingForm from './EditingForm';
import Expenses from './Expenses';

const Alimentação = 'Alimentação';
class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentação,
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

  handleButton = () => {
    const { getExchage } = this.props;
    getExchage(this.state);
    this.setState((previous) => ({
      id: previous.id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: Alimentação,

    }));
  }

  handleTotal = () => {
    const { expenses, getTotal } = this.props;
    if (expenses.length === 0) {
      getTotal(parseFloat(0).toFixed(2));
    } else {
      const totalExpenses = expenses.map((item) => (
        parseFloat(item.value)
        * parseFloat(item.exchangeRates[item.currency].ask)))
        .reduce(
          (previousValue, currentValue) => previousValue + currentValue,
        );

      getTotal(totalExpenses.toFixed(2));
    }
  }

  render() {
    const { email, total, editMode } = this.props;
    const { currencies } = this.props;
    const { value, description } = this.state;
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
            <br />
            <span>Despesa Total: </span>
            <p
              data-testid="total-field"
            >
              {total}
            </p>
            <p
              data-testid="header-currency-field"
            >
              BRL
            </p>
          </div>
        </header>
        { editMode.length === 0
          ? (
            <>
              <form>
                <label htmlFor="value">
                  Valor:
                  <input
                    type="number"
                    data-testid="value-input"
                    name="value"
                    value={ value }
                    onChange={ this.handleInputChange }
                  />
                </label>
                <label htmlFor="description">
                  Descrição:
                  <input
                    type="text"
                    value={ description }
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
                    data-testid="currency-input"
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
            </>)
          : <EditingForm />}
        <br />
        <Expenses handleTotal={ this.handleTotal } editMode={ editMode } />

      </>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  total: state.wallet.total,
  editMode: state.wallet.editingInfo,

});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  getExchage: (state) => dispatch(fetchExchangeRates(state)),
  getTotal: (total) => dispatch(updateTotal(total)),
});

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.any),
  getTotal: PropTypes.func.isRequired,
  total: PropTypes.number,
  editMode: PropTypes.arrayOf(PropTypes.any),
  getCurrencies: PropTypes.func.isRequired,
  getExchage: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
};

Wallet.defaultProps = {
  email: '',
  expenses: [],
  total: 0,
  editMode: [],
  currencies: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
