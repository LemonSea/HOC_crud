import React, { useEffect } from 'react';
import axios from 'axios';
import { Button } from 'antd';


function App() {
  useEffect(() => {
    axios.get('https://localhost:44375/admin/User/GetUserList')
      .then((response) => {
        console.log('原始get方法成功：')
        console.log(response.data);//请求的返回体
      })
      .catch((error) => {
        console.log(error);//异常
      });
  }, [])
  // useEffect(() => {
  //   axios(
  //     {
  //       methods: 'get',
  //       url: 'https://localhost:44375/admin/User/GetUserList',
  //     })
  //     .then((response) => {
  //       console.log('methods方法成功：')
  //       console.log(response.data);//请求的返回体
  //     })
  //     .catch((error) => {
  //       console.log(error);//异常
  //     });
  // }, [])
  useEffect(() => {
    let data = {
      "Account":"皮皮港",
      "Password":"123456"
    }
    axios({
      method: "POST",
      headers:{'Content-type':'application/json',},
      url: 'https://localhost:44375/admin/User/GetUserItem',
      data: data,
    })
      .then((response) => {
        console.log('发送成功：')
        console.log(response.data);//请求的返回体
      })
      .catch((error) => {
        console.log(error);//异常
      });
  }, [])

  return (
    <div className="App">
      <Button>Hello Word</Button>
    </div>
  );
}

export default App;
