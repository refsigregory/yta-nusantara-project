import { useState, useEffect } from 'react';
import { baseUrl } from '../config/app';
import stringToSlug from '../utils/slug';
import ArticlePreview from './ArticlePreview';
import { Pagination } from 'flowbite-react';

const ArticleList = () => {
  const [isLoading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [openModal, setOpenModal] = useState(false); 

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const onPageChange = (page) => setCurrentPage(page);


  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${baseUrl}/public/article?page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data.articles);

        setTotalPage(data.total_pages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage]);

  // Function to format date into Indonesian format
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', options).format(date);
  };

  const previewContent = (el) => {
    setPreview(el)
    setOpenModal(!openModal)
    // console.log(el);
  }

  const handleOpenModal = (state) => {
    // console.log(state);
    setOpenModal(state)
  }

  return (
    <>
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
            <div className="grid justify-center md:grid-cols-2 gap-14 md:gap-10">
              {articles.map(article => (
                <div key={article.id} className="max-w-[500px] w-full mx-auto flex flex-row md:flex-col gap-3">
                  {/* Your card structure */}
                  <div className="rounded-xl overflow-hidden max-w-[120px] md:max-w-full">
                    <div className="w-full h-auto">
                      <img src={article.image} alt={article.title} />
                    </div>
                    <div className="flex flex-col w-full md:flex-row">
                      <div className="flex items-center gap-[10px] p-2 md:py-5 md:w-1/2 text-light bg-choco text-xs md:text-lg font-medium justify-center text-center">
                        {formatDate(article.date)}
                      </div>
                      <div className="flex items-center gap-[10px] p-2 md:py-5 md:w-1/2 text-choco bg-cream text-xs md:text-lg font-medium justify-center text-center">
                        <img src="/assets/svg/ic-user.svg" className="hidden md:block" alt="" />
                        {article.author || 'Admin'}
                      </div>
                    </div>
                  </div>
                  <div className="md:mt-5">
                    <a href={`#article-${stringToSlug(article.title)}`} onClick={() => previewContent(article)} data-modal-target="ArticleModal" data-modal-toggle="ArticleModal" className="min-h-[90px] text-base md:text-2xl text-dark-2 font-semibold md:leading-[30px] hover:underline focus:underline">
                      {article.title}
                    </a>
                    <p className="mt-3 text-sm md:text-lg text-dark-1 md:leading-[30px] line-clamp-4 md:line-clamp-3">
                      {article.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex overflow-x-auto sm:justify-center">
            {
              !isLoading &&
              <Pagination currentPage={currentPage} totalPages={totalPage} onPageChange={onPageChange} />
            }
          </div>
        </div>
      </section>

      {
        preview && <ArticlePreview id='ArticleModal' title={preview.title} image={preview.image} content={preview.content} date={preview.date} setOpenModal={handleOpenModal} isOpen={openModal} />
      }
    </>
  );
};

export default ArticleList;
