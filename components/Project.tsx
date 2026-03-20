import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";

interface ProjectProps {
  title: string;
  description: string;
  subDescription: string[];
  href: string;
  image: string;
  setPreview: (image: string | null) => void;
}

const Project = ({
  title,
  description,
  subDescription,
  href,
  image,
  setPreview,
}: ProjectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="flex-wrap items-center justify-between py-10 space-y-14 sm:flex sm:space-y-0"
        onMouseEnter={() => setPreview(image)}
        onMouseLeave={() => setPreview(null)}
      >
        <p className="text-2xl w-full sm:w-auto">{title}</p>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1 cursor-pointer hover-animation shrink-0"
        >
          Read More
          <img src="assets/arrow-right.svg" className="w-5" alt="arrow" />
        </button>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      {isOpen && (
        <ProjectDetails
          title={title}
          description={description}
          subDescription={subDescription}
          image={image}
          href={href}
          closeModal={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Project;