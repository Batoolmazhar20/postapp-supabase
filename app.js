var supabase = window.supabase.createClient('https://fyzkoualaabdlnisxidl.supabase.co', 'sb_publishable_5AlMtB9W4N9fLqV3BTibSw_1C2RPUkE')


let edited = false
let editId = null

window.onload = async function () {

    try {
        const { data, error } = await supabase.from('post app table').select("*").order('id', { ascending: false })

        console.log(data)


        data.forEach(post => {

            var posts = document.getElementById("posts");


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
    try {
        const { error, data } = await supabase

            .from("post app table")
            .delete()
            .eq("id", id).select()

        var card = event.target.parentNode.parentNode;
        card.remove();


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

// Create Post
async function post() {

    var title = document.getElementById("title");
    var description = document.getElementById("description");
    var posts = document.getElementById("posts");

    if (title.value.trim() && description.value.trim()) {


        if (edited) {
            try {

                const { data, error } = await supabase
                    .from('post app table')
                    .update({
                        tittle: title.value,
                        description: description.value,
                        bg_img: cardBg
                    })
                    .eq('id', editId)
                    .select();

                console.log("post data", data)
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
                        bg_img: cardBg
                    })
                    .select();

                if (error) {
                    console.log(error);
                    return;
                }

                console.log("post data", data);

                location.reload();

            } catch (error) {
                console.log(error);
            }

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


document.getElementById("logoutBtn").addEventListener("click",logout)
async function logout() {
    const { error } = await supabase.auth.signOut()
if(!error){
  window.location.href="index.html"
}
}