import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import Navbar from '../components/Navbar';

const LandingPage = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      once: true,
      duration: 300,
      easing: 'ease-out'
    });

    // Initialize Flickity for ihtCarousel
    const ihtCarousel = new Flickity('#ihtCarousel-example1', {
      cellAlign: 'left',
      contain: true,
      prevNextButtons: false,
      wrapAround: false,
      groupCells: true
    });
    const ihtCarousel2 = new Flickity('#ihtCarousel-example2', {
      cellAlign: 'left',
      contain: true,
      prevNextButtons: false,
      wrapAround: false,
      groupCells: true
    });

    // Initialize Flickity for bnnGallery
    const bnnGallery = new Flickity('#bnnGallery', {
      cellAlign: 'left',
      contain: true,
      prevNextButtons: false,
      wrapAround: false,
      groupCells: true
    });

    // Cleanup on component unmount
    return () => {
      ihtCarousel.destroy();
      ihtCarousel2.destroy();
      bnnGallery.destroy();
    };
  }, []);


  function Carousel({
    // eslint-disable-next-line react/prop-types
    title = "default",
  }) {
    return (
      <div id={`ihtCarousel-${title}`} className="ml-4 md:ml-[50px]">
      {/* Card 1 */}
      <div className="rounded-2xl w-[345px] lg:w- h-[275px] relative bg-gradient overflow-hidden mr-[30px]">
        <div className="absolute px-[10px] py-[6px] bg-primary text-white rounded-full top-4 right-4 font-semibold text-xs">
          Komunikasi Publik &amp; Kepemimpinan
        </div>
        <div className="absolute bottom-[30px] left-4 z-10 right-4">
          {/* <a href="#" className="text-xl text-light font-bold mb-2">
            Kementerian Pertahanan RI
          </a> */}
          <p className="line-clamp-3 text-sm text-light leading-[22px]">
            Pelaksanaan program di MTC Training Centre Tomohon selama 3 (tiga)
            bulan sesuai permintaan dari Kementerian Pertahanan RI di Jakarta.
            Materi manajemen dan komputer (keterampilan dasar) diberikan oleh
            para pelatih
          </p>
        </div>
        <img src="/assets/images/iht-1.webp" className="h-full w-full" alt="" />
        {/* gradient background */}
        <div className="absolute top-0 bg-gradient inset-0" />
      </div>
      {/* Card 2 */}
      <div className="rounded-2xl w-[345px] lg:w- h-[275px] relative bg-gradient overflow-hidden mr-[30px]">
        <div className="absolute px-[10px] py-[6px] bg-primary text-white rounded-full top-4 right-4 font-semibold text-xs">
          Pemasaran &amp; Distribusi
        </div>
        <div className="absolute bottom-[30px] left-4 z-10 right-4">
          {/* <a href="#" className="text-xl text-light font-bold mb-2">
            PT. Pegadaian
          </a> */}
          <p className="line-clamp-3 text-sm text-light leading-[22px]">
            Pelaksanaan program sesuai permintaan dari PT. PEGADAIAN (Kantor
            Wilayah V – Manado). Materi dan topik workshop: Strategi Pemasaran
            dan tantangannya.
          </p>
        </div>
        <img src="/assets/images/iht-2.webp" className="h-full w-full" alt="" />
        {/* gradient background */}
        <div className="absolute top-0 bg-gradient inset-0" />
      </div>
      {/* Card 3 */}
      <div className="rounded-2xl w-[345px] lg:w- h-[275px] relative bg-gradient overflow-hidden mr-[30px]">
        <div className="absolute px-[10px] py-[6px] bg-primary text-white rounded-full top-4 right-4 font-semibold text-xs">
          Komunikasi Publik &amp; Kepemimpinan
        </div>
        <div className="absolute bottom-[30px] left-4 z-10 right-4">
          {/* <a href="#" className="text-xl text-light font-bold mb-2">
            Kementerian Pangan RI
          </a> */}
          <p className="line-clamp-3 text-sm text-light leading-[22px]">
            Pelaksanaan program in-house training 1 (satu) hari sesuai
            permintaan dari Balai Karantina - Kementrian Pangan RI. Para dokter
            dan beberapa pegawai dengan persiapan yang matang mengikuti program
            ini.
          </p>
        </div>
        <img src="/assets/images/iht-3.webp" className="h-full w-full" alt="" />
        {/* gradient background */}
        <div className="absolute top-0 bg-gradient inset-0" />
      </div>
      {/* Card 4 */}
      <div className="rounded-2xl w-[345px] lg:w- h-[275px] relative bg-gradient overflow-hidden mr-[30px]">
        <div className="absolute px-[10px] py-[6px] bg-primary text-white rounded-full top-4 right-4 font-semibold text-xs">
          Komunikasi Publik &amp; Kepemimpinan
        </div>
        <div className="absolute bottom-[30px] left-4 z-10 right-4">
          {/* <a href="#" className="text-xl text-light font-bold mb-2">
            IPDN
          </a> */}
          <p className="line-clamp-3 text-sm text-light leading-[22px]">
            Penyelenggaraan Training oleh YTA Nusantara selama 3 (tiga) bulan di
            IPDN (Institut Pemerintahan Dalam Negeri)@2022. Teknik komunikasi
            publik yang efektif dimulai dari kesadaran bahwa kita perlu secara
            bersama – sama mencapai tujuan komunikasi tersebut.
          </p>
        </div>
        <img src="/assets/images/iht-4.webp" className="h-full w-full" alt="" />
        {/* gradient background */}
        <div className="absolute top-0 bg-gradient inset-0" />
      </div>
      {/* Card 5 */}
      <div className="rounded-2xl w-[345px] lg:w- h-[275px] relative bg-gradient overflow-hidden mr-[30px]">
        <div className="absolute px-[10px] py-[6px] bg-primary text-white rounded-full top-4 right-4 font-semibold text-xs">
          Pemasaran &amp; Distribusi
        </div>
        <div className="absolute bottom-[30px] left-4 z-10 right-4">
          <a href="#" className="text-xl text-light font-bold mb-2">
            PT. Daya Adicipta Wisesa
          </a>
          <p className="line-clamp-3 text-sm text-light leading-[22px]">
            Setiap karyawan senior maupun karyawan baru perlu terus meningkatkan
            kemampuan dan pengetahuan di bidang ini. Sebesar apapun perusahaan ,
            sekuat apapun brand dari perusahaan tersebut, tanpa karyawan
            terlatih dan terpercaya di bidang pemasaran dan distribusi, maka
            perusahaan akan mengalami kesulitan dalam melakukan penjuaalan dan
            penjualan berkala yang ditargetkan
          </p>
        </div>
        <img src="/assets/images/iht-5.webp" className="h-full w-full" alt="" />
        {/* gradient background */}
        <div className="absolute top-0 bg-gradient inset-0" />
      </div>
    </div>
    )
  }

    return (
<>
  <Navbar />

  {/* Hero */}
  <section className="relative z-0 bg-secondary py-[50px]">
    <div className="container">
      <img
        src="/assets/svg/wavy-ornament.svg"
        className="absolute top-[30px] md:left-[58px]"
        alt=""
        data-aos="fade-right"
        data-aos-delay={300}
      />
      <div className="grid lg:grid-cols-12 justify-center lg:px-[50px] items-center gap-14 my-10 lg:my-0">
        <div
          className="lg:col-span-7"
          data-aos="fade-right"
          data-aos-delay={300}
        >
          <div className="flex flex-col gap-5 lg:max-w-[570px] w-full">
            <p className="text-5xl md:text-[72px] font-extrabold leading-[56px] md:leading-[86px] text-dark-2">
              Yayasan <br className="hidden md:block" />
              Tunas Agung Nusantara
            </p>
            <p className="text-base md:text-lg font-medium text-dark-1 leading-7">
              Pandemi covid-19 telah meninggalkan tantangan yang besar bagi
              dunia pendidikan, instansi pemerintah, dunia perbankan, serta
              sektor lainnya. Diperlukan suatu tekad dan perjuangan yang tidak
              mudah, namun keyakinan akan harapan di masa depan menghantar YTA
              Nusantara untuk terus melayanai negeri dengan program-program
              terbaik.
            </p>
            <a href="#inHouseTraining" className="btn-primary">
              Pelajari Program Kami
            </a>
          </div>
        </div>
        <div
          className="lg:col-span-5 hidden md:block"
          data-aos="fade-left"
          data-aos-delay={300}
        >
          <img src="/assets/images/hero-illustration.webp" alt="" />
        </div>
      </div>
    </div>
  </section>
  {/* BNN 2 days training */}
  <section className="relative py-[50px] px-4 max-w-screen-xl mx-auto">
    <div className="flex flex-col md:flex-row justify-center items-center gap-[50px] my-10 lg:my-0">
      <div className="max-w-[470px] w-full">
        <img
          src="/assets/images/learning-techs.webp"
          className="w-full"
          alt=""
        />
      </div>
      <div className="max-w-[660px] w-full">
        <p className="text-dark-2 text-xl md:text-2xl mb-5 font-bold">
          Two Days Training - Badan Narkotika Nasional
        </p>
        <div id="bnnGallery">
          <img
            src="/assets/images/training-bnn-1.webp"
            className="rounded-lg md:w-[365px] md:h-[275px] w-7/12 h-auto mr-4 md:mr-6"
            alt=""
          />
          <img
            src="/assets/images/training-bnn-2.webp"
            className="rounded-lg md:w-[365px] md:h-[275px] w-7/12 h-auto mr-4 md:mr-6"
            alt=""
          />
          <img
            src="/assets/images/training-bnn-3.webp"
            className="rounded-lg md:w-[365px] md:h-[275px] w-7/12 h-auto mr-4 md:mr-6"
            alt=""
          />
        </div>
      </div>
    </div>
  </section>
  {/* In House Training */}
  <section className="relative bg-secondary py-[50px]" id="inHouseTraining">
    <div className="container">
      <div className="w-full mb-[50px]">
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl text-orange font-semibold mb-5">Our Services</p>
          {/* <p className="text-[36px] md:text-[48px] font-bold md:leading-[64px] text-dark-2 text-center">
            Dokumentasi In House Training
          </p> */}
        </div>
      </div>
    </div>
  </section>

  {/* Corporate Social Responsibility */}
  <section className="relative py-[50px] px-4 max-w-screen-xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between lg:px-[50px] items-center gap-[50px] my-10 lg:my-0">
      <div className="max-w-[660px] w-full">
        <div className="flex flex-col relative pt-14 md:pt-0">
          <img
            src="/assets/svg/wavy-ornament.svg"
            className="absolute top-6 right-0"
            alt=""
          />
          <p className="text-[36px] md:text-[48px] font-bold md:leading-[64px] text-dark-2">
            In House Training
          </p>
          <p className="text-lg text-dark-1 leading-8 font-normal mt-4 mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          {/* <a href="tel:+6285398520322" className="btn-primary">
            Hubungi Kami
          </a> */}
        </div>
      </div>
      <div className="max-w-[647px] w-full">
        <img
          src="/assets/images/corporate-social.webp"
          className="w-full"
          alt=""
        />
      </div>
    </div>
    
    <Carousel title="example1" />
  </section>
  
  <section className="relative py-[50px] px-4 max-w-screen-xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between lg:px-[50px] items-center gap-[50px] my-10 lg:my-0">
      <div className="max-w-[660px] w-full">
        <div className="flex flex-col relative pt-14 md:pt-0">
          <img
            src="/assets/svg/wavy-ornament.svg"
            className="absolute top-6 right-0"
            alt=""
          />
          <p className="text-[36px] md:text-[48px] font-bold md:leading-[64px] text-dark-2">
            Corporate Social <br className="hidden md:block" />
            <span className="text-primary">Responsibility</span>
          </p>
          <p className="text-lg text-dark-1 leading-8 font-normal mt-4 mb-10">
            Pengelolaan CSR bukan sekedar membangun citra perusahaan, namun
            perusahaan perlu dibantu untuk dapat memberi kontribusi yang tepat
            sasaran dan berguna bagi masyarakat. YTA Nusantara mengelola CSR
            dari perusahaan secara berkala dan khusus di bidang pendidikan, YTA
            Nusantara membuka program rumah-rumah belajar di wilayah cakupan
            NKRI (Negara Kesatuan Republik Indonesia).
          </p>

        </div>
      </div>
      <div className="max-w-[647px] w-full">
        <img
          src="/assets/images/corporate-social.webp"
          className="w-full"
          alt=""
        />
      </div>
    </div>
  </section>

    {/* No Image */}
    <section className="relative py-[50px] px-4 max-w-screen-xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between lg:px-[50px] items-center gap-[50px] my-10 lg:my-0">
      <div className="max-w-[660px] w-full">
        <div className="flex flex-col relative pt-14 md:pt-0">
          <img
            src="/assets/svg/wavy-ornament.svg"
            className="absolute top-6 right-0"
            alt=""
          />
          <p className="text-[36px] md:text-[48px] font-bold md:leading-[64px] text-dark-2">
            In House Training
          </p>
          <p className="text-lg text-dark-1 leading-8 font-normal mt-4 mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          {/* <a href="tel:+6285398520322" className="btn-primary">
            Hubungi Kami
          </a> */}
        </div>
      </div>
      <div className="max-w-[647px] w-full">
        <img
          src=""
          className="w-full"
          alt=""
        />
      </div>
    </div>
    
    <Carousel title="example2" />
  </section>
  
  <section className="relative py-[50px] px-4 max-w-screen-xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between lg:px-[50px] items-center gap-[50px] my-10 lg:my-0">
      <div className="max-w-[660px] w-full">
        <div className="flex flex-col relative pt-14 md:pt-0">
          <img
            src="/assets/svg/wavy-ornament.svg"
            className="absolute top-6 right-0"
            alt=""
          />
          <p className="text-[36px] md:text-[48px] font-bold md:leading-[64px] text-dark-2">
            Corporate Social <br className="hidden md:block" />
            <span className="text-primary">Responsibility</span>
          </p>
          <p className="text-lg text-dark-1 leading-8 font-normal mt-4 mb-10">
            Pengelolaan CSR bukan sekedar membangun citra perusahaan, namun
            perusahaan perlu dibantu untuk dapat memberi kontribusi yang tepat
            sasaran dan berguna bagi masyarakat. YTA Nusantara mengelola CSR
            dari perusahaan secara berkala dan khusus di bidang pendidikan, YTA
            Nusantara membuka program rumah-rumah belajar di wilayah cakupan
            NKRI (Negara Kesatuan Republik Indonesia).
          </p>

        </div>
      </div>
      <div className="max-w-[647px] w-full">
        <img
          src=""
          className="w-full"
          alt=""
        />
      </div>
    </div>
  </section>

  {/* Beragam Program Pengelolaan CSR */}
  <section className="relative py-[50px]">
    <div className="container">
      <div className="w-full mb-10">
        <div className="flex flex-col items-center justify-center">
          <div className="text-lg text-dark-2 font-medium mb-5 flex gap-[6px] items-center">
            <div className="w-3 h-3 bg-cream" />
            Workshop CSR Terbaru
          </div>
          <p className="text-[38px] font-bold md:leading-[64px] text-dark-2 text-center">
            Beragam Program Pengelolaan CSR
          </p>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto">
        <div className="grid md:grid-cols-2 gap-14 md:gap-10 justify-center">
          {/* Card 1 */}
          <div className="max-w-[500px] w-full mx-auto flex flex-row md:flex-col lg:flex-col gap-3">
            <div className="rounded-xl overflow-hidden max-w-[120px] md:max-w-full">
              <div className="w-full h-auto">
                <img src="/assets/images/csr-1.webp" alt="" />
              </div>
              <div className="flex flex-col md:flex-row w-full">
                <div className="flex items-center gap-[10px] p-2 md:py-5 md:w-1/2 text-light bg-choco text-xs md:text-lg font-medium justify-center text-center">
                  13 April 2021
                </div>
                <div className="flex items-center gap-[10px] p-2 md:py-5 md:w-1/2 text-choco bg-cream text-xs md:text-lg font-medium justify-center text-center">
                  <img
                    src="/assets/svg/ic-user.svg"
                    className="hidden md:block"
                    alt=""
                  />
                  PT. Freeport Indonesia
                </div>
              </div>
            </div>
            <div className="md:mt-5">
              <a
                href="#"
                className="min-h-[90px] text-base md:text-2xl text-dark-2 font-semibold md:leading-[30px] hover:underline focus:underline"
              >
                Pelatihan untuk anak-anak sekolah Papua dengan permintaan
                program Soft Skill Training
              </a>
              <p className="mt-3 text-sm md:text-lg text-dark-1 md:leading-[30px] line-clamp-4 md:line-clamp-3">
                Pengeloalaan CSR dari PT. Freeport Indonesia untuk anak-anak
                sekolah Papua dengan permintaan program Soft Skill Training
                selama 2 (dua) hari.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="max-w-[500px] w-full mx-auto flex flex-row md:flex-col gap-3">
            <div className="rounded-xl overflow-hidden max-w-[120px] md:max-w-full">
              <div className="w-full h-auto">
                <img src="/assets/images/csr-2.webp" alt="" />
              </div>
              <div className="flex flex-col md:flex-row w-full">
                <div className="flex items-center gap-[10px] p-2 md:py-5 md:w-1/2 text-light bg-choco text-xs md:text-lg font-medium justify-center text-center">
                  22 Januari 2023
                </div>
                <div className="flex items-center gap-[10px] p-2 md:py-5 md:w-1/2 text-choco bg-cream text-xs md:text-lg font-medium justify-center text-center">
                  <img
                    src="/assets/svg/ic-user.svg"
                    className="hidden md:block"
                    alt=""
                  />
                  TK Citra Tunas Bangsa
                </div>
              </div>
            </div>
            <div className="md:mt-5">
              <a
                href="#"
                className="min-h-[90px] text-base md:text-2xl text-dark-2 font-semibold md:leading-[30px] hover:underline focus:underline"
              >
                Pembukaan Rumah Belajar di Kotamobagu, Sulawesi Utara selama 6
                (enam) bulan
              </a>
              <p className="mt-3 text-sm md:text-lg text-dark-1 md:leading-[30px] line-clamp-4 md:line-clamp-3">
                Leverage agile frameworks to provide a robust synopsis for high
                level overviews.Iterative approaches to corporate strategy
                foster collaborative thinking.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="max-w-[500px] w-full mx-auto flex flex-row md:flex-col gap-3">
            <div className="rounded-xl overflow-hidden max-w-[120px] md:max-w-full">
              <div className="w-full h-auto">
                <img src="/assets/images/csr-2.webp" alt="" />
              </div>
              <div className="flex flex-col md:flex-row w-full">
                <div className="flex items-center gap-[10px] p-2 md:py-5 md:w-1/2 text-light bg-choco text-xs md:text-lg font-medium justify-center text-center">
                  22 Januari 2023
                </div>
                <div className="flex items-center gap-[10px] p-2 md:py-5 md:w-1/2 text-choco bg-cream text-xs md:text-lg font-medium justify-center text-center">
                  <img
                    src="/assets/svg/ic-user.svg"
                    className="hidden md:block"
                    alt=""
                  />
                  TK Citra Tunas Bangsa
                </div>
              </div>
            </div>
            <div className="md:mt-5">
              <a
                href="#"
                className="min-h-[90px] text-base md:text-2xl text-dark-2 font-semibold md:leading-[30px] hover:underline focus:underline"
              >
                Pembukaan Rumah Belajar di Kotamobagu, Sulawesi Utara selama 6
                (enam) bulan
              </a>
              <p className="mt-3 text-sm md:text-lg text-dark-1 md:leading-[30px] line-clamp-4 md:line-clamp-3">
                Leverage agile frameworks to provide a robust synopsis for high
                level overviews.Iterative approaches to corporate strategy
                foster collaborative thinking.
              </p>
            </div>
          </div>
          {/* Card 4 */}
          <div className="max-w-[500px] w-full mx-auto flex flex-row md:flex-col gap-3">
            <div className="rounded-xl overflow-hidden max-w-[120px] md:max-w-full">
              <div className="w-full h-auto">
                <img src="/assets/images/csr-3.webp" alt="" />
              </div>
              <div className="flex flex-col md:flex-row w-full">
                <div className="inline-flex items-center gap-[10px] p-2 md:py-5 md:w-1/2 text-light bg-choco text-xs md:text-lg font-medium justify-center text-center">
                  13 April 2021
                </div>
                <div className="inline-flex items-center gap-[10px] p-2 md:py-5 md:w-1/2 text-choco bg-cream text-xs md:text-lg font-medium justify-center text-center">
                  <img
                    src="/assets/svg/ic-user.svg"
                    className="hidden md:block"
                    alt=""
                  />
                  PT. Freeport Indonesia
                </div>
              </div>
            </div>
            <div className="md:mt-5">
              <a
                href="#"
                className="min-h-[90px] text-base md:text-2xl text-dark-2 font-semibold md:leading-[30px] hover:underline focus:underline"
              >
                Pelatihan untuk anak-anak sekolah Papua dengan permintaan
                program Soft Skill Training
              </a>
              <p className="mt-3 text-sm md:text-lg text-dark-1 md:leading-[30px] line-clamp-4 md:line-clamp-3">
                Pengeloalaan CSR dari PT. Freeport Indonesia untuk anak-anak
                sekolah Papua dengan permintaan program Soft Skill Training
                selama 2 (dua) hari.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Footer */}
  <footer className="py-[50px] px-4 lg:px-20 bg-secondary">
    <div className="flex flex-wrap lg:grid lg:grid-cols-12 md:gap-20 gap-10">
      <div className="lg:col-span-3">
        <a href="/">
          <img
            src="/assets/svg/logo-bg-1.svg"
            className="h-full max-h-12 md:max-h-[80px]"
            alt=""
          />
        </a>
        <p className="mt-5 text-dark-2 text-sm leading-6 font-medium italic">
          “Seorang pemimpin adalah mereka yang telah terlebih dahulu taat”
        </p>
      </div>
      <div className="lg:col-span-3">
        <p className="text-dark-2 text-sm leading-5 mb-4 font-extrabold">
          Program
        </p>
        <div className="flex flex-col gap-3">
          <a href="#" className="text-sm text-dark-3 leading-6 hover:underline">
            Public Speaking &amp; Leadership
          </a>
          <a href="#" className="text-sm text-dark-3 leading-6 hover:underline">
            Management &amp; Computer
          </a>
          <a href="#" className="text-sm text-dark-3 leading-6 hover:underline">
            Marketing &amp; Distribution
          </a>
          <a href="#" className="text-sm text-dark-3 leading-6 hover:underline">
            Corporate Social Responsibility
          </a>
        </div>
      </div>
      <div className="lg:col-span-6">
        <div className="flex items-start gap-3 md:gap-5">
          <div className="flex flex-col items-center gap-2">
            <img
              src="/assets/images/tersy-maria.png"
              className="w-16 md:w-[100px] h-16 md:h-[100px] shadow-sm rounded-full"
              alt=""
            />
            <p className="text-xs md:text-sm text-dark-3 text-center font-medium md:tracking-wide">
              Tersy Maria <br />
              <i>Founder YTA Nusantara</i>
            </p>
          </div>
          <div>
            <p className="text-dark-2 text-sm leading-5 mb-4 font-extrabold">
              Contact
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="text-sm text-dark-3 leading-6 hover:underline inline-flex items-start gap-2"
              >
                <img src="/assets/svg/ic-location.svg" alt="" />
                Jl. Tondano - Tomohon (Rurukan), <br />
                Kompleks Perum Citra Asri Blok - D 2 <br />
                Sasaran - Minahasa , Sulawesi Utara
              </a>
              <a
                href="tel:+6285398520322"
                className="text-sm text-dark-3 leading-6 hover:underline inline-flex items-start gap-2"
              >
                <img src="/assets/svg/ic-phone.svg" alt="" />
                +62 85398520322
              </a>
              <a
                href="mailto:tercy.maria@gmail.com"
                className="text-sm text-dark-3 leading-6 hover:underline inline-flex items-start gap-2"
              >
                <img src="/assets/svg/ic-envelope.svg" alt="" />
                tercy.maria@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</>

    );
}

export default LandingPage;
