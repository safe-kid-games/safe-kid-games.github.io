// Main function to enter fullscreen mode
function enterFullscreen() {
    const game = getGameElement();
    const gameContent = getGameContentElement();
    const closeButton = createCloseButton();
    
    applyFullscreenStyles(game, gameContent);
    addCloseButton(gameContent, closeButton, game);
    addEventListeners();
}

// Get the game iframe element
function getGameElement() {
    let game = document.getElementById('game-iframe');
    if (game === null) {
        game = document.getElementById('game-frame');
    }
    return game;
}

// Get the game content container element
function getGameContentElement() {
    let gameContent = document.getElementById('game-content');
    if (gameContent === null) {
        gameContent = document.getElementById('game');
    }
    return gameContent;
}

// Create the close button element
function createCloseButton() {
    const closeButton = document.createElement('button');
    closeButton.setAttribute('id', 'close-btn');
    closeButton.innerHTML = '&#215;';
    closeButton.setAttribute('style',
        'position: fixed;' +
        'top: 0;' +
        'right: 0;' +
        'z-index: 1000000000;' + 
        'padding: 3px;' +
        'text-decoration: none;' +
        'font-size: 45px;' +
        'color: #000;' +
        'font-family: Arial;' +
        'line-height: 30px;' +
        '-webkit-text-stroke: 2px #000;' +
        'border: 2px solid #000;' +
        'margin: 3px;' +
        'background-color: #fff;'
    );
    closeButton.onclick = exitFullscreen;
    return closeButton;
}

// Apply fullscreen styles to game and content elements
function applyFullscreenStyles(game, gameContent) {
    const availableHeight = window.innerHeight + 'px';
    
    gameContent.setAttribute('style',
        'position: fixed;' +
        'top: 0;' +
        'left: 0;' +
        'right: 0;' +
        'bottom: 0;' +
        'z-index: 999999998;' + 
        'background-color: #000;' +
        'width: 100%;' +
        'height: 100%;' +
        'overflow: hidden;' +
        'box-sizing: border-box;'
    );
    
    game.setAttribute('style',
        'position: absolute;' +
        'top: 0;' +
        'left: 0;' +
        'right: 0;' +
        'bottom: 0;' +
        'z-index: 999999999;' + 
        'width: 100%;' +
        'height:' + availableHeight +';' +
        'text-align: center;' +
        'display: block;' +
        'background-color: #000;' +
        'overflow: hidden;'
    );
}

// Add close button to the game content
function addCloseButton(gameContent, closeButton, game) {
    gameContent.insertBefore(closeButton, game);
}

// Add event listeners for resize and keydown events
function addEventListeners() {
    window.addEventListener('resize', resizeOverlay);
    window.addEventListener('keydown', handleKeyPress);
}

// Remove event listeners
function removeEventListeners() {
    window.removeEventListener('resize', resizeOverlay);
    window.removeEventListener('keydown', handleKeyPress);
}

// Exit fullscreen mode
function exitFullscreen() {
    removeEventListeners();
    
    const game = getGameElement();
    const gameContent = getGameContentElement();
    const closeButton = document.getElementById('close-btn');
    
    resetGameStyles(game, gameContent);
    closeButton.remove();
}

// Reset game styles after exiting fullscreen
function resetGameStyles(game, gameContent) {
    game.removeAttribute('style');
    gameContent.setAttribute('style', 'padding-bottom: ' + game.getAttribute('data-ratio') + '%;');
    game.setAttribute('style', 'height: 100%; width: 100%;');
}

// Resize overlay when window is resized
function resizeOverlay() {
    const game = getGameElement();
    const availableHeight = window.innerHeight + 'px';
    
    game.setAttribute('style', 
        'position: relative;' +
        'width: 100%;' +
        'height:' + availableHeight +';' +
        'opacity: 1;' +
        'text-align: center;' +
        'display: block;' +
        'background-color: #000;' +
        'z-index: 999999997;' + 
        'overflow: hidden;'
    );
}

// Handle keypress events
function handleKeyPress(event) {
    if (event.key === 'Escape') {
        exitFullscreen();
    }
}
