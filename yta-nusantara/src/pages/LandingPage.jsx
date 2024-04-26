import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import Navbar from '../components/Navbar';
import ProgramList from '../components/ProgramList';
import ArticleList from '../components/ArticleList';

const LandingPage = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      once: true,
      duration: 300,
      easing: 'ease-out'
    });

    // Initialize Flickity for ihtCarousel
    /* const ihtCarousel = new Flickity('#ihtCarousel-example1', {
      cellAlign: 'left',
      contain: true,
      prevNextButtons: false,
      wrapAround: false,
      groupCells: true
    }); */ 
    /* const ihtCarousel2 = new Flickity('#ihtCarousel-example2', {
      cellAlign: 'left',
      contain: true,
      prevNextButtons: false,
      wrapAround: false,
      groupCells: true
    });
    */

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
      // ihtCarousel.destroy();
      // ihtCarousel2.destroy();
      bnnGallery.destroy();
    };
  }, []);

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
      <div className="w-full">
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl text-orange font-semibold mb-5">Our Services</p>
          {/* <p className="text-[36px] md:text-[48px] font-bold md:leading-[64px] text-dark-2 text-center">
            Dokumentasi In House Training
          </p> */}
        </div>
      </div>
    </div>
  </section>
  
  <ProgramList />

  <ArticleList />

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
