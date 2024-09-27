export async function login(data) {
    const response = await fetch(`http://app.3em.bet/api/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user: data})
    })

}
