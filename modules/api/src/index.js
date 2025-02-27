const express   = require('express');
const env       = require('./env');
const routes    = require('./routes');

// ...

const app = express();
app.use(express.json());
app.use('/', routes);

// Health check
routes.get('/healtz', (_req, res) => {
    res.send('200');
});

const server = app.listen(env.port, () => {
    console.log(`Listening on port ${env.port}`)
});

process.on('SIGTERM', () => {
    console.log('The service is about to shut down!');
    
    server.close(
        () => {
            console.log('API server: Shutdown complete.');
            process.exit(0); 
        }
    );
    
});

console.log('THIS IS JUST A PRANK.');