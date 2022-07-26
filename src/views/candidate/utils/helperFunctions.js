export const handleShareBtnClick = async (titleToShare, linkDescription, linkToShare) => {
    
    const jobDataToShare = {
        title: titleToShare,
        text: linkDescription,
        url: linkToShare,
    }

    try {

        await navigator.share(jobDataToShare);

    } catch (err) {
        console.log(err);
        alert("Your browser does not support sharing");
    }
}