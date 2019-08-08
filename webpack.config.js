

const path=require('path');

const htmlWebpackPlugin=require('html-webpack-plugin');


module.exports={

    mode:'development',

    entry:path.join(__dirname,'./src/index.js'),

    output:{
        path:path.join(__dirname,'./dist'),
        filename:'main.js'
    },
    plugins:[
        new htmlWebpackPlugin({

            template:path.join(__dirname,'./src/index.html'),

            filename:'index.html'
        })
    ],
    module:{
        rules:[
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.(png|jpg|gif|svg|ipeg)$/, use:['url-loader?limit=100&name=[hash:8][name].[ext]']},
            {test:/\.(ttf|woff2|woff|eot)/,use:['url-loader']},
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            {test:/\.vue$/,use:['vue-loader']}
        ]
    },

    resolve:{
        alias:{
            'vue$':'vue/dist/vue.js'
        }
    }


};