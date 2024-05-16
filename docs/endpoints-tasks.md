 
### Buscar todas as tasks

**Endpoint:** `/all`  
**Método:** `GET`  
**Descrição:** Retorna todas as tasks disponíveis, independentemente do projeto.

**Resposta de Sucesso:**
- **Código:** 200
- **Conteúdo:**
    ```json
    [
      {
        "id": 1,
        "name": "Task 1",
        "description": "Description for task 1",
        "done": false,
        "projectId": 1
      },
      ...
    ]
    ```

### Buscar uma task específica

**Endpoint:** `/<int:task_id>`  
**Método:** `GET`  
**Descrição:** Retorna os detalhes de uma task específica baseada no seu ID.

**Parâmetros de URL:**
- `task_id`: ID da task a ser buscada.

**Resposta de Sucesso:**
- **Código:** 200
- **Conteúdo:**
    ```json
    {
      "id": 1,
      "name": "Task 1",
      "description": "Description for task 1",
      "done": false,
      "projectId": 1
    }
    ```

### Criar uma task

**Endpoint:** `/`  
**Método:** `POST`  
**Descrição:** Cria uma nova task e a adiciona ao projeto especificado pelo `projectId`.

**Corpo da Requisição:**
```json
{
  "name": "Task Name",
  "description": "Task Description",
  "done": false,
  "projectId": 1
}
```

**Resposta de Sucesso:**
- **Código:** 201
- **Conteúdo:**
    ```json
    {
      "message": "Task created!"
    }
    ```

### Mudar o status de uma task para feita

**Endpoint:** `/do/<int:task_id>`  
**Método:** `POST`  
**Descrição:** Atualiza o status da task para 'feita'.

**Parâmetros de URL:**
- `task_id`: ID da task a ser atualizada.

**Resposta de Sucesso:**
- **Código:** 200
- **Conteúdo:**
    ```json
    {
      "message": "Task done"
    }
    ```

### Atualizar os dados de uma task

**Endpoint:** `/<int:task_id>`  
**Método:** `PUT`  
**Descrição:** Atualiza os dados de uma task específica.

**Parâmetros de URL:**
- `task_id`: ID da task a ser atualizada.

**Corpo da Requisição:**
```json
{
  "name": "New Task Name",
  "description": "New Task Description",
  "done": true
}
```

**Resposta de Sucesso:**
- **Código:** 200
- **Conteúdo:**
    ```json
    {
      "message": "Task edited"
    }
    ```

### Deletar uma task

**Endpoint:** `/<int:task_id>`  
**Método:** `DELETE`  
**Descrição:** Deleta uma task específica.

**Parâmetros de URL:**
- `task_id`: ID da task a ser deletada.

**Resposta de Sucesso:**
- **Código:** 204
- **Conteúdo:** (vazio)