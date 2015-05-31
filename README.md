# Fiddle

A simple repository that integrates [Browserify](http://browserify.org), [React](https://facebook.github.io/react/) and [Gulp](http://gulpjs.com/).

Easily fiddle with npm modules on the client-side.

## Usage

- `gulp dev` starts a static web server that servers `index.html`

- Changes to `main.js` are automatically detected and `build/all.js` updated.

- Changes to `stylesheets/main.less` are automatically detected and `build/all.css` updated.

## Stylesheets

The `gulp stylesheets` task compiles `less` stylesheets and concaternates them together.

## Javascript

The `gulp javascript` task parses `main.js` and bundles it using `Browserify` into `build/all.js`.

React's `JSX` is also transformed into javascript.