import { Modal } from "flowbite"

export default function ArticlePreview({image, date, content, title, id = 'defaultModalId'}) {
	return (
		<div
			id={id}
			tabIndex="-1"
			aria-hidden="true"
			className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
		>
			<div className="relative w-full max-w-2xl max-h-full p-4">
				{/* <!-- Modal content --> */}
				<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
					{/* <!-- Modal header --> */}
					<div className="flex items-center justify-between p-4 border-b rounded-t md:p-5 dark:border-gray-600">
						<h3 className="text-base md:text-2xl text-dark-2 font-semibold md:leading-[30px]">{title}</h3>
						<button
							type="button"
							className="inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 ms-auto dark:hover:bg-gray-600 dark:hover:text-white"
							data-modal-hide={id}
						>
							<svg
								className="w-3 h-3"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
								/>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
					</div>
					{/* <!-- Modal body --> */}
					<div className="p-4 space-y-4 md:p-5">
						<img src={image} className="w-full h-auto mx-auto rounded-xl" alt={title} />
						<div className="mt-5">
								<p className="mb-3 text-sm italic text-right text-gray-400 sm:text-base">
									{date}
								</p>
							<p className="text-base md:text-lg text-dark-1 text-balance">{content}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
