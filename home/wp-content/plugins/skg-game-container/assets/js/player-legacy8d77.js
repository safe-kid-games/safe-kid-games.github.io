let isLargeScreen = false;
let isGameLoaded = false;

// Initialize the game environment based on screen size
function initializeGameEnvironment() {
    console.log('Initializing game environment');
    if (isGameLoaded) {
        console.log('Game already loaded. Skipping re-initialization.');
        return;
    }
    checkScreenSize();

    if (isLargeScreen) {
        initializeLargeScreen();
    } else {
        initializeSmallScreen();
    }
    addEventListeners();
}

// Check and set the screen size, remove sidebar if necessary
function checkScreenSize() {
    isLargeScreen = window.matchMedia("(min-width: 992px)").matches;
    if (window.matchMedia("(max-width: 1119px)").matches) {
        const sideBar = getElement('skg-sidebar');
        if (sideBar) sideBar.remove();
    }
}

// Initialize the game environment for large screens
function initializeLargeScreen() {
    hideElement('splash-area');
    loadGameDirectly();
}

// Initialize the game environment for small screens
function initializeSmallScreen() {
    showElement('splash-area');
    hideElement('game-iframe');
    console.log("Splash screen shown for small screen. Game will load when play button is clicked.");
}

// Load the game directly without additional content
function loadGameDirectly() {
    if (!isGameLoaded) {
        console.log('Loading game directly');
        isGameLoaded = true;
        loadGameSource();
        playGame();
    }
}

// Load the game source into the iframe
function loadGameSource() {
    const gameFrame = getElement('game-iframe');
    if (gameFrame) {
        gameFrame.src = gameFrame.getAttribute("data-src") || '';
        console.log('Game source loaded');
    }
}

// Display the game and handle related UI elements
function playGame() {
    console.log("Displaying game");
    showElement('game-iframe');
    enableFullScreenButton();
    removeElement('pre-content-container');
    ensureGameIframeVisible();
}

// Handle the play button click event
function play() {
    hideElement('splash-area');
    if (!isGameLoaded) {
        loadGameDirectly();
    }
}

// Ensure iframe is visible
function ensureGameIframeVisible() {
    var gameFrame = document.getElementById('game-iframe');
    if (gameFrame) {
        gameFrame.style.opacity = '1'; // Force opacity to 1
        gameFrame.style.transition = 'none'; // Disable transition
        gameFrame.style.display = 'block'; // Ensure it's displayed
        gameFrame.style.visibility = 'visible'; // Ensure visibility
    }
}

// Add event listeners for window resize
function addEventListeners() {
    window.addEventListener("resize", checkScreenSize);
}

// Get an element by its ID
function getElement(id) {
    return document.getElementById(id);
}

// Show an element by its ID
function showElement(id) {
    const element = getElement(id);
    if (element) element.style.display = "block";
}

// Hide an element by its ID
function hideElement(id) {
    const element = getElement(id);
    if (element) element.style.display = "none";
}

// Enable the full screen button
function enableFullScreenButton() {
    const fullScreenButton = getElement('full-screen-button');
    if (fullScreenButton) fullScreenButton.disabled = false;
}

// Remove an element by its ID
function removeElement(id) {
    const element = getElement(id);
    if (element) element.remove();
}

// Initialize the integration immediately
initializeGameEnvironment();
