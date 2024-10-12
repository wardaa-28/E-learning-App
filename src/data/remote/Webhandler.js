export default async function Webhandler(URL, body, Verb) {
    try {
        console.log('Request URL:', URL);
        console.log('Request Method:', Verb);
        console.log('Request Body:', body);
        const response = await fetch(URL, {
            method: Verb,
            headers: {
            'Content-Type': 'application/json',
            },
            body: Verb !== 'GET' ? JSON.stringify(body) : undefined,
        });
        const result = await response.json();
        return result;  
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}
