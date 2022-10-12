require 'rails_helper'

RSpec.describe Account, type: :model do
  describe "#create_transaction" do
    it 'updates the balance' do
      account = create(:account)
      expect{ account.create_transaction(1.33) }.to change(Transaction, :count).by(1)
      expect(account.balance).to eq(BigDecimal('1.33',2))
    end
  end

  describe "#balance" do
    it 'has 0 as the default balance' do
      account = create(:account)
      expect(account.balance).to eq(0)
    end
  end
end
