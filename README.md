Challenger-FullStack
Obtención de balance REE (Red Eléctrica de España)

El proyecto funciona de la siguiente manera:

Cada cierto tiempo, el proyecto realiza una petición POST automática a la API REST de REE (Red Eléctrica de España) para mantenerse siempre actualizado.

El frontend realiza una petición al API de nuestro proyecto filtrando por fecha para obtener los datos deseados.

En el frontend se ofrecen diversas opciones para visualizar los datos mediante texto y gráficos.
-------------------------
Backend
Ejecución:

Correr: pnpm nest start

Test: pnpm run test:watch

Frontend
Ejecución:

Correr: pnpm run dev

Test: pnpm run test

--------------------------
Ejemplo de petición a GraphQL
Seleccionando únicamente los datos necesarios para ejecutar la aplicación en el frontend:

{
    getData {
      data {
        id
        type
        attributes {
          description
          lastUpdate
        }
      }
      _id
      included {
        type
        id
        attributes {
          title
          content {
            type
            attributes {
              color
              total
            }
          }
        }
      }
      createdAt
      updatedAt
    }
  }  

 Imagenes 
 
![image](https://github.com/user-attachments/assets/2e05066e-4d79-43a9-a85c-72695acbf89b)
![animiertes-gif-von-online-umwandeln-de](https://github.com/user-attachments/assets/453962b2-3db6-4cd6-8eea-40a8fd183561)

