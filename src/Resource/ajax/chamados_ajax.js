async function filtrarChamados() {

    let situacao = document.getElementById("situacao").value;

    //mostrarElemento("resultado", false);

    const dados = {
        endpoint: API_FILTRAR_CHAMADOS,
        situacao: situacao
    }

    try {
        load();

        const response = await fetch(Base_Url_Api(), {
            method: 'POST',
            headers: headerComAutenticacao(),
            body: JSON.stringify(dados)
        });

        if (!response.ok) {
            throw new Error(MSG_ERRO_CALL_API);
        }

        const objDados = await response.json();

        const chamados = objDados.RESULT;

        const tab_result = document.getElementById('table_result');

        let tab_content = '<thead>' +
                                '<tr>' +
                                    '<th>Data Abertura</th>' +
                                    '<th>Aberto Por</th>' +
                                    '<th>Equipamento</th>' +
                                    '<th>Problema</th>' +
                                    '<th>Situação</th>' +
                                    '<th>Ação</th>' +
                                '</tr>' +
                            '</thead>' +
                            '<tbody>';
        let situacao = ""
        chamados.forEach((item) => {

            situacao = verificarSituacao(item.data_atendimento, item.data_encerramento);

            tab_content += '<tr>' +
                '<td>' + item.data_abertura + '</td>' +
                '<td>' + item.funcionario + '</td>' +
                '<td>' + item.nome_tipo + ' | ' + item.nome_modelo + ' | ' + item.identificacao + '</td>' +
                '<td>' + item.problema + '</td>' +
                '<td>' + situacao + '</td>' +
                '<td>';

            tab_content += '<a href="" class="btn btn-warning btn-sm" data-toggle="modal" data-target="#modal_detalhes" onclick="detalharChamado(' + item.id_chamado + ')">Atender</a>';
            tab_content += '</td>'
            '</tr>';
        });

        tab_result.innerHTML = tab_content;
        //mostrarElemento("resultado", true);

    } catch (error) {
        //mostrarMensagemCustomizada(error.message);
    } finally {
        removerLoad();
    }
}

async function detalharChamado(id) {

    const dados = {
        endpoint: API_DETALHAR_CHAMADO,
        id: id
    }

try {
    load();
    const response = await fetch(Base_Url_Api(), {
        method: 'POST',
        headers: headerComAutenticacao(),
        body: JSON.stringify(dados)
    });

    if (!response.ok) {
        throw new Error(MSG_ERRO_CALL_API, TOASTRERROR);
    }

    const objDados = await response.json();

    const chamado = objDados.RESULT;

    //Carrega os campos do chamados em aberto
    document.getElementById("equipamento").textContent = chamado.nome_tipo + " " + chamado.nome_modelo + " " + chamado.identificacao;
    document.getElementById("data_abertura").textContent = chamado.data_abertura;
    document.getElementById("problema").textContent = chamado.problema;
    document.getElementById("id_chamado").value = chamado.id_chamado;
    document.getElementById("data_atendimento").textContent = chamado.data_atendimento;
    document.getElementById("tec_atendimento").textContent = chamado.tecnico_atendimento;
    document.getElementById("id_alocar").value = chamado.fk_id_alocar;
    
    document.getElementById("encerramento").textContent = chamado.data_encerramento;
    document.getElementById("tec_encerramento").textContent = chamado.tecnico_encerramento;
    document.getElementById("laudo").textContent = chamado.laudo;

    //console.log(chamado.data_encerramento);
    
    const situacao_atual = verificarSituacao(chamado.data_atendimento, chamado.data_encerramento);

    switch (situacao_atual) {
        case SITUACAO_AGUARDANDO:
            mostrarElemento("tecnicoAtendimento", false);
            mostrarElemento("tecnicoEncerramento", false);
            mostrarElemento("iniciarAtendimento", true);
            mostrarElemento("finalizarAtendimento", false);
            break;
        case SITUACAO_EM_ATENDIMENTO:
            mostrarElemento("tecnicoAtendimento", true);
            mostrarElemento("tecnicoEncerramento", false);
            mostrarElemento("iniciarAtendimento", false);
            mostrarElemento("finalizarAtendimento", true);
            break;

        case SITUACAO_ENCERRADA:
            mostrarElemento("tecnicoAtendimento", true);
            mostrarElemento("tecnicoEncerramento", true);
            mostrarElemento("iniciarAtendimento", false);
            mostrarElemento("finalizarAtendimento", false);
            document.getElementById("laudo").disabled = true;
            document.getElementById("encerramento").disabled = true;
            document.getElementById("tec_encerramento").disabled = true;
            //habilitarCampo("laudo", true);
            break;
    }


} catch (error) {
    mostrarMensagemCustomizada(error.message);
} finally {
    removerLoad();
}
}

function verificarSituacao(data_atendimento, data_encerramento) {

    let situacao = "";

    if (data_atendimento == null) {
        situacao = SITUACAO_AGUARDANDO;
    } else if (data_encerramento != null) {
        situacao = SITUACAO_ENCERRADA;
    }else if (data_atendimento != null && data_encerramento == null) {
        situacao = SITUACAO_EM_ATENDIMENTO;
    }

    return situacao;

}

async function atenderChamado() {
    try {
        const idChamado = document.getElementById("id_chamado").value;

        const dados = {
            fkTecAtendimento: codigoLogado(),
            idChamado: idChamado,
            endpoint: API_ATENDER_CHAMADO
        }
     
        const response = await fetch(Base_Url_Api(), {
            method: 'POST',
            headers: headerComAutenticacao(),
            body: JSON.stringify(dados)
        });
    
        if (!response.ok) {
            throw new Error(MSG_ERRO_CALL_API);
        }

        const objDados = await response.json();

        if (objDados.RESULT == NAO_AUTORIZADO) {
            Sair();
            return;
        }

        if (objDados.RESULT == 1) {
            mostrarMensagemCustomizada(MSG_CHAMADO_ATENDIMENTO, TOASTRSUCCESS);
            $('#modal_detalhes').modal('hide');
            filtrarChamados();
        }

    } catch (error) {
        mostrarMensagemCustomizada(error.message);
    } finally {
        removerLoad();
    }
}

async function finalizarChamado(formID) {

    //if (await validarCamposAsync(formID)) {
        try {
            const idChamado = document.getElementById("id_chamado").value;
            const laudo = document.getElementById("laudo").value;
            const idAlocar = document.getElementById("id_alocar").value;

            if (laudo == '') {
                mostrarMensagem(0);
                return;
            }

            const dados = {
                fkTecEncerramento: codigoLogado(),
                idChamado: idChamado,
                endpoint: API_FINALIZAR_CHAMADO,
                laudo: laudo,
                idAlocar: idAlocar
            }
            const response = await fetch(Base_Url_Api(), {
                method: 'POST',
                headers: headerComAutenticacao(),
                body: JSON.stringify(dados)
            });

            if (!response.ok) {
                throw new Error(MSG_ERRO_CALL_API);
            }

            const objDados = await response.json();

            console.log(objDados.RESULT);

            if (objDados.RESULT == NAO_AUTORIZADO) {
                Sair();
                return;
            }

            if (objDados.RESULT == 1) {
                mostrarMensagemCustomizada(MSG_CHAMADO_FINALIZADO, TOASTRSUCCESS);
                filtrarChamados();
            }

        } catch (error) {
            mostrarMensagemCustomizada(error.message);
        } finally {
            removerLoad();
        }
    //}

}