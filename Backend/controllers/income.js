const IncomeSchema= require("../models/IncomeModel")


exports.addIncome = async (req, res) => {
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


        const user_id = req.user._id
        // await income.save()
        const income=await IncomeSchema.create({title,amount,category,description,date,user_id})
        res.status(200).json(income)

    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.getIncomes = async (req, res) =>{
    try {
        const user_id = req.user._id
        const incomes = await IncomeSchema.find({user_id}).sort({date : 1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted',income})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}