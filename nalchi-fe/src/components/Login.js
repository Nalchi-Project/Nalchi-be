import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        if (accessToken && refreshToken) {
            alert('이미 로그인되어 있습니다.');
            navigate('/main');
        }
    }, [navigate]);

    const handleLocalLogin = async (e) => {
        e.preventDefault();
        try {
            await login({ username, password });
            alert('로그인 성공');
            navigate('/main');
        } catch (error) {
            alert('로그인 실패: ' + error.message);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>로그인</h2>

            <form onSubmit={handleLocalLogin} style={styles.form}>
                <input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>일반 로그인</button>
            </form>

            <div style={styles.separator}>또는</div>

            <div style={styles.buttonGroup}>
                <button onClick={handleGoogleLogin} style={styles.button}>Google 로그인</button>
                <button onClick={handleBack} style={styles.button}>← 뒤로가기</button>
            </div>
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
        gap: "15px",
        alignItems: "center",
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
    },
    separator: {
        margin: "20px 0",
        fontSize: "14px",
        color: "#777"
    },
    buttonGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        alignItems: "center"
    }
};

export default Login;
