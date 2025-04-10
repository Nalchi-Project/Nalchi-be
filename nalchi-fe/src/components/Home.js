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
            <h1 style={styles.title}> Welcome</h1>
            <p style={styles.subtitle}>Home</p>
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
        backgroundColor: "#f5f5f5"
    },
    title: {
        fontSize: "2.5rem",
        marginBottom: "10px"
    },
    subtitle: {
        fontSize: "1.2rem",
        color: "#666",
        marginBottom: "30px"
    },
    buttonContainer: {
        display: "flex",
        gap: "15px"
    },
    button: {
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007BFF",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }
};

export default Home;
