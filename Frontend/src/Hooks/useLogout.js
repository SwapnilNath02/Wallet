import { useGlobalContext } from '../context/globalContext'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const {incomes,setIncomes,expenses,setExpenses} = useGlobalContext()
  const { dispatch } = useAuthContext()
  // const {dispatch: dispatchWorkouts}=useIncomeContext()
  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' }) 
    setIncomes(null)
    setExpenses(null)
  }

  return { logout }
}