module.exports = ({ file, options, env }) => ({
  plugins: {
    'postcss-preset-env': options['postcss-preset-env'] ? options['postcss-preset-env'] : false,
    'postcss-cssnext': options['postcss-cssnext'] ? options['postcss-cssnext'] : true,
    'cssnano': env === 'production' ? options.cssnano : false
  }
})