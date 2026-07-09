var supabase = window.supabase.createClient('https://fyzkoualaabdlnisxidl.supabase.co', 'sb_publishable_5AlMtB9W4N9fLqV3BTibSw_1C2RPUkE')


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

    var posts = document.getElementById("posts");
posts.innerHTML=""
        data.forEach(post => {
            posts.innerHTML += `
        <div class="card mb-2"data-id="${post.id}">

            <div class="card-header">${post.id}~Post</div>

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
                <button onclick="editPost(event,${post.id},'${post.tittle}','${post.description}','${post.bg_img}')" class="btn btn-success">
                    Edit
                </button>

                <button onclick="deletePost(event,${post.id})" class="btn btn-danger">
                    Delete
                </button>
            </div>

        </div>
        `
           
        });
console.log(data)
if(!data.length){
    posts.innerHTML=`
    <div class="d-flex-justigy-content-center align-items-center" style="height: 30vh"> </div>
<div class="p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3 text-center">

<h5>Post not found</h5>
<p class="mb-0">The post you're looking for doesn't exist.</p>
</div>`
}

    if(error) console.log(error)

    } catch (error) {
        console.log(error)
    }
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

        data.forEach(post => {

            var posts = document.getElementById("posts");


            posts.innerHTML += `
        <div class="card mb-2"data-id="${post.id}">

            <div class="card-header">ID:${post.id}:<strong>${post.username}</strong> <br></br> @${post.email}~Post</div>

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
            if (error) console.log(error)

        });
    }


    catch (error) {
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
userID=user.id
console.log(post_id,user.id)
    } catch (error) {
        console.log(error)
    }


}



// Edit Post
function editPost(event, id, title, description, bgImg) {

    // var event= window.event

    var card = event.target.parentNode.parentNode;
    var realId = card.getAttribute("data-id")

    // var title =
    //     card.children[1].children[0].children[0].children[0].innerText;

    // var description =
    //     card.children[1].children[0].children[1].innerText;

    document.getElementById("title").value = title;
    document.getElementById("description").value = description;

    cardBg = bgImg;
    editId = id;     // id save
    edited = true;
}

let username;
// Create Post

async function post() {

    var title = document.getElementById("title");
    var description = document.getElementById("description");

    let imageUploader = document.getElementById("imgInput").files[0];
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

    if(error) console.log(error)
} catch (error) {
    console.log(error)
}

let imageUrl=""

if(imageUploader){
    let fileName = `${Date.now}`//name ma shuru k 3 ya 4 index le lana ha ya phr shigt /pop kr k //
  
const {  error:imageError } = await supabase
  .storage
  .from('image-bucket')
  .upload(fileName, imageUploader, {
    cacheControl: '3600',
    upsert: false
  })
}
if(imageError){
    alert("image can not be uploaded")
    console.log(imageError)
}

const { data:imageData } = supabase
  .storage
  .from('post-bucket')
  .getPublicUrl('folder/avatar1.png')

let imgUrl =""

if(imgFile){
    let fileName=`${Date.now()}-${imgFile.name}`
    const { error: uploadError } = await supabase
        .storage
        .from('image-bucket')
        .upload(fileName, imgFile, {
        cacheControl: '3600',
        upsert: false
    })
        if(uploadError){
            alert("image can not be uploaded")
            console.log(uploadError)
            return
        }
        const{ data:imageData} = supabase
        .storage
        .from('image-bucket')
        .getPublicUrl(fileName)
        console.log(imageData.publicUrl)
        imgUrl=imageData.publicUrl
}else if(cardBg){
   imgUrl=cardBg
}else{
    alert("select the image")
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
                        username:username
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

            // } catch (error) {
            //     console.log(error);
            // }

        }




        posts.innerHTML += `
        <div class="card mb-2">

            <div class="card-header">~Post</div>

            <div
                class="card-body"
                style="
                    background-image:url('${cardBg}');
                    background-size:cover;
                    background-repeat:no-repeat;
                    height:200px;
                "
            >
                <figure>
                    <blockquote class="blockquote">
                        <p>${title.value}</p>
                    </blockquote>

                    <figcaption class="blockquote-footer">
                        ${description.value}
                    </figcaption>
                </figure>
            </div>

            <div class="ms-auto m-2">
                <button onclick="editPost()" class="btn btn-success">
                    Edit
                </button>

                <button onclick="deletePost()" class="btn btn-danger">
                    Delete
                </button>
            </div>

        </div>
        `;

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

