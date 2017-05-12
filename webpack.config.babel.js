import extend from "extend";
import path from "path";
import webpack from "webpack";
import nodeExternals from "webpack-node-externals";

let config = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"],
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }, {
                    loader: "resolve-url-loader"
                }]
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    devServer: {
        contentBase: './build/public'
    },/*,
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
  ]*/
};

let clientConfig = extend(true, {}, config, {
    target: "web",

    entry: {
        javascript: "./app/client.js"
    },

    output: {
        path: path.resolve(__dirname, "build/public"),
        publicPath: '/public/',
        filename: 'bundle.js'
    },
});

let serverConfig = extend(true, {}, config, {
    target: "node",

    node: {
        __dirname: false,
        __filename: false,
    },

    entry: {
        javascript: "./app/server.js"
    },

    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: '/',
        filename: 'server.js'
    },

    externals: [nodeExternals()],
});

export default [clientConfig, serverConfig];
