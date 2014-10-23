# encoding: utf-8
include Utilities

describe "User features" do
  before do
    visit root_path
  end
  describe "Registration" do

    it "should allow registration" do
      # this will fail if you aleady have foobar in test db
      expect {
        signup_with_attributes
      }.to change{User.count}.by(1)
    end

    it "should display error msg when register with invalid name" do
      signup_with_attributes(name: "about")
      expect(page).to have_content I18n.t('is_reserved_word')
      visit root_path
      signup_with_attributes(name: "happy peter")
      expect(page).to have_content "用户名不能包含横线, 斜线, 句点或空格"
      visit root_path
      signup_with_attributes(name: "happy-peter")
      expect(page).to have_content "用户名不能包含横线, 斜线, 句点或空格"
      visit root_path
      signup_with_attributes(name: "happy.peter")
      expect(page).to have_content "用户名不能包含横线, 斜线, 句点或空格"
      visit root_path
      signup_with_attributes(name: "happy\\peter")
      expect(page).to have_content "用户名不能包含横线, 斜线, 句点或空格"
      visit root_path
      signup_with_attributes(name: "happy/peter")
      expect(page).to have_content "用户名不能包含横线, 斜线, 句点或空格"                  
    end

    it "should display error msg when register with invalid email" do
      signup_with_attributes(email: "1@1.c")
      expect(page).to have_content "Email是无效的"
      visit root_path
      signup_with_attributes(email: "1@@1.com")
      expect(page).to have_content "Email是无效的"
      visit root_path
      signup_with_attributes(email: "11.com")
      expect(page).to have_content "Email是无效的"
      visit root_path
      signup_with_attributes(email: "1@1com")
      expect(page).to have_content "Email是无效的"
      visit root_path
      signup_with_attributes(email: "1@1. com")
      expect(page).to have_content "Email是无效的"
      visit root_path
      signup_with_attributes(email: "1 @1.com")
      expect(page).to have_content "Email是无效的"
      visit root_path
      signup_with_attributes(email: "1@ 1.com")
      expect(page).to have_content "Email是无效的"                                              
    end    

    it "should display error msg when user name exists" do
      create(:user, :name => "happypeter")
      signup_with_attributes(name: "happypeter")
      expect(page).to have_content "用户名已被占用，请重新选择"
    end

    it "should display error msg when user name which case insensitive exists" do
      create(:user, :name => "happypeter")
      signup_with_attributes(name: "Happypeter")
      expect(page).to have_content "用户名已被占用，请重新选择"
    end

    it "should display error msg when emial exists" do
      create(:user, :email => "happypeter@gmail.com")
      signup_with_attributes(email: "happypeter@gmail.com")
      expect(page).to have_content "Email已经注册了一个用户，请重新选择"
    end    

    it "should display error msg when emial which case insensitive exists" do
      create(:user, :email => "happypeter@gmail.com")
      signup_with_attributes(email: "Happypeter@gmail.com")
      expect(page).to have_content "Email已经注册了一个用户，请重新选择"
    end    

    it "should display error msg when some fields not fill_in" do
      signup_with_attributes(name: "")
      expect(page).to have_content "用户名不能为空，请填写完整的信息"
      visit root_path      
      signup_with_attributes(email: "")
      expect(page).to have_content "Email不能为空，请填写完整的信息"
      visit root_path
      signup_with_attributes(password: "")
      expect(page).to have_content "密码不能为空，请填写完整的信息"      
    end
  end
end

describe "users#index page" do
  it "should show member list" do
    visit '/members'
    expect(page).to have_content I18n.t 'member_count'
  end
end


