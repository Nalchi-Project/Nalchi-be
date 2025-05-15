import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/auth';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signup({ username, password, name, email, nickname });
            alert(response);
            navigate('/');
        } catch (error) {
            alert('회원가입 실패: ' + error.message);
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>회원가입</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} />
                <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} />
                <input type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} style={styles.input} />
                <input type="email" placeholder="이메일" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
                <input type="text" placeholder="닉네임" value={nickname} onChange={(e) => setNickname(e.target.value)} style={styles.input} />
                <button type="submit" style={styles.button}>회원가입</button>
            </form>
            <button onClick={handleBack} style={styles.button}>← 뒤로가기</button>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(to bottom, #fff1f1, #fefbe9)",
        padding: "20px"
    },
    title: {
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#ff6f91",
        marginBottom: "30px"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        marginBottom: "20px"
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        width: "260px",
        border: "1px solid #ccc",
        borderRadius: "8px"
    },
    button: {
        padding: "10px 24px",
        fontSize: "16px",
        backgroundColor: "#ffa07a",
        color: "white",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease"
    }
};

export default Signup;
