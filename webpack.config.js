import path from 'path';
import process from 'process';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import FaviconsWebpackPlugin from "favicons-webpack-plugin";

export default {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: 'index_[contenthash].js',
        path: path.resolve(process.cwd(), 'dist'),
        assetModuleFilename: './assets/images/[name]_[hash][ext]',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    plugins: [
        new FaviconsWebpackPlugin({
            logo: './src/assets/favicon/favicon.png',
            favicons: {
                icons: {
                    appleIcon: false,
                    appleStartup: false,
                    android: false,
                    coast: false,
                    windows: false,
                    yandex: false,
                    firefox: false,
                }
            },

        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new MiniCssExtractPlugin({ filename: 'build.css' }),
    ],
    module: {
        rules: [
            {
                test: /\.scss/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.css/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|webp)$/i,
                type: 'asset/resource',

            },
            {
                test: /\.svg$/i,
                type: 'asset'
            },

        ],
    },
    optimization: {
        minimizer: [
            "...",
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["mozjpeg", { quality: 60 }],
                            ["optipng", { optimizationLevel: 5 }],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            [
                                "svgo",
                                {
                                    plugins: [
                                        {
                                            name: "preset-default",
                                            params: {
                                                overrides: {
                                                    removeViewBox: false,
                                                    addAttributesToSVGElement: {
                                                        params: {
                                                            attributes: [
                                                                { xmlns: "http://www.w3.org/2000/svg" },
                                                            ],
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
        ],
    },
};

