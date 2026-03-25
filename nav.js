// document.addEventListener("DOMContentLoaded", function(){

// // localStorage'da kullanıcı var mı kontrol et
// const user = localStorage.getItem("user")

// const guestMenu = document.getElementById("guestMenu")
// const userMenu = document.getElementById("userMenu")
// const logoutBtn = document.getElementById("logoutBtn")

// // Eğer kullanıcı login ise
// if(user){

// if(guestMenu){
// guestMenu.style.display = "none"
// }

// if(userMenu){
// userMenu.style.display = "flex"
// }

// }
// // Eğer kullanıcı login değilse
// else{

// if(guestMenu){
// guestMenu.style.display = "flex"
// }

// if(userMenu){
// userMenu.style.display = "none"
// }

// }


// // Logout butonu varsa çalıştır
// if(logoutBtn){

// logoutBtn.addEventListener("click", function(){

// localStorage.removeItem("user")

// window.location.href = "index.html"

// })

// }

// })

document.addEventListener("DOMContentLoaded", function () {

  const user = localStorage.getItem("user")

  const guestMenu = document.getElementById("guestMenu")
  const userMenu = document.getElementById("userMenu")
  const logoutBtn = document.getElementById("logoutBtn")
  const loginForm = document.getElementById("loginForm")

  // Login sayfasında (loginForm varsa) her zaman guest menüsü göster
  if (loginForm) {
    if (guestMenu) guestMenu.style.display = "flex"
    if (userMenu) userMenu.style.display = "none"

    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault()

      const phone = document.getElementById("phone").value.trim()
      const password = document.getElementById("password").value.trim()

      if (!phone || !password) return

      try {
        const response = await fetch("https://rentcar.stepprojects.ge/api/Users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phoneNumber: phone, password: password })
        })

        if (response.ok) {
          const data = await response.json()
          localStorage.setItem("user", JSON.stringify(data))
          window.location.href = "index.html"
        } else {
          alert("ტელეფონის ნომერი ან პაროლი არასწორია")
        }
      } catch (err) {
        alert("სერვერთან კავშირი ვერ მოხერხდა")
        console.error(err)
      }
    })

    return // Login sayfasında buradан sonrasını çalıştırma
  }

  // Diğer sayfalar için normal kontrol
if (user) {
    if (guestMenu) guestMenu.setAttribute("hidden", true)
    if (userMenu) userMenu.removeAttribute("hidden")
} else {
    if (guestMenu) guestMenu.removeAttribute("hidden")
    if (userMenu) userMenu.setAttribute("hidden", true)
}

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      localStorage.removeItem("user")
      window.location.href = "index.html"
    })
  }

})




