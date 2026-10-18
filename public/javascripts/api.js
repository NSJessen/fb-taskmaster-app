const BASE_URL = '/api/tasks';

// Tjekker res.ok og kaster en fejl med serverens besked
async function request(url, options) {
    const res = await fetch(url, options);

    if (!res.ok) {
        let message = `Anmodningen fejlede (${res.status})`;
        try {
            const body = await res.json();
            if (body.error) message = body.error;
        } catch {
            // Svaret var ikke JSON – behold standardbeskeden
        }
        throw new Error(message);
    }

    return res;
}

export async function getTasks() {
    const res = await request(BASE_URL);
    return res.json();
}

export async function createTask(text) {
    const res = await request(BASE_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({text})
    });
    return res.json();
}

export async function deleteTask(id) {
    await request(`${BASE_URL}/${id}`, {method: 'DELETE'});
}
