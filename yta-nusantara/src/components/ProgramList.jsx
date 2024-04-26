import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Flickity from 'flickity';
import 'flickity/css/flickity.css';
import { baseUrl } from '../config/app';
import stringToSlug from '../utils/slug';

const ProgramList = () => {
  const [programList, setProgramList] = useState([]);
  
  useEffect(() => {
    // Initialize AOS
    AOS.init({
      once: true,
      duration: 300,
      easing: 'ease-out'
    });

    // Cleanup AOS on component unmount
    return () => {
      AOS.refreshHard();
    };
  }, []);

  useEffect(() => {
    const fetchProgramList = async () => {
      try {
        const response = await fetch(`${baseUrl}/public/program_list`);
        if (!response.ok) {
          throw new Error('Failed to fetch program list');
        }
        const data = await response.json();
        setProgramList(data);
      } catch (error) {
        console.error('Error fetching program list:', error);
      }
    };

    fetchProgramList();
  }, []);

  // eslint-disable-next-line react/prop-types
  function Carousel({ title = "default", data = [] }) {
    useEffect(() => {
      const carouselElement = document.getElementById(`ihtCarousel-${title}`);
      if (carouselElement) {
        new Flickity(carouselElement, {
          cellAlign: 'left',
          contain: true,
          prevNextButtons: false,
          wrapAround: false,
          groupCells: true
        });
      }
    }, [title]);

    return (
      data.length > 0 && (
        <div id={`ihtCarousel-${title}`} className="ml-4 md:ml-[50px]">
          {data.map((item, index) => (
            <div key={index} id={`subprogram-${stringToSlug(item.nama)}`} className="rounded-2xl w-[345px] lg:w- h-[275px] relative bg-gradient overflow-hidden mr-[30px]">
              <div className="absolute px-[10px] py-[6px] bg-primary text-white rounded-full top-4 right-4 font-semibold text-xs">
                {item.nama}
              </div>
              <div className="absolute bottom-[30px] left-4 z-10 right-4">
                <p className="line-clamp-3 text-sm text-light leading-[22px]">
                  {item.deskripsi}
                </p>
              </div>
              <img src={item.gambar} className="h-full w-full" alt="" />
              <div className="absolute top-0 bg-gradient inset-0" />
            </div>
          ))}
        </div>
      )
    );
  }

  return (
    <>
      {programList.map((program, index) => (
        <section key={index} id={`program-${stringToSlug(program.nama)}`} className="relative py-[50px] px-4 max-w-screen-xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between lg:px-[50px] items-center gap-[50px] my-10 lg:my-0">
            <div key={program.id} className="max-w-[660px] w-full">
              <div className="flex flex-col relative pt-14 md:pt-0">
                <img
                  src="/assets/svg/wavy-ornament.svg"
                  className="absolute top-6 right-0"
                  alt=""
                />
                <p className="text-[36px] md:text-[48px] font-bold md:leading-[64px] text-dark-2">
                  {program.nama}
                </p>
                <p className="text-lg text-dark-1 leading-8 font-normal mt-4 mb-10">
                  {program.deskripsi}
                </p>
              </div>
            </div>

            <div className="max-w-[647px] w-full">
              <img
                src={program.gambar}
                className="w-full"
                alt=""
              />
            </div>
          </div>

          <Carousel title={`subprogram-${index}`} data={program.sub_programs} />
        </section>
      ))}
    </>
  );
};

export default ProgramList;
