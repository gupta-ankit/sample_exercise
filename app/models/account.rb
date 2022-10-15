class Account < ApplicationRecord

  has_many :transactions

  def create_transaction(amount)
    with_lock do
      update(balance: balance + amount)
      transactions.create(amount: amount, date: DateTime.now)
    end
  end
end
