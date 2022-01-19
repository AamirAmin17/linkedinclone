import React, { useState } from "react";

const Form = () => {
  const [input, setInput] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [textAreaHeight, setTextAreaHeight] = useState(0);
  console.log(textAreaHeight);

  return (
    <form className="flex flex-col relative space-y-2 text-black/80 dark:text-white/75 px-4 ">
      <textarea
        placeholder="What do you want to talk about?"
        className="bg-transparent focus:outline-none dark:placeholder-white/75 resize-none hideScrollbar"
        value={input}
        onKeyUp={(e) => setTextAreaHeight(e.target.scrollHeight)}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add a photo URL (optional)"
        className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75"
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />
    </form>
  );
};

export default Form;
