import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

export function buildPlugins({paths}) {

    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
            favicon: path.resolve(paths.src, 'favicon.ico')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new CopyPlugin({
            patterns: [
                {from: path.resolve(paths.src, 'assets'), to: path.resolve(paths.output, 'assets')},
                {from: path.resolve(paths.src, 'public'), to: path.resolve(paths.output, 'public')}
            ]
        })
    ]

    return plugins;
}