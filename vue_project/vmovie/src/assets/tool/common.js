class Common{
    getEvent(e){
        const ev = e || window.event;
        return ev;
    }
}
export default new Common();