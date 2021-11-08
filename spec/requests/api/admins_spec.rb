require 'rails_helper'

RSpec.describe "Api::Admins", type: :request do
  describe "GET /passwords" do
    it "returns http success" do
      get "/api/admins/passwords"
      expect(response).to have_http_status(:success)
    end
  end

end
