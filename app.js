import supabase  from "./supabase.js"


let edited = false
let editId = null



let email 
let userID

async function searchBar() {
    let searchInput= document.getElementById("searchInput").value
    console.log(searchInput)

    try {
//         const { data, error } = await supabase
//   .from('post app table')
//   .select("*").order('id', { ascending: false })
//   .ilike('tittle', `%${searchInput}%`)


const { data, error } = await supabase
  .from('post app table')
  .select('*')
  .or(`tittle.ilike.%${searchInput}%,description.ilike.%${searchInput}%`)
  .order("id", { ascending: false });

if(error) {
    console.log(error)
    return;
}

renderPost(data)

    }catch(error){
        console.log(error)
    }
}
  function renderPost(postData){

  
    var posts = document.getElementById("posts");
posts.innerHTML=""

if (!postData.length) {
        posts.innerHTML = `
        <div class="p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3 text-center">
            <h5>Post not found</h5>
            <p class="mb-0">The post you're looking for doesn't exist.</p>
        </div>`;
        return;
    }

        postData.forEach(post => {
            posts.innerHTML += `
        <div class="card mb-2"data-id="${post.id}">

            <div class="card-header">${post.id}:<strong>${post.username}</strong> <br></br> @${post.email}~Post</div>

            <div
                class="card-body"
                style="
                    background-image:url('${post.bg_img}');
                    background-size:cover;
                    background-repeat:no-repeat;
                    height:200px;
                "
            >
                <figure>
                    <blockquote class="blockquote">
                        <p>${post.tittle}</p>
                    </blockquote>

                    <figcaption class="blockquote-footer">
                        ${post.description}
                    </figcaption>
                </figure>
            </div>

            <div class="ms-auto m-2">
                <button onclick="editPost(event,${post.id},'${post.tittle}','${post.description}','${post.bg_img}','${post.user_id}')" class="btn btn-success">
                    Edit
                </button>

                <button onclick="deletePost(event,${post.id})" class="btn btn-danger">
                    Delete
                </button>
            </div>

        </div>
        `
           
        });
    }


    




function showProfile(){
    let box= document.getElementById("profileBox")
    if(box.style.display==="none"){
        box.style.display="block"
    }else{
        box.style.display="none"
    }
}

async function logout() {
    const { error } = await supabase.auth.signOut()
if(!error){
  window.location.href="index.html"
}
}

window.onload = async function () {

    try {
        const { data, error } = await supabase.from('post app table').select("*").order('id', { ascending: false })

        console.log(data)

            const { data: { user } } = await supabase.auth.getUser()
            console.log("user details", user)
            let firstName = user.user_metadata.first_name;
            let firstChar = firstName.charAt(0).toUpperCase();

           console.log(firstChar);
            document.getElementById("logoutBtn").innerHTML= firstChar
            document.getElementById("userEmail").innerHTML= user.email

        
        
renderPost(data);


            if (error) console.log(error)


}catch (error) {
        console.log(error)
    }
}

var cardBg = "";

// Delete Post
async function deletePost(event, id) {
    console.log(event, id)
   try{
    const{
        data: { user }} = await supabase.auth.getUser();
const userID = user.id;

        const { error, data } = await supabase

            .from("post app table")
            .delete()
            .eq("id", id)
             .eq("user_id", userID)

            .select()
        if(error){
            console.log(error)
        }
         if(data.length===0){
            alert("you can only delete your own post")
            return
        }  
    
        var card = event.target.parentNode.parentNode;
        card.remove();

    
 }catch (error) {
        console.log(error)
    }
}


// Edit Post
async function editPost(event, id, title, description, bgImg, post_id) {

    try {
            const { data: { user } } = await supabase.auth.getUser()
console.log(user)
 if (user.id !== post_id) {
            alert("You can only edit your own post.");
            return;
        }

var card = event.target.parentNode.parentNode;

        document.getElementById("title").value = title;
        document.getElementById("description").value = description;

        cardBg = bgImg;
        editId = id;
        edited = true;
    }

catch (error) {
        console.log(error);
    }
}



let username;
let role;
// Create Post

async function post() {

    var title = document.getElementById("title");
    var description = document.getElementById("description");

    let imageUploader = document.getElementById("background-img").files[0];
    console.log(imageUploader)

    let imgFile = document.getElementById("background-img").files[0]
    console.log(imgFile)
    var posts = document.getElementById("posts");

    if (title.value.trim() && description.value.trim()) {
try {
    const { data: { user },error } = await supabase.auth.getUser()

    // console.log(user.email);
    email=user.email
    userID= user.id
    username= user.user_metadata.first_name;
    role=user.user_metadata.role

    if(error) console.log(error)
} catch (error) {
    console.log(error)
}


let imgUrl = "";

if (imageUploader) {
    let fileName = `${Date.now()}-${imageUploader.name}`;

    const { error: uploadError } = await supabase.storage
        .from("image-bucket")
        .upload(fileName, imageUploader);


    if (uploadError) {
        alert("Image upload failed")
        console.log(uploadError);
        return;
    }

    const { data:imageData } = supabase
        .storage
        .from("image-bucket")
        .getPublicUrl(fileName);

    imgUrl = imageData.publicUrl;
}
else if (cardBg) {
    imgUrl = cardBg;
}
else {
    alert("Please select an image.");
    return;
}


          if (edited) {
            try {

                const { data, error } = await supabase
                    .from('post app table')
                    .update({
                        tittle: title.value, description: description.value, bg_img: imgUrl})
                    .eq('id', editId)
                    .select();

                console.log("post data", data)
            console.log(userID)
                if (error) {
                    console.log(error);
                }


                console.log("updated data", data)

                edited = false
                edited = null

                location.reload(); // updated data show karne ke liye

                return;

            } catch (error) {
                console.log(error);
            }

        } else {

            try {

                const { data, error } = await supabase
                    .from('post app table')
                    .insert({
                        tittle: title.value,
                        description: description.value,
                        bg_img: imgUrl,
                        email:email,
                        user_id:userID,
                        username:username,
                        role:role
                    })
                    .select();
        console.log("Post data", data);

                if (error) {
                    console.log(error);
                }
                } catch (error) {
                console.log(error);
            }



                location.reload();

            

        }

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Title & description can't be empty!",
        });
    }
    title.value = ""
    description.value = ""
}

function selectImg(src) {

    cardBg = src;

    var bgImgs = document.getElementsByClassName("bg-img");

    for (var i = 0; i < bgImgs.length; i++) {
        bgImgs[i].classList.remove("selectedImg");
    }

    event.target.classList.add("selectedImg");

    console.log(cardBg);
}



window.editPost = editPost;
window.deletePost = deletePost;
window.post = post;
window.logout = logout;
window.showProfile = showProfile;
window.searchBar = searchBar;
window.selectImg = selectImg;