import Vue from "vue";
import Vuex from "vuex";
import types from "./TYPES";

import { getIndexData } from "../api/home.js";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        indexData: {},
        historyData: [],
        loading: false,
        finished: false,
    },
    mutations: {
        [types.INIT_INDEX_DATA](state, playload) {
            state.indexData = playload.data;
        },
        [types.GET_MORE_HISTORY_DATA](state, playload) {
            state.historyData.push(playload.data);
        },
    },
    actions: {
        [types.INIT_INDEX_DATA](context, n) {
            
            // setTimeout(() => {
            //     context.commit(types.INIT_INDEX_DATA, { data });
            // }, 3000);
            var indexData = JSON.parse(window.localStorage.getItem("indexData"));
            console.log(n);
            
            if (indexData && indexData.expires > Date.now()) {
                context.commit(types.INIT_INDEX_DATA, { data: indexData.data });
            } else {
                getIndexData().then(function(response) {
                    
                    window.localStorage.setItem(
                        "indexData",
                        JSON.stringify({
                            expires: Date.now() + 10 * 60 * 1000,
                            data: response.data.data,
                        })
                    );
                    context.commit(types.INIT_INDEX_DATA, { data: response.data.data });
                });
            }
        },

        // [types.GET_MORE_HISTORY_DATA](context, callback) {
        //     
        //     let url;
        //     if (context.state.historyData.length === 0) {
        //         url = context.state.indexData.posts.next_page_url;
        //     } else {
        //         url = context.state.historyData[context.state.historyData.length - 1].next_page_url;
        //     }

        //     

        //     getIndexPosts(url).then(function(response) {
        //         // 加载状态结束
        //         callback();

        //         // 数据全部加载完成
        //         // if (this.list.length >= 40) {
        //         //   this.finished = true;
        //         // }

        //         context.commit(types.GET_MORE_HISTORY_DATA, { data: response.data });
        //     });
        // },
    },
    modules: {},
});
