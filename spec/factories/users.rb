FactoryGirl.define do
  factory :user do
    sequence(:name) { |n| "foo#{n}" }
    password "foobar"
    email { "#{name}@example.com" }
    admin false
  end
end
