###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

activate :i18n, :path => "/:locale",
  :lang_map => { :'en-US' => :'en-us', :'pt-BR' => :'pt-br' },
  :mount_at_root => false

# Pretty urls
activate :directory_indexes


# Use grunt to do all of our autoprefixing, minification, and concatination of assets
ignore 'assets/stylesheets/**'
ignore 'assets/javascripts/**'

set :js_dir, 'assets/javascripts'
set :css_dir, 'assets/stylesheets'
set :images_dir, 'assets/images'

###
# Helpers
###

# Methods defined in the helpers block are available in templates
helpers do

  # customized stylesheet link and javascript include helpers since we are using grunt for assets

  def stylesheet_link_tag(*sources)
    options = sources.extract_options!.symbolize_keys
    options.reverse_merge!(:media => 'screen', :rel => 'stylesheet', :type => 'text/css')
    version = config[:env] == 'production' ? '.min' : ''
    sources.flatten.map { |source|
      source = source.to_s + version
      tag(:link, options.reverse_merge(:href => asset_path(:css, source)))
    }.join("\n").html_safe
  end

  def javascript_include_tag(*sources)
    options = sources.extract_options!.symbolize_keys
    options.reverse_merge!(:type => 'text/javascript')
    version = config[:env] == 'production' ? '.min' : ''
    sources.flatten.map { |source|
      source = source.to_s + version
      content_tag(:script, nil, options.reverse_merge(:src => asset_path(:js, source)))
    }.join("\n").html_safe
  end

end

# Build-specific configuration
configure :build do

  config[:env] = ENV['gruntenv']

  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript
end
