module Queries
  class FetchAccount < Queries::BaseQuery
    type Types::AccountType, null: false

    argument :id, Integer

    def resolve(id:)
      Account.find(id)
    end
  end
end