import React, { createContext, useContext, useReducer, useState } from "react"
import axios from 'axios'
import { useAuthContext } from "../Hooks/useAuthContext";


const BASE_URL = "https://wallet-vjvp.onrender.com/api/v1/";


const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {

    const { user } = useAuthContext()
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        console.log('Token:', user.token);
        const response = await axios.post(`${BASE_URL}add-income`, income, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
            }
          })
             .catch((err) =>{
                setError(err.response.data.message)
            })

        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              }
    })
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`,{
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
        getIncomes()
    }

    const totalIncome = ()=>{
        let totalIncome=0
        if(incomes)
        {
            incomes.forEach((income)=>{
                totalIncome = totalIncome + income.amount
            })
        }
        return totalIncome
    }

    //calculate expenses
        const addExpense = async (income) => {
            const response = await axios.post(`${BASE_URL}add-expense`, income,{
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`
                }
              })
                .catch((err) =>{
                    setError(err.response.data.message)
                })
            getExpenses()
        }
    
        const getExpenses = async () => {
            const response = await axios.get(`${BASE_URL}get-expenses`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                  }
            })
            setExpenses(response.data)
            console.log(response.data)
        }
    
        const deleteExpense = async (id) => {
            const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`,{
                headers: {
                  'Authorization': `Bearer ${user.token}`
                }
              })
            getExpenses()
        }
    
        const totalExpenses = () => {
            let totalIncome = 0;
            if(expenses)
            {
                expenses.forEach((income) =>{
                    totalIncome = totalIncome + income.amount
                })
            }
            return totalIncome;
        }

        const totalBalance = () => {
            return totalIncome() - totalExpenses()
        }
    
        const transactionHistory = () => {
            if(incomes && expenses)
            {
                const history = [...incomes, ...expenses]
                history.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date)
                })
                return history
            }
            return []
        }
        const History = () => {
            if(incomes && expenses)
            {
                const history = [...incomes, ...expenses]
                history.sort((a, b) => {
                    return new Date(b.date) - new Date(a.date)
                })
        
                return history.slice(0, 3)
            } 
            return []
        }
        
    return (
        <GlobalContext.Provider value={{
            addIncome,incomes,setIncomes,getIncomes,deleteIncome,totalIncome,
            addExpense,expenses,getExpenses,setExpenses,deleteExpense,totalExpenses,totalBalance,transactionHistory,
            error,setError,History
        }}>
            {children}
        </GlobalContext.Provider>
    )
}
export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}
// ,...state,dispatch
