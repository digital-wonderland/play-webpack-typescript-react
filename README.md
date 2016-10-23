# Play Framework, Webpack 2, TypeScript 2, React with Hot Module Reloading, ...

A [Play](https://www.playframework.com/) seed project with some useful plugins and a state of the art frontend setup based on [Webpack 2](https://webpack.github.io/), [React](https://facebook.github.io/react/) and [TypeScript 2](https://www.typescriptlang.org/).

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

* [Webpack 2](https://webpack.github.io/)
* [TypeScript 2](https://www.typescriptlang.org/)
* [React](https://facebook.github.io/react/) (with hot module reloading via [React Hot Loader 3](https://github.com/gaearon/react-hot-loader))
* [Awesome TypeScript Loader 2](https://github.com/s-panferov/awesome-typescript-loader) (which includes caching)
* [TSLint](https://palantir.github.io/tslint/)
* [Jest](https://facebook.github.io/jest/) (includes test coverage)
* [Sass](http://sass-lang.com/)
* [PostCSS](https://github.com/postcss/postcss) ([autoprefixer](https://github.com/postcss/autoprefixer) and [cssnano](http://cssnano.co/) are enabled by default)
* [stylelint](http://stylelint.io/)

## Usage:

__Note:__ Since the build process is split between [sbt](http://www.scala-sbt.org/) and [Webpack](https://webpack.github.io/), you must always run one process for the backend and one for the frontend.

### Backend:

It is a standard [Play Framework](https://www.playframework.com/) setup. Simply run

```
$ sbt
```

to start ```sbt``` and then

```
> run
```

to start the [Play Framework](https://www.playframework.com/) application which will listen to [http://localhost:9000/](http://localhost:9000/).

To create a release you first want to build a frontend release (see bellow), to generate any _CSS_ and _Javascript_, and then follow your normal procedure for [Play Framework](https://www.playframework.com/) applications.

Regarding the plugins: [scalafmt](https://olafurpg.github.io/scalafmt/), [linter](https://github.com/HairyFotr/linter) and [wartremover](https://github.com/puffnfresh/wartremover) are integrated into compilation. [scapegoat](https://github.com/sksamuel/scapegoat) must be run manually by running ```scapegoat``` within ```sbt```.

### Frontend:

#### Installation of any dependencies:

First you have to install all dependencies either by running

```
$ npm install
```

or

```
$ yarn install
```

(the later is preferred since it uses [yarn](https://yarnpkg.com/) which is faster and caches dependencies - similiar to Mavens or sbts cache - locally).

This only needs to be done once at the beginning or whenever you change anything within ```package.json```.

#### Development:

For normal development run

```
$ npm start
```

which will start a [Webpack Dev Server](https://webpack.github.io/docs/webpack-dev-server.html) listening to [http://localhost:2992/](http://localhost:2992/) and working as a proxy for your [Play](https://www.playframework.com/) application running at [http://localhost:9000/](http://localhost:9000/) which also handles hot module reloading for [React](https://facebook.github.io/react/) applications.

Now you should have a working application when visiting [http://localhost:2992/](http://localhost:2992/).

#### Building a release:

Run

```
$ npm run build
```

to actually generate the _CSS_ and _Javascript_ files with applied optimizations. They will get put into the proper place, so they get picked up when you then build a [Play Framework](https://www.playframework.com/) release via [sbt](http://www.scala-sbt.org/).

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
