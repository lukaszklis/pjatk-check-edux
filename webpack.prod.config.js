const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production',
    context: __dirname,
    entry: './src/check-edux.ts',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'check-edux.js',
    },
    resolve: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src'),
        ],
        extensions: [
            '.js',
            '.ts',
        ],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            }
        ],
    },
    externals: [
        nodeExternals()
    ],
    target: 'node',
}
