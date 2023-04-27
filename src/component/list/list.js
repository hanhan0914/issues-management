import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
// 引入Ｃookies 變數已存在cookies裡面了～
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'semantic-ui-react';
//form表單驗證
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faArrowDownWideShort,
  faArrowUpWideShort,
  faArrowPointer,
  faCaretLeft,
} from '@fortawesome/free-solid-svg-icons';

import {
  Background,
  SearchInput,
  Filter,
  DirectionButton,
  FormBackground,
  HintWord,
  CreateButton,
  Img,
  ListBackground,
  ListCard,
  ListWord,
  ListBody,
  Label,
  SearchHint,
} from './list_style';
// labelcolor設置->object
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
  //api:Authorization: `Bearer ${cookies.get('authToken')}`需要token
  // token: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
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState('desc');
  const [filterLabel, setFilterLabel] = useState(''); // '' | 'done' | 'in progress'
  const [issues, setIssues] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [addTask, setAddTask] = useState(false);
  // const [title, setTitle] = useState();
  const [labelsName, setLabelsName] = useState([]);
  // const [body, setBody] = useState();
  // const [repo, setRepo] = useState();
  const [keyword, setKeyword] = useState();
  const [showSearchData, setShowSearchData] = useState(false);
  const observer = useRef(null);

  // 3 callback reference:each render create new
  // lastElementRef(null)
  // lastElementRef(DOMElement)
  const lastElementRef = useCallback(
    (node) => {
      //no duplicated data : when taking data return nothing(don't do anything)
      if (issues.length < page * 8) return;

      //don't take data:stop to observe 避免觸發observer callback function
      if (observer.current) {
        observer.current.disconnect();
      }
      //create new IntersectionObserver 避免取到舊值
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setPage((page) => page + 1);
        }
      });
      //element!==null 將element納入observer的觀察對象。
      if (node) {
        observer.current.observe(node);
      }
    },
    [issues, page],
  );

  // 1 list data:api(List issues assigned to the authenticated user)
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
      // console.log('res', issuesData);
      setIssues((issues) => [...issues, ...res]);
      // add new data to issues(array) and map it ,render to ui
    } catch (error) {
      console.log(error);
    }
  };

  // 1 first render: getList() default page=1,[change] re-render
  useEffect(() => {
    console.log('page', page);
    getList();
  }, [page, filterLabel, direction]);

  //hooks can  only call from React functions.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    function createData() {
      axios
        .post(
          `https://api.github.com/repos/${issues[0].user.login}/${data.repoName}/issues`,
          {
            repo: `${data.repoName}`,
            title: `${data.titleName}`,
            labels: [data.label], //labels is array
            body: `${data.body}`,
            assignee: `${issues[0].user.login}`,
            //create : assign to myself
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
          //call API add new task and call getList() re-render
        });
    }
    createData();
  };

  //2 search and get data api(Search issues and pull requests)
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
        // console.log('items', res.data.items); map it（array)
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
      <Background>
        <SearchInput
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />

        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          style={{
            fontSize: '30px',
            color: '#8e8e8e',
            border: 'none',
            outline: 'none',
            margin: '25px 3px -2px -5px ',
            backgroundColor: 'rgba(0,0,0,0)',
            cursor: 'pointer',
          }}
          onClick={() => {
            getSearchData();
            setShowSearchData(true);
          }}
        />

        <Filter
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
        </Filter>

        {/* 排序區塊 */}
        <DirectionButton onClick={sortByDateAsc}>
          {direction === 'asc' ? (
            <FontAwesomeIcon icon={faArrowDownWideShort} style={{ fontSize: '25px' }} />
          ) : (
            <FontAwesomeIcon icon={faArrowUpWideShort} style={{ fontSize: '25px' }} />
          )}
        </DirectionButton>

        {/* form create new task */}
        <FormBackground style={{ display: addTask ? 'block' : 'none' }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Field>
              <label>Repo Name</label>
              <input
                placeholder='Repo Name'
                type='text'
                // onChange={(e) => {
                //   setRepo(e.target.value);
                // }}  use register to get vaule,and may console data,just take data to call api (create new task)
                {...register('repoName', { required: true })}
              ></input>
            </Form.Field>
            {errors.repoName && <HintWord>Please input the RepoName</HintWord>}
            <Form.Field>
              <label>Title</label>
              <input
                placeholder='Title'
                type='text'
                {...register('titleName', { required: true })}
              ></input>
            </Form.Field>
            {errors.titleName && <HintWord>Please input the RepoName</HintWord>}
            <Form.Field>
              <label>Labels</label>

              <select
                onChange={(e) => {
                  setLabelsName([...labelsName, e.target.value]);
                }}
                {...register('label', {})}
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
                {...register('body', { required: true, minLength: 30 }, {})}
              ></input>
            </Form.Field>
            {errors.body && (
              <HintWord>
                Please input the RepoName
                {/* </p> */}
              </HintWord>
            )}
            <Button type='submit'>Submit</Button>
            <Button onClick={() => setAddTask(false)}>cancel</Button>
          </Form>
        </FormBackground>

        {/* create task 按鈕 */}
        <CreateButton onClick={() => setAddTask(true)} style={{ zIndex: 1 }}>
          Create Task
        </CreateButton>

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

        <Img src='images/cat2.png'></Img>

        {/*主列表區塊  */}
        <ListBackground style={{ display: showSearchData ? 'none' : 'block' }}>
          {issues.map((issue, index) => (
            <ListCard
              // 綁定infinite scroll
              ref={index === issues.length - 1 ? lastElementRef : undefined}
              key={issue.id}
            >
              <Label>
                {issue.labels.map((label) => (
                  <div key={label.name} style={labelColorMap[label.name]}>
                    {label.name}
                  </div>
                ))}
              </Label>{' '}
              <br></br>
              {/* app.js set route,and all card is a link */}
              <Link
                to={`/detail/${issue.repository.full_name}/${issue.number}`}
                style={{ textDecoration: 'none' }}
              >
                <ListWord> {issue.repository.full_name}</ListWord> <br />
                <ListWord>{issue.title}</ListWord>
                <ListBody>{issue.body}</ListBody>
                (...read more)
                <p
                  style={{
                    color: '#8E8E8E',
                    margin: ' 20px 10px',
                    fontSize: '18px',
                  }}
                >
                  {issue.created_at}{' '}
                </p>
              </Link>
            </ListCard>
          ))}
          {/* <div ref={loadingRef}>loading...</div> */}
          {/* </div> */}
        </ListBackground>

        {/* 搜尋結果 */}

        <SearchHint
          onClick={() => setShowSearchData(false)}
          style={{
            display: showSearchData ? 'block' : 'none',
            cursor: 'pointer',
          }}
        >
          {' '}
          <FontAwesomeIcon icon={faCaretLeft} beat style={{ fontSize: '20px' }} />
          返回列表頁
        </SearchHint>

        <SearchHint
          style={{
            display: showSearchData ? 'block' : 'none',
          }}
        >
          已搜尋到結果如下
        </SearchHint>

        <ListBackground style={{ width: '100%', height: '100vh' }}>
          {searchData.map((item) => (
            <ListCard key={item.number}>
              <Label>
                {item.labels.map((label) => (
                  <span key={label.name} style={labelColorMap[label.name]}>
                    {label.name}
                  </span>
                ))}
              </Label>{' '}
              <br></br>
              <Link
                to={`/detail/${item.repository_url.split('https://api.github.com/repos/')[1]}/${
                  item.number
                }`}
              >
                <ListWord>{item.repository_url.split('https://api.github.com/repos/')[1]}</ListWord>
                <br />
                <ListWord>{item.title}</ListWord>
                <ListBody>{item.body}</ListBody>
                (...read more)
                <p
                  style={{
                    color: '#8E8E8E',
                    margin: ' 20px 10px',
                    fontSize: '18px',
                  }}
                >
                  {item.created_at}
                </p>{' '}
              </Link>
            </ListCard>
          ))}
        </ListBackground>
      </Background>
    </>
  );
}

export default List;
