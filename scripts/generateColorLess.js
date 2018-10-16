#!/usr/bin/env node
const path = require('path');
const { generateTheme } = require('antd-theme-generator');

const options = {
  stylesDir: path.join(__dirname, '../site/theme/static'),
  antdStylesDir: path.join(__dirname, '../components'),
  varFile: path.join(__dirname, '../components/style/themes/default.less'),
  mainLessFile: path.join(__dirname, '../site/theme/static/index.less'),
  themeVariables: [
    '@primary-color',
    '@success-color',
    '@warning-color',
    '@shadow-color',

    '@border-color-base',
    
    '@background-color-light',
    '@heading-color',         // 标题色
    '@text-color',            // 正文色
    '@text-color-secondary',  // 次正文色
    '@table-selected-row-bg',
    '@border-color-split',
    '@modal-mask-bg',
    '@input-placeholder-color',


    // 只支持定制颜色，不支持定制其他样式
    // '@font-size-base',
    // '@font-size-sm',
  ],
  outputFilePath: path.join(__dirname, '../_site/color.less'),
};

generateTheme(options);
