<?php include("header.php") ?>
<script src="js/chart.min.js"></script>
<?php include("nav.php") ?>



<div id="main_menu" class="container text-center my-4">

    <div class=" text-light position-relative">
        <span class="display-3"> Gelişim</span> <span class="main_text display-3">Raporları</span>
        <br>
        <span class="result">Kullanıcıların okuma hızlarındaki artışı buradaki grafiklerden takip edebilirsin. </span>
    </div>

    <!-- Bu kısma öğrenci bilgileri gelecek ona göre bilgi alma işlemi yapıcaz -->
    <div class="usertxtmain container-fluid text-center my-2">
        <div class="container">
            <div class="row ">
                <div class="col-8 container-fluid my-3 rounded">
                    <span class="result">Kullanıcı Seçim Kısmı </span>
                    <select id="selectToUser" class="form-select my-2 text-center">
                        <option selected disabled>Kullanıcı Seçiniz</option>
                    </select>
                </div>
                <div class="container-fluid text-center">
                    <button id="btnResultToUser" class="btn btn-primary" disabled>Sonuçları Görüntüle</button>
                </div>
            </div>
        </div>

    </div>

    <div id="resultUser">

        <div class="txtmain container-fluid text-center">
            <div id="zemin"></div>
        </div>

        <div class="txtmain container-fluid text-center my-4">

            <div class="table my-2">
                <table class="table table-primary table-hover table-bordered border-light">
                    <thead>
                        <tr>
                            <th scope="col">İlk Hız (k/d)</th>
                            <th scope="col">Son Hız (k/d)</th>
                            <th scope="col">Rekor Hız (k/d)</th>
                            <th scope="col">Ortalama Hız (k/d)</th>
                            <th scope="col">Hız Artışı (k/d)</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id="firstSpeed"></td>
                            <td id="lastSpeed"></td>
                            <td id="maxSpeed"></td>
                            <td id="avgSpeed"></td>
                            <td id="difSpeed"></td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div class="my-4 text-center">


                <div class=" row mt-4 mb-4">
                    <div class=" col-sm-4 mt-2">
                        <div class="card">
                            <div class="card-body text-center">
                                <h5 class="card-title">Okuma Hızı</h5>
                                <div class="okuma_hizi_class" id="hiz"></div>
                            </div>
                        </div>
                    </div>
                    <div class=" col-sm-4 mt-2">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Anlama Seviyesi</h5>
                                <div id="anlama"></div>
                            </div>
                        </div>
                    </div>
                    <div class=" col-sm-4 mt-2">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Katılım Sıklığı</h5>
                                <div id="katilim"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>

</div>



<?php include("warning.php") ?>

<?php include("footer.php") ?>
<!-- <script src="js/chart.js"></script> -->
<script src="js/result.js"></script>