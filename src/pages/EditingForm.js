import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { changeExpense, fetchCurrencies } from '../actions';

class EditingForm extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      id: 0,
      ask: 0,
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
      const { id, ask } = this.props;
      this.setState({
        id,
        ask,
      });
      changeExpense(this.state);
    }

    render() {
      const { currencies } = this.props;

      return (
        <>
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
            Editar despesa
          </button>

        </>

      );
    }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  id: state.wallet.editingInfo[0],
  ask: state.wallet.editingInfo[1],

});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  changeExpense: (state) => dispatch(changeExpense(state)),

});

EditingForm.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
  id: PropTypes.number,
  ask: PropTypes.number,

};

EditingForm.defaultProps = {
  currencies: [],
  id: 0,
  ask: 0,

};

export default connect(mapStateToProps, mapDispatchToProps)(EditingForm);
