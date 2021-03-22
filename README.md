# webpack5-babel
webpack5 使用babel和core-js实现polyfill


# webpack5 使用babel

## 1.克隆一份[webpack5创建前端代码](https://github.com/fssqLove/webpack5-webExp)

## 2.安装babel 和 ts 包
```
npm install --save-dev typescript @babel/core @babel/cli @babel/plugin-proposal-class-properties @babel/preset-env @babel/preset-typescript
```

## 3.创建一个新的ts配置文件 `tsconfig.json`
```js
tsc --init --declaration --allowSyntheticDefaultImports --target esnext --outDir lib
```

## 4.创建babel配置文件 `.babelrc`
```js
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "67",
                    "safari": "11.1",
                    "ie": "8"
                }
            }
        ],
        "@babel/preset-typescript"
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties"
    ]
}
```

## 5.去掉`webpack.common.js`的js处理
```js
      // {
      //   test: /\.tsx?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
```

## 6.增加调试环境对ts的处理 `webpack.dev.js`
```js
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
```

## 7.增加生产环境对ts的处理 `webpack.prod.js`
```js
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
```

## 8.修改`main.ts`,增加一些es6的写法
```
// Promise调用
add(1, 2)
  .then((res) => {
    console.log(res, 'add');
  });

  const defaults = {
    fontSize: '10px',
  }

// 扩展运算符
  const styles = {
    ...defaults,
    color: "#f5da55",
  };

  console.log(styles);
  
// 模板字符串
  const textDom = document.querySelector("#text");
  textDom?.setAttribute('style',`color:${styles.color}; font-size:${styles.fontSize}`);
```
+ 此时在google浏览器调试环境和生产环境都可以正常打印和展示；
+ 在ie中，测试环境，生产环境都会报错，生产环境错误提示为:![Promise未定义](https://upload-images.jianshu.io/upload_images/25820166-c665bf86b7a46f72.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

***

# 使用`core-js`实现全部 polyfill
## 9. 安装core-js
`npm i core-js -D`

## 10.修改`.babelrc` 引入 `core-js`
```
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": {
                    //core-js的版本
                    "version": 3
                },
                "targets": {
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "67",
                    "safari": "11.1",
                    "ie": "8"
                }
            }
        ],
        "@babel/preset-typescript"
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties"
    ]
}
```
+ 此时在ie中生产环境能正常打印，有些样式显示不对不在本次处理;
+ 调试环境没有使用babel,所以会报![语法错误](https://upload-images.jianshu.io/upload_images/25820166-4afdc938e4e74527.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

[源码](https://github.com/fssqLove/webpack5-babel)

