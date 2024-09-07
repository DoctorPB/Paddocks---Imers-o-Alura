function pesquisar() {
    let section = document.getElementById("resultados-pesquisa");
    let campoPesquisa = document.getElementById("campo-pesquisa").value.trim(); // Adiciona trim() para remover espaços extras

    // Se campoPesquisa for uma string vazia
    if (campoPesquisa === "") {
        section.innerHTML = "Nenhum resultado.";
        return;
    }

    campoPesquisa = campoPesquisa.toLowerCase();

    // Inicia uma string vazia para armazenar os resultados
    let resultados = "";
    let titulo = "";
    let descricao = "";
    let tags = [];

    // Para cada dado dentro da lista de dados
    for (let dado of dados) {
        // Verifica se 'titulo' e 'descricao' existem
        if (dado.titulo && dado.descricao) {
            titulo = dado.titulo.toLowerCase();
            descricao = dado.descricao.toLowerCase();
        } else {
            continue; // Pular se 'titulo' ou 'descricao' estiver ausente
        }

        // Verifica se o campo 'tags' é uma string e a converte em um array
        if (typeof dado.tags === "string") {
            tags = dado.tags.toLowerCase().split(",");  // Separa as tags por vírgula
        } else if (Array.isArray(dado.tags)) {
            tags = dado.tags.map(tag => tag.toLowerCase()); // Converte tags para minúsculas se já for um array
        } else {
            tags = [];  // Se 'tags' não for nem string nem array, inicializa como array vazio
        }

        // Verifica se o campo de pesquisa está em título, descrição ou tags
        if (titulo.includes(campoPesquisa) || descricao.includes(campoPesquisa) || tags.includes(campoPesquisa)) {
            // Adiciona o resultado correspondente
            resultados += `
            <div class="item-resultado">
                <h2>
                    <a href="${dado.link}" target="_blank">${dado.titulo}</a>
                </h2>
                <p class="descricao-meta">${dado.descricao}</p>
                <a href="${dado.link}" target="_blank">Mais informações</a>
            </div>
            `;
        }
    }

    // Se não houver resultados correspondentes
    if (resultados === "") {
        section.innerHTML = "Nenhum resultado encontrado.";
    } else {
        section.innerHTML = resultados;
    }
}
