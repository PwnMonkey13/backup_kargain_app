import React from "react";

function getApiUrl() {
    if(process.env.NODE_ENV === "production") return 'https://kargainapi.pwnmonkey13.now.sh/';
    else return "http://localhost:8080/api";
}

const getLogo = () => {
    return "/images/Kargain_logo.png"
};

export { getApiUrl, getLogo }
