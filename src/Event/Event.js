//TODO
// - Todos los eventos aqui

const Event = Object.freeze({
    TOGGLE_MAP:Symbol("Toggle Map"),
    SHOOT:Symbol("Shoot"),
    MOVE:Symbol("Move"),
    DISABLE_KEY:Symbol("Disable key"),
    ENABLE_KEY:Symbol("Enable key"),
    UPDATE_ROUND:Symbol("Update round"),
    UPDATE_PLAYER_TEXT:Symbol("Update player text")
})

export default Event;