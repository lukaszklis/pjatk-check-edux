const path = require('path');
const {
    exec
} = require('child_process');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
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
        rules: [{
            test: /\.ts$/,
            loader: 'awesome-typescript-loader'
        }],
    },
    externals: [
        nodeExternals()
    ],
    plugins: [
        {
            apply: (compiler) => {
                compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
                    exec(
                        './bin/check-edux.js',
                        (err, stdout, stderr) => {
                            if (stdout) process.stdout.write(stdout);
                            if (stderr) process.stderr.write(stderr);
                        }
                    );
                });
            }
        }
    ],
    target: 'node',
    watch: true,
}
