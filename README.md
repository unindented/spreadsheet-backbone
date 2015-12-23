# Spreadsheet built with Backbone [![Build Status](https://img.shields.io/travis/unindented/spreadsheet-backbone.svg)](http://travis-ci.org/unindented/spreadsheet-backbone)

Extremely crude spreadsheet app built with Backbone.

Cells can either be a constant value (e.g. *43*), or a formula (e.g. *=SUM(A1,A2,43)*). The only formulas implemented are:

* `SUM`: Sums all arguments. `=SUM(2,3,4) => 9`
* `PROD`: Multiplies all arguments. `=PROD(2,3,4) => 24`
* `CONCAT`: Concatenates all arguments. `=CONCAT(2,3,4) => 234`

If a loop is detected, the affected cells will be flagged with `#LOOP`.


## Installing

Install all dependencies through `npm` and `bower`:

```sh
$ npm install
$ bower install
```


## Running in development mode

In development mode, all dependencies will be loaded at runtime by RequireJS. Run this task:

```sh
$ grunt serve:dev
```

And open <http://localhost:8000/> in your browser.


## Running in production mode

In production mode, only the compiled JavaScript and CSS files will be loaded. Run these tasks:

```sh
$ grunt build serve:prod
```

And open <http://localhost:8000/> in your browser.


## Testing on PhantomJS

Run the following:

```sh
$ grunt test:phantom
```

If you want to rerun tests on file changes, run the following instead:

```sh
$ grunt follow:phantom
```


## Testing on the browser

Run the following:

```sh
$ grunt test:browser
```

And open <http://localhost:8000/> in your browser.

If you want to rerun tests on file changes, run the following instead:

```sh
$ grunt follow:browser
```


## Meta

* Code: `git clone git://github.com/unindented/spreadsheet-backbone.git`
* Home: <https://unindented.github.io/spreadsheet-backbone/>


## Contributors

Daniel Perez Alvarez ([unindented@gmail.com](mailto:unindented@gmail.com))


## License

Copyright (c) 2014 Daniel Perez Alvarez ([unindented.org](https://unindented.org/)). This is free software, and may be redistributed under the terms specified in the LICENSE file.
