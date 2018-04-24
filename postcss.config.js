module.exports = ({ file, options, env }) => ({
  plugins: {
    'postcss-cssnext': {
      warnForDuplicates: false,
    },
    'cssnano': env === 'production' ? (options.cssnano || {}) : false,
  }
});
