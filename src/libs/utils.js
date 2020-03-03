import React from "react";

function getApiUrl() {
    if(process.env.NODE_ENV === "production") return 'https://kargainapi.pwnmonkey13.now.sh/';
    else return "http://localhost:8080/api";
}

const getLogo = () => {
    return "/images/Kargain_logo.png"
};

export const setCookie = (cname, cvalue, minutes = 1000) => {
    let d = new Date();
    d.setTime(d.getTime() + (minutes*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
};

export { getApiUrl, getLogo }
