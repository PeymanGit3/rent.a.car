// const BASE = "https://rentcar.stepprojects.ge"

// const raw = localStorage.getItem("user")
// const user = raw ? JSON.parse(raw) : null

// const main = document.getElementById("mainContent")

// // Not logged in
// if (!user) {
//   main.innerHTML = `
//     <div class="not-logged">
//       <i class="fa-solid fa-lock"></i>
//       <h2>პროფილი მიუწვდომელია</h2>
//       <p>პროფილის სანახავად გთხოვთ გაიაროთ ავტორიზაცია</p>
//       <a href="./login.html">შესვლა</a>
//     </div>`
// } else {
//   renderProfile()
// }

// async function renderProfile() {
//   const phone     = user.phoneNumber || user.phone || ""
//   const firstName = user.firstName   || user.name  || ""
//   const lastName  = user.lastName    || ""
//   const initials  = (firstName[0] || "U") + (lastName[0] || "")

//   main.innerHTML = `
//     <div class="profile-hero">
//       <div class="profile-hero-inner">
//         <div class="avatar">${initials.toUpperCase()}</div>
//         <div class="profile-info">
//           <h1>${firstName} ${lastName}</h1>
//           <p><i class="fa-solid fa-phone" style="margin-right:6px;color:var(--accent)"></i>${phone}</p>
//           <div class="profile-stats">
//             <div class="stat"><div class="stat-num" id="statRented">—</div><div class="stat-label">ნაქირავები</div></div>
//             <div class="stat"><div class="stat-num" id="statFavs">—</div><div class="stat-label">მოწონებული</div></div>
//             <div class="stat"><div class="stat-num" id="statMyCars">—</div><div class="stat-label">განცხადება</div></div>
//           </div>
//         </div>
//       </div>
//     </div>

//     <div class="tabs-bar">
//       <div class="tabs-inner">
//         <button class="tab-btn active" data-tab="rented">
//           <i class="fa-solid fa-key"></i> ნაქირავები მანქანები
//           <span class="tab-badge" id="badgeRented">0</span>
//         </button>
//         <button class="tab-btn" data-tab="favs">
//           <i class="fa-solid fa-heart"></i> მოწონებული
//           <span class="tab-badge" id="badgeFavs">0</span>
//         </button>
//         <button class="tab-btn" data-tab="mycars">
//           <i class="fa-solid fa-car"></i> ჩემი განცხადებები
//           <span class="tab-badge" id="badgeMyCars">0</span>
//         </button>
//       </div>
//     </div>

//     <div class="profile-main">
//       <div class="tab-panel active" id="tab-rented">
//         <div class="loading"><div class="spinner"></div><p>იტვირთება...</p></div>
//       </div>
//       <div class="tab-panel" id="tab-favs">
//         <div class="loading"><div class="spinner"></div><p>იტვირთება...</p></div>
//       </div>
//       <div class="tab-panel" id="tab-mycars">
//         <div class="loading"><div class="spinner"></div><p>იტვირთება...</p></div>
//       </div>
//     </div>
//   `

//   // Tab switching
// // ----------------------- FOR TABS ---------------------------
// document.querySelectorAll(".tab-btn").forEach(btn=>{

// btn.addEventListener("click",()=>{

// document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"))
// document.querySelectorAll(".tab-panel").forEach(p=>p.classList.remove("active"))

// btn.classList.add("active")

// document.getElementById("tab-"+btn.dataset.tab).classList.add("active")

// })

// })
// // ----------------------- FOR TABS ---------------------------

//   // Load all sections
//   await Promise.all([
//     loadRented(phone),
//     loadFavorites(phone),
//     loadMyCars(phone)
//   ])
// }

// // ---------------------- RENTED -----------------------
// async function loadRented(phone) {
//   const panel = document.getElementById("tab-rented")
//   try {
// const res = await fetch(`${BASE}/Purchase/${phone}`)
//     if (!res.ok) throw new Error()
//     const data = await res.json()
//     const cars = Array.isArray(data) ? data : (data.cars || data.rentedCars || [])

//     document.getElementById("statRented").textContent = cars.length
//     document.getElementById("badgeRented").textContent = cars.length

//     if (!cars.length) { panel.innerHTML = emptyState("fa-key", "ნაქირავები მანქანა არ გაქვთ"); return }

//     panel.innerHTML = `
//       <div class="section-title"><i class="fa-solid fa-key"></i> ნაქირავები მანქანები</div>
//       <div class="rental-list">
//         ${cars.map(c => `
//           <div class="rental-card">
//             <div class="rental-icon"><i class="fa-solid fa-car"></i></div>
//             <div class="rental-info">
//               <div class="rental-name">${c.brand || ""} ${c.model || c.carModel || ""}</div>
//               <div class="rental-meta">
//                 <span class="rental-tag"><i class="fa-solid fa-location-dot"></i> ${c.city || "—"}</span>
//                 <span class="rental-tag"><i class="fa-solid fa-calendar-days"></i> ${c.days || c.rentalDays || "—"} დღე</span>
//               </div>
//             </div>
//             <div class="rental-price">${c.totalPrice || c.paidAmount || "—"} <span>₾</span></div>
//           </div>`).join("")}
//       </div>`
//   } catch {
//     panel.innerHTML = emptyState("fa-key", "ნაქირავები მანქანა არ გაქვთ")
//     document.getElementById("statRented").textContent = "0"
//     document.getElementById("badgeRented").textContent = "0"
//   }
// }
// // ---------------------- RENTED --------------------

// // ---------------------- FAVORITES --------------------
// async function loadFavorites(phone) {
//   const panel = document.getElementById("tab-favs")
//   try {
// const res = await fetch(`${BASE}/api/Car/byPhone?phoneNumber=${phone}`)
//     if (!res.ok) throw new Error()
//     const data = await res.json()
//     const cars = Array.isArray(data) ? data : (data.favoriteCars || data.cars || [])

//     document.getElementById("statFavs").textContent = cars.length
//     document.getElementById("badgeFavs").textContent = cars.length

//     if (!cars.length) { panel.innerHTML = emptyState("fa-heart", "მოწონებული მანქანა არ გაქვთ"); return }

//     panel.innerHTML = `
//       <div class="section-title"><i class="fa-solid fa-heart"></i> მოწონებული მანქანები</div>
//       <div class="car-grid">${cars.map(c => carCard(c, true)).join("")}</div>`
//   } catch {
//     panel.innerHTML = emptyState("fa-heart", "მოწონებული მანქანა არ გაქვთ")
//     document.getElementById("statFavs").textContent = "0"
//     document.getElementById("badgeFavs").textContent = "0"
//   }
// }
// // ---------------------- FAVORITES --------------------

// // ---------------------- MY CARS --------------------
// async function loadMyCars(phone) {
//   const panel = document.getElementById("tab-mycars")
//   try {
//     const res = await fetch(`${BASE}/api/Car/byPhone?phoneNumber=${phone}`)
//     if (!res.ok) throw new Error()
//     const data = await res.json()
//     const cars = Array.isArray(data) ? data : (data.cars || data.myCars || data.listedCars || [])

//     document.getElementById("statMyCars").textContent = cars.length
//     document.getElementById("badgeMyCars").textContent = cars.length

//     if (!cars.length) { panel.innerHTML = emptyState("fa-car", "განცხადება არ გაქვთ"); return }

//     panel.innerHTML = `
//       <div class="section-title"><i class="fa-solid fa-car"></i> ჩემი განცხადებები</div>
//       <div class="car-grid">${cars.map(c => carCard(c, false)).join("")}</div>`
//   } catch {
//     panel.innerHTML = emptyState("fa-car", "განცხადება არ გაქვთ")
//     document.getElementById("statMyCars").textContent = "0"
//     document.getElementById("badgeMyCars").textContent = "0"
//   }
// }
// // ---------------------- MY CARS --------------------

// function carCard(c, showFavBadge) {
//   const imgSrc = c.imageUrl || c.image || c.photo || ""
//   return `
//     <div class="car-card">
//       <div class="car-card-img">
//         ${imgSrc ? `<img src="${imgSrc}" alt="${c.brand} ${c.model}">` : `<i class="fa-solid fa-car"></i>`}
//         ${showFavBadge ? `<div class="car-fav-badge"><i class="fa-solid fa-heart"></i></div>` : ""}
//       </div>
//       <div class="car-card-body">
//         <div class="car-card-title">${c.brand || ""} ${c.model || c.carModel || ""}</div>
//         <div class="car-card-meta">
//           ${c.year         ? `<span class="car-chip"><i class="fa-solid fa-calendar" style="margin-right:4px"></i>${c.year}</span>` : ""}
//           ${c.transmission ? `<span class="car-chip">${c.transmission}</span>` : ""}
//           ${c.seats        ? `<span class="car-chip"><i class="fa-solid fa-users" style="margin-right:4px"></i>${c.seats}</span>` : ""}
//         </div>
//         <div class="car-card-footer">
//           <div class="car-price">${c.pricePerDay || c.dailyPrice || "—"} <span>₾/დღე</span></div>
//           <div class="car-city"><i class="fa-solid fa-location-dot"></i> ${c.city || "—"}</div>
//         </div>
//       </div>
//     </div>`
// }

// function emptyState(icon, text) {
//   return `<div class="empty-state"><i class="fa-solid ${icon}"></i><p>${text}</p></div>`
// }

//ooooo

const BASE = "https://rentcar.stepprojects.ge"

const raw = localStorage.getItem("user")
const user = raw ? JSON.parse(raw) : null

const main = document.getElementById("mainContent")

// ───────────────────────────────────────────
// 1. GİRİŞ KONTROLÜ
// ───────────────────────────────────────────
if (!user) {
  main.innerHTML = `
    <div class="not-logged">
      <i class="fa-solid fa-lock"></i>
      <h2>პროფილი მიუწვდომელია</h2>
      <p>პროფილის სანახავად გთხოვთ გაიაროთ ავტორიზაცია</p>
      <a href="./login.html">შესვლა</a>
    </div>`
} else {
  renderProfile()
}

// ───────────────────────────────────────────
// 2. ANA PROFİL ŞABLONU
// ───────────────────────────────────────────
async function renderProfile() {
  const phone     = user.phoneNumber || user.phone || ""
  const firstName = user.firstName   || user.name  || ""
  const lastName  = user.lastName    || ""
  const initials  = (firstName[0] || "U") + (lastName[0] || "")

  main.innerHTML = `
    <div class="profile-hero">
      <div class="profile-hero-inner">
        <div class="avatar">${initials.toUpperCase()}</div>
        <div class="profile-info">
          <h1>${firstName} ${lastName}</h1>
          <p><i class="fa-solid fa-phone" style="margin-right:6px;color:var(--accent)"></i>${phone}</p>
          <div class="profile-stats">
            <div class="stat"><div class="stat-num" id="statRented">—</div><div class="stat-label">ნაქირავები</div></div>
            <div class="stat"><div class="stat-num" id="statFavs">—</div><div class="stat-label">მოწონებული</div></div>
            <div class="stat"><div class="stat-num" id="statMyCars">—</div><div class="stat-label">განცხადება</div></div>
          </div>
        </div>
      </div>
    </div>

    <div class="tabs-bar">
      <div class="tabs-inner">
        <button class="tab-btn active" data-tab="rented">
          <i class="fa-solid fa-key"></i> ნაქირავები მანქანები
          <span class="tab-badge" id="badgeRented">0</span>
        </button>
        <button class="tab-btn" data-tab="favs">
          <i class="fa-solid fa-heart"></i> მოწონებული
          <span class="tab-badge" id="badgeFavs">0</span>
        </button>
        <button class="tab-btn" data-tab="mycars">
          <i class="fa-solid fa-car"></i> ჩემი განცხადებები
          <span class="tab-badge" id="badgeMyCars">0</span>
        </button>
      </div>
    </div>

    <div class="profile-main">
      <div class="tab-panel active" id="tab-rented">
        <div class="loading"><div class="spinner"></div><p>იტვირთება...</p></div>
      </div>
      <div class="tab-panel" id="tab-favs">
        <div class="loading"><div class="spinner"></div><p>იტვირთება...</p></div>
      </div>
      <div class="tab-panel" id="tab-mycars">
        <div class="loading"><div class="spinner"></div><p>იტვირთება...</p></div>
      </div>
    </div>
  `

  // Tab geçişleri
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"))
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"))
      btn.classList.add("active")
      document.getElementById("tab-" + btn.dataset.tab).classList.add("active")
    })
  })

  // Tüm bölümleri paralel yükle
  await Promise.all([
    loadRented(phone),
    loadFavorites(phone),
    loadMyCars(phone)
  ])
}

// ───────────────────────────────────────────
// 3. KİRALANAN ARABALAR
// API: GET /Purchase/{phoneNumber}
// ───────────────────────────────────────────
async function loadRented(phone) {
  const panel = document.getElementById("tab-rented")
  try {
    const res = await fetch(`${BASE}/Purchase/${phone}`)
    if (!res.ok) throw new Error()
    const data = await res.json()
    const cars = Array.isArray(data) ? data : (data.cars || data.rentedCars || [])

    document.getElementById("statRented").textContent = cars.length
    document.getElementById("badgeRented").textContent = cars.length

    if (!cars.length) { panel.innerHTML = emptyState("fa-key", "ნაქირავები მანქანა არ გაქვთ"); return }

    panel.innerHTML = `
      <div class="section-title"><i class="fa-solid fa-key"></i> ნაქირავები მანქანები</div>
      <div class="rental-list">
        ${cars.map(c => `
          <div class="rental-card">
            <div class="rental-icon"><i class="fa-solid fa-car"></i></div>
            <div class="rental-info">
              <div class="rental-name">${c.brand || ""} ${c.model || c.carModel || ""}</div>
              <div class="rental-meta">
                <span class="rental-tag"><i class="fa-solid fa-location-dot"></i> ${c.city || "—"}</span>
                <span class="rental-tag"><i class="fa-solid fa-calendar-days"></i> ${c.days || c.rentalDays || "—"} დღე</span>
              </div>
            </div>
            <div class="rental-price">${c.totalPrice || c.paidAmount || "—"} <span>₾</span></div>
          </div>`).join("")}
      </div>`
  } catch {
    panel.innerHTML = emptyState("fa-key", "ნაქირავები მანქანა არ გაქვთ")
    document.getElementById("statRented").textContent = "0"
    document.getElementById("badgeRented").textContent = "0"
  }
}

// ───────────────────────────────────────────
// 4. BEĞENİLEN ARABALAR  ✅ DÜZELTME BURADA
// API: GET /api/Users/{phoneNumber}/favorite-cars
// ───────────────────────────────────────────
async function loadFavorites(phone) {
  const panel = document.getElementById("tab-favs")
  try {
    const res = await fetch(`${BASE}/api/Users/${phone}/favorite-cars`)
    if (!res.ok) throw new Error()
    const data = await res.json()
    const cars = Array.isArray(data) ? data : (data.favoriteCars || data.cars || [])

    document.getElementById("statFavs").textContent = cars.length
    document.getElementById("badgeFavs").textContent = cars.length

    if (!cars.length) { panel.innerHTML = emptyState("fa-heart", "მოწონებული მანქანა არ გაქვთ"); return }

    panel.innerHTML = `
      <div class="section-title"><i class="fa-solid fa-heart"></i> მოწონებული მანქანები</div>
      <div class="car-grid">${cars.map(c => carCard(c, true)).join("")}</div>`
  } catch {
    panel.innerHTML = emptyState("fa-heart", "მოწონებული მანქანა არ გაქვთ")
    document.getElementById("statFavs").textContent = "0"
    document.getElementById("badgeFavs").textContent = "0"
  }
}

// ───────────────────────────────────────────
// 5. KENDİ İLANLARI  ✅ AYNI KALIR (doğru endpoint)
// API: GET /api/Car/byPhone?phoneNumber={phone}
// ───────────────────────────────────────────
async function loadMyCars(phone) {
  const panel = document.getElementById("tab-mycars")
  try {
    const res = await fetch(`${BASE}/api/Car/byPhone?phoneNumber=${phone}`)
    if (!res.ok) throw new Error()
    const data = await res.json()
    const cars = Array.isArray(data) ? data : (data.cars || data.myCars || data.listedCars || [])

    document.getElementById("statMyCars").textContent = cars.length
    document.getElementById("badgeMyCars").textContent = cars.length

    if (!cars.length) { panel.innerHTML = emptyState("fa-car", "განცხადება არ გაქვთ"); return }

    panel.innerHTML = `
      <div class="section-title"><i class="fa-solid fa-car"></i> ჩემი განცხადებები</div>
      <div class="car-grid">${cars.map(c => carCard(c, false)).join("")}</div>`
  } catch {
    panel.innerHTML = emptyState("fa-car", "განცხადება არ გაქვთ")
    document.getElementById("statMyCars").textContent = "0"
    document.getElementById("badgeMyCars").textContent = "0"
  }
}

// ───────────────────────────────────────────
// 6. ARABA KARTI BİLEŞENİ
// ───────────────────────────────────────────
function carCard(c, showFavBadge) {
  const imgSrc = c.imageUrl || c.image || c.photo || ""
  return `
    <div class="car-card">
      <div class="car-card-img">
        ${imgSrc ? `<img src="${imgSrc}" alt="${c.brand} ${c.model}">` : `<i class="fa-solid fa-car"></i>`}
        ${showFavBadge ? `<div class="car-fav-badge"><i class="fa-solid fa-heart"></i></div>` : ""}
      </div>
      <div class="car-card-body">
        <div class="car-card-title">${c.brand || ""} ${c.model || c.carModel || ""}</div>
        <div class="car-card-meta">
          ${c.year         ? `<span class="car-chip"><i class="fa-solid fa-calendar" style="margin-right:4px"></i>${c.year}</span>` : ""}
          ${c.transmission ? `<span class="car-chip">${c.transmission}</span>` : ""}
          ${c.seats        ? `<span class="car-chip"><i class="fa-solid fa-users" style="margin-right:4px"></i>${c.seats}</span>` : ""}
        </div>
        <div class="car-card-footer">
          <div class="car-price">${c.pricePerDay || c.dailyPrice || "—"} <span>₾/დღე</span></div>
          <div class="car-city"><i class="fa-solid fa-location-dot"></i> ${c.city || "—"}</div>
        </div>
      </div>
    </div>`
}

// ───────────────────────────────────────────
// 7. BOŞ DURUM GÖSTERGESI
// ───────────────────────────────────────────
function emptyState(icon, text) {
  return `<div class="empty-state"><i class="fa-solid ${icon}"></i><p>${text}</p></div>`
}





// const BASE = "https://rentcar.stepprojects.ge"

// const raw = localStorage.getItem("user")
// const user = raw ? JSON.parse(raw) : null

// const main = document.getElementById("mainContent")

// if (!user) {

// main.innerHTML = `
// <div class="not-logged">
// <i class="fa-solid fa-lock"></i>
// <h2>პროფილი მიუწვდომელია</h2>
// <p>გთხოვთ გაიაროთ ავტორიზაცია</p>
// <a href="./login.html">შესვლა</a>
// </div>
// `

// } else {

// renderProfile()

// }

// async function renderProfile(){

// const phone = user.phoneNumber
// const firstName = user.firstName
// const lastName = user.lastName

// const initials = firstName[0] + lastName[0]

// main.innerHTML = `
// <div class="profile-hero">

// <div class="profile-hero-inner">

// <div class="avatar">
// ${initials.toUpperCase()}
// </div>

// <div class="profile-info">

// <h1>${firstName} ${lastName}</h1>

// <p>
// <i class="fa-solid fa-phone"></i>
// ${phone}
// </p>

// </div>

// </div>

// </div>

// <div class="tabs-bar">

// <button class="tab-btn active" data-tab="rented">
// ნაქირავები მანქანები
// </button>

// <button class="tab-btn" data-tab="favs">
// მოწონებული მანქანები
// </button>

// <button class="tab-btn" data-tab="mycars">
// ჩემი განცხადებები
// </button>

// </div>

// <div class="profile-main">

// <div id="tab-rented" class="tab-panel active"></div>

// <div id="tab-favs" class="tab-panel"></div>

// <div id="tab-mycars" class="tab-panel"></div>

// </div>
// `
// loadStats(phone)

// // ----------------------- FOR TABS ---------------------------
// document.querySelectorAll(".tab-btn").forEach(btn=>{

// btn.addEventListener("click",()=>{

// document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"))
// document.querySelectorAll(".tab-panel").forEach(p=>p.classList.remove("active"))

// btn.classList.add("active")

// document.getElementById("tab-"+btn.dataset.tab).classList.add("active")

// })

// })
// // ----------------------- FOR TABS ---------------------------


// loadRented(phone)
// loadFavorites(phone)
// loadMyCars(phone)

// }

// async function loadRented(phone){

// const panel = document.getElementById("tab-rented")

// try{

// const res = await fetch(`${BASE}/Purchase/${phone}`)

// const cars = await res.json()

// if(!cars.length){

// panel.innerHTML = emptyState("ნაქირავები მანქანა არ გაქვთ")

// return

// }

// panel.innerHTML = cars.map(c=>`

// <div class="rental-card">

// <h3>${c.carBrand} ${c.carModel}</h3>

// <p>ქალაქი: ${c.city}</p>

// <p>დღეები: ${c.days}</p>

// <p>ფასი: ${c.totalPrice} ₾</p>

// </div>

// `).join("")

// }catch{

// panel.innerHTML = emptyState("ნაქირავები მანქანა არ გაქვთ")

// }

// }

// async function loadFavorites(phone){

// const panel = document.getElementById("tab-favs")

// try{

// const res = await fetch(`${BASE}/api/Users/${phone}/favorite-cars`)

// const cars = await res.json()

// if(!cars.length){

// panel.innerHTML = emptyState("მოწონებული მანქანა არ გაქვთ")

// return

// }

// panel.innerHTML = cars.map(c=>carCard(c)).join("")

// }catch{

// panel.innerHTML = emptyState("მოწონებული მანქანა არ გაქვთ")

// }

// }

// async function loadMyCars(phone){

// const panel = document.getElementById("tab-mycars")

// try{

// const res = await fetch(`${BASE}/api/Car/byPhone?phoneNumber=${phone}`)

// const cars = await res.json()

// if(!cars.length){

// panel.innerHTML = emptyState("მანქანა არ დაგიმატებიათ")

// return

// }

// panel.innerHTML = cars.map(c=>carCard(c)).join("")

// }catch{

// panel.innerHTML = emptyState("მანქანა არ დაგიმატებიათ")

// }

// }

// function carCard(car){

// return `

// <div class="car-card">

// <div class="car-card-img">

// <img src="${car.imageUrl || ""}">

// </div>

// <div class="car-card-body">

// <h3>${car.brand} ${car.model}</h3>

// <p>${car.city}</p>

// <p>${car.pricePerDay} ₾ / day</p>

// </div>

// </div>

// `

// }

// function emptyState(text){

// return `
// <div class="empty-state">
// <p>${text}</p>
// </div>
// `

// }


// // For stats
// async function loadStats(phone){

// try{

// const rentedRes = await fetch(`${BASE}/Purchase/${phone}`)
// const rented = await rentedRes.json()

// document.getElementById("statRented").textContent =
// Array.isArray(rented) ? rented.length : 0

// }catch{
// document.getElementById("statRented").textContent = 0
// }


// try{

// const favRes = await fetch(`${BASE}/api/Users/${phone}/favorite-cars`)
// const fav = await favRes.json()

// document.getElementById("statFav").textContent =
// Array.isArray(fav) ? fav.length : 0

// }catch{
// document.getElementById("statFav").textContent = 0
// }


// try{

// const myRes = await fetch(`${BASE}/api/Car/byPhone?phoneNumber=${phone}`)
// const my = await myRes.json()

// document.getElementById("statMy").textContent =
// Array.isArray(my) ? my.length : 0

// }catch{
// document.getElementById("statMy").textContent = 0
// }

// }