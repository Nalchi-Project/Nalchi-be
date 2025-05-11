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
            <h2>로그인</h2>

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
                <button type="submit" style={styles.loginButton}>일반 로그인</button>
            </form>

            <div style={styles.separator}>또는</div>

            <div style={styles.buttonGroup}>
                <button onClick={handleGoogleLogin} style={styles.googleButton}>Google 로그인</button>
                <button onClick={handleBack} style={styles.backButton}>← 뒤로가기</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        marginTop: "80px",
        textAlign: "center"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
        marginBottom: "20px"
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        width: "250px",
        border: "1px solid #ccc",
        borderRadius: "4px"
    },
    loginButton: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#2d6cdf",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
    },
    separator: {
        margin: "20px 0",
        fontSize: "14px",
        color: "#777"
    },
    buttonGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center"
    },
    googleButton: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#4285F4",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
    },
    backButton: {
        backgroundColor: "transparent",
        color: "#333",
        border: "1px solid #ccc",
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer"
    }
};

export default Login;
