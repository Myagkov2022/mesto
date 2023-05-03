export default class Api {
    constructor(options) {
        this.baseURL = options.baseUrl
        this.headers = options.headers
    }

    getUserInfo() {
        return fetch(`${this.baseURL}/users/me`, {headers:this.headers})
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    patchUserInfo({name, about}) {
        return fetch(`${this.baseURL}/users/me`, {
            method:'PATCH',
            headers:this.headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    getInitialCards() {
        return fetch(`${this.baseURL}/cards`, {headers:this.headers})
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    postNewCard({name, link}) {
        return fetch(`${this.baseURL}/cards`, {
            method: 'POST',
            headers:this.headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    deleteCard(cardId) {
        console.log(cardId)
        return fetch(`${this.baseURL}/cards/${cardId}`, {
            method: 'DELETE',
            headers:this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    patchUserAvatar({avatar}) {
        return fetch(`${this.baseURL}/users/me/avatar`, {
            method:'PATCH',
            headers:this.headers,
            body: JSON.stringify({
               avatar: avatar
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    putCardLike(cardId) {
        return fetch(`${this.baseURL}/cards/${cardId}/likes`, {
            method:'PUT',
            headers:this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

    deleteCardLike(cardId) {
        return fetch(`${this.baseURL}/cards/${cardId}/likes`, {
            method:'DELETE',
            headers:this.headers,
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`)
            })
    }

}
