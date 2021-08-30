window.onload = () => {
  // fetch('https://api.nexon.co.kr/kart/v1.0/users/nickname/R팍이', {
  //   method: 'GET',
  //   headers:{Authorization : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTcxMTU0OTY4OSIsImF1dGhfaWQiOiIyIiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIiwic2VydmljZV9pZCI6IjQzMDAxMTM5MyIsIlgtQXBwLVJhdGUtTGltaXQiOiI1MDA6MTAiLCJuYmYiOjE2MzAwNDA2NTgsImV4cCI6MTY0NTU5MjY1OCwiaWF0IjoxNjMwMDQwNjU4fQ.rthL_ZvdP5-Xodde019MXo3H_vJVDMQfzvh-2O7vOVE',}
  // })
  // .then((res) => {
  //   return res.json();
  // })
  // .then((data) => {
  //   console.log(data);
  // }); 
};

function getFetch(url){
  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: '박진호',
      id: 'enqlqkr@gmail.com',
    }),
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  });
}

function postFetch(url){
  fetch(`http://192.168.0.11:3002${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: '박진호',
      id: 'enqlqkr@gmail.com',
    }),
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
  });
}


function testKartRiderAPI(){
  getFetch('/userInfo/nickname');
}