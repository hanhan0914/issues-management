import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faCaretLeft,
  // faCommentsDollar,
} from '@fortawesome/free-solid-svg-icons';
const labelColorMap = {
  open: { backgroundColor: '	#00BB00', color: 'white', borderRadius: '5px', width: '50px' },
  'in progress': {
    backgroundColor: '#AE57A4',
    color: 'white',
    borderRadius: '5px',
    width: '120px',
  },
  done: { backgroundColor: '#0080FF', color: 'white', borderRadius: '5px' },
  bug: { backgroundColor: 'red', color: 'white', borderRadius: '5px' },
};

function Detail() {
  const issueurl = useParams();
  const cookies = new Cookies();
  const [title, setTitle] = useState('');
  // const [labels, setLabels] = useState('');
  const [body, setBody] = useState('');
  const [showPopUp, setshowPopUp] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [labelsName, setLabelsName] = useState([]);
  const [html, setHtml] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getIssueData = async () => {
      try {
        // const {issueData} = data
        // const issueData = data.issueData
        // res是api抓取的資料 但因為用axios打 所以會將res資料用data{}包住 --> data內的東西就是call api想拿的一些資料 其他是axios附加的東西
        const { data } = await axios({
          method: 'get',
          url: `https://api.github.com/repos/${issueurl.full_name}/${issueurl.repo}/issues/${issueurl.number}`,
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${cookies.get('authToken')}`,
          },
        });

        setTitle(data.title);
        setLabelsName(data.labels);
        setBody(data.body);
        console.log('data', data);
        console.log(data.title);
        console.log('url', data.html_url);
        setHtml(data.html_url);
      } catch (error) {
        console.log(error);
      }
    };

    getIssueData();
  }, []);

  function updateData() {
    axios
      .patch(
        `https://api.github.com/repos/${issueurl.full_name}/${issueurl.repo}/issues/${issueurl.number}`,
        {
          title: `${title}`,
          labels: labelsName,
          body: `${body}`,
        },
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${cookies.get('authToken')}`,
          },
        },
      )

      .then((res) => {
        console.log(res.data);
      });
  }

  function deleteIssue() {
    axios
      .patch(
        `https://api.github.com/repos/${issueurl.full_name}/${issueurl.repo}/issues/${issueurl.number}`,
        {
          state: 'closed',
        },
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${cookies.get('authToken')}`,
          },
        },
      )
      .then(() => {
        console.log('成功刪除');
        navigate('/list');
      });
  }

  // const dataTitle =data.map((data)=>
  // <p key={data.title}>{data.title}</p>)

  // const dataTitle=data.title

  // const assignee=issue.assignee.map((assignee)=>
  // <p key={assignee.login}>{assignee.login}</p>)

  // 測試url : console.log(`https://api.github.com/repos/${issueurl.full_name}/${issueurl.repo}/issues/${issueurl.number}`)

  return (
    <>
      {/* 取得參數以便打api
        <p>owner:{issueurl.full_name}</p>
        <p>repo:{issueurl.repo}</p>
        <p>issue_number:{issueurl.number}</p>
        <div>ii</div>
        <p>iiiiii</p> */}

      <div
        style={{
          backgroundColor: '#c9c0d3',
          width: '100%',
          height: '100vh',
          padding: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '0',
            left: '0',
            margin: '0 50px',
            fontSize: '25px',
            fontWeight: '600',
          }}
        >
          <Link to={'/list'}>
            {' '}
            {/* <FontAwesomeIcon icon={faLeftLong} style={{ color: '#0c419d', fontSize: '80px' }} /> */}
            <FontAwesomeIcon icon={faCaretLeft} beat style={{ fontSize: '30px' }} />
            返回列表頁
          </Link>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            width: '800px',
            height: '550px',
            zIndex: '10',
            border: ' solid 2px 	#7a7281 ',
            borderRadius: '10px',
          }}
        >
          <div style={{ marginLeft: '580px', marginTop: '3px' }}>
            <a href={html}>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                style={{ fontSize: '25px', margin: '5px' }}
              />
            </a>
            <button
              onClick={() => setShowInput(true)}
              style={{
                backgroundColor: '#C4E1E1',
                width: '80px',
                height: '30px',
                border: 'none',
                borderRadius: '2px',
                fontSize: '25px',
                fontWeight: 'bold',
                fontFamily: 'serif',
              }}
            >
              Edit
            </button>
            &nbsp;
            <button
              onClick={() => setshowPopUp(true)}
              style={{
                backgroundColor: '#C4E1E1',
                width: '80px',
                height: '30px',
                border: 'none',
                borderRadius: '2px',
                fontSize: '25px',
                fontWeight: 'bold',
                fontFamily: 'serif',
              }}
            >
              Delete
            </button>
          </div>

          {/* title label body */}
          <div style={{ display: showInput ? 'none' : 'block' }}>
            <div
              style={{
                width: '500px',
                height: '50px',
                // border: 'solid 1px black',
                marginLeft: '10px',
                padding: '10px',
                fontSize: '40px',
                textAlign: 'center',
                color: '	#484891',
                fontFamily: 'serif',
              }}
            >
              {' '}
              {title}
            </div>
            {/* <div>{issue.assignee.login}</div> */}

            {/* label修改其值並不會馬上更新！！！ */}
            <div
              style={{
                marginTop: '2px',
                fontSize: '18px',

                borderRadius: '10px',
                width: '120px',
                textAlign: 'center',
                fontFamily: 'serif',
                border: 'none',

                backgroundColor: 'transparent',
              }}
            >
              {' '}
              <span>
                {labelsName.map((label) => (
                  <span key={label.name} style={labelColorMap[label.name]}>
                    {label.name}
                  </span>
                ))}
              </span>
            </div>
            <div
              style={{
                width: '400px',
                height: '400px',
                // border: 'solid 1px black',
                margin: '40px 20px',
                fontSize: '18px',
                fontFamily: 'serif',
              }}
            >
              {' '}
              {body}
            </div>
          </div>

          <div style={{ display: showInput ? 'block' : 'none' }}>
            {/* 如何拿到初始值 */}
            <div>
              {' '}
              <input
                type='text'
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                style={{
                  width: '500px',
                  height: '50px',
                  border: 'solid 1px 	#9D9D9D',
                  marginLeft: '20px',
                  padding: '10px',
                  fontSize: '40px',
                  textAlign: 'center',
                  borderRadius: '5px',
                }}
              ></input>{' '}
            </div>
            <div style={{ margin: '5px 8px' }}>
              {' '}
              <select
                type='text'
                value={labelsName}
                onChange={(e) => {
                  setLabelsName([e.target.value]);
                }}
                style={{
                  margin: '5px 10px',
                  fontSize: '18px',
                  border: 'solid 1px 	#9D9D9D',
                  borderRadius: '10px',
                  width: '120px',
                  textAlign: 'center',
                }}
              >
                <option>labels</option>
                <option value='open'> open </option>
                <option value='in progress'> in progress</option>
                <option value='done'> done</option>
              </select>{' '}
            </div>
            <div>
              {' '}
              <textarea
                type='text'
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                }}
                style={{
                  width: '500px',
                  height: '300px',
                  border: 'solid 1px 	#9D9D9D',
                  margin: '10px 20px',
                  borderRadius: '5px',
                }}
              ></textarea>{' '}
            </div>

            <div style={{ margin: '15px' }}>
              <button
                onClick={() => {
                  setShowInput(false);
                  updateData();
                }}
                style={{ margin: '8px' }}
              >
                修改
              </button>

              {/* when input輸入資料後 onchange會同步顯示輸入資料 修改button點選以後把input關掉 拿取修改值並顯示於畫面。要如何打api？ */}
              <button onClick={() => setShowInput(false)}>取消</button>
            </div>
          </div>
          <div
            style={{
              display: showPopUp ? 'block' : 'none',
              width: '300px',
              height: '100px',
              border: 'solid 2px 	#408080',
              backgroundColor: '#D1E9E9',
              borderRadius: '5px',
              top: '40%',
              bottom: '60%',
              margin: '0 auto',
              position: 'absolute',
              right: '0',
              left: '0',
            }}
          >
            <p style={{ fontSize: '20px', margin: '3px' }}>確定要刪除資料嗎？</p>
            <button
              onClick={() => {
                deleteIssue();
              }}
              style={{ margin: '3px', marginTop: '20px' }}
            >
              確認
            </button>
            <button onClick={() => setshowPopUp(false)}>取消</button>
          </div>
        </div>
        {/* <img
          src='public/images/cat4.png'
          width={'300px'}
          style={{
            width: '300px',
            ymarginLeft: '70px',
            marginTop: '450px',
            position: 'fixed',
            zIndex: '99',
          }}
        /> */}
      </div>
    </>
  );
}

export default Detail;
