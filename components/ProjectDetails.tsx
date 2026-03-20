import { motion } from "motion/react";

interface ProjectDetailsProps {
  title: string;
  description: string;
  subDescription: string[];
  image: string;
  href: string;
  closeModal: () => void;
}

const ProjectDetails = ({
  title,
  description,
  subDescription,
  image,
  href,
  closeModal,
}: ProjectDetailsProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-hidden backdrop-blur-sm">
      <motion.div
        className="relative max-w-2xl w-full border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 max-h-[100vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-full top-5 right-5 cursor-pointer bg-midnight hover:bg-gray-500"
        >
          <img src="assets/close.svg" className="w-6 h-6" alt="close" />
        </button>

        <img src={image} alt={title} className="w-full rounded-t-2xl" />

        <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold text-white">{title}</h5>
          <p className="mb-3 font-normal text-neutral-400">{description}</p>
          {subDescription.map((subDesc, index) => (
            <p key={index} className="mb-3 font-normal text-neutral-400">
              {subDesc}
            </p>
          ))}
          <div className="flex justify-end mt-6">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-medium cursor-pointer hover-animation"
            >
              View Project <img src="assets/arrow-up.svg" className="size-4" alt="arrow" />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;