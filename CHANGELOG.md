# Renoir Change Log #

## 2018-03-28

### Changed
- build.sh: removed unnecessary quotes.
- build.sh: changed the order within the ESLint for loop so that only updated files are tested.
- index.js: simplified the syntax of the single-source file.
- package.json: added update script.
- build.sh: removed unused code.
- build.sh: added colours to echo calls.
- build.sh: redesigned build process using Babelify to skip the transpile-to-tmp-dir step.
- build.sh: changed bundler back to Browserify again as the Webpack build broke ES3 support.

## 2018-02-21

### Added
- Re-designed unit tests to fit new array and object modules.
- object.js: added module for Object functions.

## 2018-02-20

### Changed
- build.sh: reverted bundler back to Webpack with library and libraryTarget options set.
- package.json: added module property pointing to the raw ES2015 root.
- utils.js: moved getBlankArray() and getSequentialArray() function into a separate array.js module to keep the utils module dependency-free.
- Renamed bin/ folder to dist/.
- package.json: reverted back to Browserify as Webpack build was failing tests.
- package.json: removed browserify and tape-istanbul and added eslint-loader, babel loader and webpack.
- index.js: renamed main source module (renoir.js) to work with generic build script.
- build.sh: removed several unused variables and simplified script to work with current webpack setup.
- webpack.config.js: added eslint stage.
- .babelrc.js: replaced the Babel config file with a node module to be imported by webpack.

## 2018-02-16

### Changed
- postbuild_tests.js: added new utils functions.
- type_check.js: switched logic of first parameter from checkDisabled to checkEnabled.
- prebuild_tests.js: split the file into separate files and added tests for type-check and utils module.
- package.json: updated number-detect package to the latest 0.2.0 version.

## 2018-02-14

## Changed
- utils.js, type_check.js: fixed import statement for numberDetect library to fit new ES6 syntax of that library.
- utils.js: added getSequentialArray() function.

## 2018-02-13

### Changed
- .npmignore: included src/ folder and removed config files from published package.
- .eslintrc.js: removed all Node references as the library is now all ES6.
- package.json: changed the project target to the raw ES6 source file instead of the compiled ES5 file to allow projects using the library to apply their own build processes.
- utils.js: added getBetween() and getBlankArray() functions.

## 2018-02-09

### Changed
- either.js, renoir.js: converted single object export to individual export statements.

### Added
- utils.js: added separate module for functions used by the other modules.

## 2017-12-03

### Changed
- prebuild_tests.js: added tests for trampoline module.
- postbuild_tests.js: wrapped assert statements in a try-catch block.

## 2017-12-01

### Changed
- either.js: changed isEither property to a function.

### Added
- Completed unit tests for Either module.
- Added number-detect depencency.

## 2017-11-06

### Changed
- build.sh: added check for null first parameter which the "npm run build" script was adding.
- either.js: separate out the logic for converting the Left parameter into an error object into a separate function.
- build.sh: added --force option to override update checking.
- postbuild_tests.js: added a test for the typeCheck() function.

### Added
- type-check.js: added untested module for type-checking eithers.

## 2017-11-05

### Changed
- Re-designed project structure around a new, generic build script.

## 2017-11-04

### Changed
- either.js: replaced original file with ES6 version.

## Added
- Added change log.
