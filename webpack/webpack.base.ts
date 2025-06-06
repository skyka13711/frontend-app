import type { Configuration } from 'webpack'
import { merge } from 'webpack-merge'

import * as path from 'path'
import { realpathSync } from 'fs'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

import loadersConfig from './webpack.loaders.ts'
import { envVars } from './envs.ts'

import webpack from 'webpack'

const { DefinePlugin } = webpack

const appDirectory = realpathSync(process.cwd())

const config: Configuration = merge(loadersConfig, {
  entry: path.join(appDirectory, './src/app/index.tsx'),
  output: {
    path: path.join(appDirectory, envVars.OUTPUT_DIR),
    publicPath: envVars.PUBLIC_PATH,
    filename: 'js/[name].[fullhash].js',
    chunkFilename: 'js/[id].[fullhash].js'
  },
  resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
  plugins: [
    new DefinePlugin({
      'process.env': JSON.stringify(envVars)
    }),
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/app/index.html'
    })
  ]
})

export default config
