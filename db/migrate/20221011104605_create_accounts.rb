class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.decimal :balance, default: 0, null: false

      t.timestamps
    end
  end
end
