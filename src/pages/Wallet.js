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
    const { email } = this.props;
    return (
      <header>
        <div>
          <p>TRYBE WALLET LOGIN</p>
        </div>
        <div>
          <p
            data-testid="email-field"
          >
            Email:
            {' '}
            { email }
          </p>
          <p
            data-testid="total-field"
          >
            Despesa Total:
            {' '}
            { 0 }
          </p>
          <p
            data-testid="header-currency-field"
          >
            Despesa Total:
            {' '}
            { 'BRL' }
          </p>
        </div>

      </header>

    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  /*   currencies: state.wallet.currencies, */

});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
});

Wallet.propTypes = {
  email: PropTypes.string,
  getCurrencies: PropTypes.func.isRequired,
};

Wallet.defaultProps = {
  email: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
