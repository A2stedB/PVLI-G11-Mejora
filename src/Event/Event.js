//------------------------------------------------------------------------
// 
// Estado del archivo: Modificado
// 
// Description:
// 
// Un "enum" de los eventos del juego
// Sistema centralizado de eventos para comunicación entre componente
// 
// Cosas añadidas, nuevas, modificadas o quitadas respecto a la antigua version:
// 
// 
// 
//------------------------------------------------------------------------

/**
 * @enum
 */
const Event = Object.freeze({
    SHOOT:Symbol("Shoot"),
    MOVE:Symbol("Move"),
    UPDATE_ROUND:Symbol("Update round"),
    UPDATE_ACTION:Symbol("Update the current action"),
    UPDATE_CURRENT_PLAYER:Symbol("Update the current player"),
})

export default Event;