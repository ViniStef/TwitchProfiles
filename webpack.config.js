export const plugins = [
    new webpack.DefinePlugin({
        'process.env.CLIENT_SECRET': JSON.stringify(process.env.CLIENT_SECRET),
        'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
    })
];