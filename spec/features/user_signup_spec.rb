# encoding: utf-8
require 'spec_helper.rb'

describe "User features" do
  before do
    visit root_path
  end
  describe "Registration" do

    it "should allow registration" do
      # this will fail if you aleady have foobar in test db

      fill_in "user[name]", :with => 'foobar'
      fill_in "user[email]", :with => 'hi@gmail.com'
      fill_in "user[password]", :with => '123456'

      expect {
        click_button '免费注册'
      }.to change{User.count}.by(1)
    end
    it "should display error msg when register with reserved words" do

      fill_in "user[name]", :with => 'about'
      fill_in "user[email]", :with => 'hi@gmail.com'
      fill_in "user[password]", :with => '123456'
      click_button '免费注册'
      page.should have_content "Reserved Word!"
    end
    it "should display error msg when user exists" do

      user = create(:user, :name => "happypeter")
      fill_in "user[name]", :with => 'happypeter'
      fill_in "user[email]", :with => 'hi@gmail.com'
      fill_in "user[password]", :with => '123456'
      click_button '免费注册'
      page.should have_content "Name Taken!"
    end
    it "should display error msg when some fields not fill_in" do

      fill_in "user[name]", :with => 'happypeter'
      fill_in "user[email]", :with => ''
      fill_in "user[password]", :with => '123456'
      click_button '免费注册'
      page.should have_content "Fields can not be blank!"
    end
  end
end

describe "users#index page" do
  it "should show member list" do
    visit '/member'
    page.should have_content '姓名'
  end
end


