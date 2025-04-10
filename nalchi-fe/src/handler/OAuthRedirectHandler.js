import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OAuthRedirectHandler = () => {
    const navigate = useNavigate();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const checkTokenInUrl = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const accessToken = urlParams.get("accessToken");
            const refreshToken = urlParams.get("refreshToken");

            if (accessToken && refreshToken) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                window.history.replaceState(null, "", "/oauth2/redirect");
                navigate("/success");
            } else {
                setReady(true);
            }
        };

        checkTokenInUrl();
    }, [navigate]);

    if (!ready) {
        return <div>로그인 처리 중...</div>;
    }

    return (
        <div>
            로그인 실패! 다시 시도해주세요.
            <button onClick={() => navigate("/login")}>확인</button>
        </div>
    );
};

export default OAuthRedirectHandler;
