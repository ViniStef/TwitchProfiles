export const plugins = [
    new webpack.DefinePlugin({
        'process.env.AUTH_TOKEN': JSON.stringify(process.env.AUTH_TOKEN),
        'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
    })
];