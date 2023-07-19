import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useReducer } from 'react';
import Layout from './component/Navbar/layout';
import Login from './component/login/login';
import List from './component/list/list';
import Detail from './component/detail/detail';
import Callback from './component/token/callback';
import 'doodle.css/doodle.css';

export const UserContext = React.createContext();

const initialState = {
  isLoggedIn: false,
  userName: '',
};

const loginReducer = (state, action) => {
  switch (action.type) {
    case 'success': {
      console.log('action.payload', action.payload);
      return { ...state, isLoggedIn: true, userName: action.payload };
    }
    case 'error': {
      return { ...state, isLoggedIn: false };
    }
    case 'logout': {
      return { ...state, isLoggedIn: false };
    }

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/loading' element={<Callback />}></Route>
            <Route element={<Layout />}>
              <Route path='/list' element={<List />}></Route>
              <Route path='/detail/:full_name/:repo/:number' element={<Detail />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;

// 筆記
// 1.先將專案page個別整理成component檔案
// 2.設定路由與層級關係
// <注意> <BrowserRouter>包住所有路由
/* layout(navbar) 作法：不需設定path且包在需顯示layout的component外層
layout return內部要放 <Outlet /> 嵌套路由，保證子路由共享父路由的界面而不被覆蓋
，父组件中可為子路由的元素占位，最终渲染子路由的元素。*/

// 需求：第一頁 登入頁 （path='/') 點選登入>跳轉github登入>回來直接進list頁
// 補充 注意自己目前在第幾層檔案 ls cd轉到目前要執行的資料夾 再npm start

//全局狀態管理 不適合useContext(在頂端將狀態傳下來):在app.js無法做判斷 而是要將該判斷與useState傳至page判斷是否登入
//因loading page用code換取token後才會登入 使用useReducer管理狀態
