const path = require("path");
const htmlWebpacPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        index: path.resolve(__dirname, "src/index.js"),
        feed: path.resolve(__dirname, "src/feed.js"),
        profile: path.resolve(__dirname, "src/profile.js")
    },
    output: {
        path: path.resolve(__dirname, "../public"),
        filename: "scripts/[name].js"
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "../public")
        },
        host: "0.0.0.0",
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
        proxy: {
            // "/api": "http://localhost:5000",
            "/api": "http://172.17.0.2:5000"
        }
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /[\.(jpg|png)]&/,
                use:[
                    {
                        loader: "file-loader",
                        options: {
                            name: `${new Date().toISOString}-[name].[ext]`,
                            outputPath: "img/",
                            publicPath: "img/"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [].concat(
        ["index", "feed", "profile"].map((file) => 
            new htmlWebpacPlugin({
                inject: true,
                filename: `${file}.html`,
                template: `./src/${file}.html`,
                chunks: [file]
            })
        )
    )
}
