* Ir a ```/src/active_pages.json``` y añadir el nuevo banco con sus respectivos atributos, con esto ya debería ser posible detectar y activar la extensión en la página del nuevo banco. Notar que **extension_domain** en el manifest, contiene un segmento de la url completa donde se encuentra el formulario a completar, debido a esto podemos activar nuestra extensión en cualquier ubicación dentro de la página del banco luego de ingresar.

* Dentro de ```active_pages.json``` encontramos el atributo ```form_url``` el cual es la dirección del formulario en caso de que exista. En caso que la página no modifique su url mientras se navegas hacia el formulario de transferencia (por ejemplo el banco Santander) igual es necesario agregar esta url estática.

* El atributo type en ```active_pages.json``` identifica el tipo de página, en nuestro caso contamos solo con bancos y FINTUAL, esta ultima tiene el tipo "externo". Este identificador permite cambiar los popups de la extensión dependiendo su tipo.

* Si se desea agregar más tipos y nuevos popup lo primero es agregar un HTML en ```/src/browser_action``` y luego agregar el caso especifico, dentro del listener ```chrome.tabs.onUpdated``` ubicado en ```/bg/background.js``` . Luego se debe crear un archivo *.js para el nuevo HTML que imite el comportamiento de los popups ya existentes.

* Luego de agregar el nuevo banco en active_pages.json es necesario agregar las funciones en ```/src/browser_action/bank_action.js```.

* El primer botón permite navegar hasta el formulario de transferencia, para esto se usa la función openForm(json). En caso de que se use una url para acceder el formulario, solo seria necesario completar el atributo form_url en ```active_pages.json``` . En caso que no sea posible acceder solo con una url sera necesario agregar una función que ejecute un script que contiene otra función la cual realiza el proceso de navegar a la pagina (esta ultima funcion se debe injectar desde ```/src/inject/<banco>_fun.js)```.

* Para realizar el proceso proceso seguir el ejemplo de banco Santander. Ademas notar que este proceso es similar al proceso de agregar la función que completa el formulario (ambos se define en el mismo js), por lo que se deben seguir las instrucciones descritas a continuación.

* Para que el botón ademas complete el formulario, se deben crear dos archivos en ```/src/inject ,```<banco>_inject.js``` y ```<banco>_fun.js``` .

* ```<banco>_inject.js``` , es básicamente el mismo archivo para cada banco solo cambia la dirección del script a inyectar. Es importante que para cada banco se tenga un archivo separado ya que que el manifest identificará el banco e insertará solo el código necesario!

* ```<banco>_fun.js``` contiene las funciones necesarias para rellenar un formulario, para cada banco este proceso es completamente diferente. Lo único importante a considerar es que la función que inserte datos en el formulario se llame ```fill_my_form()``` la cual esta inserta directamente el el botón. En este punto es necesario cargar los datos desde el storage enviado un mensaje que sera leido desde el background.

* Por último es necesario volver al manifest y agregar los match y los scripts que necesita la página. Dentro de content script es necesario agregar el match para el banco con su respectivo inject, luego se debe agregar el ```<banco>_fun.js``` dentro de ```web_accesible_resources```, para que la página pueda acceder a las funciones insertadas desde la extensión y finalmente se deben a agregar las páginas que pueden acceder a los datos en **externally_connectable** dentro del manifest (acá se encuentran las páginas de los bancos y las paginas que pueden modificar los datos de la extensión, en neustro caso FINTUAL).


