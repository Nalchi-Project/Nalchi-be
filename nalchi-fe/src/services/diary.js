// src/services/diary.js
import axios from 'axios';
import { getAccessToken } from './auth'; // accessToken을 가져오는 함수 import

const API_BASE_URL = "http://localhost:8080/api/diary";
// const API_BASE_URL = "http://3.38.246.140:8080/api/diary"; // 배포 환경 URL

const authHeader = () => ({
    headers: {
        Authorization: `Bearer ${getAccessToken()}`,
    },
});

export const createDiary = async (diaryData) => {
    try {
        const response = await axios.post(API_BASE_URL, diaryData, authHeader());
        return response.data;
    } catch (error) {
        console.error("Create diary error:", error);
        throw error;
    }
};

export const getMyDiaries = async () => {
    try {
        const response = await axios.get(API_BASE_URL, authHeader());
        return response.data;
    } catch (error) {
        console.error("Get my diaries error:", error);
        throw error;
    }
};
export const getDiaryById = async (id) => { // 특정 ID의 일기 조회 함수
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`, authHeader());
        return response.data;
    }catch (error) {
        console.error("Get my diaries error:", error);
        throw error;
    }
};

export const updateDiary = async (id, diaryData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, diaryData, authHeader());
        return response.data;
    } catch (error) {
        console.error(`Update diary ${id} error:`, error);
        throw error;
    }
};

export const deleteDiary = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`, authHeader());
        return response.data; // 또는 성공 메시지 등을 반환할 수 있습니다.
    } catch (error) {
        console.error(`Delete diary ${id} error:`, error);
        throw error;
    }
};