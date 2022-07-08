export const validateUrl = (url, withPath) => {
    try {

        let testUrl = new URL(url);

        if (withPath){

            if (testUrl.pathname.length > 1) return true;

            return false;
        }
        
        return true;

    }catch (err) {

        return false;
        
    }   
}

export const validateEmail = (email) => {

    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    
}

export const getDeviceName = () => {
    let userAgent = navigator.userAgent;

    if (userAgent.match(/Windows/i)) return "Windows";

    if (userAgent.match(/Android/i)) return "Android";

    if (userAgent.match(/iPhone/i)) return "iPhone";

    if (userAgent.match(/iPad/i)) return "iPad";

    return "";
}

export const getDeviceLocation = () => {

}

export const getDeviceBrowser = () => {
    let userAgent = navigator.userAgent;
}