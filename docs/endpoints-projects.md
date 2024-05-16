## Buscar todos os projetos
**Endpoint:** `/projects/all`
**Método:** `GET`
**Descrição:** Retorna todos os projetos disponíveis.
**Resposta de Sucesso:**
- **Código:** 200
- **Conteúdo:**
```json
[
  {
    "id": 1,
    "name": "Project 1",
    "description": "Description for project 1"
  },
  {
    "id": 2,
    "name": "Project 2",
    "description": "Description for project 2"
  }
]
```
## Criar um projeto
**Endpoint:** `/projects`
**Método:** `POST`
**Descrição:** Cria um novo projeto.
**Corpo da Requisição:**
```json
{
  "name": "Project Name",
  "description": "Project Description"
}
```
**Resposta de Sucesso:**
- **Código:** 201
- **Conteúdo:**
```json
{
  "message": "Project created!"
}
```
**Resposta de Erro:**
- **Código:** 400
- **Conteúdo:**
```json
{
  "error": "Request body is missing required fields."
}
```
## Editar um projeto
**Endpoint:** `/projects/<int:project_id>`
**Método:** `PUT`
**Descrição:** Atualiza os dados de um projeto específico.
**Parâmetros de URL:**
- `project_id`: ID do projeto a ser atualizado.
**Corpo da Requisição:**
```json
{
  "name": "New Project Name",
  "description": "New Project Description"
}
```
**Resposta de Sucesso:**
- **Código:** 200
- **Conteúdo:**
```json
{
  "message": "Project edited"
}
```
**Resposta de Erro:**
- **Código:** 400
- **Conteúdo:**
```json
{
  "error": "Request body is missing required fields."
}
```
- **Código:** 404
- **Conteúdo:**
```json
{
  "error": "Project with the given ID does not exist."
}
```
## Deletar um projeto
**Endpoint:** `/projects/<int:project_id>`
**Método:** `DELETE`
**Descrição:** Deleta um projeto específico.
**Parâmetros de URL:**
- `project_id`: ID do projeto a ser deletado.
**Resposta de Sucesso:**
- **Código:** 204
- **Conteúdo:** (vazio)
**Resposta de Erro:**
- **Código:** 404
- **Conteúdo:**
```json
{
  "error": "Project with the given ID does not exist."
}
```