import { readFileSync } from "fs"
import { join } from "path"
import { pool as db } from "../index"

interface QueryResult {
  success: boolean
  data?: any
  message?: string
}

function loadSqlQuery(fileName: string) {
  const path = join(__dirname, "./queries", fileName)
  return readFileSync(path, "utf-8")
}

async function executeQuery(
  sqlFileName: string,
  params: any[] = []
): Promise<QueryResult> {
  try {
    const query = !sqlFileName.includes(".sql")
      ? sqlFileName
      : loadSqlQuery(sqlFileName)
    const [results] = await db.query(query, params)
    return { success: true, data: results }
  } catch (error) {
    console.error("Database Query Error:", error)
    return { success: false, message: "Error executing the query" }
  }
}

async function insertQuery(tableName: string, data: any): Promise<QueryResult> {
  try {
    const columns = Object.keys(data)
    const placeholders = columns.map(() => "?").join(", ")
    const values: any = Object.values(data)

    const query = `INSERT INTO ${tableName} (${columns.join(
      ", "
    )}) VALUES (${placeholders})`

    const { success } = await executeQuery(query, values)
    if (success === true) {
      return { success: true, message: "data inserted successfully" }
    }
    return { success: false, message: "data insertion failed" }
  } catch (error) {
    console.error("Database Query Error:", error)
    return { success: false, message: "Error inserting data" }
  }
}

async function updateQuery(
  tableName: string,
  columnName: string,
  id: string,
  data: any
): Promise<QueryResult> {
  try {
    const setClauses = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(", ")
    const values: any = Object.values(data)

    const query = `UPDATE ${tableName} SET ${setClauses} WHERE ${columnName} = ?`

    const { success } = await executeQuery(query, [...values, id])
    if (success === true) {
      return { success: true, message: "data updated successfully" }
    }
    return { success: false, message: "data update failed" }
  } catch (error) {
    console.error("Database Query Error:", error)
    return { success: false, message: "Error updating data" }
  }
}

async function deleteQuery(
  tableName: string,
  columnName: string,
  id: string
): Promise<QueryResult> {
  try {
    let query = ""
    const params = []

    if (columnName && id !== null) {
      query = `DELETE FROM ${tableName} WHERE ${columnName} = ?`
      params.push(id)
    } else {
      query = `DELETE FROM ${tableName}`
    }

    const { success } = await executeQuery(query, params)
    if (success === true) {
      return {
        success: true,
        message: columnName
          ? "Record deleted successfully"
          : "All records deleted successfully",
      }
    }
    return { success: false, message: "data deletion failed" }
  } catch (error) {
    console.error("Database Query Error:", error)
    return { success: false, message: "Error deleting data" }
  }
}

export { executeQuery, insertQuery, updateQuery, deleteQuery }
