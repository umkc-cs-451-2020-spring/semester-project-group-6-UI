// @flow

import { Transaction } from "../entities/Transaction.js";
import transactions from "../SampleData/Transactions.json";

export default class TransactionService {


    getTransactions=()=>{
        let transArray : Array<Transaction> = [];

        [...transactions].forEach(function(transaction){
            let trans = new Transaction();
            trans.id = transaction.id;
            trans.account = transaction.Account;
            trans.date = transaction.Date;
            trans.type = transaction.Type;
            trans.amount = "$" + transaction.Amount.toFixed(2);
            trans.description = transaction.Description;
            transArray.push(trans);
        })

        return transArray;
    }
}