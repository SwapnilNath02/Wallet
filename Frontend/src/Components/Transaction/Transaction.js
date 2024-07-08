import { useGlobalContext } from '../../context/globalContext'
import styled from 'styled-components'
import TransactionItem from './TransactionItem'
import { InnerLayout } from '../../styles/Layout'


function Transaction() {
    const {transactionHistory} = useGlobalContext()

    const [...history] = transactionHistory()
  return (
    <TransactionHistoryStyled>
        <InnerLayout>
            <h1>Transaction History</h1>
                    <div className="incomes">
                        {history && history.map((his) => {
                            const {_id, title, amount, date, category, description, type} = his;
                            return <TransactionItem
                                key={_id}
                                id={_id} 
                                title={title} 
                                description={description} 
                                amount={amount} 
                                date={date} 
                                type={type}
                                category={category} 
                                indicatorColor={
                                     type === 'expense' ? 'red' : 'var(--color-green)'
                                }
                            />
                        })}
                    </div>
        </InnerLayout>
    </TransactionHistoryStyled>
  )
}
const TransactionHistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h1{
        text-align:center;
        padding-bottom:10px;
    }

    .history-item{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;
export default Transaction

