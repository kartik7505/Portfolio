async function test() {
  try {
    const res = await fetch('http://127.0.0.1:8788/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test Name',
        email: 'unverified@example.com',
        message: 'This is a test message with more than 10 chars.',
        turnstileToken: '1x0000000000000000000000000000000AA',
        website: ''
      })
    });
    console.log(res.status, res.statusText);
    console.log(await res.text());
  } catch (err) {
    console.error(err);
  }
}
test();
