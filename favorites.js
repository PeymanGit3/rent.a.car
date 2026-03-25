const BASE = "https://rentcar.stepprojects.ge"

const raw = localStorage.getItem("user")
const user = raw ? JSON.parse(raw) : null

if(!user){
console.log("User not logged in")
}else{

const userId = user.id

document.querySelectorAll(".heart-btn").forEach(btn=>{

btn.addEventListener("click", async ()=>{

const carId = btn.dataset.id

try{

await fetch(`${BASE}/api/Users/${userId}/favorites/${carId}`,{
method:"POST"
})

btn.classList.toggle("liked")

}catch(err){

console.log("Favorite error:",err)

}

})

})

}