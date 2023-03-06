-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2023 at 03:15 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pembelajaran_itc`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `body` longtext NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `id_chapter` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `body`, `createdAt`, `updatedAt`, `id_chapter`) VALUES
(1, 'Article 1', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor tortor mauris, et dictum lorem blandit quis. Aenean semper sed.</p>', '2023-02-24 14:25:43', '2023-02-24 14:25:43', 1),
(2, 'Article 2', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor tortor mauris, et dictum lorem blandit quis. Aenean semper sed.</p>', '2023-02-24 14:25:43', '2023-02-24 14:25:43', 1),
(3, 'Article 3', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor tortor mauris, et dictum lorem blandit quis. Aenean semper sed.</p>', '2023-02-24 14:25:43', '2023-02-24 14:25:43', 1),
(4, 'Article 1', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor tortor mauris, et dictum lorem blandit quis. Aenean semper sed.</p>', '2023-02-24 14:25:43', '2023-02-24 14:25:43', 2),
(5, 'Article 2', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor tortor mauris, et dictum lorem blandit quis. Aenean semper sed.</p>', '2023-02-24 14:25:43', '2023-02-24 14:25:43', 2),
(8, 'Apa itu project management?', '<div class=\"my-2 flex-1\">\n<p>Project Management Institute mendefinisikan project management sebagai penggunaan pengetahuan, keterampilan, tools, dan teknik khusus untuk memberikan sesuatu yang bernilai kepada banyak orang.</p>\n<p>Secara sederhana, project management adalah proses pengelolaan sumber daya untuk mencapai atau menyelesaikan sebuah proyek sesuai dengan kriteria dan parameter yang telah disepakati perusahaan.</p>\n<p>Sebagaimana yang telah disebut pada bagian awal artikel ini, project management memiliki hasil akhir yang dibatasi oleh skala waktu dan anggaran tertentu.</p>\n<p>Proyek sendiri biasanya berkaitan dengan bidang-bidang dengan komponen produk yang kompleks seperti software, teknologi informasi, healthcare, sampai konstruksi gedung/jalan/bangunan air.</p>\n<p>Karena itu, orang dengan keahlian project management banyak diserap industri teknologi dan infrastruktur.</p>\n</div>', '2023-02-25 16:14:58', '2023-02-25 16:14:58', 6),
(9, 'Manfaat Project Management bagi perusahaan?', '<p><img src=\"https://res.cloudinary.com/dd6stok7k/image/upload/v1677341951/itc-repo/article/he46dpl4ykep0n5lyjku.png\"></p>\n<p>#1 Anggaran dan Jadwal Terkelola dengan Baik<br>Anggaran dan jadwal adalah salah satu hal terpenting dari sebuah proyek. Dengan anggaran dan jadwal yang ketat atau terbatas, perusahaan akan lebih sulit menyelesaikan proyek.</p>\n<p>Adanya project management memudahkan perusahaan dalam mengelola anggaran dan jadwal tersebut. Alasannya, seorang project manager akan menggunakan tools dan pengalaman yang dibutuhkan untuk membuat strategi anggaran dan timeline yang mendukung prioritas proyek.</p>\n<p>#2 Meningkatkan Produktivitas dan Kualitas Kerja secara Keseluruhan<br>Tim project management memiliki tanggung jawab untuk menentukan tujuan ke arah yang lebih baik dan mengoptimalkan alur kerja guna memaksimalkan produktivitas sekaligus kualitas proyek. Dengan peta jalan yang jelas, tim dapat menavigasikan proyek lebih baik dan melakukan seluruh tugas sesuai dengan kebutuhan yang diperlukan.</p>\n<p>Berbagai hal tersebut tentu saja akan berdampak pada kualitas kerja secara keseluruhan dan menghasilkan produk berkualitas tinggi.</p>\n<p>#3 Mengurangi Risiko Proyek<br>Setiap proyek pasti memiliki berbagai risiko, mulai dari biaya, waktu, hingga kinerja. Apabila sebuah perusahaan memiliki tim project management, semua risiko tersebut mampu dianalisis, dikomunikasi, dan diprioritaskan. Dengan demikian, perusahaan bisa mengurangi risiko sebelum terdapat masalah yang lebih sulit diatasi.</p>\n<p><br>#4 Perusahaan Mendapatkan Keunggulan Kompetitif<br>Setiap perusahaan yang menjual barang atau jasa akan memiliki kompetitor di pasar. Oleh sebab itu, perusahaan diharuskan menghasilkan produk yang kompetitif dan unggul dibandingkan pesaing-pesaingnya.</p>\n<p>Memanfaatkan project management dapat membantu perusahaan lebih unggul dalam persaingan, meningkatkan kualitas produk, dan mendekatkan hubungan dengan customer sekaligus stakeholder.</p>\n<p>#5 Meningkatkan Hubungan dengan Stakeholder<br>Saat merencanakan sebuah proyek, perusahaan tentu akan bekerja sama dengan berbagai pemangku kepentingan atau stakeholder, mulai dari investor, eksekutif, hingga vendor.&nbsp;</p>\n<p>Adanya tim project management dapat meningkatkan arus komunikasi ke semua pihak yang terlibat dalam proyek, mengelola risiko bersama, sekaligus meningkatkan hubungan perusahaan dengan semua stakeholder.</p>\n<p>Seorang project manager nantinya harus memahami kebutuhan dan kepentingan masing-masing stakeholder guna memastikan hasil proyek adalah tujuan yang ingin dicapai semua kepentingan.</p>', '2023-02-25 16:19:23', '2023-02-25 16:19:23', 6),
(10, 'Aspek Penting Project Management', '<p><img src=\"https://res.cloudinary.com/dd6stok7k/image/upload/v1677342150/itc-repo/article/f33xk4oornec9y4ng1gq.png\"></p>\n<p>&nbsp;</p>\n<p>Aspek penting project management adalah pedoman-pedoman yang digunakan sebagai dasar untuk membangun kebijakan, aturan, atau proses yang diperlukan selama proyek berlangsung.</p>\n<p><br><strong>Manajemen Integrasi (Integration)</strong><br>Manajemen integrasi berhubungan dengan area yang bisa mengintegrasikan berbagai proses dan metodologi project management. Tujuan manajemen ini adalah untuk membangun strategi yang membuat kerja sama tim menjadi lebih baik.&nbsp;</p>\n<p>Integrasi berguna untuk mendorong kinerja tim dan melakukan sinkronisasi informasi.</p>\n<p><strong>Manajemen Waktu (Time)</strong><br>Manajemen waktu mencakup bagaimana penjadwalan suatu proyek yang akan dikerjakan, dikelola, dan dipantau. Dengan manajemen yang baik, project manager akan berusaha memikirkan waktu paling realistis untuk mencapai hasil akhir atau tujuan proyek.</p>\n<p><strong>Manajemen Ruang Lingkup (Scope)</strong><br>Scope atau ruang lingkup berkaitan dengan keseluruhan tugas dalam proyek. Dalam manajemen ini akan diidentifikasi jumlah total pekerjaan untuk menghasilkan sebuah proyek. Jika tidak ada scope, maka akan ada kemungkinan tim melakukan pekerjaan di luar lingkup yang sudah ditentukan.</p>\n<p><strong>Manajemen Biaya (Cost)</strong><br>Sederhananya, manajemen ini bekerja untuk menyiapkan pengelolaan anggaran dan mengendalikan biaya yang berkaitan dengan proyek. Biaya akan mencakup pengumpulan, analisis, dan pelaporan agar tidak terjadi pengeluaran yang berlebihan.</p>\n<p><strong>Manajemen Mutu atau Kualitas (Quality)</strong><br>Manajemen mutu bertujuan mengawasi semua kegiatan yang berhubungan dengan pengadaan proyek guna memastikan bahwa hasil tersebut memenuhi kualitas yang diharapkan. Hal ini dilakukan dengan terus mengukur kualitas selama proyek berjalan dan melakukan koreksi jika ada penyimpangan atau kesalahan.</p>\n<p><strong>Manajemen Sumber Daya (Resource)</strong><br>Suatu proyek bisa berhasil ketika peran semua sumber daya dimaksimalkan, baik itu dari sisi pekerja, bahan, dan peralatan. Sumber daya tersebut kemudian dialokasikan sesuai kebutuhan untuk mencapai efektivitas dan efisiensi maksimal.</p>\n<p><strong>Manajemen Komunikasi (Communication)</strong><br>Manajemen komunikasi merupakan proses yang digunakan supaya pesan yang disampaikan project manager dalam sebuah proyek bisa diterima dengan jelas. Hal ini melibatkan pembuatan channel atau frekuensi yang tepat agar semua orang dapat memahami dan menerimanya tepat waktu.</p>\n<p><strong>Manajemen Risiko (Risk)</strong><br>Manajemen risiko meliputi identifikasi, evaluasi, dan pencegahan ketika terjadi masalah dalam proyek. Dalam tahap perencanaan, project manager sudah harus mengidentifikasi risiko yang mungkin timbul selama proyek berlangsung. Risiko tersebut diharapkan bisa dikurangi atau dihindari.</p>\n<p><strong>Manajemen Pengadaan (Procurement)</strong><br>Procurement berkaitan dengan proses pengoptimalan anggaran yang disediakan untuk barang, jasa, dan sumber daya lain yang diperlukan dalam menyelesaikan proyek.&nbsp; Pengoptimalan anggaran tersebut dalam artian project manager memastikan bahwa sumber daya dapat dibeli, disewa, dan diperoleh dengan lancar.</p>\n<p><strong>Manajemen Stakeholder</strong><br>Manajemen ini akan mengkomunikasikan status proyek dengan berbagai stakeholder, memberitahu hambatan, anggaran, perubahan, dan lainnya guna memberikan update progres pengerjaan. Dengan begitu, hubungan antara perusahaan dan stakeholder akan terus meningkat dan terorganisir.</p>', '2023-02-25 16:22:47', '2023-02-25 16:22:47', 6),
(12, 'The Triple Constraint dalam Project Management', '<p><span id=\"docs-internal-guid-aedc62a8-7fff-80d5-1895-c5a19a26b563\" style=\"font-size: 11pt; font-family: Calibri,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;\"><span style=\"border: none; display: inline-block; overflow: hidden; width: 602px; height: 384px;\"><img style=\"margin-left: 0px; margin-top: 0px;\" src=\"https://lh3.googleusercontent.com/_MsRIL0CH6N9e9MGVIyeFoKg7-JF_ZvclKshyyTHxb43fRLI12pORcqH3DitrarJM0mQwNWBySa-EI7cDz6bvQcovej_c2yOpyfkP_3lXPNDDgTfOfk4qfqS7SiYPhU1Wt5aO4R58EoA7A9B_FtqLQ\" width=\"602\" height=\"384\"></span></span></p>\n<p>&nbsp;</p>\n<p>The Triple Constraint adalah sebuah model atau teori yang menyatakan tiga batasan utama dalam project management.</p>\n<p>Teori ini umumnya juga dikenal dengan istilah lain, seperti Project Management Triangle, Project Triangle, Triple Constraint Triangle, atau Iron Triangle.</p>\n<p>&nbsp;</p>\n<p><strong>Secara garis besar, the triple constraint menjelaskan bahwa terdapat tiga elemen dalam project management yang saling berkaitan erat. Jika ada perubahan dalam salah satu elemen, maka akan mempengaruhi dua elemen lain.</strong></p>\n<p>&nbsp;</p>\n<p>Tiga elemen tersebut adalah waktu, ruang lingkup, dan biaya.</p>\n<p>&nbsp;</p>\n<p><strong>Waktu (Time)</strong><br>Batasan pertama dalam project management adalah waktu. Waktu mengacu pada jumlah waktu yang dibutuhkan untuk menyelesaikan proyek, mulai dari titik awal hingga akhir. Seorang project manager harus bisa memperkirakan dan mengelola waktu sebaik mungkin agar proyek selesai sesuai target yang sudah ditentukan.</p>\n<p>Dengan schedule yang tepat, seluruh tim yang terlibat akan memiliki batasan waktu yang jelas dalam pekerjaan.</p>\n<p>&nbsp;</p>\n<p><strong>Ruang Lingkup (Scope)</strong><br>Ruang lingkup berhubungan dengan aktivitas atau pekerjaan yang harus dilakukan selama proses pengembangan proyek berlangsung.&nbsp;</p>\n<p>Apabila tidak ada batasan ruang lingkup, maka pekerjaan menjadi tidak terarah dan berpotensi menggagalkan rencana proyek atau biasa dikenal dengan scope creep.</p>\n<p>Scope sudah harus diidentifikasi saat tahap perencanaan atau sebelum proyek dimulai. Dengan perencanaan yang matang, setiap orang dalam tim akan mengetahui dan memahami apa saja tugas yang perlu dan menjadi prioritas untuk mereka selesaikan.</p>\n<p>&nbsp;</p>\n<p><strong>Biaya (Cost)</strong><br>Sebuah proyek tentu memerlukan biaya. Dalam menentukan batasan biaya, project manager harus memperkirakan, menganggarkan, dan mengendalikan biaya sebaik mungkin. Adanya manajemen biaya yang baik menjadikan sebuah proyek dapat diselesaikan sesuai anggaran yang sudah disepakati sebelumnya.</p>', '2023-02-25 16:30:25', '2023-02-25 16:30:25', 6),
(13, 'Contoh Project Management', '<p>Proyek yang dijalankan seorang project manager sangatlah beragam, berikut beberapa contohnya:</p>\n<ul>\n<li>Proyek konstruksi, meliputi pembangunan jalan raya, pasar, tol, pabrik, gedung, halte, dan lainnya.</li>\n<li>Pengembangan software untuk meningkatkan produktivitas karyawan.</li>\n<li>Proyek pembuatan aplikasi, seperti aplikasi recruitment untuk perusahaan besar.</li>\n<li>Pengembangan sistem informasi perusahaan.</li>\n<li>Pembuatan website, jaringan, hingga sistem komunikasi baru.</li>\n</ul>\n<p>Tentunya, contoh-contoh di atas hanya sebagian kecil saja. Mengingat saat ini terdapat banyak jenis perusahaan, maka proyek yang dijalankan juga sangatlah beragam.</p>\n<p>&nbsp;</p>\n<p><strong>Penutup:</strong><br>Dalam memulai sebuah proyek baru, ada begitu banyak elemen dan variabel yang harus dipertimbangkan. Di sinilah project management terlibat. Project management adalah suatu proses pengadaan proyek yang mencakup perencanaan hingga hasil akhir yang siap dipresentasikan.</p>\n<p>Apabila suatu perusahaan menggunakan project management, ada berbagai manfaat yang bisa didapatkan, antara lain:</p>\n<ul>\n<li>Anggaran dan jadwal terkelola dengan baik walaupun terbatas.</li>\n<li>Meningkatkan produktivitas dan kualitas kerja secara keseluruhan.</li>\n<li>Mengurangi risiko yang mungkin timbul selama proses pengadaan proyek.</li>\n<li>Perusahaan dapat unggul dan bersaing dengan kompetitor.</li>\n<li>Meningkatkan dan membina hubungan baik dengan stakeholder.</li>\n</ul>\n<p>Ada juga teori the triple constraint yang merupakan tiga batasan utama dalam project management (waktu, biaya, ruang lingkup). Ketiga batasan ini bersifat saling memengaruhi atau tarik-menarik, sehingga jika salah satu dikurangi, maka akan berpengaruh terhadap dua elemen lainnya.</p>\n<p>&nbsp;</p>\n<p>Note: Saya hanya copas website lain, karena saya malas membuat materi<br>All credit to: <a href=\"https://revou.co/panduan-karir/project-management-adalah\">https://revou.co/panduan-karir/project-management-adalah</a></p>', '2023-02-25 16:33:49', '2023-02-25 16:33:49', 6);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_chapter` (`id_chapter`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`id_chapter`) REFERENCES `chapters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
