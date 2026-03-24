var isLogin = false;

function login(){
var email = document.getElementById("email").value
var password = document.getElementById("password").value
if(email === "batoolmazhar5@gmail.com" && password === "123"){
    isLogin = true;
//login hide hogi
        document.getElementById("enter").style.display = "none";
//postApp show hogi
document.getElementById("container").style.display = "block";

     Swal.fire({
  icon: "success",
  title: "Login Successful",
  text: "Welcome!"
});
} else{
    alert("Invalid email or password")
}
}


var cardBg
function post(){




var title = document.getElementById("title");
var description = document.getElementById("description");
var posts = document.getElementById("posts");

if(title.value.trim() && description.value.trim()){

        if(editIndex === -1){


        posts.innerHTML += `
        <div class="card mb-2">
            <div class="card-header">~Post
                <button class="edit-btn" onclick="editPost(${posts.children.length})">Edit</button>
                <button class="delete-btn" onclick="deletePost(${posts.children.length})">Delete</button>
            </div>

            <div style="background-image:url(${cardBg}); height:200px;" class="card-body">
                <figure>
                    <blockquote>
                        <p>${title.value}</p>
                    </blockquote>
                    <figcaption>${description.value}</figcaption>
                </figure>
            </div>
        </div>
        `;

        }else {

        var card = posts.children[editIndex];

        card.children[1].children[0].children[0].children[0].innerText = title.value;
        card.children[1].children[0].children[1].innerText = description.value;

        editIndex = -1;
    }

} else {
    Swal.fire({
        icon: "error",
        title: "OPPss...",
        text: "Title & description can't be empty!",
    });
}

title.value = "";
description.value = ""; 
}


//     var title = document.getElementById("title")
//     var description = document.getElementById("description")
//     console.log(title.value , description.value)
//     var posts = document.getElementById("posts")
//      if(title.value.trim() && description.value.trim()){

//         if(editIndex === -1){


//      posts.innerHTML += `
//      <div class="card mb-2">
//               <div class="card-header">~Post
//               <button onclick="editPost(${posts.children.length})">Edit</button>
//     <button onclick="deletePost(${posts.children.length})">Delete</button>
//               </div>
//               <div style="background-image:url(${cardBg}); background-size:cover; height:200px;" class="card-body">
//                 <figure>
//                   <blockquote class="blockquote">
//                     <p>
//                       ${title.value}
//                     </p>
//                   </blockquote>
//                   <figcaption class="blockquote-footer">
//                     ${description.value}
//                   </figcaption>
//                 </figure>
//               </div>
//             </div>
//             `

// } else {

//             var card = posts.children[editIndex];

//             card.children[1].children[0].innerText = title.value;
//             card.children[1].children[1].innerText = description.value;

//             editIndex = -1;


//      }else{
//         Swal.fire({
//   icon: "error",      
//   title: "OPPss...",
//   text: "Title & description can't be empty!",
// });
//      }
//      title.value =""
//      description.value=""
// }





function deletePost(i){
    var posts = document.getElementById("posts");
    posts.children[i].remove();
}

var editIndex = -1;

function editPost(i){
    var posts = document.getElementById("posts");

    var card = posts.children[i];

    var titleText = card.children[1].children[0].innerText;
    var descText = card.children[1].children[1].innerText;

    document.getElementById("title").value = titleText;
    document.getElementById("description").value = descText;

    editIndex = i;
}



function selectImg(src){
   cardBg = src;
   console.log(src, event.target.classList)
   var bgImg = document.getElementsByClassName("bg-Img")
   for(var i = 0; i < bgImg.length; i++){
   console.log(bgImg[i].className)
    bgImg[i].className= "bgImg"
   }
   event.target.classList.add("selectedImg")
}
     
