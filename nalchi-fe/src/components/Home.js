import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Lution</h1>
            <p style={styles.subtitle}>당신의 감정에 빛을 더하다</p>
            <div style={styles.buttonContainer}>
                <button onClick={handleButtonClick} style={styles.button}>로그인</button>
                <button onClick={handleSignupClick} style={styles.button}>회원가입</button>
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
        background: "linear-gradient(to bottom, #fff1f1, #fefbe9)", // 감성 그라데이션
    },
    title: {
        fontSize: "3rem",
        fontWeight: "bold",
        color: "#ff6f91", // 따뜻한 분홍
        marginBottom: "10px",
        fontFamily: "'Segoe UI', sans-serif"
    },
    subtitle: {
        fontSize: "1.1rem",
        color: "#666",
        marginBottom: "40px",
        fontStyle: "italic"
    },
    buttonContainer: {
        display: "flex",
        gap: "15px"
    },
    button: {
        padding: "10px 24px",
        fontSize: "16px",
        backgroundColor: "#ffa07a", // 부드러운 오렌지
        color: "white",
        border: "none",
        borderRadius: "20px",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease"
    }
};

export default Home;
