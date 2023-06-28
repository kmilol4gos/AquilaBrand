import { useState, useEffect } from "react";

function Events() {
    const URL = "http://localhost:3000/event";

    const [events, setEvents] = useState();

    const fetchApi = async () => {
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const responseJSON = await response.json();
        setEvents(responseJSON);
    };

    useEffect(() => {
        fetchApi();
    }, []);

    return (
        <div id="event-card">
            <ul>
                {!events ? ( "Cargando..." ) : 
                events.map((event, index) => {
                    return (
                        <li key={event.EVENT_ID}>
                            <img src="" alt={event.EVENT_NAME} />
                            <div id="titulo-evento">
                                <strong>{event.EVENT_NAME}</strong>
                            </div>
                            <div id="direccion-evento">
                                <strong>{event.EVENT_ADDRESS}</strong>
                            </div>
                            <div id="descripcion-evento">
                                <strong>{event.EVENT_DESCRIPTION}</strong>
                            </div>
                            <div id="fecha-evento">
                                <strong>{event.EVENT_DATE}</strong>
                                <strong>{event.EVENT_TIME}</strong>
                            </div>
                        </li>);
                    })
                }
            </ul>
        </div>
    )
}

export default Events;
/*

webpay // importante
carro compras //importante
eventos //importante (listo)
productos destacados (cambiar parametros base de datos, agregar tabla producto destacado) //importante (listo)
funcionalidad botones carro de compra //importante (despues de implementar carro de compras)
productos por categoria o seccion (listo)
informacion //prioridad baja
whatsapp //prioridad baja
pagina de confirmacion de compra //importante (pendiente de carro de compras)
pagina pa que pueda cambiar los productos //prioridad baja (al ultimo)


carro de compras:

Json con:

1. orden compra (numero generado aleatorio que no se repita.)
2. productos (id de inventario, porque estos contienen la talla el color)
    1. id de inventario (para descontar del inventario)
    2. cantidad
    3. precio unitario
    4. id producto
    5. color
    6. talla
3. total (suma de todos los productos)
4. fecha de compra (fecha en que se realizo la compra)
*/