import {buildWebpack} from "./config/build/buildWebpack.js";
import path from "path";
import {__dirname} from "./dirname.js";

export default (env) => {

    const paths = {
        output: path.resolve(__dirname, 'build'),
        entry: {
            UI: "./src/scripts/UI.js",
            tasks: './src/scripts/tasks.js',
            OOPClasses: './src/scripts/OOPClasses.js',
            moduleOne: './src/scripts/moduleOne.mjs',
            moduleTwo: './src/scripts/moduleTwo.mjs',
        },
        html: path.resolve(__dirname, 'src', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    }

    const config = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'production',
        paths,
    });

    return config;
};