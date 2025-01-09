import {buildDevServer} from "./buildDevServer.js";
import {buildLoaders} from "./buildLoaders.js";
import {buildPlugins} from "./buildPlugins.js";
import {buildResolver} from "./buildResolver.js";

export function buildWebpack(options) {
    const {mode, paths} = options;
    const isDev = mode === 'development';

    return {
        mode: mode ?? 'production',
        entry: paths.entry,
        output: {
            path: paths.output,
            filename: '[name].[contenthash].bundle.js',
            clean: true,
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolver(options),
        devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
        devServer: isDev ? buildDevServer(options)  : undefined,
    }
}