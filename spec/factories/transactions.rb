FactoryBot.define do
  factory :transaction do
    account { nil }
    amount { "9.99" }
    date { "2022-10-11" }
  end
end
