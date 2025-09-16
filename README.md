# Primer Modelo
Se define la clase products en la base de datos, con ayuda del ORM sequelize.

```js
  Product = {
   precio:number,
   title:string,
   // ...
}
```

Luego crear una pequeña API rest con Typescript y Express que permita hacer todas las operaciones CRUD (crear, leer, actualizar y borrar productos).

## Documentación.

- POST /products (crear)
- GET /products (obtener todos)
- GET /products/:productId (obtener uno)
- PATCH /products/:productId (modificar uno)
- DELETE /products/:productId (eliminar uno)


<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; border:solid">

<h3>Documentacion de postman</h3>

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/47803384-290ab0f0-e7e7-43c9-ae2c-cc9b7b2cc999?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D47803384-290ab0f0-e7e7-43c9-ae2c-cc9b7b2cc999%26entityType%3Dcollection%26workspaceId%3Ddc9be587-4079-4103-b322-75a3028e571f)

</div>