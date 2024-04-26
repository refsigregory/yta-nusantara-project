import { useState, useEffect } from 'react';
import { baseUrl } from '../config/app';
import stringToSlug from '../utils/slug';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${baseUrl}/public/article`);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  // Function to format date into Indonesian format
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', options).format(date);
  };

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
            <div className="grid md:grid-cols-2 gap-14 md:gap-10 justify-center">
              {articles.map(article => (
                <div key={article.id} className="max-w-[500px] w-full mx-auto flex flex-row md:flex-col gap-3">
                  {/* Your card structure */}
                  <div className="rounded-xl overflow-hidden max-w-[120px] md:max-w-full">
                    <div className="w-full h-auto">
                      <img src={article.image} alt={article.title} />
                    </div>
                    <div className="flex flex-col md:flex-row w-full">
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
                    <a href={`#article-${stringToSlug(article.title)}`} className="min-h-[90px] text-base md:text-2xl text-dark-2 font-semibold md:leading-[30px] hover:underline focus:underline">
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
        </div>
      </section>
    </>
  );
};

export default ArticleList;
