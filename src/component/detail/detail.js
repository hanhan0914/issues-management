import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'wired-elements';
import { faArrowUpRightFromSquare, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import 'moment-timezone';

import {
  Background,
  Backbutton,
  Body,
  Edit,
  // Editbutton,
  Title,
  Label,
  Bodyword,
  InputTitle,
  Select,
  InputBody,
  Popup,
} from './detail_style';
const labelColorMap = {
  open: {
    backgroundColor: '	#00BB00',
    color: 'white',
    borderRadius: '5px',
    width: '50px',
    fontFamily: 'Comic Sans MS',

    height: '35px',
    lineHeight: '35px',
  },
  'in progress': {
    backgroundColor: '#AE57A4',
    color: 'white',
    borderRadius: '5px',
    width: '150px',
    fontFamily: 'Comic Sans MS',

    height: '35px',
    lineHeight: '12px',
  },
  done: {
    backgroundColor: '#0080FF',
    color: 'white',
    borderRadius: '5px',
    width: '70px',
    fontFamily: 'Comic Sans MS',

    height: '35px',
    lineHeight: '12px',
  },
  bug: {
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '5px',
    width: '65px',
    fontFamily: 'Comic Sans MS',

    height: '35px',
    lineHeight: '12px',
  },
};

function Detail() {
  const issueurl = useParams();
  // 拿取網址
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [showPopUp, setshowPopUp] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [labelsName, setLabelsName] = useState([]);
  const [html, setHtml] = useState('');
  const [create, setCreate] = useState('');
  const [update, setUpdate] = useState('');

  const [state, setState] = useState('');

  useEffect(() => {
    const getIssueData = async () => {
      try {
        // const {issueData} = data  ; const issueData = data.issueData
        // res是api抓取的資料，用axios打 會將res資料用data{}包住 --> data內的東西就是call api想拿的一些資料 其他是axios附加的東西
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
        setHtml(data.html_url);
        setCreate(data.created_at);
        setUpdate(data.updated_at);

        setState(data.state);
        console.log('test', data);
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

  return (
    <>
      <Background
        style={{
          minHeight: '100vh',
          // background: 'linear-gradient(to right, #b2fefa, #0ed2f7)',

          backgroundImage: 'url(/images/detailbackground.jpg)',
          backgroundSize: '100% 100%',
        }}
        className='doodle'
      >
        <Backbutton>
          <Link to={'/list'}>
            {' '}
            <FontAwesomeIcon icon={faCaretLeft} beat style={{ fontSize: '30px' }} />
            返回列表頁
          </Link>
        </Backbutton>

        {/* <Body> */}
        <Body
          style={{
            width: '800px',
            height: '600px',
            zIndex: '10',
          }}
        >
          <Edit>
            <a href={html}>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                style={{ fontSize: '25px', margin: '0px auto' }}
              />
            </a>
            <wired-button onClick={() => setShowInput(true)} style={{ margin: '5px' }}>
              {' '}
              Edit
            </wired-button>
            &nbsp;
            <wired-button onClick={() => setshowPopUp(true)}>Delete</wired-button>
          </Edit>

          {/* title label body */}
          <div style={{ display: showInput ? 'none' : 'block', position: 'relative' }}>
            <Label>
              {' '}
              {labelsName.map((label) => (
                <button key={label.name} style={labelColorMap[label.name]}>
                  {label.name}
                </button>
              ))}
            </Label>

            <Title> ISSUES : {title}</Title>
            <div style={{ padding: '0 10px', color: 'gray', width: '600px' }}>
              Previous Updated at{' '}
              {moment.utc(update).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm')} &nbsp;;&nbsp;
              Created at {''} {moment.utc(create).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm')}{' '}
            </div>

            <div
              style={{
                padding: '0 10px',
                fontSize: '20px',
                marginTop: '5px',
                color: 'gray',
                width: '200px',
              }}
            >
              State : {state}
            </div>

            {/* label修改其值並不會馬上更新！！！ */}

            <Bodyword>
              {' '}
              <span style={{ textDecoration: 'underline', fontWeight: '600' }}>
                About this issues
              </span>
              <br></br>
              {body}
            </Bodyword>
          </div>

          <div style={{ display: showInput ? 'block' : 'none' }}>
            <div>
              {' '}
              <InputTitle
                type='text'
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                style={{ fontFamily: 'Comic Sans MS', fontSize: '35px' }}
              ></InputTitle>{' '}
            </div>{' '}
            <Select
              type='text'
              value={labelsName}
              onChange={(e) => {
                setLabelsName([e.target.value]);
              }}
              style={{ fontFamily: 'Comic Sans MS', fontSize: '20px' }}
            >
              <option>labels</option>
              <option value='open'> open </option>
              <option value='in progress'> in progress</option>
              <option value='done'> done</option>
            </Select>{' '}
            <div>
              {' '}
              <InputBody
                type='text'
                value={body}
                onChange={(e) => {
                  setBody(e.target.value);
                }}
                style={{ fontFamily: 'Comic Sans MS', fontSize: '18px' }}
              ></InputBody>{' '}
            </div>
            <div style={{ margin: '15px' }}>
              <wired-button
                onClick={() => {
                  setShowInput(false);
                  updateData();
                }}
                style={{ margin: '8px' }}
              >
                Update
              </wired-button>

              {/* input輸入資料後 onchange同步顯示輸入資料 button點選後把input關掉 拿取修改值並顯示於畫面。如何打api？直接在onclick打api */}
              <wired-button onClick={() => setShowInput(false)}>Cancel</wired-button>
            </div>
          </div>

          <Popup
            style={{
              display: showPopUp ? 'block' : 'none',
              width: '300px',
              height: '150px',
              backgroundColor: 'white',
              top: '40%',
              bottom: '60%',
              margin: '0 auto',
              position: 'absolute',
              right: '0',
              left: '0',
            }}
          >
            <p
              style={{
                fontSize: '20px',
                margin: '15px',
                textAlign: 'center',
                fontFamily: 'Comic Sans MS',
              }}
            >
              Delete this data?
            </p>
            <div style={{ margin: '0 auto', textAlign: 'center' }}>
              <wired-button
                onClick={() => {
                  deleteIssue();
                }}
                style={{
                  backgroundColor: 'white',
                }}
              >
                Yes
              </wired-button>
              <wired-button
                onClick={() => setshowPopUp(false)}
                style={{ backgroundColor: 'white', marginLeft: '20px' }}
              >
                No
              </wired-button>
            </div>
          </Popup>

          {/* </Body> */}
        </Body>
      </Background>
    </>
  );
}

export default Detail;
