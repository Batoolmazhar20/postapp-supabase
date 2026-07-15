import supabase  from "./supabase.js"

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