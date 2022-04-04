import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { editMode, updateTotal } from '../actions';
import EditingForm from './EditingForm';
import Expenses from './Expenses';
import Form from './Form';

class Wallet extends React.Component {
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
    const { email, total } = this.props;

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
        { editMode.length !== 0
          ? <Form />
          : <EditingForm />}
        <br />
        <Expenses handleTotal={ this.handleTotal } />

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
  getTotal: (total) => dispatch(updateTotal(total)),
});

Wallet.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.any),
  getTotal: PropTypes.func.isRequired,
  total: PropTypes.number,
};

Wallet.defaultProps = {
  email: '',
  expenses: [],
  total: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
