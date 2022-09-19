import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { deleteExpense, editMode } from '../actions';

class Expenses extends React.Component {
  componentDidMount() {
    const { handleTotal } = this.props;
    handleTotal();
  }

  componentDidUpdate(previousProps) {
    console.log(previousProps);
    const { handleTotal } = this.props;
    handleTotal();
  }

  removeRow = (id) => {
    const { expenses, deleteRow } = this.props;
    if (expenses.length === 1) {
      deleteRow([]);
    } else {
      const expensesLeft = expenses.filter((item) => item.id !== id);
      deleteRow(expensesLeft);
    }
  }

  render() {
    const { expenses, editing } = this.props;
    return (
      <section>

        <table>
          <tbody>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            {
              expenses.map((item, index) => (
                <tr key={ item.id }>
                  <td>{item.description}</td>
                  <td>{item.tag}</td>
                  <td>{item.method}</td>
                  <td>{parseFloat(item.value).toFixed(2)}</td>
                  <td>{item.exchangeRates[item.currency].name}</td>
                  <td>
                    {
                      parseFloat(item.exchangeRates[item.currency].ask).toFixed(2)
                    }
                  </td>
                  <td>
                    {
                      (
                        parseFloat(item.value)
                      * parseFloat(item.exchangeRates[item.currency].ask)).toFixed(2)
                    }

                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={
                        () => { editing(index, expenses); }
                      }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => { this.removeRow(item.id); } }
                    >
                      Excluir
                    </button>

                  </td>

                </tr>
              ))
            }
          </tbody>

        </table>

      </section>

    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,

});

const mapDispatchToProps = (dispatch) => ({
  deleteRow: (expensesLeft) => dispatch(deleteExpense(expensesLeft)),
  editing: (index, expenses) => dispatch(editMode(index, expenses)),
});

Expenses.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.any).isRequired,
  deleteRow: PropTypes.func.isRequired,
  handleTotal: PropTypes.func.isRequired,
  editing: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
