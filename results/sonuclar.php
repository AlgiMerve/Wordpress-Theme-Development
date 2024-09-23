<?php include("../db.php"); ?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <title>NEUROSOUND</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js" type="text/javascript"></script>

    <link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" type="text/css" href="font-awesome/css/font-awesome.min.css" />

    <script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
</head>

<body>

    <div style="display: none;" id="anaDv" class="container">

        <div class="page-header">
            <h1>Sonuçlar</h1>
            <button type="button" name="anasayfa" id="anasayfa" class="btn btn-outline-success">Anasayfa</button>
            <button type="button" name="yazdir" id="yazdir" class="btn btn-outline-warning float-right">Yazdır</button>
        </div>



        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div id="ogr_secim_uygulama" class="well well-sm">
                        <fieldset>
                            <form name="form" class="form-horizontal" method="post" action="rapor" id="test">

                                <legend class="text-center header">Uygulama Kategorisi</legend>

                                <div class="form-group">
                                    <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-question bigicon"></i></span>
                                    <div class="col-md-6">
                                        <select id="testkategori" name="testkategori" class="form-control form-control-sm">
                                            <option disabled selected>Uygulama Türünü Şeçiniz</option>
                                            <option value="hizli_okuma_metinleri_sonuc">Okuma Hızı Testi</option>
                                            <option value="hizli_okuma_metinleri_soru_cevap">Anlama Hızı Testi</option>
                                            <option value="hizli_okuma_blog_sonuc">Hızlı Görme Uygulaması</option>
                                            <option value="hizli_okuma_goz_cevikligi_sonuc">Göz Çevikliğini Arttırma Uygulaması</option>
                                            <option value="hizli_okuma_kelimeler_sonuc">Takistoskop Uygulaması</option>
                                            <option value="hizli_okuma_metin_takip_sonuc">Silinmeden Blok Okuma Uygulaması</option>
                                            <option value="hizli_okuma_metin_takip_sonuc">Silinerek Blok Okuma Uygulaması</option>
                                            <option value="hizli_okuma_metin_takip_sonuc">Odaklı Blok Okuma Uygulaması</option>
                                            <option value="hizli_okuma_metin_takip_sonuc">Grup Okuma Uygulaması</option>
                                            <option value="hizli_okuma_gozegz_sonuc">Göz Kaslarını Geliştirme Uygulaması</option>
                                            <option value="hizli_okuma_gorme_alani_sonuc">Aktif Görme Alanını Genişletme Uygulaması</option>
                                            <option value="hizli_okuma_satir_uzunlugu_sonuc">Satır Boyu Görme Uygulaması</option>
                                            <option value="hizli_okuma_sayi_sonuc">Sayıları Bulma Uygulaması</option>
                                            <option value="hizli_okuma_dogru_rengi_bul_sonuc">Doğru Rengi Bulma Uygulaması</option>
                                            <option value="hizli_okuma_dogru_sayiyi_bul_sonuc">Doğru Sayıyı Bulma Uygulaması</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <span class="col-md-1 col-md-offset-2 text-center"><i class="fa fa-file bigicon"></i></span>
                                    <div class="col-md-6">
                                        <select disabled id="ogrkategori" name="ogrkategori" class="form-control form-control-sm">
                                            <option disabled selected>Öğrenci Şeçiniz</option>
                                        </select>
                                    </div>
                                </div>




                            </form>
                            <div class="form-group">
                                <div class="col-md-12 text-center">
                                    <button disabled id="goster" name="goster" class="btn btn-primary btn-lg">Görüntüle</button>
                                </div>
                            </div>
                        </fieldset>

                    </div>
                    <br>

                    <div style="display: none;" id="zemin" class="well well-sm">
                        <div class="form-group">
                            <div class="col-md-12 text-center">
                                <fieldset class="text-center header">NEUROSOUND</fieldset>
                            </div>
                        </div>
                        <div class="form-group">
                            <img style="max-width: 20%;" src="../images/neuro.png" class="rounded float-left col-xs-4" alt="Neurosound Logo">
                        </div>


                        <div style="margin-left: 30px;" class="form-group">
                            <span class="col-md-1 col-md-offset text-center"></span>
                            <div class="col-md-11">
                                <label class="form-group">NEUROSOUND MERKEZİ </label>
                            </div>
                        </div>

                        <div style="margin-left: 30px;" class="form-group">
                            <span class="col-md-1 col-md-offset text-center"></span>
                            <div class="col-md-8">
                                <label class="form-group">Ad-Soyad:</label><label id="tbl_ad"></label>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <style>
            .header {
                color: #36A0FF;
                font-size: 27px;
                padding: 10px;
            }

            .bigicon {
                font-size: 35px;
                color: #36A0FF;
            }
        </style>

    </div>

    <script src="js/ogrislem.js"></script>
</body>

</html>