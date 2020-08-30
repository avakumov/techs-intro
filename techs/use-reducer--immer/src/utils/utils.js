
async function login({username, password}) {
    return new Promise ((resolve, reject) => {
        setTimeout(() => {
            if (username === 'vava' && password === 'pass') {
                resolve()

            } else {
                reject()
            }
        }, 1000)
    })
}

export {
    login
}