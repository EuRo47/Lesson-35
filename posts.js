
// ВИХІДНІ ДАННІ
const api_users = "https://gorest.co.in/public/v2/users";
const api_posts = "https://gorest.co.in/public/v2/posts";
const api_comments = "https://gorest.co.in/public/v2/comments";

const postDiv = document.getElementById("basic");
const userBox = document.getElementById("username")





// ФУНКЦІЇЇ ВИКАЧУВАННЯ ІНФОРМАЦІЇ
async function getUsers (){

  const user = getIdFromUrl();
  let userFetch = await fetch(api_users);
  let userData =  await userFetch.json();
  userData.forEach(Object=> {
    if(parseInt(Object.id) ===  parseInt(user)){
    const userName = document.createElement("h1")
    const userStatus = document.createElement("h4")
    userName.textContent = Object.name
    userStatus.textContent = Object.status
    userName.style.marginBottom = "0px"
    userStatus.style.marginTop = "5px"
    userBox.appendChild(userName)
    userBox.appendChild(userStatus)
    
}});
      console.log(userData)
      return userData;
      

}
getUsers();






function getIdFromUrl (){
  const params = new URL(document.location).searchParams
  return (params.get("user"));
}


async function getPosts () {
 
  const user = getIdFromUrl();
  const response = await fetch (`https://gorest.co.in/public/v2/users/${user}/posts`)
  const post = await response.json()
  
  if(post.length === 0) {
    const err = document.createElement("h4")
    err.textContent = "У даного користувача відсутні пости "
    err.style.position = "relative"
    err.style.left = "-72px"

    const homePage = document.createElement("a")
    homePage.innerText = "назад";
    homePage.href = "./index.html"

    const homeSpan = document.createElement("span")
    homeSpan.textContent = `Повернутися `

    userBox.appendChild(err)
    homeSpan.appendChild(homePage)
    userBox.appendChild(homeSpan)
  }
  
  post.forEach(element => {

   const title =  document.createElement("a")
   const titleInsert = document.createElement("span")
   const smallDiscr = document.createElement("p")

    
   titleInsert.textContent = "Post title: " 
   title.innerText = element.title
   title.href =`./post.html?post=${element.id}`
   

   smallDiscr.innerText = "Post preview: "+ element.body
   smallDiscr.style.width = "333px" 
   smallDiscr.style.overflow ="hidden"
   smallDiscr.style.whiteSpace ="nowrap"
   smallDiscr.style.textOverflow = "ellipsis" 
 
  
   titleInsert.appendChild(title)
   userBox.appendChild(titleInsert)
   userBox.appendChild(smallDiscr)
  
   
  
  
})
  return post


}





getPosts()


 

