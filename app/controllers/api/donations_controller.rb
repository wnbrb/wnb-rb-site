# frozen_string_literal: true

module Api
  class DonationsController < ApplicationController
    def create
      Stripe.api_key = stripe_key

      session = Stripe::Checkout::Session.create({
        line_items: [{
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Donation',
            },
            unit_amount: price_in_cents,
          },
          quantity: 1,
        }],
        mode: 'payment',
        # required by stripe
        success_url: 'https://wnb-rb.dev',
        cancel_url: 'https://wnb-rb.dev/donate',
      })
      render json: { url: session.url }
    end

    private

    def stripe_key
      ENV.fetch('STRIPE_KEY', nil)
    end

    def price_in_cents
      donation_params[:price].to_i * 100
    end

    def donation_params
      params.require(:donation).permit(:price)
    end
  end
end
