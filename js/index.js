/**
 * 태그의 ID 값을 받아온다.
 * @param {*} param 
 * @returns 
 */
 function getID(param){
  return document.getElementById(param);
}

/**
 * 태그의 class 값을 받아온다.
 * @param {*} param 
 */
function getClass(param){
  return document.getElementsByClassName(param);
}

window.onload = ()=>{
  const imageFile = getID('fileImage');
  imageFile.src = "/metadata/track/0aa362e4c8f7b0a065812bb7c8dcab804e2eb599ed4f09a72c1d8fcad245de61.png";
};

function onClickImageTest(){
  fetch(`/testPage`, {
    method: 'GET',
    //headers: { 'Content-Type': 'application/json' },
  })
  .then((res) => {
    console.log(res);
    return res.json();
  })
  .then((data) => {
    console.log(data);
    console.log('oh shit');
    
  });
}