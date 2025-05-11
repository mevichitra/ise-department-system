import { neon } from "@neondatabase/serverless"

// Create a SQL client with the connection string
export const sql = neon(process.env.DATABASE_URL!)

// Helper function to execute queries with tagged template literals
export async function executeQuery(query: string, params: any[] = []) {
  try {
    // Replace $1, $2, etc. with ${params[0]}, ${params[1]}, etc.
    const processedQuery = query
    let result

    if (params.length === 0) {
      // If no parameters, use the query directly
      result = await sql`${sql.raw(processedQuery)}`
    } else {
      // For parameterized queries, we need to use the tagged template syntax
      // Convert the query with positional parameters to use the values directly
      // This is a simple implementation and might need to be enhanced for complex queries
      result = await sql.query(query, params)
    }

    return result
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
