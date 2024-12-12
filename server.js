import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';  // path 모듈을 제대로 import

// .env 파일 로드
dotenv.config(); // .env 경로는 기본값으로 로드

console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_DATABASE:', process.env.DB_DATABASE);
console.log('DB_PORT:', process.env.DB_PORT);

const app = express();
const port = 3000;

// __dirname 대체 방법
const __dirname = path.resolve();

// 정적 파일 서빙 (public 폴더 안의 파일들)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/cat', express.static(path.join(__dirname, 'cat')));

// 모든 요청에 대해 로그 출력
app.all('*', (req, res, next) => {
    console.log(`Request for ${req.originalUrl}`);
    next();
});

// 기본 페이지로 index.html을 서빙
app.get('/', (req, res) => {
    const indexPath = path.resolve('public', 'index.html');
    console.log('Resolved indexPath:', indexPath); // 경로 확인

    res.sendFile(indexPath, (err) => {
        if (err) {
            console.error('Error sending file:', err);
            res.status(500).send('파일 전송 중 오류 발생');
        }
    });
});

app.use(cors());  // CORS 설정

// MySQL 연결
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

// MySQL 연결 확인
db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err.code, err.message); // 에러 코드와 메시지 출력
    } else {
        console.log('MySQL에 연결되었습니다.');
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 회원가입 처리
app.post('/api/signup', (req, res) => {
    console.log('회원가입 요청 받음:', req.body);
    
    const { id, password, name, phone, email } = req.body;

    // 입력된 아이디가 공백이거나, 비밀번호가 너무 간단한 경우를 처리
    if (!id || !password || password.length < 6) {
        return res.status(400).send('아이디와 비밀번호는 필수이며, 비밀번호는 최소 6자 이상이어야 합니다.');
    }

    const checkQuery = `SELECT * FROM users WHERE id = ?`;
    db.query(checkQuery, [id], (err, results) => {
        if (err) {
            console.error('아이디 중복 확인 오류:', err);
            return res.status(500).send('아이디 중복 확인 오류');
        }

        if (results.length > 0) {
            return res.status(409).send('이미 사용 중인 아이디입니다.');
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error('비밀번호 해싱 오류:', err);
                return res.status(500).send('비밀번호 해싱 오류');
            }

            const query = `
                INSERT INTO users (id, password, name, phone, email)
                VALUES (?, ?, ?, ?, ?)
            `;

            db.query(query, [id, hashedPassword, name, phone, email], (err, result) => {
                if (err) {
                    console.error('회원가입 실패:', err);
                    res.status(500).send('회원가입 중 오류 발생');
                } else {
                    res.status(200).send('회원가입 성공');
                }
            });
        });
    });
});

// 아이디 중복 체크
app.get('/api/check-id', (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).send('아이디를 입력해 주세요.');
    }

    const checkQuery = `SELECT * FROM users WHERE id = ?`;
    db.query(checkQuery, [id], (err, results) => {
        if (err) {
            console.error('아이디 중복 확인 오류:', err);
            return res.status(500).send('아이디 중복 확인 오류');
        }

        res.json({ exists: results.length > 0 });
    });
});

app.post('/api/login', (req, res) => {
    const { id, password } = req.body;

    // 아이디와 비밀번호가 비어있는지 확인
    if (!id || !password) {
        return res.status(400).send('아이디와 비밀번호를 입력해 주세요.');
    }

    // 아이디에 해당하는 사용자 정보를 데이터베이스에서 조회
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('로그인 중 오류 발생:', err);
            return res.status(500).send('로그인 중 오류 발생');
        }

        // 해당 아이디가 존재하지 않으면 에러 처리
        if (results.length === 0) {
            return res.status(401).send('아이디 또는 비밀번호가 잘못되었습니다.');
        }

        const user = results[0]; // 첫 번째 사용자 정보 가져오기

        // bcrypt로 비밀번호 비교
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('비밀번호 비교 오류:', err);
                return res.status(500).send('비밀번호 비교 오류');
            }

            // 비밀번호가 맞지 않으면 에러 처리
            if (!isMatch) {
                return res.status(401).send('아이디 또는 비밀번호가 잘못되었습니다.');
            }

            // 로그인 성공
            res.status(200).send('로그인 성공');
        });
    });
});

// 서버 실행
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

  app.get('/adoption', (req, res) => {
    const query = 'SELECT * FROM cats';
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).send('Database error');
        return;
      }
      res.render('adoption', { cats: results });  // EJS 템플릿으로 cats 데이터 전달
    });
  });