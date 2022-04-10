/* import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, fetchExchangeRates } from '../actions';

const Alimentação = 'Alimentação';

class Form extends React.Component {
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
    const { getExchage, expenses } = this.props;
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

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;

    return (
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
      </>

    );
  }
}

const mapStateToProps = (state) => ({

  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,

});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  getExchage: (state) => dispatch(fetchExchangeRates(state)),

});

Form.propTypes = {

  getCurrencies: PropTypes.func.isRequired,
  getExchage: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),

};

Form.defaultProps = {
  currencies: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
 */
