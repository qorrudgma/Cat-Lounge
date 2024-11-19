const pages = {
    home: `
        <section class="image-slider">
            <div class="image-container" id="image-container">
                <img src="image1.png" alt="image" class="slider-image">
                <img src="image2.png" alt="image" class="slider-image" style="display: none;">
                <img src="image3.png" alt="image" class="slider-image" style="display: none;">
            </div>
        </section>
        <section class="main-adoption">
            <div class="line"></div>
            <div class="adoption">
                분양
            </div>
        </section>
        <section class="main-stories ">
            <div class="line"></div>
            <div class="stories ">
                분양 후기
            </div>
        </section>
        <section class="main-foster">
            <div class="line"></div>
            <div class="foster-text">
                임시보호 서비스
            </div>
            <div class="foster-video">
                 <img src="video.png" alt="video">
            </div>
        </section>
    `, 
    login: `
        <section class="login-section">
            <h2>로그인</h2>
            <form id="loginForm" onsubmit="handleLogin(event)">
                <div class="form-group">
                    <label for="username">아이디:</label>
                    <input type="text" id="username" required>
                </div>
                <div class="form-group">
                    <label for="password">비밀번호:</label>
                    <input type="password" id="password" required>
                </div>
                <div class="button-group">
                    <button class="btn1" type="submit">로그인</button>
                    <button class="btn1" type="button" onclick="showHome()">홈으로</button>
                </div>
            </form>
        </section>
    `,
    signup: `
        <section class="signup-section">
            <h2>회원가입</h2>
            <form id="signupForm" onsubmit="handleSignup(event)">
                <div class="form-group">
                    <label for="username">아이디:</label>
                    <input type="text" id="username" required>
                </div>
                <div class="form-group">
                    <label for="password">비밀번호:</label>
                    <input type="password" id="password" required>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">비밀번호 확인:</label>
                    <input type="password" id="confirmPassword" required>
                </div>
                <div class="button-group">
                    <button class="btn1" type="submit">회원가입</button>
                    <button class="btn1" type="button" onclick="showHome()">홈으로</button>
                </div>
            </form>
        </section>
    `,
    intro: `
        <section>
            <h1>소개 페이지</h1>
            <p>고양이 사랑방은 고양이와 사람을 이어주는 따뜻한 공간입니다. 여기는 소개 페이지입니다.</p>
        </section>
    `,

    step: `
        <section class="procedure-section">
            <h1>분양 절차</h1>
            <ol class="procedure-steps">
                <li>1단계: 신청서 작성</li>
                <li>2단계: 상담 및 검토</li>
                <li>3단계: 분양 계약</li>
                <li>4단계: 새로운 가족 맞이</li>
            </ol>
        </section>
    `,


};

function showHome() {
    document.getElementById('app').innerHTML = pages.home;
    history.pushState({ page: 'home' }, '홈', window.location.href);
    startImageSlider();
}

function startImageSlider() {
    const images = document.querySelectorAll('.slider-image');
    let currentIndex = 0;

    setInterval(() => {
        images[currentIndex].style.display = 'none';
        currentIndex = (currentIndex + 1) % images.length;
        
        images[currentIndex].style.display = 'block';
    }, 5000);
}

function showLogin() {
    document.getElementById('app').innerHTML = pages.login;
    history.pushState({ page: 'login' }, '로그인', window.location.href);
}

function showSignup() {
    document.getElementById('app').innerHTML = pages.signup;
    history.pushState({ page: 'signup' }, '회원가입', window.location.href);
}

//소개 페이지
function showIntro() {
    document.getElementById('app').innerHTML = pages.intro;
    history.pushState({ page: 'intro' }, '소개', window.location.href);
}

//분양 절차 페이지
function showStep() {
    document.getElementById('app').innerHTML = pages.step;
    history.pushState({ page: 'step' }, '분양 절차', window.location.href);
}

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    alert(`로그인 성공! 사용자 이름: ${username}`);
    showHome();
}

function handleSignup(event) {
    event.preventDefault(); 
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    alert(`회원가입 성공! 사용자 이름: ${newUsername}`);
    showHome();
}

showHome();

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value;
    
    if (searchTerm) {
        alert(`'${searchTerm}'을(를) 검색합니다.`);
    } else {
        alert('검색어를 입력해주세요.');
    }
}

