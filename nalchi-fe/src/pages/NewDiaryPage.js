// src/pages/NewDiaryPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDiary } from '../services/diary'; // 서비스 파일 경로 확인
import '../css/NewDiary.css';
import emotion1Icon from '../assets/emotion1.png';
import emotion3Icon from '../assets/emotion3.png';
import emotion5Icon from '../assets/emotion5.png';
import emotion2Icon from '../assets/emotion2.png'; // 추가적인 감정 아이콘
import emotion4Icon from '../assets/emotion4.png'; // 추가적인 감정 아이콘

function NewDiaryPage() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [emotion, setEmotion] = useState('');

    const emotionMap = {
        '매우 좋음': 'VERY_GOOD',
        '좋음': 'GOOD',
        '보통': 'NORMAL',
        '나쁨': 'BAD',
        '매우 나쁨': 'VERY_BAD',
    };

    const handleEmotionSelect = (selectedEmotion) => {
        setEmotion(selectedEmotion);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const diaryData = { title, content, date, emotion: emotionMap[emotion] };
            await createDiary(diaryData);
            alert('일기가 저장되었습니다.');
            navigate('/diary');
        } catch (error) {
            console.error('일기 저장 실패:', error);
            alert('일기 저장에 실패했습니다.');
        }
    };

    const handleGoBack = () => {
        navigate('/diary');
    };

    return (
        <div className="new-diary-container">
            <div className="new-diary-header">
                <h2>새 일기 쓰기</h2>
                <button onClick={handleGoBack} className="back-button">뒤로 가기</button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">날짜</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="emotion">오늘의 감정</label>
                    <div className="emotion-select">
                        <button
                            type="button"
                            className={`emotion-button ${emotion === '매우 좋음' ? 'selected' : ''}`}
                            onClick={() => handleEmotionSelect('매우 좋음')}
                        >
                            <img src={emotion1Icon} alt="매우 좋음" />
                            매우 좋음
                        </button>
                        <button
                            type="button"
                            className={`emotion-button ${emotion === '좋음' ? 'selected' : ''}`}
                            onClick={() => handleEmotionSelect('좋음')}
                        >
                            <img src={emotion2Icon} alt="좋음" />
                            좋음
                        </button>
                        <button
                            type="button"
                            className={`emotion-button ${emotion === '보통' ? 'selected' : ''}`}
                            onClick={() => handleEmotionSelect('보통')}
                        >
                            <img src={emotion3Icon} alt="보통" />
                            보통
                        </button>
                        <button
                            type="button"
                            className={`emotion-button ${emotion === '나쁨' ? 'selected' : ''}`}
                            onClick={() => handleEmotionSelect('나쁨')}
                        >
                            <img src={emotion4Icon} alt="나쁨" />
                            나쁨
                        </button>
                        <button
                            type="button"
                            className={`emotion-button ${emotion === '매우 나쁨' ? 'selected' : ''}`}
                            onClick={() => handleEmotionSelect('매우 나쁨')}
                        >
                            <img src={emotion5Icon} alt="매우 나쁨" />
                            매우 나쁨
                        </button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="content">오늘의 일기</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">저장</button>
            </form>
        </div>
    );
}

export default NewDiaryPage;