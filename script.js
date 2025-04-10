document.addEventListener("DOMContentLoaded", function() {

    // Função para criar o botão de tema
    function createThemeButton() {
        const themeButton = document.createElement("button");
        themeButton.innerText = "Mudar Tema";
        themeButton.style.position = "fixed";
        themeButton.style.top = "20px";
        themeButton.style.right = "20px";
        themeButton.style.padding = "10px 20px";
        themeButton.style.fontSize = "16px";
        themeButton.style.backgroundColor = "#1DB954";
        themeButton.style.color = "#fff";
        themeButton.style.border = "none";
        themeButton.style.borderRadius = "5px";
        document.body.appendChild(themeButton);

        themeButton.addEventListener("click", toggleTheme);
    }

    // Função para alternar entre tema claro e escuro
    function toggleTheme() {
        document.body.classList.toggle("light-theme");
        if (document.body.classList.contains("light-theme")) {
            document.body.style.transition = " background 0.5s, color 0.5s";
            document.body.style.background = "#f0f0f0"; // Cor de fundo claro
            document.body.style.color = "#333"; // Cor de texto escura
        } else {
            document.body.style.transition = "background 0.5s, color 0.5s";
            document.body.style.background = "url('https://source.unsplash.com/1600x900/?music,technology') no-repeat center center fixed";
            document.body.style.backgroundSize = "cover";
            document.body.style.color = "#fff"; // Cor de texto branca
        }
    }

    // Função para buscar dados da API do Spotify
    async function fetchSpotifyData() {
        const token = 'SEU_ACCESS_TOKEN_AQUI'; // Substitua pelo seu token de autenticação
        if (!token) {
            console.error('Token de autenticação não fornecido.');
            return;
        }

        try {
            const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            displayNewReleases(data);
        } catch (error) {
            console.error('Erro ao obter dados da API do Spotify:', error);
        }
    }

    // Função para exibir novos lançamentos
    function displayNewReleases(data) {
        const releasesSection = document.getElementById("new-releases") || createNewReleasesSection();
        const releasesList = data.albums.items;
        const list = document.createElement("ul");

        releasesList.forEach(album => {
            const listItem = document.createElement("li");
            const albumLink = document.createElement("a");
            albumLink.href = album.external_urls.spotify;
            albumLink.target = "_blank";
            albumLink.innerText = `${album.name} - ${album.artists[0].name}`;
            listItem.appendChild(albumLink);
            list.appendChild(listItem);
        });

        releasesSection.appendChild(list);
    }

    // Função para criar a seção de novos lançamentos
    function createNewReleasesSection() {
        const newReleasesSection = document.createElement("section");
        newReleasesSection.id = "new-releases";
        newReleasesSection.innerHTML = "<h2>Novos Lançamentos</h2>";
        document.body.appendChild(newReleasesSection);
        return newReleasesSection;
    }

    // Inicializa o botão de tema e busca os dados do Spotify
    createThemeButton();
    fetchSpotifyData();

});