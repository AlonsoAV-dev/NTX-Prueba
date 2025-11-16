# README — Despliegue de Lambda + DynamoDB (To-Do API)

Este proyecto implementa una función AWS Lambda que gestiona tareas mediante los métodos GET y **POST, utilizando API Gateway y DynamoDB.

---

## 1. Crear tabla en DynamoDB

1. Ir a AWS DynamoDB -> Create table
2. Nombre de la tabla:
   ```
   tec-practicantes-todo
   ```
3. Partition Key:
   ```
   id (String)
   ```
4. Crear tabla.

---

## 2. Preparar el código de la función Lambda

1. Compilar TypeScript:
   ```bash
   npx tsc
   ```
2. Crear un archivo ZIP que incluya:
   ```
   handler.js
   node_modules/
   package.json
   ```

---

## 3. Crear función AWS Lambda

1. Ir a AWS Lambda -> Create function
2. Runtime:
   ```
   Node.js 20.x
   ```
3. Handler:
   ```
   handler.handler
   ```
4. Subir el archivo .zip creado, por ejemplo, 'lambda.zip'.
5. Asignar permisos:
   - AWSLambdaBasicExecutionRole  
   - AmazonDynamoDBFullAccess  

---

## 4. Configurar API Gateway

1. Crear API REST.
2. Crear recurso:
   ```
   /todos
   ```
3. Crear métodos:
   - GET → Lambda Proxy
   - POST → Lambda Proxy
4. Seleccionar la función Lambda creada.

---

## 5. Implementar API

1. En API Gateway, ir a:
   ```
   Actions → Deploy API
   ```
2. Crear etapa:
   ```
   prod
   ```

---

## 6. Endpoints resultantes

GET:
```
https://ph6zy5glf5.execute-api.us-east-2.amazonaws.com/prod/todos
```

POST:
```
https://ph6zy5glf5.execute-api.us-east-2.amazonaws.com/prod/todos
```

---

## 7. Ejemplos de uso

### GET
```
GET /todos
```

### POST (crear)
```json
{
  "titulo": "Tarea prueba"
}
```

### POST (actualizar)
```json
{
  "id": "123",
  "titulo": "Tarea actualizada",
  "completada": true
}
```

---
