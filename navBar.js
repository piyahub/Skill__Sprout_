const profilePageBtn = document.getElementById('profile-page-btn');
const homePageBtn = document.getElementById('home-page-btn');

profilePageBtn.addEventListener("click", () => {
    window.location.href = "../userProfilePage/profilePage.html";
})

homePageBtn.addEventListener("click", () => {
    window.location.href = "../homePage/homepage.html";
})