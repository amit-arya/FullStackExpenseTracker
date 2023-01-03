const Expense = require('./models/expense');

exports.postAddExpense = async (req, res, next)=>{
    try{
        const amount = req.body.amount;
        const desc = req.body.desc;
        const category = req.body.category;
  
        const data = await Expense.create({amount:amount, desc:desc, category:category});
        res.status(201).json({newExpense:data});
      }catch(err){
        res.status(500).json({error:err});
      }
}

exports.getExpenses = async (req, res, next) =>{
    try{
        const expenses = await Expense.findAll();
        res.status(200).json({expenses});
       } catch(err){
        res.status(500).json({error : error}); 
       }
}

exports.getEditExpense = async (req, res, next) =>{
    try {
        const expenseId = req.params.id;
        const expense = await Expense.findByPk(expenseId);
        res.status(200).json({ expense });
    }catch(error){
        res.status(500).json({ error: error });
    }
}

exports.deleteExpense = async (req, res, next) => {
    try{
        const expenseId = req.params.id;
        if(expenseId=='undefined'){
            console.log('ExpenseId not found');
            res.status(400).json({err: 'Id not found'});
        }
        await Expense.destroy({where : {id:expenseId}});
        res.sendStatus(200);
    }catch(err){
        res.status(500).json({error:err});
    }
}