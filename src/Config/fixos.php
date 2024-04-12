<?php

    //Retorna raíz da hospedagem do projeto
    define('PATH', $_SERVER['DOCUMENT_ROOT'] . '/controleosTecnico/src/');

    //Constantes
    const SITUACAO_CHAMADO_TODOS = 0;
    const SITUACAO_CHAMADO_AGUARDANDO_ATENDIMENTO = 1;
    const SITUACAO_CHAMADO_EM_ATENDIMENTO = 2;
    const SITUACAO_CHAMADO_ENCERRADO = 3;

    const ABRIR_CHAMADO = "AbrirChamado";
    const ATENDER_CHAMADO = "AtenderChamado";
    const FINALIZAR_CHAMADO = "FinalizarChamado";
    
?>