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
    },

    /*
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
  ]*/
};

let clientElectronConfig = extend(true, {}, config, {
    target: "electron",

    entry: {
        entry: "./app/client.js",
        main: "./app/main.js"
    },

    output: {
        path: path.resolve(__dirname, "build/public"),
        publicPath: '',
        filename: '[name].electron.bundle.js'
    },

    node: {
        __dirname: false,
        __filename: false,
    },
});


let clientWebConfig = extend(true, {}, config, {
    target: "web",

    entry: {
        entry: "./app/client.js"
    },

    output: {
        path: path.resolve(__dirname, "build/public"),
        publicPath: '',
        filename: '[name].web.bundle.js'
    },
    
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'web_build': true
            }
        }),
    ],
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

export default [clientWebConfig, clientElectronConfig, serverConfig];
