<?php 
session_start(); // Oturum başlatılıyor

// Seçilen konu başlığını al
$topic = $_POST['topic'] ?? '';

// Her konu başlığı için sorular
$sorular = [
'ana_dusunce' => [
        [
            'soru' => "Reşat Nuri Güntekin'in Çalıkuşu romanı, idealist bir genç kadın olan Feride’nin hayat mücadelesini ve toplumsal normlarla olan çatışmasını ele alır...",
            'soru_baslik' => 'Bu paragrafın ana düşüncesi nedir?',
            'secenekler' => [
                'A) Feride’nin öğretmenlik hayatının zorlukları',
                'B) Feride’nin aşk hayatındaki sorunlar',
                'C) Çalıkuşu romanının, dönemin kadınlarına rol model olan bir karakteri anlattığı',
                'D) Feride’nin toplumsal normlarla olan çatışması ve özgürlük arayışı',
                'E) Çalıkuşu romanının Anadolu’nun kültürel yapısını yansıtması'
            ]
        ],
        [
            'soru' => "Sabahattin Ali’nin Kürk Mantolu Madonna romanı, içsel bir yolculuğun ve derin bir aşkın hikayesini anlatır...",
            'soru_baslik' => 'Bu paragrafın ana düşüncesi nedir?',
            'secenekler' => [
                'A) Raif Efendi’nin Berlin’deki yaşamı',
                'B) Raif Efendi’nin aşk hayatındaki hüzün',
                'C) Kürk Mantolu Madonna romanının, içsel bir yolculuğu ve büyük bir aşkı anlattığı',
                'D) Maria Puder’in Raif Efendi üzerindeki etkisi',
                'E) Raif Efendi’nin sıradan bir yaşam sürmesinin nedenleri'
            ]
        ],
        [
            'soru' => "Alper Gezer Avcı, 2024 yılında gerçekleştirdiği tarihi uzay yolculuğuyla dünya çapında dikkatleri üzerine çeken bir astronot...",
            'soru_baslik' => 'Bu paragrafın ana düşüncesi nedir?',
            'secenekler' => [
                'A) Alper Gezer Avcı\'nın uzaya olan ilgisi',
                'B) Uzay yolculuğunun insanlık için öneminin vurgulanması',
                'C) Uzayda yapılan deneylerin zorlukları',
                'D) Alper Gezer Avcı\'nın uzayda geçirdiği süre',
                'E) Uzay araştırmalarının tarihçesi'
            ]
        ]
    ],
    // Diğer konu başlıklarına ait sorular buraya eklenebilir
    'konu_baslik' => [
        [
            'soru' => "Küresel ısınma, dünya genelinde giderek daha fazla hissedilen bir sorun haline gelmiştir...",
            'soru_baslik' => 'Paragrafta vurgulanan ana sorun nedir ve bu sorunun çözümü için önerilen en uygun başlık nedir?',
            'secenekler' => [
                'A) Küresel ısınmanın etkileri ve bireysel sorumluluklar',
                'B) Küresel ısınma ve toplumsal farkındalık yaratma',
                'C) İklim değişikliği ve yenilenebilir enerji kaynaklarına geçiş',
                'D) Küresel ısınma ve uluslararası iş birlikleri',
                'E) Doğal felaketler ve tarım verimliliği'
            ]
        ],
        [
            'soru' => "Edebiyat, insan düşüncesinin ve duygusunun derinliklerine inme gücüne sahip bir sanat dalıdır...",
            'soru_baslik' => 'Bu paragrafta ele alınan edebiyatın rolü ve işlevi hakkında aşağıdaki ifadelerden hangisi yanlıştır?',
            'secenekler' => [
                'A) Edebiyat, bireylerin iç dünyasını anlamaya yardımcı olur.',
                'B) Edebiyat eserleri toplumsal yapıları sorgulama fırsatı sunar.',
                'C) Edebiyat, sadece sanat olarak değerlendirilir ve başka işlevleri yoktur.',
                'D) Edebiyat, insan ilişkilerinin karmaşıklığını işler.',
                'E) Edebiyat, bireylerin kendilerini ifade etme biçimlerini zenginleştirir.'
            ]
        ],
        [
            'soru' => "Uzay, insanlık için her zaman merak uyandıran bir alan olmuştur...",
            'soru_baslik' => 'Bu paragrafın başlığı için en uygun seçenek hangisidir?',
            'secenekler' => [
                'A) Uzay Araştırmalarının Önemi',
                'B) Güneş Sistemi ve Yıldızlar',
                'C) Uzayın Gizemleri ve İnsan Merakı',
                'D) Astronominin Gelişimi',
                'E) Uzayda Yaşam Olanakları'
            ]
        ]
    ],
    'yardimci_dusunce' => [
        [
            'soru' => "Sabahattin Ali, Türk edebiyatında yarattığı derin etkilerle tanınmaktadır...",
            'soru_baslik' => 'Bu paragrafın yardımcı düşüncesi için en uygun seçenek hangisidir?',
            'secenekler' => [
                'A) Sabahattin Ali\'nin Yazım Tarzı',
                'B) Edebiyat Dünyasındaki Yeri',
                'C) Sabahattin Ali\'nin Romanlarının Etkileri',
                'D) Türk Edebiyatındaki Sosyal Sorunlar',
                'E) Eserlerinin Günümüzdeki Yansımaları'
            ]
        ],
        [
            'soru' => "Oyuncaklar, çocukların gelişiminde önemli bir rol oynamaktadır...",
            'soru_baslik' => 'Bu paragrafın yardımcı düşüncesi için en uygun seçenek hangisidir?',
            'secenekler' => [
                'A) Oyuncakların Tarihsel Gelişimi',
                'B) Oyuncakların Eğitimsel Önemi',
                'C) Modern Oyuncakların Özellikleri',
                'D) Oyuncakların Sosyal Hayattaki Yeri',
                'E) Çocukların Gelişiminde Oyuncakların Rolü'
            ]
        ],
        [
            'soru' => "Ayakkabı, insanlık tarihinin en eski ve en temel ihtiyaçlarından biri olarak karşımıza çıkmaktadır...",
            'soru_baslik' => 'Bu paragrafta aşağıdaki ifadelerden hangisi yanlıştır?',
            'secenekler' => [
                'A) İlk ayakkabılar Mısır\'da ortaya çıkmıştır.',
                'B) Ayakkabılar, antik dönemlerde sosyal statüyü gösteren semboller olmuştur.',
                'C) Ayakkabı üretimi, sanayi devrimi ile birlikte tamamen ortadan kalkmıştır.',
                'D) Günümüzde ayakkabılar, moda ve kişisel ifade aracı olarak önemli bir yer tutmaktadır.',
                'E) Antik Yunan ve Roma dönemlerinde ayakkabılar çeşitlenmiştir.'
            ]
        ]
    ],
    'hikaye_unsurlari' => [
        [
            'soru' => '"Bülbül Yuvası" romanında, zaman unsuru, köy hayatının ve bireylerin yaşamlarının derinliklerine inerek, karakterlerin ruh hallerini ve toplumsal ilişkilerini şekillendirir...',
            'soru_baslik' => 'Aşağıdaki ifadelerden hangisi, romanın zaman unsurlarıyla ilgili olarak değinilmemiştir?',
            'secenekler' => [
                'A) Geçmişin köy yaşamındaki geleneklerin, günümüzdeki yaşam tarzına etkisi',
                'B) Karakterlerin geçmiş deneyimlerinin, onların bugünkü ilişkilerini nasıl şekillendirdiği',
                'C) Zamanın, karakterlerin ruh halleri üzerindeki etkisi',
                'D) 1940’ların Türkiye’sindeki toplumsal değişimlerin, karakterlerin yaşamlarına olan etkisi',
                'E) Zamanın, romanın olaylarının akışını nasıl etkilediği'
            ]   
        ],
        [
            'soru' => '"Huzur" romanında, Mümtaz’ın yaşamı, İstanbul’un sosyo-kültürel dinamikleriyle iç içe geçmiş bir şekilde gelişir...',
            'soru_baslik' => 'Aşağıdaki ifadelerden hangisi, romanın olay örgüsünü en iyi şekilde tanımlar?',
            'secenekler' => [
                'A) Mümtaz’ın toplumsal değişimlere karşı duyduğu belirsizlik ve endişe',
                'B) Mümtaz’ın çevresindeki insanlarla olan ilişkilerinin, onun ruh hali üzerindeki etkileri',
                'C) Mümtaz’ın İstanbul’daki yaşamı ve bu yaşamın onun huzur arayışına etkisi',
                'D) Mümtaz’ın kendi iç dünyasıyla yüzleşmesi ve bu yüzleşmenin sonuçları',
                'E) Mümtaz’ın İstanbul’un kaosuyla başa çıkma çabası ve bu çabanın yaratacağı sonuçlar'
            ]
        ],
        [
            'soru' => '"İnce Mehmed" romanında, zaman unsuru, kahraman İnce Mehmed’in içsel dönüşümünü ve yaşadığı coğrafyanın toplumsal dinamiklerini derinlemesine yansıtır...',
            'soru_baslik' => 'Aşağıdaki ifadelerden hangisi, romanın zaman unsurlarıyla ilgili olarak değinilmemiştir?',
            'secenekler' => [
                'A) İnce Mehmed’in geçmişten getirdiği değerlerin, güncel yaşamında nasıl bir etki yarattığı',
                'B) Osmanlı İmparatorluğu’nun son döneminin, köy yaşamı üzerindeki etkileri',
                'C) Zamanın, İnce Mehmed’in toplumsal yapıyla olan ilişkisini nasıl şekillendirdiği',
                'D) İnce Mehmed’in geçmişte yaşadığı olayların, onun karakterindeki değişimlere katkısı',
                'E) Zamanın, karakterlerin içsel huzur arayışını nasıl etkilediği'
            ]
        ]
    ],
    'hangi_soruya' => [
        [
            'soru' => '"Aylak Adam" romanında, ana karakter olan C. toplumdan yabancılaşmış bir birey olarak karşımıza çıkar. C., günlük hayatın sıradanlığından sıkılmış, varoluşsal sorgulamalar içinde boğuşan bir insandır. Toplumun normlarına uymak istemeyen C., kendi iç dünyasında yaşadığı çatışmalarla baş etmeye çalışırken, çevresindeki insanlarla olan ilişkileri de giderek derinleşen bir yalnızlık ve umutsuzluk hissiyle şekillenir. Roman, birey ve toplum arasındaki çatışmayı ve bireysel özgürlüğün peşinde koşan bir karakterin hikayesini derinlemesine ele alır.',
            'soru_baslik' => 'Aşağıdaki ifadelerden hangisi, bu metin için doğru bir soru olur?',
            'secenekler' => [
                'A) "Aylak Adam" romanında C.’nin topluma olan bakışı nasıldır?',
                'B) "Aylak Adam" romanında C.’nin yalnızlık hissi nasıl betimlenmiştir?',
                'C) "Aylak Adam" romanında birey-toplum çatışması hangi şekilde ele alınmaktadır?',
                'D) "Aylak Adam" romanında C.’nin karakter gelişimi nasıl gerçekleşir?',
                'E) "Aylak Adam" romanında C.’nin çevresindeki insanlarla olan ilişkileri nasıldır?'
            ]
        ],
        [
            'soru' => '"Yalnızız" romanında, ana karakterlerin yaşam alanları, onların psikolojik durumlarını ve sosyal ilişkilerini yansıtan önemli bir unsurdur. Roman, şehrin kenar mahallelerinde geçen olayları aktarırken, bu mekânların karakterler üzerindeki etkisini derinlemesine inceler. Özellikle, dar sokaklar, kalabalık pazar yerleri ve yıpranmış evler, karakterlerin yalnızlık ve çaresizlik hissini pekiştiren unsurlar olarak öne çıkar. Mekân, karakterlerin içsel dünyalarıyla dışsal gerçeklikleri arasındaki çatışmayı yansıtan bir ayna görevi görür.',
            'soru_baslik' => 'Aşağıdaki ifadelerden hangisi, bu metin için doğru bir soru olur?',
            'secenekler' => [
                'A) "Yalnızız" romanında mekânın karakterlerin psikolojisine etkisi nasıldır?',
                'B) "Yalnızız" romanında mekânın fiziksel tasviri nasıl yapılmıştır?',
                'C) "Yalnızız" romanında mekân ve zaman unsurlarının ilişkisi nedir?',
                'D) "Yalnızız" romanında mekânın sosyal yapıya etkileri nelerdir?',
                'E) "Yalnızız" romanında mekânın olay örgüsündeki rolü nasıldır?'
            ]
        ],
        [
            'soru' => '"Küçük Prens" romanı, Antoine de Saint-Exupéry tarafından yazılan, çocuklar ve yetişkinler için derin anlamlar barındıran bir eserdir. Roman, masalsı bir dille yazılmış olmasına rağmen, yetişkinlerin unuttuğu değerleri, dostluğu, sevgiyi ve hayal gücünü ön plana çıkararak, okuyuculara düşündürücü bir yolculuk sunar. Küçük Prens’in dünyası, göründüğünden çok daha karmaşık ve derindir; her karakter, insan ilişkilerinin ve toplumun sorgulanmasına dair farklı bir perspektif sunar. Yazar, basit ama etkili bir dille, hayal gücünün sınırlarını zorlayarak, okuyucuyu derin bir içsel sorgulamaya yönlendirir. Bu bağlamda, roman, yalnızlık, sevgi, dostluk ve sorumluluk gibi temalarla doludur ve her okur için farklı bir anlam taşır. Bu çok katmanlı anlatım tarzı, romanın kalıcılığını ve evrenselliğini artırırken, çocuklara yönelik bir eser olmasına rağmen yetişkinler için de önemli mesajlar taşır.',
            'soru_baslik' => 'Aşağıdaki ifadelerden hangisi, bu metin için yanlış bir soru olur?',
            'secenekler' => [
                'A) "Küçük Prens" romanının anlatım tarzı nasıl bir derinlik taşır?',
                'B) "Küçük Prens" romanında hangi temalar ön plana çıkar?',
                'C) "Küçük Prens" romanının okuyucu üzerindeki etkisi nedir?',
                'D) "Küçük Prens" romanında karakterlerin derinliği nasıl sağlanmıştır?',
                'E) "Küçük Prens" romanının olay örgüsü nasıl gelişmektedir?'
            ]
        ]
    ]
];

?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sorular</title>
    <style>
        body {
            background-color: #2e3b42;
            color: #ffffff;
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        .container {
            background-color: #c9a3a3;
            padding: 20px;
            border-radius: 10px;
            text-align: left;
        }
        h1, h2 {
            text-align: center;
        }
        .question {
            margin: 20px 0;
        }
        input[type="radio"] {
            margin-right: 10px;
        }
        button {
            display: block;
            margin: 20px auto;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Seçilen Konu: <?= ucfirst(str_replace('_', ' ', $topic)) ?></h1>

    <form method="post" action="meaning-sonuc.php">
        <!-- Konu başlığını gizli input olarak gönderiyoruz -->
        <input type="hidden" name="topic" value="<?= $topic ?>">
        
        <?php 
        // Eğer seçilen konuya ait sorular varsa, soruları göster
        if (isset($sorular[$topic])) {
            foreach ($sorular[$topic] as $index => $soru) {
                echo '<div class="question">';
                echo '<h2>Soru '.($index + 1).'</h2>';
                echo '<p>'.$soru['soru'].'</p>';
                echo '<p>'.$soru['soru_baslik'].'</p>';
                foreach ($soru['secenekler'] as $key => $secenek) {
                    echo '<label><input type="radio" name="answer'.$index.'" value="'.$key.'"> '.$secenek.'</label><br>';
                }
                echo '</div>';
            }
        } else {
            echo '<p>Geçersiz konu seçimi!</p>';
        }
        ?>
        <button type="submit">Tamamla</button>
    </form>
</div>

</body>
</html>
