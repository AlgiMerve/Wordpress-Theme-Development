<?php 
session_start(); // Oturum başlatılıyor

// Seçilen konu başlığını al
$topic = $_POST['topic'] ?? '';

// Her konu başlığı için sorular
$sorular = [
'dil_anlatim' => [
      [
        'soru' => "Yalınlık, bir metnin etkileyici olmasında önemli bir rol oynar. Yazarlık sürecinde, ifade edilen düşüncelerin ve duyguların doğrudan ve sade bir biçimde aktarılması, okuyucu üzerinde kalıcı bir etki bırakır. Karmaşık ifadelerden ve süslü sözcüklerden kaçınmak, metnin özünü bozmadan anlaşılır kılmak demektir. Özellikle roman ve öykü türündeki eserlerde yalın bir dil kullanılması, karakterlerin duygu durumlarını daha net ifade etmelerine olanak tanır. Böylece, okuyucu hikâyenin içine daha kolay dalar, karakterlerle bağ kurar. Yalın bir anlatım, aynı zamanda okuyucunun zihin dünyasında daha fazla yer etmesine yardımcı olur; çünkü karmaşık dil yapıları yerine sade ifadelerle anlatılan düşünceler, zihinde daha kalıcı hale gelir.",
        'soru_baslik' => 'Bu paragrafa göre, yalınlık özelliği bir metne hangi katkıyı sağlar?',
        'secenekler' => [
            'A) Okuyucunun ilgisini azaltır',
            'B) Anlamı karmaşıklaştırır',
            'C) Yazarın duygularını güçlendirir',
            'D) Metni daha uzun hale getirir',
            'E) Karakterlerle daha derin bir bağ kurar'
        ]
      ],
      [
        'soru' => "Çalıkuşu romanında Reşat Nuri Güntekin, duruluk ilkesine büyük önem vermektedir. Feride’nin yaşamını, hislerini ve düşüncelerini aktarırken, sade ve anlaşılır bir dil kullanarak okuyucunun aklında karmaşa yaratmamayı hedefler. Örneğin, Feride’nin öğretmenlik hayatındaki zorluklar ve mutluluklar, gereksiz süslemelerden uzak bir şekilde ifade edilmiştir. Yazar, duygusal anları betimlerken abartılı ifadelerden kaçınır; bu sayede okuyucu, Feride’nin içsel dünyasına daha kolay girebilir. Roman boyunca yer alan diyaloglar ve karakterlerin düşünceleri, net ve anlaşılır bir biçimde sunulduğu için hikaye akışı kesintiye uğramadan ilerler. Bu duruluk, okuyucunun Feride’nin karşılaştığı sosyal baskıları ve kişisel mücadeleleri daha iyi anlamasına yardımcı olur. Güntekin’in bu yaklaşımı, 'Çalıkuşu'nun edebi değerini artıran unsurların başında gelir.",
        'soru_baslik' => 'Yukarıdaki paragrafa göre, "Çalıkuşu" romanında hangi dil ve anlatım özelliği ön plandadır?',
        'secenekler' => [
            'A) Duruluk',
            'B) Açıklık',
            'C) Yalınlık',
            'D) Kapalılık',
            'E) Etkileyicilik'
          ]
       ],
       [
        'soru' => "'Aşk-ı Memnu,' Halit Ziya Uşaklıgil'in edebi eserleri arasında önemli bir yere sahiptir. Romanda, Bihter ve Behlül’ün yasak aşkı, derin bir anlatımla dile getirilirken, yazarın kullandığı dildeki açıklık ve kapalılık dengesi dikkat çeker. Halit Ziya, karakterlerin duygularını ve düşüncelerini net bir şekilde ifade ederken, bazen okuyucuya bıraktığı belirsizliklerle de hikayenin gizemini artırır. Örneğin, Bihter'in içsel çatışmaları ve Behlül’ün kararsızlığı, açık ifadelerle dile getirilirken, bazı durumlarda bu duyguların derinliği, okuyucunun yorumuna bırakılmıştır. Bu durum, eserin akışında bir kapalılık oluşturmakta ve okuyucunun hayal gücünü kullanarak olayları daha da anlamlandırmasına olanak tanımaktadır. Böylece, hem açıklık hem de kapalılık, 'Aşk-ı Memnu'nun edebi değerini ve duygusal derinliğini artıran unsurlar olarak öne çıkar.",
        'soru_baslik' => 'Yukarıdaki paragrafa göre, "Aşk-ı Memnu" romanında hangi dil ve anlatım özelliği ön plandadır?',
        'secenekler' => [
            'A) Açıklık',
            'B) Kapalılık',
            'C) Yalınlık',
            'D) Duruluk',
            'E) Etkileyicilik'
           ]
        ]
    ],
    // Diğer konu başlıklarına ait sorular buraya eklenebilir
    'anlatici_tur' => [
    [
        'soru' => "Birinci kişi anlatımı: 'Bugün güneşin doğuşunu izlemek için erken kalktım. O an, içimde bir huzur hissettim ve etrafımdaki doğanın güzellikleri karşısında büyülendim. Kendimi o anın bir parçası olarak hissettim. Rüzgarın yüzümdeki hafif dokunuşu, ruhuma ferahlık getirdi.' Üçüncü kişi anlatımı: 'Ali, bugün güneşin doğuşunu izlemek için erken kalktı. O an, içindeki huzuru hissetti ve etrafındaki doğanın güzellikleri karşısında büyülendi. Kendini o anın bir parçası olarak hissetti. Rüzgarın yüzündeki hafif dokunuşu, ruhuna ferahlık getirdi.'",
        'soru_baslik' => 'Yukarıdaki metinde, birinci kişi anlatımı ile üçüncü kişi anlatımını karşılaştıran aşağıdaki ifadelerden hangisi yanlıştır?',
        'secenekler' => [
            'A) Birinci kişi anlatımında, anlatıcı olayların içinde yer alır ve kendi duygularını aktarır.',
            'B) Üçüncü kişi anlatımında, anlatıcı, karakterlerin düşüncelerini ve duygularını dışarıdan gözlemleyerek aktarır.',
            'C) Birinci kişi anlatımı, okuyucuya daha yakın ve kişisel bir deneyim sunar.',
            'D) Üçüncü kişi anlatımında, anlatıcı karakterlerin düşüncelerine dair kesin bilgiye sahip değildir.',
            'E) Üçüncü kişi anlatımı, olayları daha nesnel bir bakış açısıyla sunar.'
        ]
    ],
    [
        'soru' => "'Saat akşam altıyı gösterdiğinde, Ali işten dönmek için yola çıktı. Dışarıda hafif bir yağmur yağıyordu ve insanlar aceleyle yürüyerek sığınacak yerler arıyordu. Ali, yürürken her adımında su birikintilerinin sesini duyuyordu. Kafasında o gün neler yaşadığını düşünüyordu. İş yerinde yaşadığı stres, onu yormuştu. Annesinin sağlığı hakkında endişeleri vardı. Düşünceleri arasında kaybolmuşken, gözleri sokakta bir köpek yavrusu ile buluştu. O an, içindeki kaygıların bir nebze olsun hafiflediğini hissetti.' 'Ali, köpek yavrusunu sahiplendiği için kendini çok mutlu hissetti. Yağmurun altında, bu küçük dostunun sevimliliği ona neşe katıyordu. Düşüncelerini dağıtan bu minik varlık, ona hayatta sevgi ve bağlılığın önemini hatırlatıyordu. Gözleri parlayan Ali, eve dönerken köpek yavrusunu kucakladı ve hayatının bu yeni bölümüne adım atmanın heyecanını yaşadı.'",
        'soru_baslik' => 'Yukarıdaki metinde üçüncü kişi anlatımı hangi cümlede kullanılmıştır?',
        'secenekler' => [
            'A) "Saat akşam altıyı gösterdiğinde, Ali işten dönmek için yola çıktı."',
            'B) "Ali, yürürken her adımında su birikintilerinin sesini duyuyordu."',
            'C) "Düşüncelerini dağıtan bu minik varlık, ona hayatta sevgi ve bağlılığın önemini hatırlatıyordu."',
            'D) "Annesinin sağlığı hakkında endişeleri vardı."',
            'E) "Ali, köpek yavrusunu sahiplendiği için kendini çok mutlu hissetti."'
        ]
    ]
   ],
   'anlatici_bakis' => [
    [
        'soru' => '"Hava soğuktu ve Ayşe, yün atkısını sıkıca boğazına doladı. Dışarıda yürüyen insanların yanından geçerken, kendi içinde yaşadığı kaygıları düşünmekten kendini alıkoyamadı. Son günlerde, okuldaki derslerdeki başarısızlığı onu rahatsız ediyordu. Öğretmenlerinin ve arkadaşlarının gözünde nasıl bir imaj çizdiğini düşündükçe, içindeki huzursuzluk daha da arttı. Arkadaşlarıyla olan ilişkileri giderek zayıflıyor, sosyal ortamlarda kendini dışlanmış hissetmeye başlıyordu. Bazen aklında, bu durumda bir şeyleri değiştirebilmek için neler yapabileceğine dair hayaller kuruyordu; ama gerçeklerle yüzleşmekten korkuyordu."',
        'soru_baslik' => 'Bu paragrafta kullanılan anlatıcı türü hangisidir?',
        'secenekler' => [
            'A) İlahi bakış açılı anlatıcı',
            'B) Kahraman bakış açılı anlatıcı',
            'C) Gözlemci bakış açılı anlatıcı',
            'D) İç monolog anlatıcı',
            'E) Akışkan anlatıcı'
        ]
    ],
    [
        'soru' => '"Mavi gökyüzü altında, parkta çocuklar oynuyordu. Bir grup çocuk, top oynarken kahkahaları etrafa yayılıyordu. Anne babaları ise banklarda oturup, onları izliyorlardı. Herkesin yüzünde bir gülümseme vardı; ancak bir köşede yalnız bir adam oturuyordu. O adam, kalabalığın içindeki neşeden uzak, yüzü karamsar bir ifadeye sahipti. Çocukların neşeli sesi, onun derin düşüncelerine karışırken, zamanın nasıl geçtiğini anlamadan saatler geçti. Oyun saatleri sona erdiğinde, parkta bir huzursuzluk hissetmeye başlamıştı; çünkü o, yaşadığı yalnızlıkla yüzleşmek zorundaydı."',
        'soru_baslik' => 'Bu paragrafta kullanılan anlatıcı türü hangisidir?',
        'secenekler' => [
            'A) İlahi bakış açılı anlatıcı',
            'B) Kahraman bakış açılı anlatıcı',
            'C) Gözlemci bakış açılı anlatıcı',
            'D) İç monolog anlatıcı',
            'E) Akışkan anlatıcı'
        ]
    ],
    [
        'soru' => '"Selim, herkesin huzur içinde yaşadığı bir dünyada yalnızca kendi içsel çatışmalarıyla boğuşuyordu. Geçmişte yaşadığı kayıpların ve pişmanlıkların gölgesinde, kendini sürekli sorguluyordu. Kimse onun ne düşündüğünü bilemezdi; ama o, bu dünya içinde bir yere ait olmanın özlemiyle yanıp tutuşuyordu. O gün akşam, etrafındaki insanlar mutlu bir şekilde sohbet ederken, onun kalbi yalnızca hayaller peşinde koşuyordu. Selim, içindeki derin boşluğu hissediyordu; bu yalnızlık, çevresindeki neşeli insanlardan daha belirgindi. Sözler, gülümsemeler ve kahkahalar, onun karamsar ruhunu daha da derinleştiriyordu."',
        'soru_baslik' => 'Bu paragrafta kullanılan anlatıcı türü hangisidir?',
        'secenekler' => [
            'A) İlahi bakış açılı anlatıcı',
            'B) Kahraman bakış açılı anlatıcı',
            'C) Gözlemci bakış açılı anlatıcı',
            'D) İç monolog anlatıcı',
            'E) Akışkan anlatıcı'
        ]
    ]
    ],
    'dusunceyi_gelistirme' => [
    [
        'soru' => '"Okyanus, dünya yüzeyinin yaklaşık %71\'ini kaplayan büyük su kütleleridir. Dört ana okyanus bulunmaktadır: Pasifik, Atlantik, Hint ve Arctic Okyanusu. Okyanusların derinlikleri, en derin noktası Mariana Çukuru olmak üzere, binlerce metreye ulaşır. Ayrıca, okyanuslar, iklim üzerinde önemli bir etkiye sahip olup, su döngüsü için de hayati öneme sahiptir."',
        'soru_baslik' => 'Aşağıdaki parçada hangi anlatım biçimi kullanılmıştır?',
        'secenekler' => [
            'A) Betimleme',
            'B) Tanımlama',
            'C) Hikaye anlatımı',
            'D) Tartışma',
            'E) Açıklama'
        ]
    ],
    [
        'soru' => '"Güneş, denizin üzerine yavaşça batarken, turuncu ve pembe tonlarında renk cümbüşü oluşturuyordu. Dalgalar, sahildeki kayalara çarpıyor, köpükleri havaya savuruyordu. Hava, hafif bir rüzgar eşliğinde serinlemişti. Uzakta, gökyüzünde birkaç kuş uçarak özgürlüğü simgeliyordu."',
        'soru_baslik' => 'Aşağıdaki parçada hangi anlatım biçimi kullanılmıştır?',
        'secenekler' => [
            'A) Tanımlama',
            'B) Betimleme',
            'C) Hikaye anlatımı',
            'D) Tartışma',
            'E) Açıklama'
        ]
    ],
    [
        'soru' => '"Esir Şehrin İnsanları, yalnızca bir roman değil, aynı zamanda bir dönemin sosyal yapısını ve insan psikolojisini derinlemesine inceleyen bir eserdir. Roman, Türk milletinin o dönemdeki dayanışma ruhunu yansıtırken, bazı eleştirmenler tarafından idealize edilmiş olarak değerlendirilmiştir. Bir grup eleştirmen, yazarın karakterlerini ve olaylarını idealize ettiğini savunurken, diğerleri ise Kemal Tahir\'in gerçekçi bir bakış açısıyla insanları ve olayları sunduğunu ileri sürmektedir. Bu tartışma, eserin nasıl algılandığı ve yorumlandığı konusunda önemli bir yere sahiptir."',
        'soru_baslik' => 'Aşağıdaki parçada hangi anlatım biçimi kullanılmıştır?',
        'secenekler' => [
            'A) Tanımlama',
            'B) Betimleme',
            'C) Hikaye anlatımı',
            'D) Tartışma',
            'E) Açıklama'
        ]
    ],
    [
        'soru' => '"Sıcak hava akımı, atmosferdeki hava basıncının değişmesiyle oluşur. Sıcak hava, yükselir ve yerini soğuk havaya bırakır. Bu döngü, hava olaylarını etkileyen en önemli faktörlerden biridir. Ayrıca, bu değişim, rüzgarların yönünü ve hızını da belirler, böylece iklim üzerinde önemli bir rol oynar."',
        'soru_baslik' => 'Aşağıdaki parçada hangi anlatım biçimi kullanılmıştır?',
        'secenekler' => [
            'A) Betimleme',
            'B) Tanımlama',
            'C) Hikaye anlatımı',
            'D) Tartışma',
            'E) Açıklama'
        ]
    ]
    ],
'anlatim_teknik' => [
    [
        'soru' => 'Aşağıdaki paragrafta yazarın kullandığı dil ve üslup özelliklerini belirleyin. Paragrafı okuyup verilen şıklardan en uygun olanını seçiniz: 
        Karagöz ve Hacivat, Türk sahne sanatlarının en önemli karakterlerindendir ve her biri, toplumsal yaşamın farklı yönlerini mizahi bir dille yansıtır. Karagöz, saf, neşeli ve bir o kadar da sakar bir kişilik olarak öne çıkar. Onun sıradan insanların hayatta karşılaştığı zorluklar karşısındaki tutumu, izleyicilerde empati duygusu uyandırır. Hacivat ise zeki, kurnaz ve diline hakim bir karakterdir. Her daim Karagöz’ü alaya alarak onunla eğlenceli bir şekilde tartışır. İki karakter arasındaki bu etkileşim, sadece eğlenceden ibaret değildir; aynı zamanda toplumun sosyal yapısını ve insan ilişkilerini irdeleyen derin bir eleştiri sunar. Yazarın kullandığı canlı betimlemeler ve akıcı diyaloglar, bu karakterlerin özünü daha iyi anlamamıza olanak tanır. Ayrıca, kullanılan deyim ve atasözleriyle zenginleştirilmiş dil, hem mizahi bir unsur ekler hem de izleyicinin kültürel bilgisini pekiştirir. Bu bağlamda, Karagöz ve Hacivat, yalnızca sahne sanatlarının bir parçası değil, aynı zamanda Türk kültürünün önemli birer temsilcileridir.',
        'soru_baslik' => 'Bu paragrafta kullanılan dil ve üslup özellikleri nelerdir?',
        'secenekler' => [
            'A) Yazarın kullandığı mizahi dil ile toplumsal eleştiri yapma',
            'B) Abartılı bir dil kullanarak izleyiciyi şaşırtma',
            'C) Soyut kavramlar üzerinden soyut bir anlatım geliştirme',
            'D) Sade bir dille derin sosyal sorunları göz ardı etme',
            'E) Resmi bir dil ile nesnel bakış açısı sağlama'
        ]
    ],
    [
        'soru' => 'Aşağıdaki paragrafta yazarın kullandığı dil ve üslup özelliklerini belirleyin. Paragrafı okuyup verilen şıklardan en uygun olanını seçiniz:
        Ömer Seyfettin, Türk edebiyatının önemli isimlerinden biri olarak, eserlerinde milli değerleri ön plana çıkaran bir anlayışla yazmıştır. Genç yaşta başladığı edebiyat yolculuğunda, sade ve anlaşılır bir dil kullanarak geniş bir okuyucu kitlesine ulaşmayı başarmıştır. Hikayelerinde genellikle Anadolu insanının yaşamını, kültürünü ve ahlaki değerlerini işlemiştir. Özellikle "Kaşağı" ve "Bomba" gibi eserlerinde, karakterlerin iç dünyalarını ve toplumun gerçeklerini derinlemesine irdeleyerek, okuyucuya yalnızca eğlence sunmakla kalmamış, aynı zamanda toplumsal eleştirilerde de bulunmuştur. Seyfettin’in eserlerinde kullandığı akıcı üslup ve güçlü betimlemeler, okuyucunun hikayeye olan ilgisini artırmakta ve karakterlerin duygusal durumlarını daha etkili bir biçimde yansıtmaktadır. Bu özellikleri sayesinde, Ömer Seyfettin, Türk hikayeciliğinde önemli bir yer edinmiş ve pek çok yazar için de ilham kaynağı olmuştur.',
        'soru_baslik' => 'Bu paragrafta kullanılan dil ve üslup özellikleri nelerdir?',
        'secenekler' => [
            'A) Yazarın kullandığı akıcı dil ile Türk kültürünü yüceltme',
            'B) Karmaşık bir dil ile okuyucuyu anlamaktan uzaklaştırma',
            'C) Anlaşılır bir üslup ile halkın günlük yaşamına dair gözlemler sunma',
            'D) Sadece bilimsel terimler kullanarak dar bir kitleye hitap etme',
            'E) Karakterlerin içsel çatışmalarını yüzeysel bir şekilde ele alma'
        ]
    ],
    [
        'soru' => 'Aşağıdaki paragrafta yazarın kullandığı dil ve üslup özelliklerini belirleyin. Paragrafı okuyup verilen şıklardan en uygun olanını seçiniz:
        "Selvi Boylu Al Yazmalım", Türk edebiyatının önemli yazarlarından Sadık Hidayet tarafından kaleme alınmış bir eserdir. Roman, aşkın karmaşıklığını ve insan ilişkilerinin derinliğini anlatan çarpıcı bir hikaye sunmaktadır. Ana karakterlerin, özellikle al yazmalı kızın ve selvi boylu gencin arasındaki duygusal bağ, yazarın ustalıkla işlediği duygusal betimlemelerle güçlenmiştir. Sadık Hidayet, sade ve etkili bir dil kullanarak okuyucunun zihninde canlı imgeler oluşturmakta, karakterlerin içsel çatışmalarını ve toplumun beklentileriyle olan mücadelesini derinlemesine ele almaktadır. Roman, yalnızca bireysel bir aşk hikayesi değil, aynı zamanda Türk toplumunun değerlerini, geleneklerini ve toplumsal baskılarını da gözler önüne sermektedir. Hidayet’in kullandığı semboller ve metaforlar, eserin evrensel bir nitelik kazanmasını sağlarken, aşkın getirdiği mutluluğun yanı sıra acıları da tüm gerçekliğiyle yansıtır. Bu bakımdan "Selvi Boylu Al Yazmalım", hem duygusal bir yolculuk hem de sosyal bir eleştiri niteliği taşımaktadır.',
        'soru_baslik' => 'Bu paragrafta kullanılan dil ve üslup özellikleri nelerdir?',
        'secenekler' => [
            'A) Yazarın sade ve etkili bir dil ile aşkın karmaşıklığını aktarması',
            'B) Romanın yalnızca toplumsal baskıları ele alması',
            'C) Anlamı karmaşık hale getiren aşırı süslü bir dil kullanması',
            'D) Aşkı yüzeysel bir şekilde ele alması',
            'E) Duygusal bir anlatım yerine soyut bir üslup benimsemesi'
        ]
    ],
    [
        'soru' => 'Aşağıdaki paragrafta yazarın kullandığı dil ve üslup özelliklerini belirleyin. Paragrafı okuyup verilen şıklardan en uygun olanını seçiniz:
        Peyami Safa\'nın "Dokuzuncu Hariciye Koğuşu", edebiyatımızın önemli romanlarından biri olarak, sağlık sorunları ve insan psikolojisi üzerine derin bir bakış sunmaktadır. Roman, yazarın genç yaşta geçirdiği bir hastalık nedeniyle yaşadığı hastane deneyimlerinden esinlenerek kaleme alınmıştır. Yazar, eserde hastaların yaşadığı zorlukları ve toplumsal dışlanmayı ustalıkla işlemiştir. Romanın ana karakteri olan Dr. Hikmet, kendi içsel çatışmalarıyla yüzleşirken, aynı zamanda hastalarına şefkatle yaklaşan bir hekim olarak karşımıza çıkar. Safa, kullandığı akıcı dil ve zengin imgelerle okuyucuyu hastane ortamına sokarak, insanların acılarını, umutlarını ve korkularını hissettirir. Hastane koğuşunun monoton atmosferi, yazarın içsel düşüncelerle dolu anlatımıyla birleşerek, okuyucuya hem duygusal hem de düşünsel bir yolculuk sunar. Ayrıca, romanın sosyal eleştirisi, dönemin Türkiye\'sindeki sağlık sistemini ve bireylerin toplum içindeki yerlerini sorgulatarak, evrensel bir mesaj vermektedir. "Dokuzuncu Hariciye Koğuşu", yalnızca bir hastane hikayesi değil, aynı zamanda insan ruhunun derinliklerine inen bir keşif yolculuğudur.',
        'soru_baslik' => 'Bu paragrafta kullanılan dil ve üslup özellikleri nelerdir?',
        'secenekler' => [
            'A) Yazarın hastane ortamını akıcı bir dille betimlemesi',
            'B) Romanın yalnızca bireysel hikayelere odaklanması',
            'C) Duygu ve düşüncelerin zayıf bir anlatımla sunulması',
            'D) Sosyal eleştirinin romanın merkezinde yer almaması',
            'E) Karakterlerin yalnızca fiziksel acılarına odaklanması'
        ]
    ]
    [
        'soru' => 'Aşağıdaki parçada hangi anlatım teknikleri kullanılmıştır?
        "Göz alıcı bir yaz sabahıydı. Güneş, ufukta yavaş yavaş yükseliyor, altın sarısı ışıklarıyla dünyayı aydınlatıyordu. Bahar rüzgârı hafifçe esiyor, ağaçların yaprakları arasında melodik bir dans sergiliyordu. Parkta çocukların neşeli sesi yankılanıyor, her biri farklı oyunlarla vakit geçiriyordu. Bir grup çocuk, ip atlayarak birbirlerine meydan okuyor, kimisinin yüzünde merak, kimisinin yüzünde heyecan vardı. Diğer bir köşede ise, bir küçük kız elinde rengarenk balonlarla annesinin etrafında dönerken, balonların havada süzülen görüntüsü gözleri kamaştırıyordu. Parkın ortasında yer alan gölet, suyun üzerinde yüzen ördeklerle dolup taşıyor, insanlar bu manzarayı izlemek için etrafında toplanıyordu. Herkesin yüzünde bir gülümseme, kalplerinde ise mutluluk vardı. O an, doğanın sunduğu huzur ve mutluluk, parkı ziyaret edenlerin ruhlarına işliyordu."',
        'soru_baslik' => 'Bu parçada kullanılan anlatım teknikleri nelerdir?',
        'secenekler' => [
            'A) Betimleyici ve diyalog',
            'B) Öyküleyici ve açıklayıcı',
            'C) Betimleyici ve öyküleyici',
            'D) Tartışmacı ve betimleyici',
            'E) Öğretici ve açıklayıcı'
        ],

    ],
    [
        'soru' => 'Aşağıdaki parçada hangi anlatım teknikleri kullanılmıştır?
        "Mustafa, sabah erkenden kalktı ve güne zinde başlamak için yürüyüşe çıktı. Sokaklar hâlâ sessizdi, sadece birkaç kuşun cıvıltısı duyuluyordu. Yavaş adımlarla sahile doğru ilerlerken, denizin dinginliğine dalıp gitmişti. Bir yandan da kafasında akşamki toplantıyı düşünüyordu. Başarılı bir sunum yapması gerekiyordu, ancak henüz ne söyleyeceğine karar verememişti. 'Keşke daha fazla hazırlık yapsaydım,' diye iç geçirdi. Sahile vardığında, denizden gelen hafif esinti onu biraz rahatlatmıştı. Yavaşça oturup dalgaların sahile vuruşunu izlerken, içindeki karmaşa da hafifliyordu."',
        'soru_baslik' => 'Bu parçada kullanılan anlatım teknikleri nelerdir?',
        'secenekler' => [
            'A) Betimleyici ve tartışmacı',
            'B) Öyküleyici ve betimleyici',
            'C) Açıklayıcı ve öyküleyici',
            'D) Öğretici ve açıklayıcı',
            'E) Betimleyici ve öğretici'
        ]
    ],
    [
        'soru' => 'Aşağıdaki parçada hangi anlatım teknikleri kullanılmıştır?
        "Yağmur, toprağı canlandıran, doğaya hayat veren bir nimettir. Suların toprakla buluşması, yeşil bitkilerin tekrar canlanmasına yardımcı olur. Bir yağmur damlası, su döngüsünün en önemli parçasıdır. Denizlerden buharlaşan su, gökyüzünde bulutları oluşturur ve ardından yağmur olarak tekrar yeryüzüne düşer. Bu sonsuz döngü, yaşamın temel unsurlarından biridir. Suyun bu yolculuğu, doğanın dengesi için hayati öneme sahiptir."',
        'soru_baslik' => 'Bu parçada kullanılan anlatım teknikleri nelerdir?',
        'secenekler' => [
            'A) Açıklayıcı ve öğretici',
            'B) Betimleyici ve öyküleyici',
            'C) Tartışmacı ve açıklayıcı',
            'D) Betimleyici ve öğretici',
            'E) Açıklayıcı ve tartışmacı'
        ]
    ],
    [
        'soru' => 'Aşağıdaki parçada hangi anlatım teknikleri kullanılmıştır?
        "Sanat, toplumların ilerlemesi için vazgeçilmez bir unsurdur. İnsanlar sanatla kendilerini ifade eder, düşüncelerini özgürce dile getirirler. Tarih boyunca, sanatsal eserler toplumsal değişimlerin en önemli göstergesi olmuştur. Sanat, yalnızca estetik bir değer taşımakla kalmaz, aynı zamanda toplumsal olaylara bir ayna tutar. Örneğin, Rönesans dönemi sanat eserleri, o dönemin düşünsel ve bilimsel devrimlerini yansıtır. Bu nedenle sanat, hem bireysel hem de toplumsal gelişim için elzemdir."',
        'soru_baslik' => 'Bu parçada kullanılan anlatım teknikleri nelerdir?',
        'secenekler' => [
            'A) Tartışmacı ve açıklayıcı',
            'B) Betimleyici ve öyküleyici',
            'C) Öğretici ve betimleyici',
            'D) Açıklayıcı ve öğretici',
            'E) Öyküleyici ve öğretici'
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
            font-size: 20px;
            padding: 40px;
        }
        .container {

            background-color: #2c3e50;
            padding: 400px;
            border-radius: 30px;
            text-align: left;
            height: 100vh;
        }
        h1, h2 {
            text-align: center;
            
        }
        .question {
            display: none;
            margin: 60px 0;
        }
        .question.active {
            display: block;
        }
        button {
            display: inline-block;
            padding: 30px 40px;
            background-color: #476b7a;
            color: #fff;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            margin: 20px;
        }
    </style>
</head>
<body>

<div class="container">
    <h1>Seçilen Konu: <?= ucfirst(str_replace('_', ' ', $topic)) ?></h1>

    <form method="post" action="paragraph-sonuc.php" id="quizForm">
        <input type="hidden" name="topic" value="<?= $topic ?>">
        
        <?php 
        if (isset($sorular[$topic])) {
            foreach ($sorular[$topic] as $index => $soru) {
                echo '<div class="question" id="question-'.$index.'">';
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

        <button type="button" id="prevBtn" onclick="prevQuestion()">Geri</button>
        <button type="button" id="nextBtn" onclick="nextQuestion()">İleri</button>
        <button type="submit" id="submitBtn" style="display: none;">Tamamla</button>
    </form>
</div>

<script>
    let currentQuestionIndex = 0;
    const questions = document.querySelectorAll('.question');

    // İlk soruyu göster
    function showQuestion(index) {
        questions.forEach((question, idx) => {
            question.classList.toggle('active', idx === index);
        });
        document.getElementById('prevBtn').style.display = index === 0 ? 'none' : 'inline-block';
        document.getElementById('nextBtn').style.display = index === questions.length - 1 ? 'none' : 'inline-block';
        document.getElementById('submitBtn').style.display = index === questions.length - 1 ? 'inline-block' : 'none';
    }

    function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }
    }

    function prevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    }

    // İlk soruyu başlat
    showQuestion(currentQuestionIndex);
</script>

</body>
</html>