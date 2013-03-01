require 'spec_helper'

describe "root page is here" do
  it "root can be found" do
    # Run the generator again with the --webrat flag if you want to use webrat methods/matchers
    get root_url
    response.status.should be(200)
  end
end
