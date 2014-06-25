# encoding: utf-8

FactoryGirl.define do
  factory :user do
    sequence(:name) { |n| "foo#{n}" }
    password "foobar"
    email { "#{name}@example.com" }
    admin false
    factory :admin do
      admin true
    end
  end
end
