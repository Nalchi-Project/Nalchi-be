import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Main.css'; // 수정된 CSS 파일 연결

function Main() {
    const navigate = useNavigate();

    const goToDiary = () => {
        navigate('/diary');
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        alert('로그아웃 되었습니다.');
        navigate('/login');
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <div className="logo">Lution</div>
            </header>

            <main className="main-content">
                <div className="box">
                    <h2>당신의 감정을 분석</h2>
                    <p>카메라 화면</p>
                </div>

                <button className="rounded-button" onClick={goToDiary}>
                    일기장으로 가기
                </button>
                <button className="rounded-button logout" onClick={handleLogout}>
                    로그아웃
                </button>
            </main>
        </div>
    );
}

export default Main;
