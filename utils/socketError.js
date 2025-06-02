export function emitSocketError(socket, type, message) {
    socket.emit('error', { type, message });
}