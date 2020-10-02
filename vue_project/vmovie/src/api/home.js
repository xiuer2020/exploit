import "../plugins/axios";

export const getIndexData = function() {
    return window.axios.get("/apiv3/index/index").catch(function(error) {
        
    });
};


export const getIndexPosts = function(url) {
    return window.axios.get(url).catch(function(error) {
        
    });
};
