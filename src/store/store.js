// store.js
import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            tags: []
        };
    },
    mutations: {
        addTag(state, tag) {
            state.tags.push(tag);
        },
        removeTag(state, tagToRemove) {
            state.tags = state.tags.filter(tag => tag !== tagToRemove);
        }
    }
});

export default store;