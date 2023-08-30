import markdown from './drawdown-ss14.min.js' //https://github.com/ZeroDayDaemon/drawdown-ss14

const id = "" //Element ID
const rules = "" //Link to raw text file

const serverRules = document.querySelector(id);

if (serverRules) {
    fetch(rules)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            } else {
                return res.text();
            }
        })
        .then((text) => {
            serverRules.innerHTML = text;
            update();
        })
        .catch((error) => {
            console.error('Error:', error);
            serverRules.innerHTML = "Error loading rules";
        });

    const update = () => {
        try {
            const markdownText = markdown(serverRules.innerHTML);
            serverRules.innerHTML = markdownText;
        } catch (err) {
            console.error(`Error parsing markdown: ${err}`);
            serverRules.innerHTML = "Error displaying rules";
        }
    }
}
