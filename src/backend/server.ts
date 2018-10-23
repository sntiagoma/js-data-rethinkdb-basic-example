import app from './app';

const port = process.env.port || 4000;

app.listen(port);

console.log(`Server running on port: http://localhost:${port}`);