export function buildDevServer({port}) {
    return {
        port: port ?? 3000,
        open: true,
        historyApiFallback: true,
        hot: true,
    }
}