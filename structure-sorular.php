<?php 
session_start(); // Oturum başlatılıyor

// Seçilen konu başlığını al
$topic = $_POST['topic'] ?? '';

// Her konu başlığı için sorular
$sorular = [

    'tamamlama' => [
    [
        'soru' => "Tarih, insanlık serüveninin izlerini sürebildiğimiz en önemli bilim dallarından biridir. Geçmişteki medeniyetlerin yükselişi ve çöküşü, günümüz toplumlarının şekillenmesinde büyük rol oynamıştır. Antik Mısır’ın piramitleri, Roma İmparatorluğu’nun fetihleri veya Osmanlı İmparatorluğu’nun kültürel zenginliği gibi örnekler, tarih boyunca insanlığın ulaştığı başarıların sembolleridir. Her medeniyet, kendi döneminde toplumsal, ekonomik ve kültürel alanda önemli katkılarda bulunmuş, insanlığın ilerlemesine hizmet etmiştir. Ancak, tarihin sadece büyük olaylar ve figürlerden ibaret olmadığı, günlük yaşamın, inançların ve geleneklerin de tarihsel süreçte önemli yer tuttuğu unutulmamalıdır. Bu bağlamda, tarihi bilgilerin korunması ve __________. Tarih, aynı zamanda bireylerin geçmişle bağ kurmasına yardımcı olur ve bu bağlamda kültürel kimliğin oluşmasına katkıda bulunur.",
        'soru_baslik' => 'Paragrafı en iyi tamamlayacak ifadeyi aşağıdaki seçeneklerden hangisi oluşturur?',
        'secenekler' => [
            'A) sadece belirli bir dönemle sınırlı kalması önemlidir.',
            'B) geçmişin yanlış anlaşılmaması için dikkatli bir şekilde incelenmesi gerekmektedir.',
            'C) sadece akademik çalışmalar için geçerli olması beklenmelidir.',
            'D) tarih kitaplarının yalnızca okullarda okutulması yeterlidir.',
            'E) geçmiş olayların unutulması gerektiği savunulmalıdır.'
        ],
        'dogru_cevap' => 'B) geçmişin yanlış anlaşılmaması için dikkatli bir şekilde incelenmesi gerekmektedir.'
    ],
    [
        'soru' => "__________. Güneş Sistemi, birçok farklı gezegen ve onların uydularından oluşur. Bu gezegenlerden bazıları, kendine özgü özellikleriyle dikkat çeker. Örneğin, Mars, yüzeyinde su izleri bulunduran ve kırmızı rengiyle bilinen bir gezegendir; bu da yaşam olasılığını düşündürmektedir. Jüpiter, Güneş Sistemi'nin en büyük gezegeni olup, devasa boyutunun yanı sıra yoğun bir atmosfer ve çok sayıda uyduya sahiptir. Satürn, göz alıcı halkalarıyla ünlüdür ve bu halkalar, gezegenin etrafında dönen küçük buz ve taş parçalarından oluşur. Uranüs ve Neptün, mavi ve yeşil renkleriyle dikkat çekerken, soğuk gaz devleri olarak sınıflandırılmaktadır. Uzay araştırmaları, bu gezegenlerin sırlarını çözmek için devam etmektedir.",
        'soru_baslik' => 'Paragrafı en iyi tamamlayacak ifadeyi aşağıdaki seçeneklerden hangisi oluşturur?',
        'secenekler' => [
            'A) Gezegenlerin varlığı, evrenin sırlarını anlamak için büyük önem taşır.',
            'B) Tüm gezegenler, birbirine benzeyen özelliklere sahiptir.',
            'C) Güneş Sistemi\'ndeki gezegenler, insan hayatı için önemsizdir.',
            'D) Gezegensel araştırmalar, sadece Dünya\'nın çevresindeki alanlarla sınırlıdır.',
            'E) Gezegensel oluşumlar, yalnızca astronomların ilgisini çeker.'
        ],
        'dogru_cevap' => 'A) Gezegenlerin varlığı, evrenin sırlarını anlamak için büyük önem taşır.'
    ],
    [
        'soru' => "Köpekler, insanlık tarihinin en eski dostlarından biridir. Yüzyıllar boyunca insanlar ve köpekler arasında kurulan bu özel bağ, köpekleri yalnızca evcil hayvanlar olarak değil, aynı zamanda insanların en yakın arkadaşları haline getirmiştir. Farklı ırkları ve kişilikleri olan köpekler, sahiplerinin ihtiyaçlarına göre çeşitli roller üstlenirler. Bazı köpekler avcı olarak eğitilirken, bazıları koruma veya rehberlik görevleri üstlenir. Ayrıca, köpeklerin insan ruh hali üzerindeki olumlu etkileri de bilimsel araştırmalarla kanıtlanmıştır. Sahipleriyle oynayan veya onlara sadık kalan köpekler, yalnızlık hissini azaltabilir ve insanların psikolojik sağlıklarını iyileştirebilir. Ancak, köpek sahiplenmeden önce dikkat edilmesi gereken bazı noktalar vardır; çünkü köpekler, uzun süreli bir bağlılık ve bakım gerektiren canlılardır. Bununla birlikte, birçok insan bu sorumluluğu almayı istemekte ve __________.",
        'soru_baslik' => 'Paragrafı en iyi tamamlayacak ifadeyi aşağıdaki seçeneklerden hangisi oluşturur?',
        'secenekler' => [
            'A) köpeklerin yalnızca bir eğlence kaynağı olduğunu düşünmektedir.',
            'B) köpek sahiplenme konusundaki tereddütlerini aşmayı başaramamaktadır.',
            'C) köpeklerin bakımının zor olduğunu kabul etmemektedir.',
            'D) köpeklerin tüm ihtiyaçlarını karşılamak için gerekli hazırlıkları yapmaktadır.',
            'E) köpeklerin eğitilmesinin gereksiz olduğunu savunmaktadır.'
        ],
        'dogru_cevap' => 'D) köpeklerin tüm ihtiyaçlarını karşılamak için gerekli hazırlıkları yapmaktadır.'
    ]
    ],

"ikiye_bolme" => [
    [
        'soru' => "İnsanlar arasındaki iletişim, toplumsal ilişkilerin temelini oluşturur. Doğru iletişim kurabilmek, bireylerin birbirlerini anlamasını ve ilişkilerini güçlendirmesini sağlar. Ancak, iletişimde meydana gelen yanlış anlamalar, çoğu zaman sorunlara yol açar. Bu nedenle, dinleme becerisi ve empati, etkili iletişimin anahtarıdır. İletişim becerilerinin geliştirilmesi, sadece kişisel ilişkilerde değil, iş hayatında da büyük önem taşır. Takım çalışmaları ve iş birlikleri, güçlü bir iletişim ile başarıya ulaşır. Ayrıca, farklı bakış açılarını anlamak, yenilikçi çözümler üretmek için gereklidir.",
        'soru_baslik' => 'Yukarıdaki metinde ikinci paragraf hangi cümleyle başlamaktadır?',
        'secenekler' => [
            'A) "İletişim becerilerinin geliştirilmesi, sadece kişisel ilişkilerde değil, iş hayatında da büyük önem taşır."',
            'B) "Doğru iletişim kurabilmek, bireylerin birbirlerini anlamasını sağlar."',
            'C) "Takım çalışmaları ve işbirlikleri, güçlü bir iletişim ile başarıya ulaşır."',
            'D) "Bu nedenle, dinleme becerisi ve empati, etkili iletişimin anahtarıdır."',
            'E) "Farklı bakış açılarını anlamak, yenilikçi çözümler üretmek için gereklidir."'
        ]
    ],
    [
        'soru' => "Saatleri Ayarlama Enstitüsü romanında, karakterlerin yaşamı zaman kavramı etrafında şekillenir. Hayri İrdal, yaşamını saatlerin doğruluğuna ve düzenine adar. Ancak, bu saplantı, onun sosyal hayatında birçok zorlukla karşılaşmasına neden olur. Hayri’nin saatlere olan ilgisi, onu toplumun diğer üyelerinden uzaklaştırır. Bir yandan da saatlerin insan hayatındaki yerini sorgulayan Hayri, zamanla bu tutkusunun kendisini nasıl hapsettiğini fark eder. Saatleri Ayarlama Enstitüsü romanında bir gün tesadüfen tanıştığı bir kişi, Hayri’nin hayatına yeni bir yön verir. Bu kişi, saatlerin insanlar üzerindeki etkisini farklı bir perspektiften değerlendirir. Hayri, bu görüşlerin kendi hayatındaki yansımasını düşünmeye başlar ve zamanla saatlere olan bağlılığının bir anlamda onun özgürlüğünü kısıtladığını anlar. Bu farkındalık, Hayri'nin hayatındaki en büyük değişimin başlangıcı olur.",
        'soru_baslik' => 'Yukarıdaki metinde ikinci paragraf hangi cümleyle başlamaktadır?',
        'secenekler' => [
            'A) "Bu saplantı, onun sosyal hayatında birçok zorlukla karşılaşmasına neden olur."',
            'B) "Hayri, saatlere olan ilgisi nedeniyle toplumun diğer üyelerinden uzaklaşır."',
            'C) "Saatleri Ayarlama Enstitüsü romanında bir gün tesadüfen tanıştığı bir kişi, Hayri’nin hayatına yeni bir yön verir."',
            'D) "Hayri, zamanla bu tutkusunun kendisini nasıl hapsettiğini fark eder."',
            'E) "Saatlerin insan hayatındaki yerini sorgulayan Hayri, içsel bir yolculuğa çıkar."'
        ]
    ],
    [
        'soru' => "’Sinekli Bakkal' romanında, Rabia’nın küçük yaşta başladığı hafızlık eğitimi ve bu süreçte yaşadığı içsel çatışmalar, onun karakterini şekillendirir. Rabia, mahallenin en sevilen çocuklarından biridir, ancak hayatı her zaman kolay olmamıştır. Küçük yaşta annesini kaybetmesi ve babasının sürekli evden uzak olması, Rabia’yı güçlü ve bağımsız bir birey olmaya zorlar. Bu süreçte, dedesiyle birlikte yaşamak zorunda kalan Rabia, mahalle kültürünü ve toplumsal değerleri derinlemesine öğrenir. Sinekli Bakkal kitabındaki Rabia karakterinin hayatında dönüm noktası mahalle bakkalı Tevfik Efendi ile tanışmasıdır. Tevfik Efendi, Rabia’ya sadece bir dost değil, aynı zamanda bir rehber olur. Onun bilgeliği ve hayata dair tecrübeleri, Rabia’nın dünya görüşünü genişletir. Tevfik Efendi’nin teşvikleriyle, Rabia kendini daha iyi tanımaya ve içsel yolculuğunda daha sağlam adımlar atmaya başlar. Bu dostluk, Rabia’nın hayatını derinden etkileyen bir bağa dönüşür.",
        'soru_baslik' => 'Yukarıdaki metinde ikinci paragraf hangi cümleyle başlamaktadır?',
        'secenekler' => [
            'A) "Rabia, mahallenin en sevilen çocuklarından biridir, ancak hayatı her zaman kolay olmamıştır."',
            'B) "Küçük yaşta annesini kaybetmesi ve babasının sürekli evden uzak olması, Rabia’yı güçlü ve bağımsız bir birey olmaya zorlar."',
            'C) "Sinekli Bakkal’’ kitabındaki Rabia karakterinin hayatında dönüm noktası, mahalle bakkalı Tevfik Efendi ile tanışmasıdır."',
            'D) "Bu süreçte, dedesiyle birlikte yaşamak zorunda kalan Rabia, mahalle kültürünü ve toplumsal değerleri derinlemesine öğrenir."',
            'E) "Tevfik Efendi, Rabia’ya sadece bir dost değil, aynı zamanda bir rehber olur."'
        ]
    ]
],
"cumle_ekleme" => [
    [
        'soru' => "Ateşten Gömlek romanında, Halide Edib Adıvar, Kurtuluş Savaşı sırasında Anadolu'daki direnişi ve kadınların bu süreçteki rollerini ele alır. Romanın baş karakteri olan Ayşe, güçlü bir iradeye sahip bir kadındır. Ayşe, eşiyle birlikte köyün savunmasına katılmak için elinden geleni yapmaktadır; köylüler arasında cesareti ve azmi ile tanınmaktadır. Bir gün, köye düşman askerlerinin geleceği haberi gelir ve herkes paniğe kapılır. Ayşe, bu durum karşısında cesaretini toplar ve köyün genç kadınlarını bir araya toplar, onlara savaşın önemini anlatır. Düşmanla yüzleşmek için hazırlık yapmaları gerektiğini vurgular ve köydeki diğer kadınların da mücadeleye katılmalarını teşvik eder. Cümle: “Kendine güvenen bir lider gibi, cesaretle konuştu ve herkesi birlik olmaya çağırdı.”",
        'soru_baslik' => 'Yukarıdaki metne eklenmesi gereken cümle hangi konumda olmalıdır?',
        'secenekler' => [
            'A) 6. cümlenin önünde',
            'B) 2. cümlenin sonunda',
            'C) 3. cümlenin sonunda',
            'D) 4. cümlenin önünde',
            'E) 5. cümlenin sonunda'
        ],
        'cevap' => 'C) 3. cümlenin sonunda'
    ],
    [
        'soru' => "Bir Bilim Adamının Romanı romanı, bilim ile insan ilişkileri arasında derin bir inceleme yapmaktadır. Romanın ana karakteri, hayatı boyunca bilime adanmış, entelektüel birikimini insanlığın yararı için kullanmaya çalışan bir bilim adamıdır. Ancak, zamanla bilimsel çalışmalarının toplumsal etkileriyle yüzleşmek zorunda kalır. Bilim adamının, insan doğasının karmaşıklığıyla ve ahlaki sorumluluklarıyla ilgili yaşadığı çatışmalar, romanın ana temasını oluşturur. Bu noktada, karakterin bilim ile etik arasındaki çatışmasının romanın derinliğine nasıl katkı sağladığı önem kazanır. Kendisi, bilimsel keşiflerinin sonuçlarının sadece olumlu olmadığını, aynı zamanda beklenmedik sonuçlar doğurabileceğini fark eder. Roman, bu içsel çatışmaların yanı sıra, bilim adamının çevresindeki diğer karakterlerle olan ilişkilerinin evrimine de odaklanır. Bu karakterler, ana karakterin ruh halini ve kararlarını etkileyerek, okuyucuya daha geniş bir perspektif sunar.",
        'soru_baslik' => 'Aşağıdaki cümlelerden hangisi bu metne eklenmelidir?',
        'secenekler' => [
            'A) Bilim adamı, çalışmalarının toplumsal sonuçlarıyla yüzleştiğinde, içsel bir sorgulama sürecine girer.',
            'B) Roman, bilimsel yöntemlerin sınırlarını da sorgulayan bir yapıya sahiptir.',
            'C) Bilim insanı, yalnızlık ve toplumsal sorumluluk arasında kalır.',
            'D) Roman, bireyin bilimsel sorumluluklarını sorgulamasına yol açar.',
            'E) Bilim ve insan ilişkileri, romanın temelini oluşturan iki unsurdur.'
        ],
        'cevap' => 'D) Roman, bireyin bilimsel sorumluluklarını sorgulamasına yol açar.',
        'eklenmesi_gereken_yer' => '"Bu noktada, karakterin bilim ile etik arasındaki çatışmasının romanın derinliğine nasıl katkı sağladığı önem kazanır." ifadesinden sonra.'
    ],
    [
        'soru' => "Beyaz Geceler romanı, yazar Fyodor Dostoyevski'nin derin bir insan psikolojisi incelemesi ve toplumsal yapıya yönelik eleştirilerini içermektedir. Roman, St. Petersburg’un karanlık sokaklarında, yalnız bir adamın yaşadığı içsel çatışmaları ve hayal dünyasında kurduğu aşk ilişkisini anlatır. Ana karakter, yalnızlık ve umutsuzluk içinde boğulurken, aynı zamanda aşkın peşinden koşar. Bu aşk, onun için bir kurtuluş umudu taşırken, gerçeklikten kaçış olarak da algılanabilir. Bu noktada, karakterin toplumsal normlara karşı duyduğu öfkenin romanın ana temasını nasıl şekillendirdiği önemlidir. Roman, bireyin yalnızlığı ve toplumsal dışlanmışlık hissini derinlemesine işlerken, aynı zamanda toplumsal eleştirilerle doludur. Dostoyevski, karakter aracılığıyla, bireyin varoluşsal kaygılarını ve yaşadığı toplumsal baskıları ustaca tasvir eder. Bu bağlamda, Beyaz Geceler, insan doğasının karmaşıklığını ve aşkın çelişkili doğasını gözler önüne serer.",
        'soru_baslik' => 'Aşağıdaki cümlelerden hangisi bu metne eklenmelidir?',
        'secenekler' => [
            'A) Ana karakter, toplumun beklentilerinden uzaklaşarak kendi iç dünyasına yönelir.',
            'B) Roman, aşkın yalnızlık üzerindeki etkilerini sorgularken, toplumsal yapıyı da eleştirir.',
            'C) Dostoyevski, karakterin içsel çatışmalarını ustaca yansıtarak okuyucuya derin bir bakış açısı sunar.',
            'D) Roman, bireyin toplumsal ilişkilerindeki çatışmaları anlamaya çalışır.',
            'E) Toplumun normlarına karşı çıkan karakter, özgürlüğün ne anlama geldiğini sorgular.'
        ],
        'cevap' => 'B) Roman, aşkın yalnızlık üzerindeki etkilerini sorgularken, toplumsal yapıyı da eleştirir.',
        'eklenmesi_gereken_yer' => '"Bu noktada, karakterin toplumsal normlara karşı duyduğu öfkenin romanın ana temasını nasıl şekillendirdiği önemlidir." ifadesinden sonra.'
    ]
],

"dusuncenin_akisi" => [

    [
        'soru' => "Mete Gazoz, Türk okçuluk tarihinde adını altın harflerle yazdırmış önemli bir sporcu olarak dikkat çekmektedir. 2020 Tokyo Olimpiyatları'nda kazandığı altın madalya, Türk okçuluğu adına büyük bir başarıdır ve bu madalya, Türkiye'nin olimpiyatlarda okçuluk branşında kazandığı ilk altın madalya olmuştur. Mete, genç yaşından itibaren çok sayıda uluslararası başarıya imza atmış ve bu süreçte disiplinli çalışma anlayışıyla örnek bir sporcu profili çizmiştir. Kendisi, sadece bireysel başarılara imza atmakla kalmamış, aynı zamanda Türk sporunu uluslararası arenada tanıtmış ve ülkemizi en iyi şekilde temsil etmiştir. Mete Gazoz’un başarısı, genç sporculara ilham kaynağı olmakla birlikte, Türkiye’de okçuluk sporuna olan ilgiyi de artırmıştır. Türkiye’de futboldan sonra en çok izlenen spor dalı olan basketbol da büyük kitlelere ulaşmaya devam etmektedir. Mete’nin disiplini, çalışkanlığı ve azmi, onun olimpiyat başarısına giden yolun temel taşlarını oluşturmuştur. Hem sportif anlamda hem de kişisel anlamda Türkiye’nin gururu olan Mete Gazoz, ülkesini en iyi şekilde temsil etmeye devam etmektedir.",
        'soru_baslik' => 'Paragrafın akışını bozan cümle aşağıdakilerden hangisidir?',
        'secenekler' => [
            'A) Mete Gazoz, Türk okçuluk tarihinde adını altın harflerle yazdırmış önemli bir sporcu olarak dikkat çekmektedir.',
            'B) Mete, genç yaşından itibaren çok sayıda uluslararası başarıya imza atmış ve bu süreçte disiplinli çalışma anlayışıyla örnek bir sporcu profili çizmiştir.',
            'C) Mete Gazoz’un başarısı, genç sporculara ilham kaynağı olmakla birlikte, Türkiye’de okçuluk sporuna olan ilgiyi de artırmıştır.',
            'D) Türkiye’de futboldan sonra en çok izlenen spor dalı olan basketbol da büyük kitlelere ulaşmaya devam etmektedir.',
            'E) Hem sportif anlamda hem de kişisel anlamda Türkiye’nin gururu olan Mete Gazoz, ülkesini en iyi şekilde temsil etmeye devam etmektedir.'
        ]
    ],
    [
        'soru' => "Afyonkarahisar, Türkiye’nin batısında yer alan tarihi ve kültürel zenginlikleriyle bilinen önemli bir şehirdir. Özellikle Kurtuluş Savaşı’nın dönüm noktası olan Büyük Taarruz’un başladığı yer olması, Afyonkarahisar’ın tarihimizdeki önemini artırmaktadır. Şehir, ayrıca Osmanlı ve Selçuklu döneminden kalma birçok tarihi esere ev sahipliği yapmaktadır. Afyonkarahisar Kalesi, bu bölgedeki en dikkat çekici yapılardan biridir ve şehrin sembolü olarak kabul edilir. Bunun yanı sıra, şehir termal turizmiyle de öne çıkar ve yerli yabancı turistlerin ilgisini çekmektedir. Afyon mutfağı, özellikle kaymaklı lokumu ve sucuklarıyla ünlüdür. Birçok tarihi yapı, doğal güzellik ve kültürel değer, şehri cazip bir turizm merkezi haline getirirken, Türkiye'nin en çok nüfusa sahip şehri İstanbul da kültürel ve ekonomik anlamda büyük önem taşır. Afyonkarahisar hem tarihi hem de kültürel mirasıyla dikkat çeken, Türkiye’nin önemli şehirlerinden biridir.",
        'soru_baslik' => 'Aşağıdaki cümlelerden hangisi metne eklenirse anlam bütünlüğünü bozar?',
        'secenekler' => [
            'A) Afyonkarahisar, Türkiye’nin önemli şehirleri arasında yer alır.',
            'B) Şehrin doğası, yerli ve yabancı turistler için büyük bir cazibe kaynağıdır.',
            'C) Afyonkarahisar’ın tarihi ve kültürel zenginlikleri, diğer şehirlerle karşılaştırıldığında daha az bilinmektedir.',
            'D) Afyonkarahisar, aynı zamanda Türkiye’nin en iyi döner kebabını sunan yerlerinden biridir.',
            'E) Afyon’un yerel yemekleri, hem lezzetli hem de sağlıklı tarifler içermektedir.'
        ]
    ],

    [
        'soru' => "Türk kültüründe misafirperverlik, asırlardır süre gelen önemli bir değerdir. Türkler, misafire büyük saygı duyar ve misafiri en iyi şekilde ağırlamak için ellerinden geleni yaparlar. Bu gelenek, hem köylerde hem de şehirlerde sıkça karşılaşılan bir durumdur. Misafire sunulan ikramlar, sadece bir dostluk göstergesi değil, aynı zamanda o evin ve ailenin şerefine duyulan bir saygıdır. Eski Türklerde misafirler, ev sahipleri tarafından kutsal sayılır ve misafir ağırlamak, Tanrı’ya yakınlaşmanın bir yolu olarak kabul edilirdi. Ziyarete gelen bir misafirin ne kadar kalacağı önemli değildir; ona her zaman kapılar sonuna kadar açıktır. Bu misafirperverlik anlayışı, sadece aile evlerinde değil, aynı zamanda devletin resmi kurumlarında da kendini göstermektedir. Modern dünyada bu gelenekler bir miktar değişmiş olsa da, Türk toplumunun temel yapılarından biri olarak varlığını sürdürmektedir. Bunun yanı sıra, Türk kültüründe düğünler de önemli bir sosyal etkinlik olarak kabul edilir ve büyük törenlerle kutlanır.",
        'soru_baslik' => 'Paragrafın akışını bozan cümle aşağıdakilerden hangisidir?',
        'secenekler' => [
            'A) Türk kültüründe misafirperverlik, asırlardır süre gelen önemli bir değerdir..',
            'B) Misafire sunulan ikramlar, sadece bir dostluk göstergesi değil, aynı zamanda o evin ve ailenin şerefine duyulan bir saygıdır.',
            'C) Eski Türklerde misafirler, ev sahipleri tarafından kutsal sayılır ve misafir ağırlamak, Tanrı’ya yakınlaşmanın bir yolu olarak kabul edilirdi.',
            'D) Modern dünyada bu gelenekler bir miktar değişmiş olsa da, Türk toplumunun temel yapılarından biri olarak varlığını sürdürmektedir.',
            'E) Bunun yanı sıra, Türk kültüründe düğünler de önemli bir sosyal etkinlik olarak kabul edilir ve büyük törenlerle kutlanır.'
        ]
    ]
 ],
    "yer_degistirme" => [

    [
        'soru' => "Uzay, insanlık tarihinin en büyük keşif alanlarından biri olarak karşımıza çıkmaktadır. Bilim insanları, yıllardır uzayın derinliklerini inceleyerek evrenin nasıl oluştuğunu anlamaya çalışmaktadır. Gözlem ve araştırmalar sonucunda, uzayda milyarlarca yıldız, gezegen ve galaksi yer aldığı tespit edilmiştir. Güneş Sistemi, Dünya’nın da bulunduğu sekiz gezegen ile birlikte bilinen en önemli yapıdır. (1) Bununla birlikte, uzayda yaşamın var olup olmadığı sorusu, bilim insanlarının sürekli olarak üzerinde düşündüğü bir konudur. (2) İnsanların uzaya yönelik ilgisi, son yıllarda uzay turizminin de doğmasına neden olmuştur. (3) Uzay araştırmalarının gelecekte insanlık için ne gibi fırsatlar sunacağı hala belirsizdir. (4) Ancak, uzayda yapılacak keşifler, insanlığın bilgi birikimini artıracak ve yeni teknolojilerin geliştirilmesine katkı sağlayacaktır. (5)",
        'soru_baslik' => 'Hangi cümle yer değiştirmelidir?',
        'secenekler' => [
            'A) (1) - (2)',
            'B) (2) - (3)',
            'C) (3) - (4)',
            'D) (4) - (5)',
            'E) (1) - (5)'
        ]
    ],
    [
        'soru' => "Spor, sağlıklı bir yaşamın en önemli bileşenlerinden biridir. Düzenli spor yapmak, yalnızca bedensel sağlığı korumakla kalmaz, aynı zamanda zihinsel sağlığı da destekler. (1) Farklı spor branşları, bireylere çeşitli faydalar sunmaktadır; örneğin, takım sporları sosyal becerileri geliştirmek için mükemmel bir fırsat sunarken, bireysel sporlar kişisel özgüveni artırmaya yardımcı olur. (2) Sporun önemi, günümüzde daha fazla insan tarafından benimsenmektedir. (3) Özellikle gençler arasında sporun teşvik edilmesi, gelecekteki toplumsal sağlık açısından kritik bir konudur. (4) Spor etkinlikleri, toplumda dayanışma ve birlik duygusunu pekiştirme açısından da büyük bir rol oynamaktadır. (5)",
        'soru_baslik' => 'Hangi cümle yer değiştirmelidir?',
        'secenekler' => [
            'A) (1) - (2)',
            'B) (3) - (4)',
            'C) (2) - (5)',
            'D) (1) - (4)',
            'E) (4) - (3)'
        ]
    ],

    [
        'soru' => "Mangala, geleneksel bir Türk zeka oyunudur ve yüzyıllardır oynanmaktadır. Bu oyun, hem eğlenceli hem de stratejik düşünmeyi gerektiren bir yapıya sahiptir. (1) Mangala, genellikle iki kişi arasında oynanır ve oyuncular, rakiplerinin taşlarını almak için stratejiler geliştirmelidir. (2) Bu oyun, sosyal etkileşim ve rekabet duygusunu pekiştirirken, aynı zamanda eğlenceli bir vakit geçirme fırsatı sunar. (3) Ayrıca, mangala, zihinsel becerileri geliştirirken, çocukların problem çözme yeteneklerini de artırır. (4) Dolayısıyla, mangala oyunu yalnızca bir oyun değil, aynı zamanda eğitimsel bir araç olarak da kullanılmaktadır. (5)",
        'soru_baslik' => 'Hangi cümle yer değiştirmelidir?',
        'secenekler' => [
            'A) (1) - (2)',
            'B) (3) - (4)',
            'C) (2) - (5)',
            'D) (1) - (3)',
            'E) (4) - (5)'
        ]
    ],
],
"dusuncenin_yonu" => [

    [
        'soru' => ."Yaban romanında, Ahmet Celal, savaştan döndükten sonra Anadolu’nun ücra bir köyüne yerleşir. Şehir hayatına alışkın olan Ahmet Celal, köydeki ilk günlerinde kendini tamamen yabancı hisseder. Köy halkının içine kapanık, kaderci ve değişime kapalı yapısı, onun modernleşmeye ve ilerlemeye dair tüm umutlarını kırar. Ahmet Celal, köydeki yaşamın tekdüzeliği karşısında büyük bir hayal kırıklığı yaşar. Ancak, köyde zaman geçirdikçe, halkın içine işlemiş olan bu kaderciliğin, yüzyılların getirdiği acı tecrübelerin bir sonucu olduğunu fark eder. Savaşın ve yoksulluğun şekillendirdiği bu insanların, hayatı başka bir pencereden gördüklerini anlamaya başlar. Bu süreçte, köylülerin yaşama dair felsefelerini ve inançlarını daha derinlemesine kavramaya başlar. Ahmet Celal, köy halkının dünyasına giderek daha fazla uyum sağlamaya başlar ve bu yeni bakış açısı onun düşüncelerini değiştirmeye başlar.",
        'soru_baslik' => 'Yukarıdaki metinde, düşüncenin yönünün değişmeye başladığı cümle hangisidir?',
        'secenekler' => [
            'A) Şehir hayatına alışkın olan Ahmet Celal, köydeki ilk günlerinde kendini tamamen yabancı hisseder.',
            'B) Köy halkının içine kapanık, kaderci ve değişime kapalı yapısı, onun modernleşmeye ve ilerlemeye dair tüm umutlarını kırar.',
            'C) Ancak, köyde zaman geçirdikçe, halkın içine işlemiş olan bu kaderciliğin, yüzyılların getirdiği acı tecrübelerin bir sonucu olduğunu fark eder.',
            'D) Bu süreçte, köylülerin yaşama dair felsefelerini ve inançlarını daha derinlemesine kavramaya başlar',
            'E) Ahmet Celal, köy halkının dünyasına giderek daha fazla uyum sağlamaya başlar ve bu yeni bakış açısı onun düşüncelerini değiştirmeye başlar.'
        ]
    ],
    [
        'soru' => "Zorba romanında, Nihat, köyünde otoriteyi elinde bulunduran bir ağanın oğlu olarak büyümüştü. Ailesinin sağladığı ayrıcalıklar ve güç, ona her zaman istediği her şeyi yapma cesareti vermişti. Nihat, köy halkının yaşamını sorgulamadan, her zaman onlara üstün baktı ve zalimce davranarak köyün tek hâkimi olma yolunda ilerledi. Ancak, köydeki bir grup genç, Nihat’ın baskıcı yönetimine karşı birleşip isyan etmeye karar verdiler. Nihat, ilk başta bu durumu ciddiye almadı, ancak gençlerin kararlılığı ve birlikteliği, köydeki diğer insanları da etkisi altına aldı. Zaman geçtikçe, Nihat, aslında köylülerin sadece korkuyla değil, aynı zamanda umutla da hareket edebileceğini anlamaya başladı. Bu süreçte, kendisine ait olan gücün, aslında başkalarının yaşamlarını ne denli zorlaştırdığını fark etti ve içsel bir sorgulama sürecine girdi. Artık, sadece kendi çıkarlarını düşünmekle kalmayıp, köydeki insanların hayatlarını iyileştirmek için bir şeyler yapması gerektiğine inanmaya başladı.",
        'soru_baslik' => 'Yukarıdaki metinde, düşüncenin yönünün değişmeye başladığı cümle hangisidir?',
        'secenekler' => [
            'A) Ailesinin sağladığı ayrıcalıklar ve güç, ona her zaman istediği her şeyi yapma cesareti vermişti',
            'B) Nihat, köy halkının yaşamını sorgulamadan, her zaman onlara üstün baktı ve zalimce davranarak köyün tek hâkimi olma yolunda ilerledi.',
            'C) Nihat, ilk başta bu durumu ciddiye almadı, ancak gençlerin kararlılığı ve birlikteliği, köydeki diğer insanları da etkisi altına aldı',
            'D) Zaman geçtikçe, Nihat, aslında köylülerin sadece korkuyla değil, aynı zamanda umutla da hareket edebileceğini anlamaya başladı.',
            'E) Artık, sadece kendi çıkarlarını düşünmekle kalmayıp, köydeki insanların hayatlarını iyileştirmek için bir şeyler yapması gerektiğine inanmaya başladı.'
        ]
    ],

    [
        'soru' => "Zeynep, matematik alanında yaptığı çalışmalarla akademik çevrede adından sıkça söz ettiriyordu. Sayısal zekâsı ve problem çözme yeteneği, onu kısa sürede kendi alanında otorite haline getirmişti. Matematiksel teorilerin kesinliği ve soyutlamalarındaki estetik, Zeynep’in zihninde derin bir huzur ve tatmin duygusu yaratıyordu. O, hayatın karmaşıklığını basit matematiksel ifadelerle anlamlandırabileceğine inanıyordu. Bir gün, katıldığı uluslararası bir konferansta, matematiğin felsefi boyutunu ele alan bir oturumda yer aldı. Bu oturumda, konuşmacılar matematiğin kesinliğinin aslında bir yanılsama olabileceğini, evrenin kaotik yapısının ve belirsizliğinin matematiksel formüllerle tam olarak açıklanamayacağını öne sürdüler. Bu fikirler, Zeynep’in matematiksel kesinliğe olan inancını zedelemeye başladı. Bir süre sonra, matematiğin hayatın karmaşıklığını anlamlandırmada tek başına yeterli olmayabileceğini düşünmeye başladı. Zeynep, daha önce sarsılmaz olarak gördüğü bilimsel kesinliklerin aslında ne kadar kırılgan olabileceğini fark etti.",
        'soru_baslik' => 'Yukarıdaki metinde, düşüncenin yönünün değişmeye başladığı cümle hangisidir?',
        'secenekler' => [
            'A) Sayısal zekâsı ve problem çözme yeteneği, onu kısa sürede kendi alanında otorite haline getirmişti.',
            'B) Matematiksel teorilerin kesinliği ve soyutlamalarındaki estetik, Zeynep’in zihninde derin bir huzur ve tatmin duygusu yaratıyordu',
            'C) Bir gün, katıldığı uluslararası bir konferansta, matematiğin felsefi boyutunu ele alan bir oturumda yer aldı',
            'D) Bu fikirler, Zeynep’in matematiksel kesinliğe olan inancını zedelemeye başladı',
            'E) Zeynep, daha önce sarsılmaz olarak gördüğü bilimsel kesinliklerin aslında ne kadar kırılgan olabileceğini fark etti.'
        ]
    ],
],
"metin_karsılastirma" => [

    [
        'soru' => "Metin 1: Ziya Gökalp’ın Türk Milliyetçiliği
                   Ziya Gökalp, Türk milliyetçiliğinin önemli isimlerinden biri olarak 20. yüzyılın başlarında Türk toplumunun sosyal ve kültürel yapısına büyük katkılarda bulunmuştur. Gökalp, fikirleri ve eserleriyle Türk milletinin kimliğini ve kültürel değerlerini ön plana çıkarmayı amaçlamıştır. Türkçülük akımının öncülerinden biri olan Ziya Gökalp, Türk kültürünü modernleştirirken geleneksel unsurların korunmasına da büyük önem vermiştir. Özellikle "Türk" kelimesini kullanarak, Türk milletinin birliğini vurgulamış, Türk kimliğinin oluşumuna katkıda bulunmuştur.
                   Metin 2: Ahmet Yesevi’nin Tasavvuf Anlayışı
                   Ahmet Yesevi, Türk-İslam düşüncesinin öncülerinden biri olarak 12. yüzyılda yaşamıştır. Yesevi, Türk toplumuna tasavvuf felsefesini aşılayarak, İslamiyet’in özünü ve ahlaki değerlerini Türk kültürüne entegre etmiştir. Onun eserleri, Türk edebiyatının ilk örneklerinden biri olup, aynı zamanda derin bir tasavvuf anlayışı barındırmaktadır. Ahmet Yesevi’nin öğretileri, halkın manevi dünyasını zenginleştirmiş ve Anadolu’da tasavvufun yayılmasında önemli bir rol oynamıştır.
                   ",
        'soru_baslik' => 'Aşağıdakilerden hangisi Metin 1 ile Metin 2 arasındaki temel farklardan biridir?',
        'secenekler' => [
            'A) Her iki metin de Türk milletinin kültürel değerlerine vurgu yapmaktadır.',
            'B) Metin 1, milliyetçilik akımını savunurken, Metin 2 tasavvuf felsefesine odaklanmaktadır.',
            'C) Her iki metin de aynı dönemde yazılmıştır.',
            'D) Metin 1 ve Metin 2, benzer konuları işlemesine rağmen farklı dillerde yazılmıştır.',
            'E) Metin 1, bireysel kimliğe vurgu yaparken, Metin 2 toplumsal değerlere odaklanmaktadır.'
        ]
    ],
    [
        'soru' => "Metin 1: Ziya Gökalp’ın Türk Milliyetçiliği
                   Ziya Gökalp, Türk milliyetçiliğinin önemli isimlerinden biri olarak 20. yüzyılın başlarında Türk toplumunun sosyal ve kültürel yapısına büyük katkılarda bulunmuştur. Gökalp, fikirleri ve eserleriyle Türk milletinin kimliğini ve kültürel değerlerini ön plana çıkarmayı amaçlamıştır. Türkçülük akımının öncülerinden biri olan Ziya Gökalp, Türk kültürünü modernleştirirken geleneksel unsurların korunmasına da büyük önem vermiştir. Özellikle "Türk" kelimesini kullanarak, Türk milletinin birliğini vurgulamış, Türk kimliğinin oluşumuna katkıda bulunmuştur.
                   Metin 2: Ahmet Yesevi’nin Tasavvuf Anlayışı
                   Ahmet Yesevi, Türk-İslam düşüncesinin öncülerinden biri olarak 12. yüzyılda yaşamıştır. Yesevi, Türk toplumuna tasavvuf felsefesini aşılayarak, İslamiyet’in özünü ve ahlaki değerlerini Türk kültürüne entegre etmiştir. Onun eserleri, Türk edebiyatının ilk örneklerinden biri olup, aynı zamanda derin bir tasavvuf anlayışı barındırmaktadır. Ahmet Yesevi’nin öğretileri, halkın manevi dünyasını zenginleştirmiş ve Anadolu’da tasavvufun yayılmasında önemli bir rol oynamıştır.
                   ",
        'soru_baslik' => 'Metin 1 ve Metin 2’nin hangi ortak temayı paylaştığı söylenebilir?',
        'secenekler' => [
            'A) İki metin de bireylerin toplum içindeki yerini sorgulamaktadır.',
            'B) Her iki metin de Türk kültürünün geliştirilmesine yönelik katkılarda bulunmaktadır.',
            'C) Metin 1, edebiyatın gücünü vurgularken, Metin 2 sanatın önemine dikkat çekmektedir.',
            'D) İki metin de tarihsel figürlerin hayatlarını ele almaktadır.',
            'E) Metin 1, geleneksel değerleri yüceltirken, Metin 2 yeniliği savunmaktadır.'
        ]
    ],

    [
        'soru' => "Metin 1: Ziya Gökalp’ın Türk Milliyetçiliği
                   Ziya Gökalp, Türk milliyetçiliğinin önemli isimlerinden biri olarak 20. yüzyılın başlarında Türk toplumunun sosyal ve kültürel yapısına büyük katkılarda bulunmuştur. Gökalp, fikirleri ve eserleriyle Türk milletinin kimliğini ve kültürel değerlerini ön plana çıkarmayı amaçlamıştır. Türkçülük akımının öncülerinden biri olan Ziya Gökalp, Türk kültürünü modernleştirirken geleneksel unsurların korunmasına da büyük önem vermiştir. Özellikle "Türk" kelimesini kullanarak, Türk milletinin birliğini vurgulamış, Türk kimliğinin oluşumuna katkıda bulunmuştur.
                   Metin 2: Ahmet Yesevi’nin Tasavvuf Anlayışı
                   Ahmet Yesevi, Türk-İslam düşüncesinin öncülerinden biri olarak 12. yüzyılda yaşamıştır. Yesevi, Türk toplumuna tasavvuf felsefesini aşılayarak, İslamiyet’in özünü ve ahlaki değerlerini Türk kültürüne entegre etmiştir. Onun eserleri, Türk edebiyatının ilk örneklerinden biri olup, aynı zamanda derin bir tasavvuf anlayışı barındırmaktadır. Ahmet Yesevi’nin öğretileri, halkın manevi dünyasını zenginleştirmiş ve Anadolu’da tasavvufun yayılmasında önemli bir rol oynamıştır.
                   ",
        'soru_baslik' => 'Metin 1 ve Metin 2 nin düşünsel yaklaşımları arasında hangi fark vardır?',
        'secenekler' => [
            'A) Her iki metin de geleneksel değerlere önem vermektedir.',
            'B) Metin 1, ulusal kimliği ön plana çıkarırken, Metin 2 bireysel manevi duygulara odaklanmaktadır.',
            'C) Metin 1’de daha çok din vurgusu yapılırken, Metin 2’de sosyal meseleler ele alınmaktadır.',
            'D) İki metin de bilimsel bir bakış açısına sahiptir.',
            'E) Metin 1, geçmişe özlem taşırken, Metin 2 geleceğe dair umut vermektedir.'
        ]
    ],
],

    // Diğer konu başlıklarına ait sorular buraya eklenebilir
    
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

    <form method="post" action="structure-sonuc.php">
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
