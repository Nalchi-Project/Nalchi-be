import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDiaryById, updateDiary, deleteDiary } from '../services/diary'; // deleteDiary import
import '../css/NewDiary.css';
import emotion1Icon from '../assets/emotion1.png';
import emotion2Icon from '../assets/emotion2.png';
import emotion3Icon from '../assets/emotion3.png';
import emotion4Icon from '../assets/emotion4.png';
import emotion5Icon from '../assets/emotion5.png';

function EditDiaryPage() {
    const navigate = useNavigate();
    const { id: diaryIdFromParams } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    const [emotion, setEmotion] = useState('');

    const emotionMap = useMemo(() => ({
        '매우 좋음': 'VERY_GOOD',
        '좋음': 'GOOD',
        '보통': 'NORMAL',
        '나쁨': 'BAD',
        '매우 나쁨': 'VERY_BAD',
    }), []);

    const reverseEmotionMap = useMemo(() => ({
        VERY_GOOD: '매우 좋음',
        GOOD: '좋음',
        NORMAL: '보통',
        BAD: '나쁨',
        VERY_BAD: '매우 나쁨',
    }), []);

    const emotionIcons = useMemo(() => [
        emotion1Icon,
        emotion2Icon,
        emotion3Icon,
        emotion4Icon,
        emotion5Icon,
    ], []);

    useEffect(() => {
        const fetchDiary = async () => {
            try {
                const diary = await getDiaryById(diaryIdFromParams);
                setTitle(diary.title);
                setContent(diary.content);
                setDate(diary.date.split('T')[0]);
                setEmotion(reverseEmotionMap[diary.emotion]);
            } catch (error) {
                console.error('일기 불러오기 실패:', error);
                alert('일기를 불러오는 데 실패했습니다.');
                navigate('/diary');
            }
        };

        if (diaryIdFromParams) {
            fetchDiary();
        }
    }, [diaryIdFromParams, navigate, reverseEmotionMap]);

    const handleEmotionSelect = (selectedEmotion) => {
        setEmotion(selectedEmotion);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const diaryData = { title, content, date, emotion: emotionMap[emotion] };
            await updateDiary(diaryIdFromParams, diaryData); // URL 파라미터 id 사용
            alert('일기가 수정되었습니다.');
            navigate('/diary');
        } catch (error) {
            console.error('일기 수정 실패:', error);
            alert('일기 수정에 실패했습니다.');
        }
    };

    const handleDeleteDiary = async () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            try {
                await deleteDiary(diaryIdFromParams); // URL 파라미터 id 사용
                alert('일기가 삭제되었습니다.');
                navigate('/diary');
            } catch (error) {
                console.error('일기 삭제 실패:', error);
                alert('일기 삭제에 실패했습니다.');
            }
        }
    };

    const handleGoBack = () => {
        navigate('/diary');
    };

    return (
        <div className="new-diary-container">
            <div className="new-diary-header">
                <h2>일기 수정</h2>
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
                        {Object.keys(emotionMap).map((emo, index) => (
                            <button
                                key={emo}
                                type="button"
                                className={`emotion-button ${emotion === emo ? 'selected' : ''}`}
                                onClick={() => handleEmotionSelect(emo)}
                            >
                                <img src={emotionIcons[index]} alt={emo}/>
                                {emo}
                            </button>
                        ))}
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
                <div className="button-group">
                    <button type="submit" className="submit-button">수정</button>
                    <button type="button" onClick={handleDeleteDiary} className="delete-button">삭제하기</button>
                </div>
            </form>
        </div>
    );
}

export default EditDiaryPage;