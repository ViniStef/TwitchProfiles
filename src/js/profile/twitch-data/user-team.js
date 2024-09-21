export const getAndUpdateUserTeam = async (broadcaster_id) => {
    let team;
    const requestBody = { endpoint: 'teams/channel', method: 'GET', params: { broadcaster_id: broadcaster_id } }
    try {
        const response = await axios.post("/twitch-data", requestBody, {
            headers: { 'Content-Type': 'application/json' },
        })

        team = response.data.data[0].team_display_name;
        document.querySelector("#channel__team span").textContent = team;
    } catch (error) {
        team = "Sem Equipe";
        document.querySelector("#channel__team span").textContent = team;
    }
}