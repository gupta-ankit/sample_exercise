module Mutations
  class CreateTransaction < BaseMutation
    argument :account_id, Integer, required: true
    argument :amount, Float, required: true


    field :amount, Float
    field :date, GraphQL::Types::ISO8601DateTime,

    def resolve(account_id:,amount:)
      txn = Account.find(account_id).create_transaction(amount)
      {
        amount: txn.amount,
        date: txn.date 
      }
    end
  end
end
