export const validateUrl = (url) => {
    try {

        let testUrl = new URL(url);
        return true;

    }catch (err) {

        return false;
        
    }   
}