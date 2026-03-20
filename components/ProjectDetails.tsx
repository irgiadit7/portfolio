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
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-[100dvh] p-4 sm:p-6 overflow-hidden backdrop-blur-sm bg-black/40">
      
      <motion.div
        className="relative w-full max-w-2xl border shadow-sm rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 max-h-full overflow-y-auto"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <button
          onClick={closeModal}
          className="absolute z-10 p-2 rounded-full top-4 right-4 cursor-pointer bg-midnight/80 backdrop-blur-md hover:bg-gray-500 text-white"
        >
          <img src="assets/close.svg" className="w-6 h-6" alt="close" />
        </button>

        <img src={image} alt={title} className="w-full rounded-t-2xl" />

        <div className="p-5 sm:p-6">
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