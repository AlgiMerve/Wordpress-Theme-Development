<div id="fullSelect">
    <div id="selectedStudient" class="container my-4">
        <div class="row">
            <div class="col-md-6">
                <div class="h4 text-center fw-bold text-white my-1">Seçilebilecek Kullanıcılar</div>
                <table id="table" class="table table-light  table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Ad Soyad</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="tbody">
                    </tbody>
                </table>
            </div>
            <div class="col-md-6">
                <div id="SlctTableWrd" class="h4 text-center fw-bold text-white my-1">Kullanıcı Seçilmedi</div>
                <table id="SlctTableStd" class="table table-light table-hover col-12">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Ad Soyad</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody id="y_tbody">
                    </tbody>
                </table>

                <div class="text-center">
                    <button id="btn_select" class="btn btn-success">Seçimi Tamamla</button>
                </div>
            </div>
        </div>
    </div>


</div>

<!-- Modal Button-->

<button id="modalResult" style="width: 3rem; height: 3rem;" class="btn btn-warning rounded-circle position-fixed top-0 end-0 mx-4 my-5 detail text-center" data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="far fa-address-book fa-2x pe-1"></i></button>

<!-- Modal -->
<div class="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Kullanıcı Sonuçları</h5>
                <button type="button" id="btnModalClose" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="modal_body" class="modal-body">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <table class="table table-light table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">ID</th>
                                        <th scope="col">Ad Soyad</th>
                                        <th scope="col">Okuma Hızı (k/dk)</th>
                                        <th scope="col">Anlama Oranı (%)</th>
                                    </tr>
                                </thead>
                                <tbody id="modal_body_table">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
            <div id="dsbMdlFinish" class="modal-footer text-center">
                <button id="AppToEnd" type="button" class="btn btn-outline-light">Uygulamayı Tamamla</button>
            </div>
        </div>
    </div>
</div>
<script src="js/selectStudient.js"></script>