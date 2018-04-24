const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

/**
 * .env reading
 */
let dotenvEnvirnomentConfig;
const dotenvSampleConfig = { path: '.env' };

switch (process.env.NODE_ENV) {
  case 'production': dotenvEnvirnomentConfig = { path: '.env.prod' }; break;

  default:
  case 'development': dotenvEnvirnomentConfig = { path: '.env.dev' };
    break;
}

dotenv.config(dotenvEnvirnomentConfig);
dotenv.config(dotenvSampleConfig);

const extractSass = new ExtractTextPlugin({
  filename: 'css/[name].[contenthash].css',
  disable: !production
});

// Common sharable dependencies between apps
const vendorModules = [
  'tslib',

  'react',
  'react-dom',
  'prop-types',

  'react-router',
  'react-router-dom',
  'react-transition-group',
  'history',

  'reactstrap',

  'redux',
  'react-redux',

  'immutable'
];

const asssetsFileLoaderQueryOptions = {
  hash: 'sha512',
  digest: 'hex',
  context: path.resolve(__dirname, 'src'),
  name: 'assets/[name].[hash].[ext]',
  publicPath: '/'
};

const fontsUrlLoaderQueryOptions = {
  limit: 10000,
  hash: 'sha512',
  digest: 'hex',
  context: path.resolve(__dirname, 'src'),
  name: 'fonts/[name].[hash].[ext]',
  publicPath: '/'
};

module.exports = {
  devtool: 'source-map',

  entry: {
    'common.css': './src/common/common.sass',
    'vendor': [...vendorModules],
    pub: './src/apps/pub/pub.tsx',
    app: './src/apps/app/app.tsx',
    libphonenumber: './node_modules/react-intl-tel-input/dist/libphonenumber.js'
  },

  output: {
    path: path.resolve(__dirname, 'www'),
    publicPath: '/',
    filename: 'js/[name].[hash].bundle.js',
    chunkFilename: 'js/[id].[chunkhash].chunk.js'
  },

  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /^\/app*/, to: '/app.html' },

        { from: /^\/forgot-password*/, to: '/pub.html' },
        { from: /^\/reset-password*/, to: '/pub.html' },
        { from: /^\/registration*/, to: '/pub.html' },
        { from: /^\/complete-registratio*/, to: '/pub.html' },
        { from: /^\/login*/, to: '/pub.html' }
      ]
    },
    compress: false,
    inline: true,
    host: process.env.DEV_SERVER_HOST || '0.0.0.0',
    port: process.env.DEV_SERVER_PORT || 3000,
    watchOptions: {
      aggregateTimeout: 1000,
      ignored: /node_modules/
    }
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.sass', '.scss', '.ttf', '.png', '.svg', '.jpg', '.jpeg'],
    alias: {
      '@common': path.resolve(__dirname, 'src/common'),
      '@app': path.resolve(__dirname, 'src/apps/app'),
      '@pub': path.resolve(__dirname, 'src/apps/pub'),
      '@login': path.resolve(__dirname, 'src/apps/login'),
      '@registration': path.resolve(__dirname, 'src/apps/registration'),
      '@complete-registration': path.resolve(__dirname, 'src/apps/complete-registration'),
      '@password-reset': path.resolve(__dirname, 'src/apps/password-reset'),
      '@email-confirmation': path.resolve(__dirname, 'src/apps/email-confirmation'),
      '@forgot-password': path.resolve(__dirname, 'src/apps/forgot-password'),
      '@reset-password': path.resolve(__dirname, 'src/apps/reset-password')
    }
  },

  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/i,
        loader: 'file-loader',
        query: {
          ...asssetsFileLoaderQueryOptions
        }
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          ...fontsUrlLoaderQueryOptions,
          mimetype: 'appication/font-woff'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          ...fontsUrlLoaderQueryOptions,
          mimetype: 'appication/font-woff'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          ...fontsUrlLoaderQueryOptions
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          ...fontsUrlLoaderQueryOptions,
          mimetype: 'image/svg+xml'
        }
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: production,
            importLoaders: 1
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: production
          }
        }]
      },
      {
        test: /\.s[ca]ss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
              root: path.resolve(__dirname, 'src')
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: ['node_modules', './src']
            }
          }],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(t|j)sx?$/,
        loader: 'ts-loader',
        include: path.resolve(__dirname, 'src')
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },

  plugins: (
    production ? [
      new CleanWebpackPlugin(
        ['.tmp/**/*', 'www/**/*'], { verbose: true }
      ),

      new UglifyJsPlugin({
        parallel: true,
        sourceMap: true,
        cache: true
      })
    ] : []
  ).concat([
    new webpack.EnvironmentPlugin(
      Object.keys(process.env)
        .filter(key => key.toLocaleUpperCase() === key)
    ),

    new FaviconsWebpackPlugin({
      logo: './src/common/assets/favicons/favicon.png',
      prefix: 'assets/favicons-[hash]/',
      title: 'Axmit React/TypeScript Demo'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity
    }),

    extractSass,

    // app-* SPA from src/apps/app
    new HtmlWebpackPlugin({
      title: 'Axmit React/TypeScript Demo',
      template: './src/common/layout.html',
      chunks: ['vendor', 'common.css', 'app'],
      chunksSortMode: 'manual',
      minChunks: Infinity,
      filename: 'app.html',
      baseHref: '/'
    }),

    // pub-* SPA subapps from src/apps/pub
    new HtmlWebpackPlugin({
      title: 'Axmit React/TypeScript Demo',
      template: './src/common/layout.html',
      chunks: ['vendor', 'common.css', 'pub'],
      chunksSortMode: 'manual',
      minChunks: Infinity,
      filename: 'pub.html',
      baseHref: '/'
    })
  ])
};
