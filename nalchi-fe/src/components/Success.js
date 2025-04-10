import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        alert('로그아웃 되었습니다.');
        navigate('/login');
    };

    return (
        <div style={styles.container}>
            <h1>홈 화면 (로그인 성공)</h1>
            <button onClick={handleLogout} style={styles.logoutButton}>
                로그아웃
            </button>
        </div>
    );
};

const styles = {
    container: {
        marginTop: '100px',
        textAlign: 'center',
    },
    logoutButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '20px',
    },
};

export default Success;
