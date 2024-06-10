"use client";

import { Component } from "@/components/FileInput";
import { useState } from "react";

const RemoveBackgroundPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resultImageUrl, setResultImageUrl] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  const handleRemoveBg = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("size", "auto");
    formData.append("image_file", selectedFile);

    try {
      const response = await fetch("https://api.remove.bg/v1.0/removebg", {
        method: "POST",
        headers: {
          "X-Api-Key": "i1UhkToJ6qP6Gi9y2WHwAPj6",
        },
        body: formData,
      });

      if (response.status !== 200) {
        console.error("Error:", response.status, response.statusText);
        return;
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setResultImageUrl(imageUrl);
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-40 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Remove Background Image</h1>
      <Component onFileChange={handleFileChange} />
      <button
        onClick={handleRemoveBg}
        disabled={!selectedFile}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        Remove Background
      </button>
      {resultImageUrl && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Result:</h2>
          <img src={resultImageUrl} alt="Result with background removed" />
        </div>
      )}
    </div>
  );
};

export default RemoveBackgroundPage;
