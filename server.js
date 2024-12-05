import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const app = express();
const port = 3000;

// __dirname을 import.meta.url로 대체 (모듈화 환경에서 __dirname 사용하기 위한 처리)
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// 정적 파일 제공 (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// 루트 경로 처리
app.get('/', (req, res) => {
    // 절대 경로로 index.html 파일 제공
    const indexPath = path.join(__dirname, 'public', 'index.html');
    console.log('indexPath:', indexPath); // 경로가 잘 설정되었는지 확인용 로그
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
});

db.connect((err) => {
    if (err) {
        console.error('MySQL 연결 실패:', err);
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

    const checkQuery = `SELECT * FROM users WHERE id = ?`;
    db.query(checkQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).send('아이디 중복 확인 오류');
        }

        if (results.length > 0) {
            return res.status(409).send('이미 사용 중인 아이디입니다.');
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
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

    const checkQuery = `SELECT * FROM users WHERE id = ?`;
    db.query(checkQuery, [id], (err, results) => {
        if (err) {
            return res.status(500).send('아이디 중복 확인 오류');
        }

        res.json({ exists: results.length > 0 });
    });
});

// 서버 실행
app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});