"use client";

import { FileInput, Label } from "flowbite-react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ComponentProps {
  onFileChange: (file: File) => void;
  className: string;
}

export function Component({ onFileChange, className }: ComponentProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const router = useRouter();
  const { data } = useSession();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (data) {
      if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        setSelectedFile(file);
        onFileChange(file);
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <div
      className={`${
        className
          ? `${className}`
          : `flex w-full items-center justify-center space-x-4 `
      }`}
    >
      <Label
        htmlFor="dropzone-file"
        className="flex h-64 w-1/2 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-customPurple hover:bg-customPurpleHover"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-white ">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-white">PNG, JPG (MAX. 800x400px)</p>
        </div>
        <FileInput
          id="dropzone-file"
          className="hidden"
          onChange={handleFileChange}
        />
      </Label>
      {selectedFile && (
        <div className="flex flex-col items-center w-auto">
          <Image
            src={URL.createObjectURL(selectedFile)}
            alt="Selected Image"
            width={350}
            height={350}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
