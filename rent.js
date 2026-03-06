  // Toggle heart button active state
  document.querySelectorAll(".heart-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
    });
  });


// Slider functionality
    document.querySelectorAll(".slider").forEach(slider => {

    const slides = slider.querySelector(".slides");
    const images = slides.querySelectorAll("img");
    let index = 0;

    slider.addEventListener("click", () => {
      index++;

      if (index >= images.length) {
        index = 0;
      }

      slides.style.transform = `translateX(-${index * 100}%)`;
    });

  });

// Registration form submission
 const form = document.getElementById("registerForm")

  form.addEventListener("submit", async function(e){

    e.preventDefault()

    const user = {

      phoneNumber: document.getElementById("phone").value,
      password: document.getElementById("password").value,
      email: document.getElementById("email").value,
      firstName: document.getElementById("name").value,
      lastName: document.getElementById("surname").value,
      role: "User"

    }

    try{

    const response = await fetch(
      "https://rentcar.stepprojects.ge/api/Users/register",
      {
          method: "POST",

          headers:{
          "Content-Type":"application/json"
          },

          body: JSON.stringify(user)

      })

      const data = await response.json()

      console.log(data)

    }catch(error){

      console.log(error)

    }

})

// Success message

const congratulate = document.getElementById("registerForm")

congratulate.addEventListener("submit", async function(e){

e.preventDefault()

const user = {

phoneNumber: document.getElementById("phone").value,
password: document.getElementById("password").value,
email: document.getElementById("email").value,
firstName: document.getElementById("name").value,
lastName: document.getElementById("surname").value,
role: "User"

}

try{

const response2 = await fetch(
"https://rentcar.stepprojects.ge/api/Users/register",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(user)
})

const text = await response2.text()

console.log(text)

// Passing to Login page 
if(response2.ok){

document.getElementById("registerContainer").style.display = "none"

document.getElementById("successMessage").style.display = "block"

if(response2.ok){

document.getElementById("registerContainer").style.display = "none"

document.getElementById("successMessage").style.display = "block"

setTimeout(()=>{
window.location.href = "login.html"
},2000)

}

// Success message & Passing to Login page 
}

}catch(error){

console.log(error)

}

})








