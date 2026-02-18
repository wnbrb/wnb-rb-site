# frozen_string_literal: true
class PagesController < ApplicationController
  require 'redcarpet' # Markdown renderer

  # All markdown links to open in a new tab
  class HTMLWithBlankLinks < Redcarpet::Render::HTML
    def link(link, _title, content)
      %(<a href="#{link}" target="_blank" rel="noopener noreferrer">#{content}</a>)
    end
  end

  def show
    page_name = params[:page]
    file_path = Rails.root.join("app/content/#{page_name}.md")

    render plain: 'Page not found', status: :not_found and return unless File.exist?(file_path)

    markdown_text = File.read(file_path)
    renderer = HTMLWithBlankLinks.new(filter_html: true, hard_wrap: true)
    markdown = Redcarpet::Markdown.new(renderer, autolink: true)

    @content = markdown.render(markdown_text).html_safe
    render template: 'pages/markdown_page'
  end
end
