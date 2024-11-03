const pages = {
    home: `
        <section class="image-slider">
            <div class="image-container" id="image-container">
                <img src="image1.png" alt="image">
                <img src="image2.png" alt="image">
                <img src="image3.png" alt="image">
            </div>
        </section>
    `, 
    login: `
        <section>
            <h2>로그인</h2>
            <form id="loginForm" onsubmit="handleLogin(event)">
                <label for="username">사용자 이름:</label>
                <input type="text" id="username" required>
                <br>
                <label for="password">비밀번호:</label>
                <input type="password" id="password" required>
                <br>
                <button type="submit">로그인</button>
            </form>
            <button onclick="showHome()">홈으로</button>
        </section>
    `,
    signup: `
    <section>
        <h2>회원가입</h2>
        <form id="signupForm" onsubmit="handleSignup(event)">
            <label for="newUsername">사용자 이름:</label>
            <input type="text" id="newUsername" required>
            <br>
            <label for="newPassword">비밀번호:</label>
            <input type="password" id="newPassword" required>
            <br>
            <button type="submit">회원가입</button>
        </form>
        <button onclick="showHome()">홈으로</button>
    </section>
    `,
};

function showHome() {
    document.getElementById('app').innerHTML = pages.home;
    history.pushState({ page: 'home' }, '홈', window.location.href);
}

function showLogin() {
    document.getElementById('app').innerHTML = pages.login;
    history.pushState({ page: 'login' }, '로그인', window.location.href);
}

function showSignup() {
    document.getElementById('app').innerHTML = pages.signup;
    history.pushState({ page: 'signup' }, '회원가입', window.location.href);
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

