import { Modal } from "flowbite-react"

export default function ArticlePreview({ image, date, content, title, id = "defaultModalId", isOpen, setOpenModal }) {
	return (
		<Modal show={isOpen} onClose={() => setOpenModal(false)}>
			<Modal.Header>{title}</Modal.Header>
			<Modal.Body>
				<div className="space-y-4">
					<img src={image} className="w-full h-auto mx-auto rounded-xl" alt={title} />
					<div className="mt-5">
						<p className="mb-3 text-sm italic text-right text-gray-400 sm:text-base">{date}</p>
						<p className="text-base md:text-lg text-dark-1 text-balance">{content}</p>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	)
}
