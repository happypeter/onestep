# encoding: utf-8
require 'spec_helper.rb'

describe "User features" do
  describe "Registration" do
    it "should allow registration" do
      visit root_path

      fill_in "user[name]", :with => 'foobar'
      fill_in "user[email]", :with => 'hi@gmail.com'
      fill_in "user[password]", :with => '123456'

      expect {
        click_button '免费注册'
      }.to change{User.count}.by(1)
    end
  end
end
