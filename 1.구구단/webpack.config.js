const path = require('path');
const refreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'gugudan-setting',
    mode: 'development', // 실서비스: production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        app: ['./client'],
    },
    module: {
        rules: [{
            test: /\.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: [
                    // 자동으로 구형 브라우저들을 위한 호환성을 추가해준다.
                    ['@babel/preset-env', {
                        targets: {
                            // 한국에서 점유율이 5 퍼센트 이상인 브라우저들을 지원한다.
                            browsers: ['> 5% in KR', 'last 2 chrome versions'],
                        }
                    }],
                    '@babel/preset-react',
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            }
        }],
    },
    plugins: [
        new refreshWebpackPlugin(),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
    },
    devServer: {
        devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },
        hot: true
    }
};