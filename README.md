# Middleman-Grunt Boilerplate

This boilerplate uses the Middleman static site generator to build static HTML while all asset manipulation and management is handled through Grunt tooling. This provides a nessecary alternative to Middleman's [depricated Rails Asset Pipeline](https://middlemanapp.com/advanced/asset_pipeline/)

## Installation

Requires [Node.js](https://nodejs.org/en/) and [Ruby](https://www.ruby-lang.org/en/documentation/installation/).

Open a console window into the middleman-grunt-boilerplate project root folder. If rubygems bundler is not yet installed (or you are unsure if it is), install bundler gem.

```
gem install bundler
```

Then install middleman gem dependencies.

```
bundle install
```

Install all Grunt dependencies with npm.

```
npm install
```

Now you should be ready to run the project! Run `grunt` to see a list of commands.


## Develop Locally

Run `grunt app-serve` to run the site locally at [localhost:4567](http://localhost:4567). Middleman will build the site under the `/build` folder and serve the site from this directory. The site will be built using a development mode which includes non-minified assets.


## Build Production-ready Site

Run `grunt app-build` to build the site under the `/build` folder. The site will be built using a production mode which includes minified assets. Also appends cache-busting strings to all assets and their references.


