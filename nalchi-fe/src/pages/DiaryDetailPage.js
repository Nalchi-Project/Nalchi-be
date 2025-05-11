// src/pages/DiaryDetailPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDiaryById } from '../services/diary'; // deleteDiary 제거
import '../css/DiaryDetail.css';
import veryGoodIcon from '../assets/emotion1.png';
import goodIcon from '../assets/emotion2.png';
import normalIcon from '../assets/emotion3.png';
import badIcon from '../assets/emotion4.png';
import veryBadIcon from '../assets/emotion5.png';

function DiaryDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [diary, setDiary] = useState(null);
    const emotionMap = {
        "VERY_GOOD": veryGoodIcon,
        "GOOD": goodIcon,
        "NORMAL": normalIcon,
        "BAD": badIcon,
        "VERY_BAD": veryBadIcon,
    };
    const emotionTextMap = {
        "VERY_GOOD": "매우 좋음",
        "GOOD": "좋음",
        "NORMAL": "보통",
        "BAD": "나쁨",
        "VERY_BAD": "매우 나쁨",
    };

    useEffect(() => {
        const fetchDiary = async () => {
            try {
                const data = await getDiaryById(id);
                setDiary(data);
            } catch (error) {
                console.error('Failed to fetch diary:', error);
                alert('일기 정보를 불러오는 데 실패했습니다.');
                navigate('/diary');
            }
        };

        fetchDiary();
    }, [id, navigate]);

    const goToEditDiary = () => {
        navigate(`/diary/edit/${id}`);
    };

    const goBackToDiaryList = () => {
        navigate('/diary');
    };

    if (!diary) {
        return <div>Loading...</div>;
    }

    return (
        <div className="diary-detail-container">
            <header className="diary-detail-header">
                <button onClick={goBackToDiaryList}>&lt; 뒤로 가기</button>
                <span>{new Date(diary.date).toLocaleDateString()} 기록</span>
                <button onClick={goToEditDiary}>수정하기</button>
            </header>
            <main className="diary-detail-main">
                <h3 className="emotion-title">오늘의 감정</h3>
                <div className="emotion-display">
                    <div className={`emotion-icon emotion-${diary.emotion ? diary.emotion.toLowerCase() : 'normal'}`}>
                        {emotionMap[diary.emotion] && <img src={emotionMap[diary.emotion]} alt={emotionTextMap[diary.emotion]} />}
                        {!emotionMap[diary.emotion] && diary.emotion}
                    </div>
                    <p className="emotion-text">{emotionTextMap[diary.emotion]}</p>
                </div>
                <h3 className="content-title">오늘의 일기</h3>
                <div className="diary-content">
                    <p>{diary.content}</p>
                </div>
            </main>
        </div>
    );
}

export default DiaryDetailPage;