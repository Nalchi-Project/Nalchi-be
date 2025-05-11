// src/pages/DiaryPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyDiaries } from '../services/diary';
import '../css/Diary.css'; // 새로운 CSS 파일 import
import { format, addMonths, subMonths } from 'date-fns';
import { ko } from 'date-fns/locale';
import veryGoodIcon from '../assets/emotion1.png'; // 예시 경로, 실제 경로에 맞춰 수정
import goodIcon from '../assets/emotion2.png';   // 예시 경로, 실제 경로에 맞춰 수정
import normalIcon from '../assets/emotion3.png'; // 예시 경로, 실제 경로에 맞춰 수정
import badIcon from '../assets/emotion4.png';    // 예시 경로, 실제 경로에 맞춰 수정
import veryBadIcon from '../assets/emotion5.png'; // 예시 경로, 실제 경로에 맞춰 수정

function DiaryPage() {
    const [diaries, setDiaries] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const navigate = useNavigate();
    const emotionMap = {
        "VERY_GOOD": veryGoodIcon,
        "GOOD": goodIcon,
        "NORMAL": normalIcon,
        "BAD": badIcon,
        "VERY_BAD": veryBadIcon,
    };

    useEffect(() => {
        const fetchDiaries = async () => {
            try {
                const formattedMonth = format(currentMonth, 'yyyy-MM');
                const data = await getMyDiaries();
                const filteredDiaries = data.filter(diary => {
                    const diaryMonth = format(new Date(diary.date), 'yyyy-MM');
                    return diaryMonth === formattedMonth;
                });
                setDiaries(filteredDiaries);
            } catch (error) {
                console.error("Failed to fetch diaries:", error);
                // 에러 처리
            }
        };

        fetchDiaries();
    }, [currentMonth]);

    const goToMain = () => {
        navigate('/main');
    };

    const goToNewDiary = () => {
        navigate('/diary/new');
    };

    const goToDiaryDetail = (id) => {
        navigate(`/diary/${id}`);
    };

    const goToEditDiary = (id) => {
        navigate(`/diary/edit/${id}`);
    };

    const goToPrevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    return (
        <div className="diary-page">
            <header className="diary-page-header">
                <button onClick={goToMain} className="main-button">메인으로</button> {/* 메인으로 가는 버튼 추가 */}
                <div className="month-navigation">
                    <button onClick={goToPrevMonth}>&lt;</button>
                    <span>{format(currentMonth, 'yyyy년 MM월', { locale: ko })}</span>
                    <button onClick={goToNextMonth}>&gt;</button>
                </div>
                <div className="header-buttons">
                    <div className="sort-dropdown">
                        <button className="sort-button">최신순 <span className="dropdown-arrow">▼</span></button>
                        {/* 드롭다운 메뉴 (UI만 구현) */}
                    </div>
                    <button onClick={goToNewDiary} className="new-diary-button">새 일기 쓰기</button>
                </div>
            </header>

            <main className="diary-list">
                {diaries.length === 0 ? (
                    <p>작성된 일기가 없습니다.</p>
                ) : (
                    <ul>
                        {diaries.map(diary => (
                            <li key={diary.id} className="diary-item">
                                <div className="emotion-icon">
                                    <img src={emotionMap[diary.emotion]} alt={diary.emotion}/>
                                </div>
                                <div className="diary-info" onClick={() => goToDiaryDetail(diary.id)}>
                                    <h3 className="diary-date">{format(new Date(diary.date), 'yyyy. MM. dd.')}</h3>
                                    <p className="diary-content-preview">{diary.content.substring(0, 20)}...</p>
                                </div>
                                <button onClick={() => goToEditDiary(diary.id)} className="edit-button">수정하기</button>
                            </li>
                        ))}
                    </ul>
                )}
            </main>
        </div>
    );
}

export default DiaryPage;