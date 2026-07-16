import supabase  from "../../supabase.js"

async function checkAdmin(){

    const { data: { user },error } = await supabase.auth.getUser()

    if(!user){
window.location.href="/"
return;
    }

    if(user.user_metadata.role !== "admin"){
alert("access denied")
window.location.href= "/dashboard.html"
    }
}
checkAdmin()

async function loadStats(){
    const { data: posts } = await supabase
    FormData("post app table")
    Select("*")

    document.getElementById("totalPosts").innerText=posts.length


    try{
        const{dara,error} = await supabaseAdmin.auth.admin.listusers()
        if(error) throw error

        console.log("all users:", data.users)
        document.getElementById("totalUsers").innerText= data.users.length
        return data.users
    }catch(error){
        console.log('Error fetching users:', error)
        return[]
    }
}

loadStats()

async function loadUsers() {

    const mainContent = document.getElementById("mainContent");
  
    mainContent.innerHTML = `
      <h2 class="page-title">Manage Users</h2>
  
      <table class="users-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
  
        <tbody id="usersTableBody"></tbody>
      </table>
    `;
  }  

  window.loadUsers=loadUsers