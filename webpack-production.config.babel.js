/**
 * Created by Veket on 2016/11/10.
 */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');//生成一个HTML文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');//可以把css从js中抽离出来
const path = require('path');
const buildPath = path.resolve(__dirname,'build');
const nodeModulesPath = path.resolve(__dirname,'node_modules');
const srcDir = path.resolve(process.cwd(),'src');
const libDir = path.resolve(srcDir, 'js/lib');
const glob = require('glob');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const AUTOPREFIXER_BROWSERS = [
    'Explorer >= 9', 'Chrome >= 35', 'Firefox >= 31', 'Opera >= 12', 'Safari >= 7.1', 'Android 2.3', 'iOS >= 7', 'Android >= 4',
];

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
                jquery:`${libDir}/jquery/jquery-1.11.2.min.js`,
                scss:`${srcDir}/scss`,
                img:`${srcDir}/img`,
                fonts:`${srcDir}/fonts`
            },
            extensions:['', '.js', 'jsx', '.css', '.scss', '.ejs', '.png', '.jpg']
        },
        entry:Object.assign(_entries, { vendor: ['react', 'reactDom'] }),
        output:{
            path:buildPath,
            filename:'js/[hash:8].[name].min.js',
        },
        plugins:[
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin(),
            new CommonsChunkPlugin({
                names: ['common', 'vendor'],
                minChunks: 2,
            }),
            new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"'}),
            new ExtractTextPlugin('css/[contenthash:8].[name].min.css'),
            //new webpack.ProvidePlugin({'$': "jquery"}),//jquery插件
            //new OpenBrowserPlugin({url:'http://localhost:3000/'})
        ].concat(htmlPlugins()),

        module:{
            loaders: [
                {
                    test: /\.jsx?$/,
                    loaders: ['react-hot', 'babel'],
                    include: [path.resolve(__dirname, 'src/js')],
                    exclude: [nodeModulesPath],
                },
                {
                    test: /\.css$/, // Only .css files
                    include: [path.resolve(__dirname, 'src/scss')],
                    exclude: [nodeModulesPath],
                    loader: ExtractTextPlugin.extract('style', 'css!postcss?parser=postcss-scss'),
                },
                {
                    test: /\.scss$/,
                    include: [path.resolve(__dirname, 'src/scss')],
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
        postcss: (bundler) => [
            require('postcss-import')({ addDependencyTo: bundler }),
            require('postcss-nested')(),
            require('postcss-cssnext')({ autoprefixer: AUTOPREFIXER_BROWSERS }),
        ],
    };

    return config;

})();







