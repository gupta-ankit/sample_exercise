module Mutations
  class CreateTransaction < BaseMutation
    argument :account_id, Integer, required: true
    argument :amount, Float, required: true


    field :balance, Float

    def resolve(account_id:,amount:)
      {
        balance: Account.find(account_id).create_transaction(amount)
      }
    end
  end
end
