import Vue from 'vue';
class Universal {
    request(method, url, params, callback) {
        
        
        if (method === 'POST') {
            if (params) {
                Vue.prototype.axios({
                        method: "POST",
                        url: url,
                        data: params
                    })
                    .then(callback)
                    .catch(err => {
                        
                    });
            } else {
                Vue.prototype.axios({
                        method: "POST",
                        url: url,
                    })
                    .then(callback)
                    .catch(err => {
                        
                    });
            }
        } else {
            if (params) {
                Vue.prototype.axios({
                        method: "GET",
                        url: url,
                        params: params
                    })
                    .then(callback)
                    .catch(err => {
                        
                        
                    });
            } else {
                Vue.prototype.axios({
                        method: "GET",
                        url: url,
                        params: params
                    })
                    .then(callback)
                    .catch(err => {
                        
                        
                    });
            }
        }
    }
}
export const universal = new Universal();