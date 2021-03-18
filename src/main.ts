import { add } from './assets/js/test';
import './assets/font/iconfont.css';
import './assets/css/index.scss';

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