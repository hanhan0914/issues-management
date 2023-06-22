import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
//應用的全域樣式文件
import './index.css';
// 從app.js引入app 引入根組件 是一切組件化渲染的開始，從該組件開始往外擴展
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
