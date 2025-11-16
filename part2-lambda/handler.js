"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const crypto_1 = require("crypto");
const client = new client_dynamodb_1.DynamoDBClient({ region: "us-east-2" });
const TABLE_NAME = "tec-practicantes-todo";
const handler = async (event) => {
    var _a;
    const method = event.httpMethod;
    try {
        // GET
        if (method === "GET") {
            const result = await client.send(new client_dynamodb_1.ScanCommand({ TableName: TABLE_NAME }));
            const items = (result.Items || []).map((it) => ({
                id: it.id.S,
                titulo: it.titulo.S,
                completada: it.completada.BOOL,
            }));
            return {
                statusCode: 200,
                body: JSON.stringify(items),
            };
        }
        // POST
        if (method === "POST") {
            const body = JSON.parse(event.body);
            // Validación
            if (!body.titulo || typeof body.titulo !== "string") {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: "El título es requerido y debe ser string" }),
                };
            }
            // SI viene ID, actualizar
            if (body.id) {
                const existing = await client.send(new client_dynamodb_1.GetItemCommand({
                    TableName: TABLE_NAME,
                    Key: { id: { S: body.id } },
                }));
                if (!existing.Item) {
                    return {
                        statusCode: 404,
                        body: JSON.stringify({ error: "La tarea no existe" }),
                    };
                }
                await client.send(new client_dynamodb_1.UpdateItemCommand({
                    TableName: TABLE_NAME,
                    Key: { id: { S: body.id } },
                    UpdateExpression: "SET titulo = :t, completada = :c",
                    ExpressionAttributeValues: {
                        ":t": { S: body.titulo },
                        ":c": { BOOL: (_a = body.completada) !== null && _a !== void 0 ? _a : false },
                    },
                }));
                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        mensaje: "Tarea actualizada",
                        id: body.id,
                    }),
                };
            }
            // NO trae ID, crear
            const newId = (0, crypto_1.randomUUID)();
            const newItem = {
                id: { S: newId },
                titulo: { S: body.titulo },
                completada: { BOOL: false },
            };
            await client.send(new client_dynamodb_1.PutItemCommand({
                TableName: TABLE_NAME,
                Item: newItem,
            }));
            return {
                statusCode: 200,
                body: JSON.stringify({
                    mensaje: "Tarea creada",
                    id: newId,
                }),
            };
        }
        // Otros métodos
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Método no permitido" }),
        };
    }
    catch (err) {
        console.error("ERROR:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error interno del servidor" }),
        };
    }
};
exports.handler = handler;
