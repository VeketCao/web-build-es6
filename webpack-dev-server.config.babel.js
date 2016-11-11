/**
 * Created by Veket on 2016/11/9.
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//生成一个HTML文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');//可以把css从js中抽离出来
const path = require('path');
const buildPath = path.resolve(__dirname,'dist');
const nodeModulesPath = path.resolve(__dirname,'node_modules');
const srcDir = path.resolve(process.cwd(),'src');
const libDir = path.resolve(srcDir, 'js/lib');
const glob = require('glob');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

/**考虑多页面应用，多个入口文件**/
const _entries = {};
const fileNames=[];
const jsDir = path.resolve(srcDir,'js/entry');
const entryFiles = glob.sync(`${jsDir}/*.{js,jsx}`);
entryFiles.forEach((filePath) => {
    const filename = filePath.substring(filePath.lastIndexOf('/')+1,filePath.lastIndexOf('.'));
    _entries[filename] = filePath;
    fileNames.push(filename);
});

module.exports = (() => {

    const htmlPlugins = () => {
        const entryHtml = glob.sync(`${srcDir}/html/*.html`);
        const rtn = [];
        entryHtml.forEach((filePath) => {
            const filename = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'));
            const cfg = {
                template:`${filePath}`,
                filename:`${filename}.html`,
                chunksSortMode:'dependency'
            };
            if(filename in _entries){
                cfg.inject = 'body';
                cfg.chunks = ['vendor','common',filename];
            }
            rtn.push(new HtmlWebpackPlugin(cfg));
        });
        return rtn;
    };

    const config = {
        resolve:{
            alias:{
                react: `${nodeModulesPath}/react`,
                reactDom: `${nodeModulesPath}/react-dom`,
                img:`${srcDir}/img`,
                fonts:`${srcDir}/fonts`
            },
            extensions:['', '.js', 'jsx', '.css', '.scss', '.ejs', '.png', '.jpg']
        },
        entry:Object.assign(_entries, { vendor: ['react', 'reactDom',] }),
        output:{
            path:buildPath,
            filename:'[name].js',
        },
        devtool: 'eval',
        devServer:{
            devtool:'eval',
            hot:true,
            inline:true,
            publicPath:'',
            port:3000,
            host:'localhost',
            stats:{cached:false,colors:true}
        },
        plugins:[
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new CommonsChunkPlugin({
                names: ['common', 'vendor'],
                minChunks: 2,
            }),
            new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"development"'}),
            new ExtractTextPlugin('[name].css'),
            //new webpack.ProvidePlugin({'$': "jquery"}),//jquery插件
            new OpenBrowserPlugin({url:'http://localhost:3000/index.html'})
        ].concat(htmlPlugins()),

        module:{
            loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: ['react-hot', 'babel'],
                    exclude: [nodeModulesPath],
                },
                {
                    test: /\.css$/,
                    exclude: [nodeModulesPath],
                    loader: ExtractTextPlugin.extract('style', 'css!postcss?parser=postcss-scss'),
                },
                {
                    test: /\.scss$/,
                    exclude: [nodeModulesPath],
                    loader: ExtractTextPlugin.extract('style', '!css!sass!postcss?parser=postcss-scss'),
                },
                // loader png or jpg or git and svg files 然后压缩之，并把小于10kb的图片base64格式内联到css文件中。
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    loaders: [
                        'image-webpack?{progressive:true, optimizationLevel: 4, ' +
                        'interlaced: false, pngquant:{quality: "65-90", speed: 4}}', // 压缩图片
                        'url?limit=10000&name=img/[hash:8].[name].[ext]', // 小于10kb的图片base64格式内联到css文件中。
                    ],
                },

            ]
        },

        // postcss 插件
        postcss: () => [
            require('precss'),
            require('autoprefixer'),
            require('postcss-color-gray'),
            require('postcss-css-variables'),
            require('postcss-custom-media'),
        ],
    };

    return config;
})();