function Footer() {
	return (
		<footer className="py-[50px] px-4 lg:px-20 bg-secondary">
			<div className="flex flex-wrap gap-10 lg:grid lg:grid-cols-12 md:gap-20">
				<div className="lg:col-span-3">
					<a href="/">
						<img src="/assets/svg/logo-bg-1.svg" className="h-full max-h-12 md:max-h-[80px]" alt="" />
					</a>
					<p className="mt-5 text-sm italic font-medium leading-6 text-dark-2">
						“Seorang pemimpin adalah mereka yang telah terlebih dahulu taat”
					</p>
				</div>
				<div className="lg:col-span-3">
					<p className="mb-4 text-sm font-extrabold leading-5 text-dark-2">Program</p>
					<div className="flex flex-col gap-3">
						<a href="#" className="text-sm leading-6 text-dark-3 hover:underline">
							Public Speaking &amp; Leadership
						</a>
						<a href="#" className="text-sm leading-6 text-dark-3 hover:underline">
							Management &amp; Computer
						</a>
						<a href="#" className="text-sm leading-6 text-dark-3 hover:underline">
							Marketing &amp; Distribution
						</a>
						<a href="#" className="text-sm leading-6 text-dark-3 hover:underline">
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
							<p className="text-xs font-medium text-center md:text-sm text-dark-3 md:tracking-wide">
								Tersy Maria <br />
								<i>Founder YTA Nusantara</i>
							</p>
						</div>
						<div>
							<p className="mb-4 text-sm font-extrabold leading-5 text-dark-2">Contact</p>
							<div className="flex flex-col gap-3">
								<a
									href="#"
									className="inline-flex items-start gap-2 text-sm leading-6 text-dark-3 hover:underline"
								>
									<img src="/assets/svg/ic-location.svg" alt="" />
									Jl. Tondano - Tomohon (Rurukan), <br />
									Kompleks Perum Citra Asri Blok - D 2 <br />
									Sasaran - Minahasa , Sulawesi Utara
								</a>
								<a
									href="tel:+6285398520322"
									className="inline-flex items-start gap-2 text-sm leading-6 text-dark-3 hover:underline"
								>
									<img src="/assets/svg/ic-phone.svg" alt="" />
									+62 85398520322
								</a>
								<a
									href="mailto:tercy.maria@gmail.com"
									className="inline-flex items-start gap-2 text-sm leading-6 text-dark-3 hover:underline"
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
	)
}

export default Footer
