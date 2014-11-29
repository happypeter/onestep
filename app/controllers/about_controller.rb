class AboutController < ApplicationController
  def main
  end

  def team
    @happypeter = User.find_by_name('happypeter')
    @luckyyang = User.find_by_name('luckyyang')
    @billie66 = User.find_by_name('billie66')
  end

  def jobs
  end

  def faq
  end
end
