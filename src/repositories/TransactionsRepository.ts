import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balanceFinal = this.transactions.reduce((accumulator, current) => {
      if (current.type === 'income') {
        accumulator.income += current.value;
      } else if (current.type === 'outcome') {
        accumulator.outcome += current.value;
      }
      accumulator.total = accumulator.income - accumulator.outcome;
      return accumulator;
    }, balance);
    return balanceFinal;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      type,
      value,
    });

    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
