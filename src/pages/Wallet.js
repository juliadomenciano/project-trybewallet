import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../actions';

class Wallet extends React.Component {
  async componentDidMount() {
    const { getCurrencies } = this.props;
    await getCurrencies();
    /*     console.log(); */
  }

  render() {
    const { email, currencies } = this.props;
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
              { `Despesa Total:${0}` }
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
              /*               onChange={} */
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              data-testid="description-input"
              name="description"
              /*               onChange={} */
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              id="currency"
              /*             onChange={} */
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
          <label htmlFor="paymentMeyhod">
            Método de pagamento:
            <select
              name="paymentMeyhod"
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="categories">
            Categorias:
            <select
              name="categories"
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
      </>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,

});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  email: PropTypes.string,
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string),
};

Wallet.defaultProps = {
  email: '',
  currencies: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
