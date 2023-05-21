
// ВИХІДНІ ДАННІ
const api_users = "https://gorest.co.in/public/v2/users";
const api_posts = "https://gorest.co.in/public/v2/posts";
const api_comments = "https://gorest.co.in/public/v2/comments";

const postDiv = document.getElementById("basic");
const userBox = document.getElementById("username")






function getIdFromUrl (){
  const params = new URL(document.location).searchParams
  return (params.get("post"));
}


async function getPosts () {
 
  const postId = getIdFromUrl();
  const response = await fetch (`https://gorest.co.in/public/v2/posts/${postId}`)
  const post = await response.json()

  const commResponse = await fetch (`https://gorest.co.in/public/v2/posts/${postId}/comments`) 
  const commPost = await commResponse.json()
  console.log(commPost);



  
 
    const title =  document.createElement("h1")
    title.textContent = post.title
   

    const smallDiscr = document.createElement("p")
    smallDiscr.textContent = post.body
    smallDiscr.style.border ="3px solid skyblue"
    smallDiscr.style.borderRadius = "8px"
    smallDiscr.style.padding = "15px"
    
    const homePage = document.createElement("a")
    homePage.innerText = "назад";
    homePage.href = `./post-page.html?user=${post.user_id}`
    
    const commDiv = document.createElement("div")
    const commentTitle = document.createElement("h2")
    commentTitle.textContent = "Комментарі: "
    commDiv.appendChild(commentTitle)
   
    if(commPost.length === 0) {
      const commentErr = document.createElement("h4")
      commentErr.textContent = "Коментарі відсутні"
      commDiv.appendChild(commentErr)
    }


    commPost.forEach(element => {
      const commentContainer = document.createElement("div")
      const realComment = document.createElement("p")
      realComment.textContent = element.body
      realComment.style.border ="2px solid skyblue"
      realComment.style.borderRadius = "8px"
      realComment.style.padding = "15px"

      const authorComment = document.createElement("h4")
      authorComment.textContent = element.name + " каже:"
   
      commentContainer.appendChild(authorComment)
      commentContainer.appendChild(realComment)
      commDiv.appendChild(commentContainer)
    });
    
    
   

    userBox.appendChild(title)
    userBox.appendChild(smallDiscr)
    
    userBox.appendChild(commDiv)
    userBox.appendChild(homePage)
    
    

  ;  
}

getPosts()

