module.exports = {
  compile: {
    options: {
      baseUrl: '.',
      include: ['src/main.js'],
      insertRequire: ['src/main.js'],

      name: 'vendor/almond/almond.js',
      mainConfigFile: 'src/main.js',

      out: 'build/main.js',
      separateCss: true,

      optimize: 'uglify2',
      optimizeCss: 'cleancss',

      generateSourceMaps: false,
      preserveLicenseComments: false
    }
  }
};
