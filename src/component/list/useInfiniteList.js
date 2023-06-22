// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'universal-cookie';

// export default function useInfiniteList(page, filterLabel, direction) {
//   const [issues, setIssues] = useState([]);
//   useEffect(() => {
//     try {
//       const { data: issuesData } = axios({
//         method: 'get',
//         url: `https://api.github.com/issues?page=${page}&per_page=8&labels=${filterLabel}&direction=${direction}`,
//         headers: {
//           accept: 'application/json',
//           Authorization: `Bearer ${cookies.get('authToken')}`,
//           'If-None-Match': '',
//         },
//       });

//       const res = issuesData;
//       console.log('res', issuesData);
//       // setHasMore(issuesData.length > 0)
//       setIssues((issues) => [...issues, ...res]);
//       // add new data to issues(array) and map it ,render to ui
//     } catch (error) {
//       console.log(error);
//     }
//   }, [page, filterLabel, direction]);
//   return { issues };
// }
