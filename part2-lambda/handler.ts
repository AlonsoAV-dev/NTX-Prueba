import {
    DynamoDBClient,
    ScanCommand,
    PutItemCommand,
    UpdateItemCommand,
    GetItemCommand
} from "@aws-sdk/client-dynamodb";

import { randomUUID } from "crypto";

const client = new DynamoDBClient({ region: "us-east-2" });
const TABLE_NAME = "tec-practicantes-todo";

export const handler = async (event: any) => {
    const method = event.httpMethod;

    try {
        // GET
        if (method === "GET") {
            const result = await client.send(
                new ScanCommand({ TableName: TABLE_NAME })
            );

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
                const existing = await client.send(
                    new GetItemCommand({
                        TableName: TABLE_NAME,
                        Key: { id: { S: body.id } },
                    })
                );

                if (!existing.Item) {
                    return {
                        statusCode: 404,
                        body: JSON.stringify({ error: "La tarea no existe" }),
                    };
                }

                await client.send(
                    new UpdateItemCommand({
                        TableName: TABLE_NAME,
                        Key: { id: { S: body.id } },
                        UpdateExpression: "SET titulo = :t, completada = :c",
                        ExpressionAttributeValues: {
                            ":t": { S: body.titulo },
                            ":c": { BOOL: body.completada ?? false },
                        },
                    })
                );

                return {
                    statusCode: 200,
                    body: JSON.stringify({
                        mensaje: "Tarea actualizada",
                        id: body.id,
                    }),
                };
            }

            // NO trae ID, crear
            const newId = randomUUID();

            const newItem = {
                id: { S: newId },
                titulo: { S: body.titulo },
                completada: { BOOL: false },
            };

            await client.send(
                new PutItemCommand({
                    TableName: TABLE_NAME,
                    Item: newItem,
                })
            );

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

    } catch (err: any) {
        console.error("ERROR:", err);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error interno del servidor" }),
        };
    }
};
