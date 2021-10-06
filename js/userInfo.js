/**
 * 태그의 ID 값을 받아온다.
 * @param {*} param 
 * @returns 
 */
 function getID(param){
  return document.getElementById(param);
}

/**
 * 닉네임 입력 시 해당 유저의 닉네임과 레벨, 메시지를 표기한다
 * 메시지를 통해 라이더 정보 유무를 확인할 수 있다.
 */
function getFetch(){
  const nickname = getID('nickname_fetch');
  fetch(`/userInfo/nickname?nickname=${nickname.value}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log(data);
    const searchResult = getID('searchResult');
    let str = `
      <div class="resultEle">닉네임 : ${data.name}</div>
      <div class="resultEle">레벨 : ${data.level}</div>
      <div class="resultEle">메시지 : ${data.message}</div>
    `;
    searchResult.innerHTML=str;
  });
}

/**
 * 엔터 키를 누르면 조회 가능
 */
function inputEnter(){
  if(window.event.keyCode == 13){
    getFetch();
  }
}

function postFetch(url){
  fetch(`http://192.168.0.11:3002${url}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: '',
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