import React from 'react';
import { Outlet } from 'react-router-dom';
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { User } from './layout_style';

import { Nav } from './layout_style';

function Layout() {
  const { state } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleMenuOne = () => {
    // do something
    setOpen(false);
  };

  console.log('userName', state.userName);
  console.log('login', state.isLoggedIn);
  return (
    <>
      <Nav>
        {/* {state.isLoggedIn ? (
          <User onClick={handleOpen}>Hi , {state.userName}</User>
          
        ) : (
          <User>您尚未登入唷！</User>
        )}
      </Nav> */}
        <div
          style={{
            position: 'relative',
            margin: '5px',
            marginLeft: '80%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {state.isLoggedIn ? (
            <User onClick={handleOpen}>Hi,{state.userName}</User>
          ) : (
            <User onClick={handleOpen}>您尚未登入唷！</User>
          )}

          {open && state.isLoggedIn ? (
            <ul
              style={{
                position: 'absolute',
                bottom: '-90px',
                left: '75px',
                margin: '10px 0',
                padding: '0',
                backgroundColor: 'white',
                border: '1px solid grey',
                width: '150px',
                height: '80px',
              }}
            >
              <li
                style={{
                  margin: '10px',
                  border: 'solid 1px black',
                  backgroundColor: 'white',
                }}
              >
                <button
                  style={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',

                    background: ' none',
                    color: 'inherit',
                    border: 'none',
                    padding: '5px',
                    margin: '0',
                    font: 'inherit',
                    cursor: 'pointer',
                  }}
                  onClick={handleMenuOne}
                >
                  LogOut
                </button>
              </li>
            </ul>
          ) : null}
          {open ? <div></div> : <div></div>}
        </div>
      </Nav>
      <div className='my-page-body'>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;

// const Layout = React.memo(({ children }) => {
//   return (
//     <>
//       <Navbar />
//     </>
//   );
// });

// export default Layout;
