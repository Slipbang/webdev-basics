import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {buildBabelLoader} from "./babel/buildBabelLoader.js";

export function buildLoaders(options) {
    const cssLoader = {
        test: /\.css$/i,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
        ],
        exclude: /node_modules/,
    }

    const babelLoader = buildBabelLoader(options)

    const assetLoader = {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        exclude: /node_modules/,
    }

    return [
        assetLoader,
        cssLoader,
        babelLoader
    ];
}