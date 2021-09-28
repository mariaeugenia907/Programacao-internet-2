const criarServicoElement = (item) => {
    const template = document.getElementById('servico-template')

    const servicoElement = document.importNode(template.content, true)

    const itensServico = servicoElement.querySelectorAll('span')
    itensServico[0].innerText = item.titulo
    itensServico[1].innerText = item.descricao
    itensServico[2].innerText = item.valor
    itensServico[3].innerText = item.data
    itensServico[4].innerText = item.situacao
    itensServico[5].innerText = item.comentarios

    return servicoElement
}

const carregarServicos = async () => {
    const response = await fetch('http://localhost:3000/servicos')
    const dados =  await response.json()
    console.log(dados)

    dados.forEach(item => {
        const containerServicosElement = document.getElementById('container-servicos')
        const servicoElement = criarServicoElement(item)

        containerServicosElement.append(servicoElement)
    })
}

const novoServico = async () => {
    const servicoTituloElement = document.getElementById('servico-titulo')
    const servicoDescricaoElement = document.getElementById('servico-descricao')
    const servicoValorElement = document.getElementById('servico-valor')
    const servicoDataElement = document.getElementById('servico-data')
    const servicoSituacaoElement = document.getElementById('servico-descricao')
    const servicoComentariosElement = document.getElementById('servico-comentarios')

    const servico = {
        titulo: servicoTituloElement.value,
        descricao: servicoDescricaoElement.value,
        valor: Number(servicoValorElement.value),
        data: servicoDataElement.value,
        situacao: servicoSituacaoElement.value,
        comentarios: servicoComentariosElement.value
    }

    const init = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(servico)
    }

    const response = await fetch('http://localhost:3000/servicos', init)
    console.log(response)
    const dados = await response.json()

    const containerServicosElement = document.getElementById('container-servicos')
    const servicoElement = criarServicoElement(dados)

    containerServicosElement.prepend(servicoElement)
}

const editarServico = async () => {
    
}


window.onload = () => {
    carregarServicos()

    const btnNovoServico = document.getElementById('btnNovoServico')
    btnNovoServico.onclick = novoServico

    console.log('Iniciado')
}