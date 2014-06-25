# encoding: utf-8
# require 'spec_helper.rb'
include Utilities

describe "User Actions" do
  before do
    user = FactoryGirl.create(:user)
    sign_in(user)
  end
  describe "should be able to see /account" do
    before { visit account_path }
    specify { page.should have_content "foo" }
  end
  describe "should not be able to write blog" do
    before {visit '/write_blog'}
    specify {page.should have_content "Only admin can do this"}
  end
end

describe "Admin Actions" do
  before do
    admin = FactoryGirl.create(:admin)
    sign_in(admin)
  end
  describe "should allow admin to write_blog" do
    before { visit '/write_blog' }
    specify { page.should have_content "文章标题" }
  end
end
