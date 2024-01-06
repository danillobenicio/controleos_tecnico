<div class="modal fade" id="modal_detalhes">
    <div class="modal-dialog modal-lg">
        <div class="modal-content" id="divCorModalSituacao">
            <div class="modal-header">
                <h4 class="modal-title">Detalhes chamados</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">

                    <label>Equipamento</label>
                    <span disabled class="form-control" id="equipamento" rows="2"></span>

                    <br>

                    <label>Data Abertura</label>
                    <span class="form-control" id="data_abertura" name="data_abertura"></span>

                    <br>

                    <label>Problema</label>
                    <textarea readonly class="form-control" id="problema" rows="2"></textarea>

                    <br>

                    <div id="tecAtendimento">
                        <label>Data de Atendimento</label>
                        <span class="form-control" id="data_atendimento" name="data_atendimento"></span>

                        <label>Técnico que iniciou atendimento</label>
                        <span disabled class="form-control" id="tec_atendimento" rows="2"></span>
                    </div>
                    

                    <hr>
                    <div id="tecEncerramento">

                        <br>

                        <label>Data encerramento</label>
                        <span class="form-control" id="encerramento" rows="2"></span>

                        <br>

                        <label>Técnico que encerrou atendimento</label>
                        <span class="form-control" id="tec_encerramento" rows="2"></span>

                        <br>

                    </div>

                    <label>Laudo</label>
                    <textarea readonly class="form-control" id="tec_encerramento" rows="2"></textarea>
                </div>

            </div>
            <div class="modal-footer justify-content-between">
                <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                <button class="btn btn-sm btn-primary" id="btn_acao">Atender / Finalizar</button>
            </div>
        </div>
    </div>
</div>