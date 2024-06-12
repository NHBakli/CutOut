"use client";

import { Component } from "@/components/FileInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const RemoveBackgroundPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultRemoveBg, setRemoveBg] = useState<string | null>(null);

  const router = useRouter();

  const handleFileChange = (file: File) => {
    setResultImageUrl(URL.createObjectURL(file));
    setSelectedFile(file);
  };

  const handleRemoveBg = async () => {
    if (!selectedFile) return;
    setIsLoading(true);

    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", selectedFile);

    try {
      const axios = require("axios");

      const response = await axios({
        method: "post",
        url: "https://api.remove.bg/v1.0/removebg",
        data: formData,
        responseType: "arraybuffer",
        headers: {
          "Content-Type": "multipart/form-data",
          "X-Api-Key": "Doc4QQ9w3LoUT1ejdxRPgDxe",
        },
        encoding: null,
      });
      setIsLoading(false);

      if (response.status !== 200) {
        console.error("Erreur :", response.status, response.statusText);
        return;
      }

      const resultImageUrl = URL.createObjectURL(new Blob([response.data]));
      setRemoveBg(resultImageUrl);
    } catch (error) {
      console.error("La requête a échoué :", error);
    }
  };

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = resultRemoveBg!;
    downloadLink.download = "remove_bg.png";
    downloadLink.click();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`flex flex-col items-center justify-center mt-40 space-y-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-3xl w-2/5 pb-6 ${
          resultRemoveBg ? `mt-20` : ``
        }`}
      >
        <h1
          className={` ${
            resultRemoveBg ? `hidden` : `text-2xl font-bold mb-6 pt-5`
          }`}
        >
          Remove image background
        </h1>
        <Component
          onFileChange={handleFileChange}
          className={`${resultRemoveBg ? `hidden` : ``}`}
        />
        <button
          onClick={handleRemoveBg}
          disabled={!selectedFile}
          className={`px-4 py-2 bg-customPurple text-white rounded disabled:bg-gray-400 ${
            !selectedFile ? "cursor-not-allowed" : "hover:bg-customPurpleHover"
          } ${resultRemoveBg ? `hidden` : ``}`}
        >
          {isLoading ? "Loading..." : "Remove background"}
        </button>
        {resultRemoveBg ? (
          <div className="relative">
            <Image
              src={resultRemoveBg}
              alt="Image result"
              width={500}
              height={500}
              className="rounded-lg"
            />
            <div
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 transition-opacity duration-300 bg-black bg-opacity-50 hover:opacity-100 cursor-pointer"
              onClick={handleDownload}
            >
              <FontAwesomeIcon
                icon={faDownload}
                className="text-white text-3xl"
              />
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default RemoveBackgroundPage;
