import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
// 引入Ｃookies 變數已存在cookies裡面了～
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Form, Button } from 'semantic-ui-react';
//LabelDetail
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faArrowDownWideShort,
  faArrowUpWideShort,
  faArrowPointer,
  faCaretLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
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

function List() {
  const cookies = new Cookies();
  //ok  console.log('cookies Token 是什麼', cookies.get('authToken'));
  // token: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

  const [addTask, setAddTask] = useState(false);
  // const [title, setTitle] = useState();
  const [labelsName, setLabelsName] = useState([]);
  // const [body, setBody] = useState();
  // const [repo, setRepo] = useState();
  const [keyword, setKeyword] = useState();
  const [showSearchData, setShowSearchData] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [direction, setDirection] = useState('desc');
  const [filterLabel, setFilterLabel] = useState(''); // '' | 'done' | 'in progress'
  const [issues, setIssues] = useState([]);
  const [page, setPage] = useState(1);
  const observer = useRef(null);

  // each render create new
  // lastElementRef(null)
  // lastElementRef(DOMElement)
  const lastElementRef = useCallback(
    (node) => {
      if (issues.length < page * 8) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setPage((page) => page + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [issues, page],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const getList = async () => {
    try {
      const { data: issuesData } = await axios({
        method: 'get',
        url: `https://api.github.com/issues?page=${page}&per_page=8&labels=${filterLabel}&direction=${direction}`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${cookies.get('authToken')}`,
          'If-None-Match': '',
        },
      });

      const res = issuesData;
      console.log('res', issuesData);
      setIssues((issues) => [...issues, ...res]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log('page', page);
    getList();
  }, [page, filterLabel, direction]);

  const onSubmit = (data) => {
    function createData() {
      axios
        .post(
          `https://api.github.com/repos/${issues[0].user.login}/${data.repoName}/issues`,
          {
            repo: `${data.repoName}`,
            title: `${data.titleName}`,
            labels: [data.label], //labels參數是一陣列
            body: `${data.body}`,
            assignee: `${issues[0].user.login}`,
            //create時直接assign給自己
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
          getList();

          //call API新增後再call getList()
        });
    }
    createData();
  };

  //搜尋資料
  function getSearchData() {
    axios
      .get(
        `https://api.github.com/search/issues?q=${keyword}  user:hanhan0914 in:title in:body  `,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${cookies.get('authToken')}`,
          },
        },
      )

      .then((res) => {
        console.log('items', res.data.items); //是陣列>>map
        setSearchData(res.data.items);
        console.log('res', res);
      });
  }

  //依建立時間排序
  function sortByDateAsc() {
    if (direction === 'asc') {
      setDirection('desc');
    } else {
      setDirection('asc');
    }
    setPage(1);
    setIssues([]);
  }

  return (
    <>
      <div
        // onClick={() => {
        //   setAddTask(false);
        // }}
        style={{
          backgroundColor: '		#D8D8EB',
          width: '100%',
          height: '100%',
        }}
      >
        {/* 搜尋區塊 */}
        <input
          style={{
            borderRadius: '200px ',
            margin: '10px',
            width: '450px',
            height: '30px',
          }}
          type='text'
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        ></input>
        <button
          style={{
            background: 'white',
            border: 'none',
            outline: 'none',
            margin: '20px 2px 5px 0px ',
            backgroundColor: 'rgba(0,0,0,0)',
            cursor: 'pointer',
          }}
          onClick={() => {
            getSearchData();
            setShowSearchData(true);
          }}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} style={{ fontSize: '25px' }} />
        </button>

        {/* 篩選區塊 */}
        <select
          style={{ marginLeft: '300px', width: '90px', fontFamily: 'serif', cursor: 'pointer' }}
          onChange={(e) => {
            setIssues([]);
            setPage(1);
            setFilterLabel(`${e.target.value}`);
          }}
        >
          <option value=''>All</option>
          <option value='open'> open </option>
          <option value='in progress'> in progress</option>
          <option value='done'> done</option>
        </select>

        {/* 排序區塊 */}
        <button
          style={{
            backgroundColor: 'rgba(0,0,0,0)',
            border: 'none',
            cursor: 'pointer',
            marginLeft: '40px',
            borderRadius: '200px ',
          }}
          onClick={sortByDateAsc}
        >
          {direction === 'asc' ? (
            <FontAwesomeIcon icon={faArrowDownWideShort} style={{ fontSize: '25px' }} />
          ) : (
            <FontAwesomeIcon icon={faArrowUpWideShort} style={{ fontSize: '25px' }} />
          )}
        </button>

        <div
          style={{
            backgroundColor: '	#A3D1D1',
            borderColor: '	#3D7878',
            position: 'absolute',
            width: '550px',
            height: '500px',
            margin: '0 auto',
            right: '0',
            left: '0',
            top: '100px',

            borderRadius: '5px',
            display: addTask ? 'block' : 'none',
            padding: '10px',
            zIndex: '4',
          }}
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Field>
              <label>Repo Name</label>
              <input
                placeholder='Repo Name'
                type='text'
                // onChange={(e) => {
                //   setRepo(e.target.value);
                // }}
                {...register('repoName', { required: true })}
              ></input>
            </Form.Field>
            {errors.repoName && (
              <p style={{ color: 'red', fontWeight: '500' }}>Please input the RepoName</p>
            )}
            <Form.Field>
              <label>Title</label>
              <input
                placeholder='Title'
                type='text'
                // onChange={(e) => {
                //   setTitle(e.target.value);
                // }}
                {...register(
                  'titleName',
                  { required: true },
                  // {
                  //   onChange: (e) => {
                  //     // setTitle(TitleName);
                  //     console.log(e.target.value);
                  //   },
                  // },
                )}
              ></input>
            </Form.Field>
            {errors.titleName && (
              <p style={{ color: 'red', fontWeight: '500' }}>Please input the TitleName</p>
            )}
            <Form.Field>
              <label>Labels</label>
              {/* <input
              placeholder='Labels'
              onChange={(e) => {
                setLabelsName(e.target.value);
              }}
            ></input> */}
              <select
                onChange={(e) => {
                  setLabelsName([...labelsName, e.target.value]);
                }}
                {...register('label', {
                  // onChange: (e) => {
                  //   // setLabelsName([...labelsName, label]);
                  //   console.log(e.target.value);
                  // },
                })}
              >
                <option value='open'> open </option>
                <option value='in progress'> in progress</option>
                <option value='done'> done</option>
              </select>
            </Form.Field>
            <Form.Field>
              <label>Descriptions</label>
              <input
                placeholder='Descriptions'
                type='text'
                // onChange={(e) => {
                //   setBody(e.target.value);
                // }}
                {...register(
                  'body',
                  { required: true, minLength: 30 },
                  {
                    // onChange: (e) => {
                    //   // setBody(Descriptions);
                    //   console.log(e.target.value);
                    // },
                  },
                )}
              ></input>
            </Form.Field>
            {errors.body && (
              <p style={{ color: 'red', fontWeight: '500' }}>Please input 30 words at least</p>
            )}
            <Button
              type='submit'
              // onClick={() => {
              //   setAddTask(false);
              //   createData();
              // }}
            >
              Submit
            </Button>
            <Button onClick={() => setAddTask(false)}>cancel</Button>
          </Form>
        </div>

        {/* create task 按鈕 */}
        <button
          onClick={() => setAddTask(true)}
          style={{
            fontFamily: 'serif',
            fontSize: '23px',
            border: 'none',
            width: '120px ',
            borderRadius: '50%',
            backgroundColor: '	#95CACA',
            color: 'white',
            fontWeight: '900',
            position: 'fixed',
            right: '100px',
            bottom: '160px',
            zIndex: 1,
            cursor: 'pointer',
          }}
        >
          Create Task
        </button>

        <FontAwesomeIcon
          icon={faArrowPointer}
          beatFade
          style={{
            position: 'fixed',
            right: '100px',
            bottom: '145px',
            fontSize: '40px',
            color: '#408080',
            zIndex: '1',
          }}
        />

        {/* 貓咪圖案 */}
        <img
          src='images/cat2.png'
          width={'300px'}
          style={{ position: 'fixed', right: '100px', bottom: '20px' }}
        />

        {/*主列表區塊  */}
        <div
          style={{
            display: showSearchData ? 'none' : 'block',
            fontFamily: 'serif',
            fontSize: '20px',
            fontWeight: '500',
            margin: '3px 15px',
            marginRight: '350px',
          }}
        >
          {issues.map((issue, index) => (
            <div
              ref={index === issues.length - 1 ? lastElementRef : undefined}
              style={{
                border: 'solid 1px 		#B8B8DC',
                // backgroundImage: 'linear-gradient(to right, #c9d6ff, #e2e2e2)',
                background: 'white',
                borderRadius: '5px',
                height: '150px',
                width: '1000px',
                padding: '15px',
              }}
              key={issue.id}
            >
              <Link
                to={`/detail/${issue.repository.full_name}/${issue.number}`}
                style={{ textDecoration: 'none' }}
              >
                {/* <b style={{ color: 'red' }}>{issue.id}</b> */}
                <b style={{ margin: '10px', fontSize: '20px', fontWeight: '600' }}>
                  {' '}
                  {issue.repository.full_name}
                </b>
                <button
                  style={{
                    margin: '3px 10px',
                    fontSize: '20px',
                    border: 'none',
                    borderRadius: '10px',
                    marginLeft: '650px',
                    backgroundColor: 'transparent',
                  }}
                >
                  {issue.labels.map((label) => (
                    <div key={label.name} style={labelColorMap[label.name]}>
                      {label.name}
                    </div>
                  ))}
                </button>
                {/* <Link
                to={`/detail/${issue.repository.full_name}/${issue.number}`}
                style={{ textDecoration: 'none' }}
              > */}{' '}
                <div style={{ margin: '3px 10px', fontSize: '25px' }}>{issue.title}</div>
                <div
                  style={{
                    margin: '3px 10px',
                    fontSize: '15px',
                    maxWidth: '600px',
                    lineHeight: '18px',
                    maxHeight: '36px',
                    overflow: 'hidden',

                    textOverflow: 'ellipsis',

                    whiteSpace: 'nowrap',
                  }}
                >
                  {issue.body}
                </div>
                (...read more)
                <p style={{ color: 'black', margin: '10px 10px', fontSize: '18px' }}>
                  {issue.created_at}{' '}
                </p>
              </Link>
            </div>
          ))}
          {/* <div ref={loadingRef}>loading...</div> */}
        </div>
        <div>
          <button
            onClick={() => setShowSearchData(false)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              fontSize: '15px',
              fontWeight: '600',
              margin: '5px 10px',
              display: showSearchData ? 'block' : 'none',
            }}
          >
            {' '}
            <FontAwesomeIcon icon={faCaretLeft} beat style={{ fontSize: '20px' }} />
            返回列表頁
          </button>
        </div>

        <div
          style={{
            display: showSearchData ? 'block' : 'none',
            margin: '10px 20px',
            fontSize: '15px',
            fontWeight: '600',
          }}
        >
          已搜尋到結果如下
        </div>

        <div
          style={{
            backgroundColor: '#D8D8EB',
            width: '100%',
            height: '100vh',
          }}
        >
          <div
            style={{
              ontFamily: 'serif',
              fontSize: '20px',
              fontWeight: '500',
              margin: '3px 15px',
              marginRight: '350px',
            }}
          >
            {searchData.map((item) => (
              <div
                style={{
                  border: 'solid 1px 		#B8B8DC',
                  // backgroundImage: 'linear-gradient(to right, #c9d6ff, #e2e2e2)',
                  background: 'white',
                  borderRadius: '5px',
                  height: '150px',
                  width: '1000px',
                  padding: '15px',
                }}
                key={item.number}
              >
                <p
                  style={{
                    margin: '5px',
                    fontSize: '10px',
                    fontWeight: '600',
                    fontFamily: 'serif',
                  }}
                >
                  {item.repository_url.split('https://api.github.com/repos/')[1]}
                  <Link
                    to={`/detail/${item.repository_url.split('https://api.github.com/repos/')[1]}/${
                      item.number
                    }`}
                  >
                    <p style={{ fontSize: '20px' }}>{item.title}</p>
                    <div
                      style={{
                        margin: '3px 10px',
                        fontSize: '18px',
                        maxWidth: '600px',
                        lineHeight: '14px',
                        maxHeight: '28px',
                        overflow: 'hidden',
                        color: 'gray',
                        textOverflow: 'ellipsis',

                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.body}
                      (...read more)
                    </div>
                    <div>
                      <button
                        style={{
                          margin: '3px 10px',
                          fontSize: '20px',
                          border: 'none',
                          borderRadius: '10px',
                          marginLeft: '700px',
                          backgroundColor: 'transparent',
                        }}
                      >
                        {item.labels.map((label) => (
                          <span key={label.name} style={labelColorMap[label.name]}>
                            {label.name}
                          </span>
                        ))}
                      </button>
                    </div>{' '}
                    <p style={{ color: 'black', margin: '4px 10px', fontSize: '18px' }}>
                      {item.created_at}
                    </p>{' '}
                  </Link>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default List;
