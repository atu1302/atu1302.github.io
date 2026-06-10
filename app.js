const newQuestFormEl = document.getElementById("new-quest-form");
const questNameInputEl = document.getElementById("quest-name");
const questContainer = document.getElementById("past-periods");

const STORAGE_KEY = "quests";

newQuestFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const questName = questNameInputEl.value.trim();

    if (!questName) {
        newQuestFormEl.reset();
        return;
    }

    storeNewQuest(questName);
    renderQuests();
    newQuestFormEl.reset();
});

function storeNewQuest(questName) {
    const quests = getAllStoredQuests();

    quests.push({
        name: questName,
        created: new Date().toISOString()
    });

    window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(quests)
    );
}

function getAllStoredQuests() {
    const data = window.localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function renderQuests() {
    const questHeader = document.createElement("h2");
    const questList = document.createElement("ul");

    const quests = getAllStoredQuests();

    questContainer.textContent = "";

    if (quests.length === 0) {
        return;
    }

    questHeader.textContent = "Quests";

    quests.forEach((quest) => {
        const questEl = document.createElement("li");
        questEl.textContent = quest.name;
        questList.appendChild(questEl);
    });

    questContainer.appendChild(questHeader);
    questContainer.appendChild(questList);
}

renderQuests();