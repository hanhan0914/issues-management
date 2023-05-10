import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'wired-elements';
import { faArrowUpRightFromSquare, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import {
  Background,
  Backbutton,
  // Body,
  Edit,
  // Editbutton,
  Title,
  Label,
  Bodyword,
  InputTitle,
  Select,
  InputBody,
  // Popup,
} from './detail_style';
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
  // 拿取網址
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [showPopUp, setshowPopUp] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [labelsName, setLabelsName] = useState([]);
  const [html, setHtml] = useState('');

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
        style={{ minHeight: '100vh', padding: '20px 0', backgroundImage: 'url(images/task.jpg)' }}
      >
        <Backbutton>
          <Link to={'/list'}>
            {' '}
            <FontAwesomeIcon icon={faCaretLeft} beat style={{ fontSize: '30px' }} />
            返回列表頁
          </Link>
        </Backbutton>

        {/* <Body> */}
        <wired-card
          elevation='3'
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            width: '800px',
            height: '600px',
            zIndex: '10',
          }}
        >
          <Edit>
            <a href={html}>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                style={{ fontSize: '25px', margin: '6px' }}
              />
            </a>
            <wired-button onClick={() => setShowInput(true)}> Edit</wired-button>
            &nbsp;
            <wired-button onClick={() => setshowPopUp(true)}>Delete</wired-button>
          </Edit>

          {/* title label body */}
          <div style={{ display: showInput ? 'none' : 'block' }}>
            <Label>
              {' '}
              {labelsName.map((label) => (
                <span key={label.name} style={labelColorMap[label.name]}>
                  {label.name}
                </span>
              ))}
            </Label>
            <Title> {title}</Title>

            {/* label修改其值並不會馬上更新！！！ */}

            <Bodyword> {body}</Bodyword>
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
              ></InputTitle>{' '}
            </div>{' '}
            <Select
              type='text'
              value={labelsName}
              onChange={(e) => {
                setLabelsName([e.target.value]);
              }}
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
                修改
              </wired-button>

              {/* input輸入資料後 onchange同步顯示輸入資料 button點選後把input關掉 拿取修改值並顯示於畫面。如何打api？直接在onclick打api */}
              <wired-button onClick={() => setShowInput(false)}>取消</wired-button>
            </div>
          </div>

          <wired-card
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
            <p style={{ fontSize: '20px', margin: '25px', textAlign: 'center' }}>
              確定要刪除資料嗎？
            </p>
            <wired-button
              onClick={() => {
                deleteIssue();
              }}
              style={{
                marginLeft: '50px',
                marginTop: '20px',
                backgroundColor: 'white',
                border: 'solid 1px',
              }}
            >
              確認
            </wired-button>
            <wired-button
              onClick={() => setshowPopUp(false)}
              style={{ backgroundColor: 'white', margin: '5px', border: 'solid 1px' }}
            >
              取消
            </wired-button>
          </wired-card>

          {/* </Body> */}
        </wired-card>
      </Background>
    </>
  );
}

export default Detail;
