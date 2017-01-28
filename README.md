# Play Framework, Webpack 2, TypeScript 2, React with Hot Module Reloading, ...

A [Play](https://www.playframework.com/) seed project with some useful plugins and a state of the art frontend setup based on [Webpack 2](https://webpack.github.io/), [TypeScript 2](https://www.typescriptlang.org/) and [React](https://facebook.github.io/react/).

__Note:__ If you prefer the classic layout of a Play application, check out the first commit of this repository.

## Content:

### Backend:

* [Play Framework](https://www.playframework.com/)
* [scoverage](http://scoverage.org/)
* [scalafmt](https://olafurpg.github.io/scalafmt/)
* [scapegoat](https://github.com/sksamuel/scapegoat)
* [linter](https://github.com/HairyFotr/linter)
* [wartremover](https://github.com/puffnfresh/wartremover)
* [sbt-coursier](https://github.com/alexarchambault/coursier)

### Frontend:

* [Webpack 2](https://webpack.github.io/) with [webpack-dashboard](https://github.com/FormidableLabs/webpack-dashboard)
* [Browsersync](https://browsersync.io/)
* [TypeScript 2](https://www.typescriptlang.org/)
* [React](https://facebook.github.io/react/) (with hot module reloading via [React Hot Loader 3](https://github.com/gaearon/react-hot-loader))
* [Awesome TypeScript Loader 2](https://github.com/s-panferov/awesome-typescript-loader) (which includes caching)
* [TSLint](https://palantir.github.io/tslint/)
* [Jest](https://facebook.github.io/jest/) (includes test coverage)
* [Sass](http://sass-lang.com/)
* [PostCSS](https://github.com/postcss/postcss) ([autoprefixer](https://github.com/postcss/autoprefixer) and [cssnano](http://cssnano.co/) are enabled by default)
* [stylelint](http://stylelint.io/)

## Usage:

```Webpack``` is fully integrated into ```sbt```.

Whenever you run ```Play``` in _development mode_ (via ```run```) it will listen to [http://localhost:9000](http://localhost:9000) and ```webpack-dev-server``` will proxy this at [http://localhost:2992](http://localhost:2992).

[Browsersync](https://browsersync.io/) will proxy ```webpack-dev-server``` at [http://localhost:3000](http://localhost:3000) with its UI being available at [http://localhost:3001](http://localhost:3001) and [http://0.0.0.0:3000](http://0.0.0.0:3000) being the external address.

Whenever you run ```Play``` in _production mode_ (via ```dist```, ```stage``` or ```start```) ```webpack``` will generate optimized builds, which get included automatically (including asset fingerprinting and gzipping).

The plugins [scalafmt](https://olafurpg.github.io/scalafmt/), [linter](https://github.com/HairyFotr/linter) and [wartremover](https://github.com/puffnfresh/wartremover) are integrated into compilation. [scapegoat](https://github.com/sksamuel/scapegoat) must be run manually by running ```scapegoat``` within ```sbt```.

#### Testing:

Tests with [Jest](https://facebook.github.io/jest/) can be run with

```
$ npm test
```

There are also options to generate test coverage or do ongoing testing, whenever some source file changes (similiar to ```~test``` in ```sbt```).

## Know issues:

* The [stylelint](http://stylelint.io/) / [stylefmt](https://github.com/morishitter/stylefmt) integration does not work properly with [Webpack Dev Server](https://webpack.github.io/docs/webpack-dev-server.html).

## Last but not least:

This project has absolutely no claim to be complete or to be the single answer to everything. It merely exists cause I got tired of creating such a setup each time from scratch and because it allows for easy modification - like adding more optimizations to the frontend release builds.

Any pull requests are totally welcome :)
