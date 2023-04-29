
// ВИХІДНІ ДАННІ
const api_users = "https://gorest.co.in/public/v2/users";
const api_posts = "https://gorest.co.in/public/v2/posts";
const api_comments = "https://gorest.co.in/public/v2/comments";

const postDiv = document.getElementById("basic");

// ФУНКЦІЇЇ ВИКАЧУВАННЯ ІНФОРМАЦІЇ

//ЮЗЕРИ
async function getUsers (){
        let userFetch = await fetch(api_users);
        let userData =  await userFetch.json();
        userData.forEach(Object=> {
            const data = getPosts(Object);
             }); 
        return userData;
    }
getUsers()

//ПОСТИ
async function getPosts (userData){
     let postFetch = await fetch(`https://gorest.co.in/public/v2/users/${userData.id}/posts`);
     let postData =  await postFetch.json();
     for await (Object of postData) {
        if(Object.user_id === userData.id){
          const post= showPost(Object
            );}};
          console.log(postData)
         return postData;
 }


 async function showPost (postData){
    let printFectch = await fetch(`https://gorest.co.in/public/v2/posts/${postData.id}`)
    let printData = await printFectch.json();
    
        let tit=  document.createElement("div");
        postDiv.appendChild(tit)
        tit.textContent = printData.body;
 }
   
    showPost();
  
 

