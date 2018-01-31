## Agregar páginas externas 

* Para agregar datos desde páginas externas primero es necesario agregar la página a ** externally_connectable ** en el manifest.

* También se debe agregar los datos correspondientes a ```active_pages.json```.

* Finalmente es necesario agregar un sendMessage directamente en la página (revisar ```index.html``` e ```index.js```)

## Inline installation

* Para usar inline installation, se debe agregar el sitio web a dashboard de google y seguir las. instrucciones desde ahi.

* Instrucciones para inline installation: [Aquí](https://timleland.com/chrome-extension-inline-installation/)

* Es importante validar tu página con google, y agregar el archivo html entregado por este en el directorio local de la página.

* Notar que es posible que Google store identifique la extensión como "peligrosa" o la página con inline installation como sospechosa, lo que desactivaría inline installation. Cuando ocurre esto dicha función se reemplaza por la instalación normal, por lo que en ningún momento se pierde esta funcionalidad por completo (si se desactiva este tipo de instalación sera necesario recargar las páginas para poder ejecutar la extensión).

* Hay un bug que se presenta con algunos usuarios de banco Santander, los cuales no pueden realizar transferencias por la pagina web de manera normal (esto es un problema de la página del banco y no se relaciona con la extensión). En estos casos se utiliza una sesion en incógnito y se debe activar la extensión Para que funcione en dicho modo.
