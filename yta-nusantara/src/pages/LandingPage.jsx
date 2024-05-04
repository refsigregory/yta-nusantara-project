import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import Navbar from '../components/Navbar';
import ProgramList from '../components/ProgramList';
import ArticleList from '../components/ArticleList';
import Footer from '../components/Footer';

const LandingPage = () => {
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      once: true,
      duration: 300,
      easing: 'ease-out'
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
            <p className="text-base font-medium leading-7 md:text-lg text-dark-1">
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
          className="hidden lg:col-span-5 md:block"
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
        <p className="mb-5 text-xl font-bold text-dark-2 md:text-2xl">
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
          <p className="mb-5 text-xl font-semibold text-orange">Our Services</p>
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
  <Footer/>
</>

    );
}

export default LandingPage;
