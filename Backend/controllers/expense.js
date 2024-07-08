const ExpenseSchema= require("../models/ExpenseModel")


exports.addExpense = async (req, res) => {
    //destructure it
    const {title, amount, category, description, date}  = req.body


    try {

        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }

        // await income.save()
        const user_id = req.user._id
        const expense=await ExpenseSchema.create({title,amount,category,description,date,user_id})
        res.status(200).json(expense)

    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getExpenses = async (req, res) =>{
    try {
        const user_id=req.user._id
        const expenses = await ExpenseSchema.find({user_id}).sort({date: 1})
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) =>{
            res.status(200).json({message: 'Income Deleted',expense})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}