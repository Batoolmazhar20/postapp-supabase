
console.log("Admin JS Loaded");
import supabase from "./supabase.js";



window.logout = logout
window.searchPosts = searchPosts

let allPosts = []

async function getPosts() {

    const { data, error } = await supabase
        .from("post app table")
        .select("*")

    if(error){
        console.log(error)
        return
    }

    allPosts = data

    document.getElementById("totalPosts").innerText = data.length

    renderPosts(data)

}
async function getUsers() {

    const { data, error } = await supabase
        .from("post app table")
        .select("user_id");

    if (error) {
        console.log(error);
        return;
    }

    const uniqueUsers = [...new Set(data.map(item => item.user_id))];

    document.getElementById("totalUsers").innerText = uniqueUsers.length;
}

function renderPosts(posts){

    const postDiv = document.getElementById("posts")

    postDiv.innerHTML=""

    posts.forEach(post=>{

        postDiv.innerHTML +=`

        <div class="card shadow mb-3">

            <div class="card-body">

                <h5>${post.tittle}</h5>

                <p>${post.description}</p>

                <button
                class="btn btn-danger"
                onclick="deletePost('${post.id}')">

                Delete

                </button>

            </div>

        </div>

        `

    })

}

window.deletePost = async function(id){

    const confirmDelete = confirm("Delete this post?")

    if(!confirmDelete) return

    await supabase
    .from("post app table")
    .delete()
    .eq("id",id)

    getPosts()

}

function searchPosts(){

    const value = document
    .getElementById("search")
    .value
    .toLowerCase()

    const filtered = allPosts.filter(post=>{

        return post.title.toLowerCase().includes(value)

    })

    renderPosts(filtered)

}

async function logout(){

    await supabase.auth.signOut()

    location.href="login.html"

}

getPosts()
getUsers()