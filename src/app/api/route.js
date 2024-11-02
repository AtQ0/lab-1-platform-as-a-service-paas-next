/*=====================*/
/*====== BACKEND ======*/
import { Client } from 'pg'; // Import Client from pg package

// Connect to PostgreSQL database via DATABASE_URL in .env
async function connectToDatabase() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    await client.connect(); // Connect to the database
    return client; // Return the connected client
}

// GET route to fetch movies from the `movies` table
export async function GET() {
    const client = await connectToDatabase(); // Get a new database connection
    try {
        // Query to get all movies from the movies table
        const res = await client.query('SELECT * FROM movies'); // Fetch all rows from `movies` table
        return new Response(JSON.stringify(res.rows), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Database query error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch movies' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        await client.end(); // Close the database connection
    }
}
