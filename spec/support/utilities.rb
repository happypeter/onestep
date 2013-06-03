def sign_in(user)
  visit login_path
  fill_in "Name",    with: user.name
  fill_in "Password", with: user.password
  click_button "Log In"
end
