function updateServer(id) {
    const cacheKey = `server_${id}`;
    const cache = localStorage.getItem(cacheKey);
    const cacheExpiry = parseInt(localStorage.getItem(`${cacheKey}_expiry`)) || 0;
    const currentTime = (new Date()).getTime();

    if (cache && cacheExpiry > currentTime) {
        updateDisplay(JSON.parse(cache), id);
        return;
    }

    //Relative path to the SS14.Watchdog status json
    const serverUrl = `/status/${id}/`;

    fetch(serverUrl, {
        method: "get",
        headers: { "Content-Type": "application/json" },
    })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            } else {
                return resp.json();
            }
        })
        .then((json) => {
            if (!validateServer(json)) {
                throw new Error(`Invalid server response format`);
            }
            updateDisplay(json, id);
            localStorage.setItem(cacheKey, JSON.stringify(json));
            localStorage.setItem(`${cacheKey}_expiry`, (currentTime + 60000).toString());
        })
        .catch((error) => {
            console.error(error);
        });
}

function validateServer(server) {
    return server.hasOwnProperty('name') && server.hasOwnProperty('players') && server.hasOwnProperty('soft_max_players');
}

function updateDisplay(server, id) {
    //Edit 45 and 46 to your preferred element ID or use the defaults of ServerName and ServerPlayers
    const serverName = document.getElementById(`serverName${id}`);
    const serverPlayers = document.getElementById(`serverPlayers${id}`);
    if (serverName && serverPlayers) {
        serverName.textContent = `${server.name}`;
        serverPlayers.textContent = `Players: ${server.players} / ${server.soft_max_players}`;
    }
}

// Number of servers to query
const servers = 1
for (let i = 1; i <= servers; i++) {
    updateServer(i);
    setInterval(() => updateServer(i), 1000);
}
