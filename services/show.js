module.exports = {
  showAll : (userID, userName)=>{
    console.log(`userID : ${userID}`);
    console.log(`userName : ${userName}`);
  },
  putStringAtUserID : (userID)=>{
    return `${userID} : 무야호~`;
  }
}