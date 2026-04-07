// 1. Data form

let formData = {};

// nama label untuk setiap input 
const labelText = {
    tgl: 'Tanggal Perjanjian',
    nama1: 'Nama Pihak Kesatu',
    jabatan: 'Jabatan Pihak Kesatu',
    status1: 'Status Barang',
    alamat1: 'Alamat Instansi Pihak Kesatu',
    nama2: 'Nama Pihak Kedua',
    alamat2: 'Alamat Pihak Kedua',
    usaha: 'Kegiatan Usaha',
    jenis: 'Jenis Barang',
    besaran_sewa: 'Besaran Sewa',
    tbl_nama_perangkat: 'Nama Perangkat',
    tbl_kib: 'KIB',
    tbl_kode_barang: 'Kode Barang',
    tbl_nama_barang: 'Nama Barang',
    tbl_reg: 'Reg',
    tbl_lokasi: 'Lokasi',
    tbl_luas: 'Luas (m²)',
    tbl_ket: 'Keterangan'
};

// 2. Fungsi ambil data dari form

function DataForm() {
      return {
        nomor: document.getElementById('nomor') ? document.getElementById('nomor').value : '',
        tgl: document.getElementById('tgl') ? document.getElementById('tgl').value : '',
        nama1: document.getElementById('nama1') ? document.getElementById('nama1').value : '',
        jabatan: document.getElementById('jabatan') ? document.getElementById('jabatan').value : '',
        status1: document.getElementById('status1') ? document.getElementById('status1').value : '',
        alamat1: document.getElementById('alamat1') ? document.getElementById('alamat1').value : '',
        nama2: document.getElementById('nama2') ? document.getElementById('nama2').value : '',
        alamat2: document.getElementById('alamat2') ? document.getElementById('alamat2').value : '',
        usaha: document.getElementById('usaha') ? document.getElementById('usaha').value : '',
        jenis: document.getElementById('jenis') ? document.getElementById('jenis').value : '',
        besaran_sewa: document.getElementById('besaran_sewa') ? document.getElementById('besaran_sewa').value : '',
        tbl_nama_perangkat: document.getElementById('tbl_nama_perangkat') ? document.getElementById('tbl_nama_perangkat').value : '',
        tbl_kib: document.getElementById('tbl_kib') ? document.getElementById('tbl_kib').value.toUpperCase() : '',
        tbl_kode_barang: document.getElementById('tbl_kode_barang') ? document.getElementById('tbl_kode_barang').value : '',
        tbl_nama_barang: document.getElementById('tbl_nama_barang') ? document.getElementById('tbl_nama_barang').value : '',
        tbl_reg: document.getElementById('tbl_reg') ? document.getElementById('tbl_reg').value : '',
        tbl_lokasi: document.getElementById('tbl_lokasi') ? document.getElementById('tbl_lokasi').value : '',
        tbl_luas: document.getElementById('tbl_luas') ? document.getElementById('tbl_luas').value : '',
        tbl_ket: document.getElementById('tbl_ket') ? document.getElementById('tbl_ket').value : ''
    };
}

// 3. Fungsi validasi form

function validasiForm() {
    // 1. Ambil data dari form dan input ke 'formData'
    formData = DataForm();

    // 2. Form input yang wajib diisi
    const kolomWajib = Object.keys(labelText);

    // 3. Cek input kosong
    for (let i = 0; i < kolomWajib.length; i++) {
        let namaKolom = kolomWajib[i];
        let nilaiInput = formData[namaKolom];
        let elemenHTML = document.getElementById(namaKolom);

        // Jika form input kosong
        if (typeof nilaiInput === 'string' && nilaiInput.trim() === '') {
            let namaLabel = labelText[namaKolom];
            alert('Mohon lengkapi semua data. ' + namaLabel + ' tidak boleh kosong.');
            
            // Arahkan user ke form input kosong
            if (elemenHTML) elemenHTML.focus();
            
            return false;
        }
    }

    // 4. Aturan input
    // Besaran Sewa
    if (formData.besaran_sewa <= 0) {
        alert('Besaran sewa tidak boleh nol atau negatif.');
        document.getElementById('besaran_sewa').focus();
        return false;
    }
    // Kode Barang
    let regexKodeBarang = /^[0-9.]*$/;
    if (!regexKodeBarang.test(formData.tbl_kode_barang)) {
        alert('Kode Barang hanya boleh berisi karakter angka dan titik.');
        document.getElementById('tbl_kode_barang').focus();
        return false;
    }
    // Nomor Reg
    let regexReg = /^[0-9]{4}$/;
    if (!regexReg.test(formData.tbl_reg)) {
        alert('Nomor Register berisi 4 karakter angka.');
        document.getElementById('tbl_reg').focus();
        return false;
    }
    // Luas
    let regexLuas = /^[0-9]+$/;
    if (!regexLuas.test(formData.tbl_luas)) {
        alert('Luas hanya boleh berisi karakter angka.');
        document.getElementById('tbl_luas').focus();
        return false;
    }
    return true;
}

// 4. Fungsi PIN pembuatan dokumen

function checkPIN() {
   // Cek validasi form
    let FormValid = validasiForm();
    if (FormValid === false) {
        return; 
    }

    // Jika form valid, minta user input PIN
    const inputPIN = prompt('Masukkan PIN Aset Daerah untuk membuat dokumen:');
    
    // Cek apakah PIN benar
    if (inputPIN === '483704') {
        generatePDF();
    } else {
        alert('PIN salah. Akses ditolak. Mohon masukkan PIN dengan benar.');
    }
}

// 5. Fungsi terbilang

function terbilang(n) {
  
  const bilangan = ['', 'satu', 'dua', 'tiga', 'empat', 'lima', 'enam', 'tujuh', 'delapan', 'sembilan', 'sepuluh', 'sebelas'];
  
  if (n < 12) return bilangan[n];
  if (n < 20) return terbilang(Math.floor(n - 10)) + " belas";
  if (n < 100) return terbilang(Math.floor(n / 10)) + " puluh " + terbilang(n % 10);
  if (n < 200) return "seratus" + (n > 100 ? " " + terbilang(n - 100) : "");
  if (n < 1000) return terbilang(Math.floor(n / 100)) + " ratus " + terbilang(n % 100);
  if (n < 2000) return "seribu " + terbilang(n - 1000);
  if (n < 1000000) return terbilang(Math.floor(n / 1000)) + " ribu" + (n % 1000 > 0 ? " " + terbilang(n % 1000) : "");
  if (n < 1000000000) return terbilang(Math.floor(n / 1000000)) + " juta" + (n % 1000000000 > 0 ? " " + terbilang(n % 1000000) : "");
  
  return "";
}

// 6. Fungsi title case

function ubahKeTitleCase(teks) {
    let kataKata = teks.toLowerCase().split(' ');
    for (let i = 0; i < kataKata.length; i++) {
        kataKata[i] = kataKata[i].charAt(0).toUpperCase() + kataKata[i].slice(1);
    }
    return kataKata.join(' ');
}

// 7. Fungsi generate PDF
function generatePDF() {
    // Ambil data yang sudah divalidasi
    let data = formData;
    const { nomor, tgl, nama1, jabatan, status1, alamat1, nama2, alamat2, usaha, jenis, besaran_sewa, tbl_nama_perangkat, tbl_kib, tbl_kode_barang, tbl_nama_barang, tbl_reg, tbl_lokasi, tbl_luas, tbl_ket } = data;

    let nama1_out = data.nama1.toUpperCase();
    let nama2_out = data.nama2.toUpperCase();
    let jenis_out = data.jenis.toLowerCase();
    let jabatan_out = ubahKeTitleCase(data.jabatan);
    let status1_out = data.status1.charAt(0).toUpperCase() + data.status1.slice(1);
    let alamat1_out = ubahKeTitleCase(data.alamat1);
    let alamat2_out = ubahKeTitleCase(data.alamat2);
    let tbl_nama_perangkat_out = ubahKeTitleCase(data.tbl_nama_perangkat);
    let tbl_nama_barang_out = ubahKeTitleCase(data.tbl_nama_barang);
    let tbl_lokasi_out = ubahKeTitleCase(data.tbl_lokasi);
    let waktuSekarang = new Date(data.tgl);
    let daftarHari = ['minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    let daftarBulan = ['januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    let hari = daftarHari[waktuSekarang.getDay()].toLowerCase();
    let tanggal = waktuSekarang.getDate();
    let bulan = daftarBulan[waktuSekarang.getMonth()].toLowerCase();
    let tahun = waktuSekarang.getFullYear();

    let angka = data.besaran_sewa.toString().replace(/[^0-9]/g, '');
    // Angka murni untuk perhitungan matematika dan terbilang
    let nominal_sewa_angka = parseInt(angka) || 0;
    let bayar_120_angka = Math.round(nominal_sewa_angka * 1.2);
    let bayar_60_angka = Math.round(nominal_sewa_angka * 0.6);
    // Teks yang sudah diformat dengan titik untuk ditampilkan di PDF
    let nominal_sewa_format = nominal_sewa_angka.toLocaleString('id-ID');
    let bayar_120_format = bayar_120_angka.toLocaleString('id-ID');
    let bayar_60_format = bayar_60_angka.toLocaleString('id-ID');

    const docContent = [];
        
        // Header
        docContent.push({ text: 'PERJANJIAN SEWA', style: 'title' });
        docContent.push({ text: 'BARANG MILIK DAERAH BERUPA ' + jenis_out.toUpperCase() + ' MILIK PEMERINTAH KABUPATEN', style: 'subtitle' });
        docContent.push({ text: 'KARANGANYAR YANG DIGUNAKAN UNTUK ' + usaha.toUpperCase(), margin: [0,0,0,10], style: 'subtitle' });
        
        // Nomor
        docContent.push({
            text: [
                { text: 'Nomor : ' },
                { 
                    text: nomor.trim() === '' ? '\u00A0'.repeat(50) + '.' : nomor,
                    color: nomor.trim() === '' ? 'white' : 'black' 
                }
            ],
            style: 'nomor', 
            margin: [0, 0, 0, 10]
        });
       
        // Tanggal
        docContent.push({
            text: 'Pada hari ini ' + hari + ' tanggal ' + terbilang(tanggal) + ' bulan ' + bulan + ' tahun ' + terbilang(tahun) + ', bertempat di Kantor Bupati Karanganyar, kami yang bertanda tangan di bawah ini:',
            style: 'bodyText',
            alignment: 'justify'
        });

        // Pihak
        docContent.push({
            table: {
                widths: ['auto', 135, 'auto', '*'],
                body: [
                    [
                        { text: '1.', alignment: 'left' },
                        { text: nama1_out, alignment: 'left' },
                        { text: ' : ', alignment: 'left' },
                        { text: jabatan_out + ' selaku ' + status1_out + ' Barang Milik Daerah, yang dalam hal ini bertindak untuk dan atas nama Pemerintah Kabupaten Karanganyar yang berkedudukan di ' + alamat1_out + ', yang selanjutnya disebut PIHAK KESATU.', alignment: 'justify' }
                    ],
                    [
                        { text: '2.', alignment: 'left' },
                        { text: nama2_out, alignment: 'left' },
                        { text: ' : ', alignment: 'left' },
                        { text: 'Penyewa ' + jenis_out + ' yang berkedudukan di ' + alamat2_out + ', yang selanjutnya disebut PIHAK KEDUA.', alignment: 'justify' }
                    ]
                ]
            },
            layout: 'noBorders',
            style: 'bodyText'
        });

        docContent.push({
            text: 'PIHAK KESATU dan PIHAK KEDUA yang secara bersama-sama selanjutnya disebut PARA PIHAK, sepakat untuk mengikat diri dalam Perjanjian Sewa sebagai bentuk pemanfaatan Barang Milik Daerah Pemerintah Kabupaten Karanganyar dengan mendasarkan pada:',
            style: 'bodyText',
            alignment: 'justify'
        });

        // Dasar hukum
        const peraturan = [
            'Undang\u2011Undang Nomor 23 Tahun 2014 tentang Pemerintahan Daerah sebagaimana telah diubah beberapa kali terakhir dengan Undang\u2011Undang Nomor 6 Tahun 2023 tentang Penetapan Peraturan Pemerintah Pengganti Undang\u2011Undang Nomor 2 Tahun 2022 tentang Cipta Kerja menjadi Undang\u2011Undang;',
            'Peraturan Pemerintah Nomor 27 Tahun 2014 tentang Pengelolaan Barang Milik Negara/Daerah sebagaimana diubah dengan Peraturan Pemerintah Nomor 28 Tahun 2020 tentang Perubahan atas Peraturan Pemerintah Nomor 27 Tahun 2014 tentang Pengelolaan Barang Milik Negara/Daerah;',
            'Peraturan Menteri Dalam Negeri Republik Indonesia Nomor 19 Tahun 2016 tentang Pedoman Pengelolaan Barang Milik Daerah sebagaimana telah diubah dengan Peraturan Menteri Dalam Negeri Republik Indonesia Nomor 7 Tahun 2024 tentang Perubahan Atas Peraturan Menteri Dalam Negeri Nomor 19 Tahun 2016 tentang Pedoman Pengelolaan Barang Milik Daerah;',
            'Peraturan Daerah Nomor 1 Tahun 2019 tentang Pengelolaan Barang Milik Daerah sebagaimana diubah dengan Peraturan Daerah Nomor 8 Tahun 2025 tentang Perubahan atas Peraturan Daerah Nomor 1 Tahun 2019 tentang Pengelolaan Barang Milik Daerah;',
            'Peraturan Bupati Nomor 90 Tahun 2021 tentang Tata Cara Pelaksanaan Pemanfaatan Barang Milik Daerah sebagaimana telah diubah dengan Peraturan Bupati Nomor 900/39 Tahun 2022 tentang Perubahan atas Peraturan Bupati Karanganyar Nomor 90 Tahun 2021 tentang Tata Cara Pelaksanaan Pemanfaatan Barang Milik Daerah;',
            'Keputusan Bupati Nomor 900/338 Tahun 2025 tentang Penetapan Besaran Sewa Barang Milik Daerah berupa Tanah Non Pertanian dan Bangunan pada Sekretariat Daerah, Badan Keuangan Daerah dan Kecamatan Karanganyar.'
        ];

        let peraturanTableBody = peraturan.map((item, idx) => [
            { text: (idx + 1) + '.  ', alignment: 'left' },
            { text: item, margin: [4, 0, 0, 0] }
        ]);

        docContent.push({
            table: {
                widths: ['auto', '*'],
                body: peraturanTableBody
            },
            layout: {
                defaultBorder: false,
                paddingLeft: function(i) { return i === 0 ? 0 : 5; },
                paddingRight: function(i, node) { return -1; },
                paddingTop: function(i, node) { return 0; },
                paddingBottom: function(i, node) { return 0; }
            },
            style: 'bodyText'
        });

        docContent.push({
            text: 'Berdasarkan hal tersebut di atas, PARA PIHAK sepakat untuk melakukan Perjanjian Sewa Barang Milik Daerah berupa ' + jenis_out + ' dengan syarat dan ketentuan sebagai berikut:',
            style: 'bodyText',
            alignment: 'justify'
        });

        // BAB I
        docContent.push({ text: 'BAB I', margin: [0, 10, 0, 0], style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'OBJEK DAN PEMANFAATAN', style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'Pasal 1', margin: [0, 5, 0, 0], style: 'pasalTitle', alignment: 'center' });

        // Klausa (1)
        docContent.push({
            table: {
                widths: ['auto', '*'],
                body: [
                    [
                        { text: '(1)', style: 'clauseNumber', border: [false, false, false, false] },
                        { text: 'PIHAK KESATU menyewakan kepada PIHAK KEDUA berupa ' + jenis_out + ' milik PIHAK KESATU sebagai berikut:', style: 'bodyText', alignment: 'justify', border: [false, false, false, false] }
                    ]
                ]
            },
            layout: {
                hLineWidth: function(i, node) { return 0; },
                vLineWidth: function(i, node) { return 0; },
                paddingLeft: function(i, node) { return 0; },
                paddingRight: function(i, node) { return 0; },
                paddingTop: function(i, node) { return 0; },
                paddingBottom: function(i, node) { return 3; }
            }
        });

        // Tabel
        docContent.push({
            table: {
                headerRows: 1,
                widths: ['4%', '14%', '4%', '11%', '14%', '7%', '26%', '8%', '8%'],
                body: [
                    [
                        { text: 'No.', style: 'tableHeader', valign: 'top' },
                        { text: 'Nama Perangkat Daerah', style: 'tableHeader', valign: 'top' },
                        { text: 'KIB', style: 'tableHeader', valign: 'top' },
                        { text: 'Kode Barang', style: 'tableHeader', valign: 'top' },
                        { text: 'Nama Barang', style: 'tableHeader', valign: 'top' },
                        { text: 'Reg', style: 'tableHeader', valign: 'top' },
                        { text: 'Lokasi', style: 'tableHeader', valign: 'top' },
                        { text: 'Luas (m²)', style: 'tableHeader', valign: 'top' },
                        { text: 'Ket.', style: 'tableHeader', valign: 'top' }
                    ],
                    [
                        { text: '1', style: 'tableBody', valign: 'top' },
                        { text: tbl_nama_perangkat_out, style: 'tableBody', alignment: 'left', valign: 'top' },
                        { text: tbl_kib, style: 'tableBody', valign: 'top' },
                        { text: tbl_kode_barang, style: 'tableBody', alignment: 'left', valign: 'top' },
                        { text: tbl_nama_barang_out, style: 'tableBody', alignment: 'left', valign: 'top' },
                        { text: tbl_reg, style: 'tableBody', valign: 'top' },
                        { text: tbl_lokasi_out, style: 'tableBody', alignment: 'left', valign: 'top' },
                        { text: tbl_luas, style: 'tableBody', valign: 'top' },
                        { text: tbl_ket, style: 'tableBody', valign: 'top' }
                    ]
                ]
            },
            margin: [22, 0, -15, 1],
            layout: {
                hLineWidth: function(i, node) { return 0.5; },
                vLineWidth: function(i, node) { return 0.5; },
                hLineColor: function(i, node) { return '#000'; },
                vLineColor: function(i, node) { return '#000'; },
                paddingLeft: function(i, node) { return 4; },
                paddingRight: function(i, node) { return 4; },
                paddingTop: function(i, node) { return 2; },
                paddingBottom: function(i, node) { return 2; }
            }
        });

        // Klausa (2)
        docContent.push({
            table: {
                widths: ['auto', '*'],
                body: [
                    [
                        { text: '(2)', style: 'clauseNumber', border: [false, false, false, false] },
                        { text: 'Pemanfaatan ' + jenis_out + ' sebagaimana dimaksud pada ayat (1) digunakan semata\u2011mata untuk kegiatan ' + usaha + ' yang dikelola oleh PIHAK KEDUA, dan dilarang digunakan untuk kepentingan lain tanpa persetujuan tertulis dari PIHAK KESATU.', style: 'bodyText', alignment: 'justify', border: [false, false, false, false] }
                    ]
                ]
            },
            layout: {
                hLineWidth: function(i, node) { return 0; },
                vLineWidth: function(i, node) { return 0; },
                paddingLeft: function(i, node) { return 0; },
                paddingRight: function(i, node) { return 0; },
                paddingTop: function(i, node) { return 0; },
                paddingBottom: function(i, node) { return 5; }
            }
        });

        // BAB II
        docContent.push({ text: 'BAB II', margin: [0, 10, 0, 0], style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'BESARAN DAN JANGKA WAKTU SEWA', style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'Pasal 2', margin: [0, 5, 0, 0], style: 'pasalTitle', alignment: 'center' });
        docContent.push({
            table: {
                widths: ['auto', '*'],
                body: [
                    [
                        { text: '(1)', style: 'clauseNumber' },
                        { text: 'Besaran uang sewa ' + jenis_out + ' sebagaimana dimaksud dalam Pasal 1 ayat (1) disepakati sebesar Rp ' + nominal_sewa_format + ',- (' + terbilang(nominal_sewa_angka) + ' rupiah) dengan jangka waktu 2 (dua) tahun.', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: '(2)', style: 'clauseNumber' },
                        { text: 'Pembayaran uang sewa sebagaimana dimaksud pada ayat (1) dapat dilakukan dengan 2 (dua) metode pembayaran dengan memperhatikan faktor penyesuai sewa yaitu:', style: 'bodyText', alignment: 'justify' }
                    ],

                    [
                        { text: '' },
                        {
                            table: {
                                widths: ['auto', '*'],
                                body: [
                                    [
                                        { text: 'a.', style: 'bodyText' },
                                        { text: 'Sebesar 100% (seratus persen) untuk pembayaran sewa yang dilakukan sekaligus atau Rp ' + nominal_sewa_format + ',- (' + terbilang(nominal_sewa_angka) + ' rupiah); atau', style: 'bodyText', alignment: 'justify' }
                                    ],
                                    [
                                        { text: 'b.', style: 'bodyText' },
                                        { text: 'Sebesar 120% (seratus dua puluh persen) yakni Rp ' + bayar_120_format + ',- (' + terbilang(bayar_120_angka) + ' rupiah) ' + 'untuk metode pembayaran bertahap, dengan komitmen pembayaran tahunan masing\u2011masing sebesar Rp ' + bayar_60_format + ',- (' + terbilang(bayar_60_angka) + ' rupiah), ' + 'yang tidak mengubah kedudukan hukum bahwa sewa dilakukan untuk masa 2 (dua) tahun sebagaimana dimaksud dalam Pasal 2 ayat (1).', style: 'bodyText', alignment: 'justify' }
                                    ]
                                ]
                            },
                            layout: {
                                hLineWidth: function() { return 0; }, // Hilangkan garis horizontal
                                vLineWidth: function() { return 0; }, // Hilangkan garis vertikal
                                paddingLeft: function(i) { return i === 0 ? 0 : 6; }, // Jarak antara huruf a/b dengan teks
                                paddingRight: function() { return 0; },
                                paddingTop: function() { return 2; },
                                paddingBottom: function() { return 2; }
                            }
                        }
                    ],
                    [
                        { text: '(3)', style: 'clauseNumber' },
                        { text: 'Uang sewa sebagaimana dimaksud pada ayat (1) dibayar melalui rekening Kas Daerah Kabupaten Karanganyar dengan Kode Rekening RKUD (1.019.0024.06) 4.1.04.03.01.0001.', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: '(4)', style: 'clauseNumber' },
                        { text: 'Jangka waktu sewa terhitung sejak tanggal ' + tanggal + ' ' + bulan + ' ' + tahun + ' sampai dengan ' + tanggal + ' ' + bulan + ' ' + (tahun + 2) + ' dan dapat diperpanjang berdasarkan kesepakatan PARA PIHAK, setelah dilakukan evaluasi bersama sesuai ketentuan peraturan perundang\u2011undangan.', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: '(5)', style: 'clauseNumber' },
                        { text: 'Uang sewa wajib dibayarkan selambat\u2011lambatnya:', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: '' }, 
                        {
                            table: {
                                widths: ['auto', '*'],
                                body: [
                                    [
                                        { text: 'a.', style: 'bodyText' },
                                        { text: 'sebelum ditandatanganinya perjanjian ini, untuk metode pembayaran sewa sebagaimana dimaksud pada ayat (2) huruf a; dan', style: 'bodyText', alignment: 'justify'}
                                    ],
                                    [
                                        { text: 'b.', style: 'bodyText' },
                                        { text: 'tanggal 1 Desember setiap tahun untuk metode pembayaran sewa sebagaimana dimaksud pada ayat (2) huruf b.', style: 'bodyText', alignment: 'justify' }
                                    ]
                                ]
                            },
                            layout: {
                                hLineWidth: function() { return 0; }, // Hilangkan garis horizontal
                                vLineWidth: function() { return 0; }, // Hilangkan garis vertikal
                                paddingLeft: function(i) { return i === 0 ? 0 : 6; }, // Jarak antara huruf a/b dengan teks
                                paddingRight: function() { return 0; },
                                paddingTop: function() { return 2; },
                                paddingBottom: function() { return 2; }
                            }
                        }
                    ],
                    [
                        { text: '(6)', style: 'clauseNumber' },
                        { text: 'Keterlambatan pembayaran uang sewa sebagaimana dimaksud pada ayat (5) dikenakan denda keterlambatan sebesar 2% (dua persen) per bulan, dihitung sejak jatuh tempo sampai dengan saat pembayaran dengan batas maksimal keterlambatan 3 (tiga) bulan.', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: '(7)', style: 'clauseNumber' },
                        {
                            stack: [
                                { text: 'Sanksi Keterlambatan dan Pemutusan Perjanjian.', style: 'bodyText' },
                                {
                                    table: {
                                        widths: ['auto', '*'],
                                        body: [
                                            [
                                                { text: 'a.', style: 'bodyText' },
                                                { 
                                                    text: 'Apabila PIHAK KEDUA terlambat membayar uang sewa melebihi batas waktu 3 (tiga) bulan sebagaimana dimaksud dalam Pasal 2 ayat (6), maka PIHAK KESATU berhak memutus Perjanjian Sewa ini secara sepihak dengan pemberitahuan tertulis kepada PIHAK KEDUA, setelah sebelumnya diberikan sekurang\u2011kurangnya 1 (satu) kali surat peringatan tertulis.', 
                                                    style: 'bodyText', alignment: 'justify' 
                                                }
                                            ],
                                            [
                                                { text: 'b.', style: 'bodyText' },
                                                {
                                                    stack: [
                                                        { text: 'Dalam hal Perjanjian Sewa diputus sebagaimana dimaksud pada huruf a, maka:', style: 'bodyText', alignment: 'justify' },
                                                        {
                                                            table: {
                                                                widths: ['auto', '*'],
                                                                body: [
                                                                    [
                                                                        { text: '1.', style: 'bodyText' },
                                                                        { text: 'PIHAK KEDUA wajib mengosongkan dan menyerahkan kembali ' + jenis_out + ' sewaan kepada PIHAK KESATU dalam waktu paling lama 7 (tujuh) hari kerja sejak tanggal pemberitahuan pemutusan diterima;', style: 'bodyText', alignment: 'justify' }
                                                                    ],
                                                                    [
                                                                        { text: '2.', style: 'bodyText' },
                                                                        { text: 'Uang sewa yang telah dibayarkan tidak dapat diminta kembali dan dianggap sebagai kompensasi atas penggunaan ' + jenis_out + ' serta ganti rugi administratif kepada Pemerintah Kabupaten Karanganyar; dan', style: 'bodyText', alignment: 'justify' }
                                                                    ],
                                                                    [
                                                                        { text: '3.', style: 'bodyText' },
                                                                        { text: 'PIHAK KESATU dibebaskan dari segala tuntutan hukum dan/atau ganti rugi yang mungkin timbul akibat pemutusan dimaksud.', style: 'bodyText', alignment: 'justify' }
                                                                    ]
                                                                ]
                                                            },
                                                            layout: {
                                                                hLineWidth: () => 0, vLineWidth: () => 0,
                                                                paddingLeft: (i) => (i === 0 ? 0 : 6),
                                                                paddingRight: () => 0,
                                                                paddingTop: () => 0,    // Set ke 0 agar rapat
                                                                paddingBottom: () => 1  // Jarak antar poin kecil saja
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            [
                                                { text: 'c.', style: 'bodyText' },
                                                { text: 'pemutusan sebagaimana dimaksud pada huruf a tidak menghapus kewajiban PIHAK KEDUA untuk melunasi kewajiban keuangan yang telah timbul sebelum tanggal pemutusan.', style: 'bodyText', alignment: 'justify' }
                                            ]
                                        ]
                                    },
                                    layout: {
                                        hLineWidth: () => 0, vLineWidth: () => 0,
                                        paddingLeft: (i) => (i === 0 ? 0 : 6),
                                        paddingRight: () => 0,
                                        paddingTop: () => 0,    // Set ke 0 agar rapat
                                        paddingBottom: () => 1  // Jarak antar poin kecil saja
                                    }
                                }
                            ]
                        }
                    ],
                    [
                        { text: '(8)', style: 'clauseNumber' },
                        { text: 'Perpanjangan masa sewa sebagaimana dimaksud pada ayat (4) dilakukan dengan membuat Perjanjian Sewa baru setelah dilakukan evaluasi dan mendapat persetujuan Bupati.', style: 'bodyText', alignment: 'justify' }
                    ]

                ]
            },
            layout: {
                hLineWidth: function() { return 0; },
                vLineWidth: function() { return 0; },
                paddingLeft: function(i) { return i === 0 ? 0 : 5; }, // Jarak antara angka (1),(2) dengan teks
                paddingRight: function() { return 0; },
                paddingTop: function() { return 0; },     // Jarak antar ayat (atas)
                paddingBottom: function() { return 0; }   // Jarak antar ayat (bawah)
            }
        });

        // BAB III
        docContent.push({ text: 'BAB III', margin: [0, 10, 0, 0], style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'Bagian Kesatu', margin: [0, 5, 0, 0], style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'Hak dan Kewajiban PIHAK KESATU', style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'Pasal 3', margin: [0, 5, 0, 0], style: 'pasalTitle', alignment: 'center' });
        
        docContent.push({
            table: {
                widths: ['auto', '*'],
                body: [
                    [
                        { text: '(1)', style: 'clauseNumber' },
                        {
                            stack: [
                                { text: 'PIHAK KESATU berhak untuk:', style: 'bodyText' },
                                {
                                    table: {
                                        widths: ['auto', '*'],
                                        body: [
                                            [
                                                { text: 'a.', style: 'bodyText' },
                                                { 
                                                    text: 'melakukan pengawasan dan evaluasi terhadap penggunaan ' + jenis_out + ' sebagaimana dimaksud dalam Pasal 1 ayat (1) oleh PIHAK KEDUA;', 
                                                    style: 'bodyText', alignment: 'justify' 
                                                }
                                            ],
                                            [
                                                { text: 'b.', style: 'bodyText' },
                                                { 
                                                    text: 'memberikan peringatan kepada PIHAK KEDUA apabila PIHAK KEDUA tidak melaksanakan isi Perjanjian Sewa berdasarkan peraturan perundang\u2011undangan yang berlaku; dan', 
                                                    style: 'bodyText', alignment: 'justify' 
                                                }
                                            ],
                                            [
                                                { text: 'c.', style: 'bodyText' },
                                                {
                                                    stack: [
                                                        { text: 'memutuskan secara sepihak Perjanjian Sewa, apabila', style: 'bodyText' },
                                                        {
                                                            table: {
                                                                widths: ['auto', '*'],
                                                                body: [
                                                                    [
                                                                        { text: '1.', style: 'bodyText' },
                                                                        { text: 'PIHAK KEDUA tidak melaksanakan kewajibannya;', style: 'bodyText', alignment: 'justify' }
                                                                    ],
                                                                    [
                                                                        { text: '2.', style: 'bodyText' },
                                                                        { text: 'PIHAK KEDUA melakukan hal yang dilarang dalam perjanjian atau peraturan perundang\u2011undangan; dan', style: 'bodyText', alignment: 'justify' }
                                                                    ],
                                                                    [
                                                                        { text: '3.', style: 'bodyText' },
                                                                        { text: 'PIHAK KESATU membutuhkan sewaktu\u2011waktu sebagaimana dimaksud dalam Pasal 1 ayat (1) untuk keperluan penyelengaraan Pemerintah Daerah selama jangka waktu sewa sebagimana dimaksud dalam Pasal 2 ayat (4).', style: 'bodyText', alignment: 'justify' }
                                                                    ]
                                                                ]
                                                            },
                                                            layout: {
                                                                hLineWidth: () => 0, vLineWidth: () => 0,
                                                                paddingLeft: (i) => (i === 0 ? 0 : 6),
                                                                paddingRight: () => 0,
                                                                paddingTop: () => 0,    // Set ke 0 agar rapat
                                                                paddingBottom: () => 1  // Jarak antar poin kecil saja
                                                            }
                                                        }
                                                    ]
                                                }
                                            ],
                                            [
                                                { text: 'd.', style: 'bodyText' },
                                                { text: 'Pemutusan sebagaimana dimaksud pada huruf a tidak menghapus kewajiban PIHAK KEDUA untuk melunasi kewajiban keuangan yang telah timbul sebelum tanggal pemutusan.', style: 'bodyText', alignment: 'justify' }
                                            ]
                                        ]
                                    },
                                    layout: {
                                        hLineWidth: () => 0, vLineWidth: () => 0,
                                        paddingLeft: (i) => (i === 0 ? 0 : 6),
                                        paddingRight: () => 0,
                                        paddingTop: () => 0,    // Set ke 0 agar rapat
                                        paddingBottom: () => 1  // Jarak antar poin kecil saja
                                    }
                                }
                            ]
                        }
                    ],
                    [
                        { text: '(2)', style: 'clauseNumber' },
                        { text: 'Pemutusan dilakukan dengan memberitahukan secara tertulis sekurang\u2011kurangnya 1 (satu) bulan sebelumnya dan tanpa kewajiban ganti rugi dari PIHAK KESATU kecuali ditentukan lain secara tertulis.', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: '(3)', style: 'clauseNumber' },
                        { text: 'Pemutusan perjanjian oleh PIHAK KESATU sebagaimana dimaksud dalam ayat (2) sebelum berakhirnya masa sewa tidak menimbulkan kewajiban ganti rugi, kecuali terdapat investasi permanen yang telah mendapat persetujuan tertulis sebelumnya dari PIHAK KESATU.', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: '(4)', style: 'clauseNumber' },
                        { text: 'Pemutusan Perjanjian Sewa sebagaimana dimaksud pada ayat (1) huruf c dilaksanakan dengan PIHAK KESATU memberitahukan secara tertulis kepada PIHAK KEDUA.', style: 'bodyText', alignment: 'justify' }
                    ]

                ]
            },
            layout: {
                hLineWidth: function() { return 0; },
                vLineWidth: function() { return 0; },
                paddingLeft: function(i) { return i === 0 ? 0 : 5; }, // Jarak antara angka (1),(2) dengan teks
                paddingRight: function() { return 0; },
                paddingTop: function() { return 0; },     // Jarak antar ayat (atas)
                paddingBottom: function() { return 0; }   // Jarak antar ayat (bawah)
            }
        });
        
        docContent.push({ text: 'Pasal 4', margin: [0, 5, 0, 0], style: 'pasalTitle', alignment: 'center' });
        docContent.push({
            text: 'PIHAK KESATU berkewajiban menyerahkan pemanfaatan ' + jenis_out + ' sebagaimana dimaksud dalam Pasal 1 ayat (1) kepada PIHAK KEDUA selama jangka waktu sewa sebagaimana dimaksud dalam Pasal 2 ayat (3).',
            style: 'bodyText',
            alignment: 'justify'
        });

        docContent.push({ text: 'Bagian Kedua', margin: [0, 5, 0, 0], style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'Hak dan Kewajiban PIHAK KEDUA', style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'Pasal 5', margin: [0, 5, 0, 0], style: 'pasalTitle', alignment: 'center' });

        docContent.push({
            table: {
                // Lebar kolom: 'auto' menyesuaikan lebar angka (1), (2), (3), dan '*' mengisi sisa kertas
                widths: ['auto', '*'],
                body: [
                    [
                        { text: '(1)', style: 'clauseNumber' },
                        { text: 'PIHAK KEDUA berhak memanfaatkan ' + jenis_out + ' sebagaimana dimaksud dalam Pasal 1 ayat (1) sesuai penggunaan sebagaimana dimaksud dalam Pasal 1 ayat (2).', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: '(2)', style: 'clauseNumber' },
                        { text: 'PIHAK KEDUA berkewajiban untuk ', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: '' },
                        {
                            table: {
                                widths: ['auto', '*'],
                                body: [
                                    [
                                        { text: 'a.', style: 'bodyText' },
                                        { text: 'Menggunakan ' + jenis_out + ' milik PIHAK KESATU sesuai ketentuan yang berlaku;', style: 'bodyText', alignment: 'justify' }
                                    ],
                                    [
                                        { text: 'b.', style: 'bodyText' },
                                        { text: 'Memelihara, merawat dan menjaga keamanan ' + jenis_out + ' yang disewa;', style: 'bodyText', alignment: 'justify' }
                                    ],
                                    [
                                        { text: 'c.', style: 'bodyText' },
                                        { text: 'Membayar pajak sesuai ketentuan yang berlaku dan biaya lain yang timbul selama jangka waktu sewa; dan', style: 'bodyText', alignment: 'justify' }
                                    ],
                                    [
                                        { text: 'd.', style: 'bodyText' },
                                        { text: 'PIHAK KEDUA wajib menyerahkan kembali tanah dalam keadaan bersih, bebas dari pihak ketiga, tanpa bangunan atau tanaman yang menghalangi pemanfaatan, kecuali disetujui tertulis oleh PIHAK KESATU setelah jangka waktu sewa berakhir atau jika sewaktu\u2011waktu diperlukan PIHAK KESATU sebagaimana diatur dalam Pasal 3 ayat (1) huruf c.', style: 'bodyText', alignment: 'justify' }
                                    ]
                                ]
                            },
                            layout: {
                                hLineWidth: function() { return 0; }, // Hilangkan garis horizontal
                                vLineWidth: function() { return 0; }, // Hilangkan garis vertikal
                                paddingLeft: function(i) { return i === 0 ? 0 : 6; }, // Jarak antara huruf a/b dengan teks
                                paddingRight: function() { return 0; },
                                paddingTop: function() { return 2; },
                                paddingBottom: function() { return 2; }
                            }
                        }
                    ],
                ]
            },
            layout: {
                hLineWidth: function() { return 0; },
                vLineWidth: function() { return 0; },
                paddingLeft: function(i) { return i === 0 ? 0 : 5; }, // Jarak antara angka (1),(2) dengan teks
                paddingRight: function() { return 0; },
                paddingTop: function() { return 0; },     // Jarak antar ayat (atas)
                paddingBottom: function() { return 0; }   // Jarak antar ayat (bawah)
            }
        });

        // BAB IV
        docContent.push({ text: 'BAB IV', margin: [0, 10, 0, 0], style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'LARANGAN DAN SANKSI', style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'Pasal 6', margin: [0, 5, 0, 0], style: 'pasalTitle', alignment: 'center' });
        docContent.push({
            table: {
                widths: ['auto', '*'],
                body: [
                    [
                        { text: '(1)', style: 'clauseNumber' },
                        { text: 'PIHAK KEDUA dilarang menjaminkan ' + jenis_out + ' yang disewa sebagaimana dimaksud dalam Pasal 1 ayat (1) kepada pihak lain.', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: '(2)', style: 'clauseNumber' },
                        { text: 'PIHAK KEDUA dilarang memindahtangankan hak sewa atas ' + jenis_out + ' yang disewa sebagaimana dimaksud dalam Pasal 1 ayat (1) baik sebagian atau seluruhnya kepada pihak lain tanpa izin tertulis dari PIHAK KESATU', style: 'bodyText', alignment: 'justify' }
                    ],
                ]
            },
            layout: {
                hLineWidth: function() { return 0; },
                vLineWidth: function() { return 0; },
                paddingLeft: function(i) { return i === 0 ? 0 : 5; }, // Jarak antara angka (1),(2) dengan teks
                paddingRight: function() { return 0; },
                paddingTop: function() { return 0; },     // Jarak antar ayat (atas)
                paddingBottom: function() { return 0; }   // Jarak antar ayat (bawah)
            }
        });
        docContent.push({ text: 'Pasal 7', margin: [0, 5, 0, 0], style: 'pasalTitle', alignment: 'center' });
        docContent.push({
            text: 'Apabila PIHAK KEDUA tidak memenuhi kewajibannya atau melakukan pelanggaran baik terhadap Perjanjian Sewa ini maupun terhadap ketentuan peraturan perundang\u2011undangan yang berlaku dikenakan sanksi berupa:',
            style: 'bodyText',
            alignment: 'justify'
        });
        docContent.push({
            table: {
                widths: ['auto', '*'],
                body: [
                    [
                        { text: '(1)', style: 'clauseNumber' },
                        { text: 'pencabutan hak sewa atas ' + jenis_out + ' sebagaimana dimaksud dalam Pasal 1 ayat (1); dan/atau', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: '(2)', style: 'clauseNumber' },
                        { text: 'mengganti segala kerugian yang timbul akibat pelanggaran yang dilakukan baik kepada PIHAK KESATU maupun PIHAK LAIN yang terdampak.', style: 'bodyText', alignment: 'justify' }
                    ],
                ]
            },
            layout: {
                hLineWidth: function() { return 0; },
                vLineWidth: function() { return 0; },
                paddingLeft: function(i) { return i === 0 ? 0 : 5; }, // Jarak antara angka (1),(2) dengan teks
                paddingRight: function() { return 0; },
                paddingTop: function() { return 0; },     // Jarak antar ayat (atas)
                paddingBottom: function() { return 0; }   // Jarak antar ayat (bawah)
            }
        });

        // BAB V
        docContent.push({ text: 'BAB V', margin: [0, 10, 0, 0], style: 'babTitle', alignment: 'center' });
        docContent.push({ text: ['KEADAAN MEMAKSA (',{ text: 'FORCE MAJEURE', italics: true },')'], style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'Pasal 8', margin: [0, 5, 0, 0], style: 'pasalTitle', alignment: 'center' });

        docContent.push({
            table: {
                widths: ['auto', '*'],
                body: [
                    [
                        { text: '(1)', style: 'clauseNumber' },
                        { text: 'Keadaan memaksa adalah suatu keadaan yang terjadi di luar kehendak PARA PIHAK dan tidak dapat diperkirakan sebelumnya, sehingga kewajiban yang ditentukan dalam Perjanjian Sewa ini tidak dapat dipenuhi.', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: '(2)', style: 'clauseNumber' },
                        {
                            stack: [
                                { text: 'Yang dapat digolongkan sebagai keadaan memaksa sebagaimana dimaksud pada ayat (1) meliputi:', style: 'bodyText' },
                                {
                                    table: {
                                        widths: ['auto', '*'],
                                        body: [
                                            [{ text: 'a.', style: 'bodyText' }, { text: 'bencana alam;', style: 'bodyText' }],
                                            [{ text: 'b.', style: 'bodyText' }, { text: 'bencana non alam; dan', style: 'bodyText' }],
                                            [{ text: 'c.', style: 'bodyText' }, { text: 'bencana sosial.', style: 'bodyText' }]
                                        ]
                                    },
                                    layout: {
                                        hLineWidth: () => 0, vLineWidth: () => 0,
                                        paddingLeft: (i) => (i === 0 ? 0 : 6),
                                        paddingTop: () => 0, paddingBottom: () => 0
                                    }
                                }
                            ]
                        }
                    ],
                    [
                        { text: '(3)', style: 'clauseNumber' },
                        { text: 'Apabila terjadi keadaan memaksa sebagaimana dimaksud pada ayat (2) yang ditandai dengan pernyataan instansi/pejabat yang berwenang, PIHAK KEDUA wajib memberitahukan kepada PIHAK KESATU secara tertulis selambat\u2011lambatnya 14 (empat belas) hari kalender sejak terjadinya keadaan memaksa.', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: '(4)', style: 'clauseNumber' },
                        { text: 'Kelalaian atau keterlambatan dalam memenuhi kewajiban sebagaimana dimaksud pada ayat (3) mengakibatkan tidak diakuinya sebagai keadaan memaksa.', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: '(5)', style: 'clauseNumber' },
                        { text: 'PARA PIHAK dibebaskan untuk melaksanakan kewajiban sebagaimana diatur dalam Perjanjian Sewa ini sebagai akibat terjadinya keadaan memaksa.', style: 'bodyText', alignment: 'justify' }
                    ]
                ]
            },
            layout: {
                hLineWidth: () => 0, vLineWidth: () => 0,
                paddingLeft: (i) => (i === 0 ? 0 : 5),
                paddingTop: () => 0, paddingBottom: () => 1
            }
        });

        // BAB VI
        docContent.push({ text: 'BAB VI', margin: [0, 10, 0, 0], style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'PENYELESAIAN PERSELISIHAN', style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'Pasal 9', margin: [0, 5, 0, 0], style: 'pasalTitle', alignment: 'center' });

        docContent.push({
            table: {
                widths: ['auto', '*'],
                body: [
                    [
                        { text: '(1)', style: 'clauseNumber' },
                        { text: 'Permasalahan yang timbul dalam pelaksanaan Perjanjian Sewa ini diselesaikan secara musyawarah mufakat antara PARA PIHAK.', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: '(2)', style: 'clauseNumber' },
                        { text: 'Apabila penyelesaian musyawarah tidak berhasil mencapai mufakat, maka PARA PIHAK sepakat menyerahkan penyelesaian permasalahan tersebut melalui kantor Pengadilan Negeri Karanganyar.', style: 'bodyText', alignment: 'justify' }
                    ]
                ]
            },
            layout: {
                hLineWidth: () => 0, vLineWidth: () => 0,
                paddingLeft: (i) => (i === 0 ? 0 : 5),
                paddingTop: () => 0, paddingBottom: () => 1
            }
        });

        // VII
        docContent.push({ text: 'BAB VII', margin: [0, 10, 0, 0], style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'PENGAWASAN PELAKSANAAN', style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'Pasal 10', margin: [0, 5, 0, 0], style: 'pasalTitle', alignment: 'center' });

        docContent.push({
            text: 'Pengawasan pelaksanaan Perjanjian Sewa ini dilaksanakan oleh Badan Keuangan Daerah.',
            style: 'bodyText',
            alignment: 'justify',
            margin: [0, 0, 0, 5]
        });

        // BAB VIII
        docContent.push({ text: 'BAB VIII', margin: [0, 10, 0, 0], style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'LAIN-LAIN', style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'Pasal 11', margin: [0, 5, 0, 0], style: 'pasalTitle', alignment: 'center' });

        docContent.push({
            table: {
                widths: ['auto', '*'],
                body: [
                    [
                        { text: '(1)', style: 'clauseNumber' },
                        { text: 'Hal\u2011hal lain yang belum diatur dalam Perjanjian Sewa ini, akan diatur lebih lanjut berdasarkan musyawarah mufakat oleh PARA PIHAK.', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: '(2)', style: 'clauseNumber' },
                        { text: 'Apabila terjadi perubahan, maka akan dituangkan secara tertulis dalam perubahan Perjanjian Sewa sebagaimana disepakati oleh PARA PIHAK.', style: 'bodyText', alignment: 'justify' }
                    ]
                ]
            },
            layout: {
                hLineWidth: () => 0, vLineWidth: () => 0,
                paddingLeft: (i) => (i === 0 ? 0 : 5),
                paddingTop: () => 0, paddingBottom: () => 1
            }
        });

        // BAB IX
        docContent.push({ text: 'BAB IX', margin: [0, 10, 0, 0], style: 'babTitle', alignment: 'center', pageBreak: 'before' });
        docContent.push({ text: 'PENUTUP', style: 'babTitle', alignment: 'center' });
        docContent.push({ text: 'Pasal 12', margin: [0, 5, 0, 0], style: 'pasalTitle', alignment: 'center' });

        docContent.push({
            text: 'Demikian Perjanjian Sewa ini dibuat dan ditandatangani PARA PIHAK, pada hari dan tanggal tersebut diatas, serta dibuat rangkap 4 (empat) yang masing\u2011masing mempunyai kekuatan hukum yang sama dengan perincian sebagai berikut:',
            style: 'bodyText',
            alignment: 'justify',
            margin: [0, 0, 0, 5]
        });

        // Daftar Rincian Lembar Perjanjian
        docContent.push({
            table: {
                widths: [70, 5, '*'],
                body: [
                    [
                        { text: 'a. Lembar I', style: 'bodyText' },
                        { text: ':', style: 'bodyText' },
                        { text: 'ditempel meterai Rp 10.000,00 (sepuluh ribu rupiah) untuk PIHAK KESATU;', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: 'b. Lembar II', style: 'bodyText' },
                        { text: ':', style: 'bodyText' },
                        { text: 'ditempel meterai Rp 10.000,00 (sepuluh ribu rupiah) untuk PIHAK KEDUA;', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: 'c. Lembar III', style: 'bodyText' },
                        { text: ':', style: 'bodyText' },
                        { text: 'untuk Kepala Badan Keuangan Daerah Kabupaten Karanganyar; dan', style: 'bodyText', alignment: 'justify' }
                    ],
                    [
                        { text: 'd. Lembar IV', style: 'bodyText' },
                        { text: ':', style: 'bodyText' },
                        { text: 'untuk Kepala Bagian Hukum Sekretariat Daerah Kabupaten Karanganyar.', style: 'bodyText', alignment: 'justify' }
                    ]
                ]
            },
            layout: 'noBorders',
            margin: [0, 0, 0, 40] // Margin bawah sebelum tanda tangan
        });

        // TANDA TANGAN
        docContent.push({
            table: {
                widths: ['*', '*'],
                body: [
                    [
                        { text: 'PIHAK KEDUA,', alignment: 'center', style: 'bodyText' },
                        { text: 'PIHAK KESATU,', alignment: 'center', style: 'bodyText'}
                    ],
                    [
                        { text: '\n\n\n\n\n', fontSize: 10 }, // Ruang tanda tangan (5 enter)
                        { text: '\n\n\n\n\n', fontSize: 10 }
                    ],
                    [
                        { text: nama2_out, alignment: 'center', style: 'bodyText'},
                        { text: nama1_out, alignment: 'center', style: 'bodyText'}
                    ]
                ]
            },
            layout: 'noBorders'
        });


// 8. Format
const docDefinition = {
    content: docContent,
    styles: {
        title: { fontSize: 12, alignment: 'center' },
        subtitle: { fontSize: 12, alignment: 'center' },
        nomor: { fontSize: 12, alignment: 'center' },
        bodyText: { fontSize: 12, lineHeight: 1, noWrap: false },
        clauseNumber: { fontSize: 12, alignment: 'left', margin: [0, 0, 6, 0] },
        tableHeader: { fontSize: 8.5, alignment: 'center' },
        tableBody: { fontSize: 8.5, alignment: 'center', noWrap: false },
        babTitle: { fontSize: 12,  alignment: 'center'},
        pasalTitle: { fontSize: 12, alignment: 'center'}
      },
        pageSize: 'A4',
        pageMargins: [85, 71, 57, 57]  // [3cm, 2.5cm, 2cm, 2cm]
    };

// 9. Download

        
const outputName = 'Perjanjian_Sewa_' + nama2.replace(/\s+/g, '_');
pdfMake.createPdf(docDefinition).download(outputName + '.pdf');
}

// 10. Pengaturan Input

// Blok ini baru akan berjalan setelah semua elemen HTML selesai dimuat di layar
document.addEventListener('DOMContentLoaded', function() {

    // Memaksa input KIB agar hanya menerima huruf A sampai F
    let inputKIB = document.getElementById('tbl_kib');
    if (inputKIB) {
        inputKIB.addEventListener('input', function() {
            // Hapus karakter selain A-F dan a-f
            this.value = this.value.replace(/[^A-Fa-f]/g, '').slice(0, 1).toUpperCase();
        });
    }

    // Memaksa input Kode Barang agar hanya menerima angka dan titik
    let inputKode = document.getElementById('tbl_kode_barang');
    if (inputKode) {
        inputKode.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9.]/g, '');
        });
    }

    // Memaksa input Nomor REG agar hanya menerima angka
    let inputReg = document.getElementById('tbl_reg');
    if (inputReg) {
        inputReg.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // Memaksa input Luas agar hanya menerima angka
    let inputLuas = document.getElementById('tbl_luas');
    if (inputLuas) {
        inputLuas.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // Mengubah nilai KIB secara otomatis jika dropdown Jenis Barang diubah
    let inputJenis = document.getElementById('jenis');
    if (inputJenis && inputKIB) {
        inputJenis.addEventListener('change', function() {
            let jenisPilihan = this.value;
            if (jenisPilihan === 'Tanah') {
                inputKIB.value = 'A';
            } else if (jenisPilihan === 'Bangunan') {
                inputKIB.value = 'C';
            } else {
                inputKIB.value = '';
            }
        });
    }
});
