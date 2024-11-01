// 페이지 콘텐츠 정의
const pages = {
    home: `
        <section>
            <h2>환영합니다!</h2>
            <p>고양이 분양 및 임시 보호 서비스를 제공합니다.</p>
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

// 홈 페이지 표시
function showHome() {
    document.getElementById('app').innerHTML = pages.home;
    // 브라우저 히스토리에 홈 페이지 추가
    history.pushState({ page: 'home' }, '고양이 사랑방', window.location.href);
}

// 로그인 페이지 표시
function showLogin() {
    document.getElementById('app').innerHTML = pages.login;
    // 브라우저 히스토리에 로그인 페이지 추가
    history.pushState({ page: 'login' }, '로그인', window.location.href);
}
// 회원가입 페이지 표시
function showSignup() {
    document.getElementById('app').innerHTML = pages.signup;
    history.pushState({ page: 'signup' }, '회원가입', window.location.href);
}

// 로그인 폼 제출 처리
function handleLogin(event) {
    event.preventDefault(); // 기본 제출 동작 방지
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 여기서 실제 로그인 처리 로직을 구현할 수 있습니다.
    alert(`로그인 성공! 사용자 이름: ${username}`);
    showHome(); // 로그인 후 홈으로 돌아가기
}

// 회원가입 폼 제출 처리
function handleSignup(event) {
    event.preventDefault(); // 기본 제출 동작 방지
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    // 여기서 실제 회원가입 처리 로직을 구현할 수 있습니다.
    alert(`회원가입 성공! 사용자 이름: ${newUsername}`);
    showHome(); // 회원가입 후 홈으로 돌아가기
}

// 페이지 로딩 시 기본 페이지로 설정
showHome();

// 브라우저의 뒤로 가기 버튼 클릭 처리
window.onpopstate = function(event) {
    if (event.state) {
        if (event.state.page === 'login') {
            showLogin();
        } else if (event.state.page === 'signup') {
            showSignup();
        } else {
            showHome();
        }
    }
};