module Api
  module V1
    class ContactsController < ApplicationController
      # POST /api/v1/contacts
      def create
        unless ContactMailer.configured?
          return render_error(:unavailable, "現在お問い合わせは受け付けていません", status: :service_unavailable)
        end

        contact = Contact.new(contact_params)
        if contact.valid?
          ContactMailer.with(contact: contact.to_h).notify.deliver_later
          head :accepted
        else
          render_error(:invalid, "入力内容に誤りがあります", status: :unprocessable_content, details: contact.errors.to_hash)
        end
      end

      private

      def contact_params
        params.expect(contact: %i[name email subject message website])
      end
    end
  end
end
