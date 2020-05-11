import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: TransactionDTO): Transaction {
    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });
    const findTransactionBalance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && findTransactionBalance.total < value) {
      throw Error('balance is not enough');
    }

    return transaction;
  }
}

export default CreateTransactionService;
