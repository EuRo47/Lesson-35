//Виклик функції привітання
document.addEventListener("DOMContentLoaded", moveBar)
// ВИХІДНІ ДАННІ
const api_users = "https://gorest.co.in/public/v2/users";
const api_posts = "https://gorest.co.in/public/v2/posts";
const api_comments = "https://gorest.co.in/public/v2/comments";
const profileList = document.getElementById("profileList");
const cardPostLink = document.createElement("a");

// ФУНКЦІЇЇ ВИКАЧУВАННЯ ІНФОРМАЦІЇ

//ЮЗЕРИ
async function getUsers (){
    //Конструкція try...catch тут для виклику сatch, якщо щось піде не так
    try{
        let userFetch = await fetch(api_users);
        let userData =  await userFetch.json();
        userData.forEach(Object=> {
            const card = createProfileCards(Object);
            profileList.appendChild(card);
            
             });
             console.log(userData)
        return userData;
    }
    // Якщо користувачі не завантажилися
   catch (err){
    profileList.textContent = "Користувачі незнайдені"
    profileList.style.fontSize = "50px"
    profileList.style.display = "block"
    profileList.style.textAlign = "center"
}
   
}
getUsers();



//ПОСТИ
async function getPosts (userData){
     let postFetch = await fetch(`https://gorest.co.in/public/v2/users/${userData.id}/posts`);
       let postData =  await postFetch.json();
         console.log(postData);
         postData.forEach(Object=> {
          const post= showPost(Object);});
         return postData;
 }
 getPosts();
 async function showPost (postData){
  let f = await fetch(`https://gorest.co.in/public/v2/posts/${postData.id}`)
  let fData=  await f.json();
   function goLink (postId){
    document.querySelector("a").addEventListener("click",()=>{
      let title = document.createElement("div");
      title.textContent = fData.title;
      body.appendChild(title);
    })
   }
 }
showPost();

// МЕГАФУНКЦІЯ СТВОРЕННЯ КАРТОК
function createProfileCards (userData) {
    
    //створенння блочного елементу 
    const card = document.createElement("div");
    card.classList.add("card");

    
    //створення додаткового блоку 
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    //cтворення імені-профіля для картки
    const cardName = document.createElement("h4");
    const cardPostLink = document.createElement("a");
    cardPostLink.href= "./post-page.html";
    cardPostLink.setAttribute("id", `${userData.id}`)

    cardPostLink.addEventListener("click", showPost);
    
    if(userData.gender === "female"){
        cardPostLink.innerText = userData.name + " 👩"; 
    } else{ cardPostLink.innerText = userData.name +" 🤠"};

    //створення елементу зображення для картки
    const cardImage = document.createElement("img");
    cardImage.classList.add("profile-img");
    //для онлайн юзерів
    if(userData.status === "active"){
    cardImage.src = "https://static-00.iconduck.com/assets.00/im-user-online-icon-510x512-1jd01tdr.png"
    cardName.style.color = "green"
    card.title ="Online"
    // для офлайн юзерів
    } else {cardImage.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Breezeicons-actions-22-im-user-offline.svg/512px-Breezeicons-actions-22-im-user-offline.svg.png?20160527143720"
    cardName.style.color = "grey";
    card.title ="Offline";}
    

   
    cardName.appendChild(cardPostLink);
    cardName.classList.add("card-name");
  

    //вкладенність
    cardBody.appendChild(cardName);
    card.appendChild(cardImage);
    card.appendChild(cardBody);
    
  
    return card;
    
};
createProfileCards();

// ФУНКЦІЯ ПРОГРЕСС-БАР ПРИВІТАННЯ
function moveBar() {
    var elem = document.getElementById("Bar");
    var width = 1;
    var id = setInterval(frame, 17);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        elem.textContent = "Вибирай друга та читай останні пости"
      } else {
        width++;
        elem.style.width = width + '%';
      }
    }
  }
 
