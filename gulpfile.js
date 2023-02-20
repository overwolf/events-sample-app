/* eslint-disable @typescript-eslint/no-var-requires */
const { src, dest, series } = require('gulp');
const webpack = require('webpack');
const webpackConfigProd = require('./webpack.config.js');
const bump = require('gulp-bump');

function clean() {
  const del = require('del');
  return del(['dist/**/*', 'output/**/*']);
}

// -----------------------------------------------------------------------------
async function runWebpack() {
  return new Promise((resolve, reject) => {
    webpack(webpackConfigProd, (err, stats) => {
      if (err) {
        return reject(err);
      }

      if (stats.hasErrors()) {
        return reject(new Error(stats.compilation.errors.join('\n')));
      }

      resolve();
    });
  });
}

function bumpVersion() {
  let bumpType = 'minor';
  for (let i = 0; i < process.argv.length; ++i) {
    const arg = process.argv[i];
    if (arg.substring(0, '-bump:'.length) === '-bump:') {
      bumpType = arg.substring('-bump:'.length);

      // Looks like node, sometimes, breaks -bump:patch into separate arguments.
      // This will handle such a situation.
      if (
        !bumpType ||
        (bumpType.length === 0 && process.argv.length >= i + 1)
      ) {
        bumpType = process.argv[i + 1];
      }
    }
  }

  return src('./package.json')
    .pipe(bump({ type: bumpType }))
    .pipe(dest('./'));
}

function copyFilesToOutput() {
  return src(['./dist/**', './libs/**', './index.html', './manifest.json'], {
    base: './',
  }).pipe(dest('./output'));
}

const buildProd = series(runWebpack, copyFilesToOutput);

exports.clean = clean;
exports.runWebpack = runWebpack;
exports.bump = bumpVersion;
exports.buildProd = buildProd;

exports.build = series(clean, buildProd);
