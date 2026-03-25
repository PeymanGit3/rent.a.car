const BASE = "https://rentcar.stepprojects.ge"

const params = new URLSearchParams(window.location.search)
const carId = params.get("id")

const carName = document.getElementById("carName")
const carImage = document.getElementById("carImage")
const city = document.getElementById("city")
const price = document.getElementById("price")
const capacity = document.getElementById("capacity")
const year = document.getElementById("year")

const rentBtn = document.getElementById("rentBtn")

const raw = localStorage.getItem("user")
const user = raw ? JSON.parse(raw) : null


async function getCar(){

const res = await fetch(BASE + "/api/Car/" + carId)
const car = await res.json()

carName.innerText = car.brand + " " + car.model
carImage.src = car.imageUrl1

city.innerText = car.city
price.innerText = car.price
capacity.innerText = car.capacity
year.innerText = car.year

}

getCar()



rentBtn.addEventListener("click", async ()=>{

if(!user){
alert("Please login first")
return
}

const days = document.getElementById("days").value

const purchase = {
carId: carId,
phoneNumber: user.phoneNumber,
days: days
}

const res = await fetch(BASE + "/Purchase/purchase",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(purchase)
})

if(res.ok){
alert("Car rented successfully")
}else{
alert("Error while renting")
}

})