const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Path = require('path')
const { WebpackPluginServe } = require('webpack-plugin-serve')

let BUILD_PATH = Path.resolve('./build')

module.exports = (env) => {
    if (!env)
        env = {}
    
    let plugins = [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ]

    if (env.serve)
        plugins.push(new WebpackPluginServe({
            liveReload: true,
            open: true,
            static: [BUILD_PATH, './static']
        }))

    return {
        plugins: plugins,
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules\/.*/,
                options: {
                    plugins: [
                        '@babel/plugin-syntax-dynamic-import',
                        '@babel/plugin-proposal-class-properties'
                    ],
                    presets: [[
                        '@babel/preset-env',
                        { 
                            targets: { browsers: ['last 2 chrome versions', 'ie >= 11', 'last 2 edge versions'] }
                        }
                    ]]
                }
            }, {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            }],
        },
        entry: {
            'main': ['./src/index.js', 'webpack-plugin-serve/client'],
            //'vendor': [] // Polyfills and such go here
        },
        output: {
            filename: '[name].js',
            path: Path.resolve(BUILD_PATH),
            chunkFilename: '[name].js'
        },
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
            ignored: /node_modules/
        } 
    }
}