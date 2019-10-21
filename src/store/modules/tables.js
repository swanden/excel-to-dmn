export default {
    namespaced: true,
    state: {
        userID: 11
    },
    getters: {
        getUserID(state) {
            return state.userID;
        }
        // cartProducts(state) {
        // 	return state.products;
        // },
        // isInCart: (state) => (itemId) => {
        // 	return state.products.indexOf(itemId) === -1;
        // },
        // cnt(state) {
        // 	return state.products.length;
        // }
    },
    mutations: {
        setUserID(state, userID) {
            state.userID = userID;
        }
        // add(state, itemId) {
        // 	if (state.products.indexOf(itemId) === -1) {
        // 		state.products.push(itemId);
        // 	}
        // },
        // remove(state, itemId) {
        // 	state.products.splice(state.products.indexOf(itemId), 1);
        // },
        // clear(state) {
        // 	state.products = [];
        // }
    },
    actions: {
        setUserID(store, userID) {
            store.commit('setUserID', userID);
        }
        // add(store, itemId) {
        // 	store.commit('add', itemId);
        // },
        // remove(store, itemId) {
        // 	store.commit('remove', itemId);
        // },
        // clear(store) {
        // 	store.commit('clear');
        // },
        // sendData(store, data) {
        // 	axios.post('http://jsonplaceholder.typicode.com/posts', data)
        // 	.then(response => {
        // 		alert('Data seccessful sent')
        // 	})
        // 	.catch(e => {
        // 		alert('Error')
        // 	});
        // }
    }
}