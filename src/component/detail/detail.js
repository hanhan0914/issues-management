import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import {
  Background,
  Backbutton,
  Body,
  Edit,
  Editbutton,
  Title,
  Label,
  Bodyword,
  InputTitle,
  Select,
  InputBody,
  Popup,
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

  // const dataTitle =data.map((data)=>
  // <p key={data.title}>{data.title}</p>)

  // const dataTitle=data.title

  // const assignee=issue.assignee.map((assignee)=>
  // <p key={assignee.login}>{assignee.login}</p>)

  // 測試url : console.log(`https://api.github.com/repos/${issueurl.full_name}/${issueurl.repo}/issues/${issueurl.number}`)

  return (
    <>
      <Background>
        <Backbutton>
          <Link to={'/list'}>
            {' '}
            <FontAwesomeIcon icon={faCaretLeft} beat style={{ fontSize: '30px' }} />
            返回列表頁
          </Link>
        </Backbutton>

        <Body>
          <Edit>
            <a href={html}>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                style={{ fontSize: '25px', margin: '6px' }}
              />
            </a>
            <Editbutton onClick={() => setShowInput(true)}> Edit</Editbutton>
            &nbsp;
            <Editbutton onClick={() => setshowPopUp(true)}>Delete</Editbutton>
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
              <button
                onClick={() => {
                  setShowInput(false);
                  updateData();
                }}
                style={{ margin: '8px' }}
              >
                修改
              </button>

              {/* input輸入資料後 onchange同步顯示輸入資料 button點選後把input關掉 拿取修改值並顯示於畫面。如何打api？直接在onclick打api */}
              <button onClick={() => setShowInput(false)}>取消</button>
            </div>
          </div>
          <Popup
            style={{
              display: showPopUp ? 'block' : 'none',
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
          </Popup>
        </Body>
      </Background>
    </>
  );
}

export default Detail;
