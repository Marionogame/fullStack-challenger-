Obtención de balance REE (Red Eléctrica de España)


-------------------------
Backend
-------------------------
Estructura Backend del projecto:

(Esta deciciones fueron tomadas en mi juicio y para completar todos los requerimientos del documento que se me entrego)

Cada cierto tiempo, el proyecto realiza una petición GET automática a la API REST de REE (Red Eléctrica de España) para mantenerse siempre actualizado, 
asi la aplicacion no depende de datos externo y puede manipular, transformar o extender los datos para su continuo funcionamiento y asegura que la información
presentada sea precisa, confiable y en tiempo real.

Se puede ajustar fácilmente la frecuencia del API del projecto a la frecuencia API REST de REE (Red Eléctrica de España) para mantener la informacion actualizada.


-------------------------


Ejecución:

Correr API: pnpm nest start

Correr Testing: pnpm jest --coverage

Testing Covertura 100%:
![image](https://github.com/user-attachments/assets/37478049-6ea4-4d57-8b2a-42ff32abe3c3)



-------------------------
Opciones tambien Aceptables:

(Cada opción dependería de las circunstancias específicas, considerando tanto la capacidad de la compañía como la disponibilidad y funcionalidad del API REST de REE.)

A - La mejor opción para un funcionamiento óptimo sería implementar un disparador que notifique a nuestra API cuando haya un nuevo dato disponible.
Esto permitiría descargarlo automáticamente y actualizar nuestra información en tiempo real, garantizando la frescura y precisión de los datos.

B - Una opción más técnica pero algo forzada sería identificar el momento exacto en que el API de REE realiza sus actualizaciones.
Esto implicaría analizar patrones de actualización y configurar validaciones robustas en el sistema para garantizar que los datos se sincronicen justo en esos intervalos.
Este enfoque, aunque complejo, puede ser útil en escenarios donde la precisión en tiempo real es crítica y la frecuencia de actualización del API es predecible.

C - Usar el API REST de REE directamente como servicio garantiza que el proyecto siempre tenga datos actualizados sin necesidad de almacenamiento local, lo que simplifica la arquitectura y ahorra esfuerzo de mantenimiento. Sin embargo, es importante considerar que no tendríamos control sobre la libertad de acceso a los datos ni sobre la velocidad de respuesta, y además, si el API REST de REE no está diseñado para soportar un gran número de usuarios concurrentes, esto podría generar problemas de rendimiento o incluso caídas del servicio.

--------------------------

Frontend
-------------------------
Estructura Front-End del projecto:

En la interfaz cuenta con varios componentes, incluyendo una tabla que muestra todos los datos necesarios ordenados por tiempo, con un filtro para seleccionar la fecha deseada, 
Además, la aplicación incorpora un gráfico interactivo que visualiza de forma clara y concisa todos los datos, facilitando el análisis y permitiendo a los usuarios tomar
decisiones informadas basadas en la información presentada, estos son algunos de los componentes.

Se implementaron diversas pantallas atractiva e informativas para orientar al usuario en diferentes escenarios, como errores, estados de carga o la ausencia de datos disponibles.

Es importante destacar que la aplicación es completamente responsive. Cada componente ha sido cuidadosamente adaptado o sustituido según sea necesario para garantizar un 
funcionamiento óptimo tanto en dispositivos móviles como en plataformas de escritorio.
Ejecución:

Correr Web: pnpm run dev

Correr Testing: pnpm vitest run --coverage  

Testing Covertura 100%:
![image](https://github.com/user-attachments/assets/610a58de-49b0-4c6f-b75c-2fbae87b290c)

--------------------------
 
Pantalla General Escritorio:
![image](https://github.com/user-attachments/assets/b75998ad-8dc4-45de-ad86-ea8246b5a031)

Pantalla General Movil:
![image](https://github.com/user-attachments/assets/84c0e368-1f8d-469f-9e5f-6ca68760b62b)
![image](https://github.com/user-attachments/assets/25a4cbf2-b575-4b9d-a2cc-f45272f2ff46)


Pantalla Error:
![image](https://github.com/user-attachments/assets/5c09c179-4b69-4b80-9727-19d687e8357b)

Pantalla Cargando:
![image](https://github.com/user-attachments/assets/6254dbbb-c0ff-43ab-a657-843fda7b33ef)


![animiertes-gif-von-online-umwandeln-de](https://github.com/user-attachments/assets/453962b2-3db6-4cd6-8eea-40a8fd183561)

