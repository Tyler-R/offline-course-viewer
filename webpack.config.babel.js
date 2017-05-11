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
            }
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
