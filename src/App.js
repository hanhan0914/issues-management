import React, { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './component/Navbar/navbar';
import Login from './component/login/login';
import List from './component/list/list';
import Detail from './component/detail/detail';
import Callback from './component/token/callback';
import 'doodle.css/doodle.css';
// import Navbar from './component/Navbar/navbar'

function App() {
  // // status引入

  // const githubLogin=()=>{
  //   const code =
  //     window.location.href.match(/\?code=(.*)/) &&
  //     window.location.href.match(/\?code=(.*)/)[1];
  //   console.log(code);

  //   if (code) {
  //     this.setState({ status: STATUS.LOADING });
  //     fetch(`https://gitstar.herokuapp.com/authenticate/${code}`)
  //       .then(response => response.json())
  //       .then(({ token }) => {
  //         this.setState({
  //           token,
  //           status: STATUS.FINISHED_LOADING
  //         });
  //       });
  //   }
  // }

  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/loading' element={<Callback />}></Route>
          <Route path='/list' element={<List />}></Route>
          <Route path='/detail/:full_name/:repo/:number' element={<Detail />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

// 筆記
// 1.先將專案page個別整理成component檔案
// 2.設定路由 層級關係
// <注意> <BrowserRouter>包住所有路由 如果是固定的元素（ex navbar每一頁都需要） 不用設定path並且放在<BrowserRouter>內 但 <Routes> 以外 其他在以內設定路由
// 需求：第一頁 登入頁 （path='/') 點選登入>跳轉github登入>回來直接進list頁

// 補充 注意自己目前在第幾層檔案 ls cd轉到目前要執行的資料夾 再npm start
