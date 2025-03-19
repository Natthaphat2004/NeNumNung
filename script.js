if (!sessionStorage.getItem("user")) {
    window.location.href = "login.html"; // ทำให้หน้าล็อกอินเป็นหน้าแรก
}


const movies = [
    { title: "Inception", category: "scifi", image: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg", description: "จอมโจรที่สามารถเข้าสู่ความฝันของคนอื่นได้", trailer: "YoHD9XEInc0" },
    { title: "The Dark Knight", category: "action", image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", description: "แบทแมนปะทะโจ๊กเกอร์", trailer: "EXeTwQWrcwY" },
    { title: "Interstellar", category: "scifi", image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", description: "ทีมสำรวจเดินทางผ่านรูหนอน", trailer: "zSWdZVtXT7E" },
    { title: "The Matrix", category: "scifi", image: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", description: "แฮกเกอร์ที่ค้นพบความจริงเกี่ยวกับโลก", trailer: "vKQi3bBA1y8" },
    { title: "Titanic", category: "drama", image: "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png", description: "เรื่องราวความรักต้องห้าม", trailer: "2e-eXJ6HgkQ" },
    { title: "John Wick", category: "action", image: "https://upload.wikimedia.org/wikipedia/en/9/98/John_Wick_TeaserPoster.jpg", description: "นักฆ่าผู้ไร้ปราณี", trailer: "qEVUtrk8_B4" },
    { title: "Parasite", category: "drama", image: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", description: "ครอบครัวยากจนวางแผนเข้าบ้านคนรวย", trailer: "5xH0HfJHsaY" },
    { title: "Frozen", category: "romance", image: "https://image.tmdb.org/t/p/w500/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg", description: "เจ้าหญิงเอลซ่าผู้มีพลังน้ำแข็ง", trailer: "TbQm5doF_Uc" },
    { title: "The Conjuring", category: "horror", image: "https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg", description: "คู่สามีภรรยานักปราบผี", trailer: "k10ETZ41q5o" },
	{ title: "หลวงพี่เท่ง", category: "comedy", image: "https://upload.wikimedia.org/wikipedia/th/9/95/Luangpee_teng.jpg", description: "อดีตนักเลงเก่าที่ตอนนี้เปลี่ยนตัวเปลี่ยนใจมาบวชเป็นพระ ย้ายมาอยู่ที่วัดแห่งหนึ่งี", trailer: "kz1bgqjZ7aBM" },
    { title: "Ma-Mha (มะหมา 4 ขาครับ)", category: "comedy", image: "https://upload.wikimedia.org/wikipedia/en/6/6d/Ma-mha_movie_poster.jpg", description: "มะขาม มะหมาหนุ่ม สัญชาติไทยหลังอาน หน่วยก้านดี โดนฤทธิ์นางเหมียว แมวตัวโปรดของเจ้านายทำพิษ จนเป็นเหตุให้โดนเตะโด่งออกจากบ้าน ถูกตัดหางปล่อยวัด", trailer: "wdvJaGkGes0" },
	{ title: "Transformers One", category: "scifi", image: "https://upload.wikimedia.org/wikipedia/en/a/a4/Transformers_One_Official_Poster.jpg", description: "เรื่องราวต้นกำเนิดของอ็อพติมัส ไพรม์และเมกะทรอน ที่ไม่เคยเปิดเผยมาก่อน ทั้งคู่เป็นที่รู้จักกันดีในนามศัตรูคู่อาฆาต แต่พวกเขาเคยเป็นเพื่อนที่ผูกพันกันมาเหมือนพี่น้อง ซึ่งเรื่องราวเหล่านี้เปลี่ยนแปลงชะตากรรมของไซเบอร์ทรอนไปตลอดกาล", trailer: "OS3W5QiMC0M" }
];

const movieList = document.getElementById("movieList");

function getCategoryFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("category"); // ดึงค่าหมวดหมู่จาก URL เช่น ?category=action
}

function displayMovies(filter = "") {
    movieList.innerHTML = "";

    let categoryFilter = getCategoryFromURL();

    movies
        .filter(movie => 
            (filter ? movie.title.toLowerCase().includes(filter.toLowerCase()) : true) &&
            (categoryFilter ? movie.category === categoryFilter : true)
        )
        .forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img src="${movie.image}" alt="${movie.title}">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                </div>
            `;

            movieCard.addEventListener("click", () => openModal(movie));
            movieList.appendChild(movieCard);
        });
}

// ค้นหา
document.getElementById("search").addEventListener("input", (e) => {
    displayMovies(e.target.value);
});

const modal = document.getElementById("movieModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTrailer = document.getElementById("modalTrailer");
const closeModal = document.querySelector(".close");

function openModal(movie) {
    modalTitle.textContent = movie.title;
    modalDescription.textContent = movie.description;
    modalTrailer.src = `https://www.youtube.com/embed/${movie.trailer}`;
    modal.style.display = "flex";
}

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    modalTrailer.src = "";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
        modalTrailer.src = "";
    }
});

displayMovies();
