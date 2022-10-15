import { useState } from "react";
import { useQuery, gql, useMutation } from '@apollo/client';
import './App.css';

const GET_TRANSACTIONS = gql`
{
  fetchAccount(id:1){
      id
      balance
      transactions {
          id
          amount
          date
      }
  }   
}
`

function App() {
  return (
    <div className="App">
      <Transactions/>
    </div>
  );
}

function Transactions() {
  const {loading, error, data} = useQuery(GET_TRANSACTIONS);
  const [transactions, setTransactions] = useState([]);

  if(loading) return <p>Loading</p>
  if(error) return <p>{error.toString()}</p>

  const addTransaction = (transaction) => {
    setTransactions(...transactions, transaction)
  }

  const rows = data.fetchAccount.transactions.map(({id, operation, amount, date}) => (
    <tr key={id}>
      <td>{date}</td>
      <td>{amount}</td>
    </tr>
  ))

  return (
  <div>
    <TransactionForm addTransaction={addTransaction}/>
    <p>Balance: {data.fetchAccount.balance}</p>
    <table>
      <tbody>
        {rows}
      </tbody>
    </table>
  </div>
  )
}

const CREATE_TRANSACTION = gql`
mutation CreateTransaction($amount: Float!) {
  createTransaction(input: {
          accountId: 1,
          amount: $amount
      }
  ) {
    amount
    date
  }
}
`

function TransactionForm() {
  const [amount, setAmount] = useState(0.0)
  const [createTransaction, { error }] = useMutation(
    CREATE_TRANSACTION,
    { refetchQueries: [{query: GET_TRANSACTIONS}]},
  );
  
  const handleSubmit = (event) => {
    event.preventDefault()
    createTransaction(
      {variables: {amount: parseFloat(amount)}},
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>{error}</div>
      <input type="number" step='0.01' value={amount} onChange={(e) => setAmount(e.target.value)} />
      <input type="submit" />
    </form>
  )
}

export default App;
