export const getSubBadges = async (broadcaster_id) => {
    const reqBody = {endpoint: 'chat/badges', method: 'GET', params: {broadcaster_id: broadcaster_id}};
    
    try {
        const response = await axios.post("/twitch-data", reqBody, {
            'Content-Type': 'application/json',
        });

        let badgeInfo;
        if (response.data.data.length == 1) {
            badgeInfo = response.data.data[0].versions;
        } else if ((response.data.data.length == 2)) {
            badgeInfo = response.data.data[1].versions;
        } else {
            // User doesn't have any bits/sub badges.
            return null;
        }

        let badges = {};

        badgeInfo.filter((badge) => {
            if (parseInt(badge.id) < 1000) {
                if (!(badge.title in badges)) {
                    badges = {...badges, [`${badge.title}`]: badge.image_url_2x};
                }
            }
        })

        return badges;

    } catch (error) {
        console.log(error);
        
    }

};

export const handleBadges = (badges) => {
    const badgeList = document.querySelector(".badge__list");
    const badgeOrder = [];
    const orderObject = {};
    try {
        Object.keys(badges).forEach((key) => {
            if (key == "Subscriber" && !(key in badgeOrder)) {
                orderObject[key] = 0;
                badgeOrder.push(0);
            } else {
                const subtime = key.split(" ", 1);
                let [number, period] = subtime[0].split("-");
    
                const timeValue = period == "Year" ? 100 : 10;
    
                badgeOrder.push(number * timeValue);
                orderObject[key] = (number * timeValue);
            }
        })
    
        badgeOrder.sort((a, b) => a - b);
    
        let notFound = true;
        const newOrderBadge = {};
    
        let constraint = 0;
        while (notFound) {
            Object.keys(orderObject).forEach((key, index) => {
                if (orderObject[key] == badgeOrder[constraint]) {
                    newOrderBadge[convertToPortuguese(key)] = badges[key];
                    constraint++;
                }
                if (badgeOrder.length == Object.keys(newOrderBadge).length) {
                    notFound = false;
                }
            })
        }
    
        Object.keys(newOrderBadge).forEach((key, index) => {
            const img = document.createElement("img");
            const p = document.createElement("p");
            const li = document.createElement("li");
            const div = document.createElement("div");
            img.src = newOrderBadge[key];
            img.title = "Emblema de Inscrito";
            img.alt = "Emblema de Inscrito";
            p.className = "standard__background";
            p.textContent = key;
            p.title = "Duração da Inscrição";

            const badgeContainer = document.querySelector(".badge__container");
            const mainContainer = document.querySelector(".main__container");

            if (index == (Object.keys(newOrderBadge).length - 1)) {
                img.addEventListener("load", () => {
                    badgeContainer.style.display = "flex";
                    mainContainer.style.display = "flex";
                })
            }
    
            div.appendChild(img);
            div.appendChild(p);
            li.appendChild(div);
    
            badgeList.appendChild(li);
        }) 
    } catch (error) {
        const p = document.createElement("p");
        const li = document.createElement("li");
        const div = document.createElement("div");
        p.textContent = "Nenhum emblema de inscrito encontrado!";
        p

        div.appendChild(p);
        li.appendChild(div);
        badgeList.appendChild(li);
    }
};

const convertToPortuguese = (interval) => {
    if (interval == "Subscriber") {
        return "1 Mês";
    } else {
        const subtime = interval.split(" ", 1);
        let [number, period] = subtime[0].split("-");
        if (number > 1) {
            return period == "Year" ? `${number} Anos` : `${number} Meses`;
        } else {
            return period == "Year" ? `${number} Ano` : `${number} Mês`;
        }
    }
}