import { PhotoSizeSelectActual } from "@mui/icons-material";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import useSWR, { mutate, trigger } from "swr";
import { modalState } from "../atoms/modalAtom";
import FileBase64 from "react-file-base64";
import Resizer from "react-image-file-resizer";
import axios from "axios";
const Form = () => {
  const [photoUrl, setPhotoUrl] = useState("");
  const [userInfo, setUserInfo] = useState([]);
  console.log("userInfo: ", userInfo);
  const [state, setState] = useState({
    value: "",
    rows: 2,
    minRows: 2,
    maxRows: 10,
  });
  const fetcher = async (...args) => {
    const response = await fetch(...args, {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    return responseData;
  };

  const handleImage = (event) => {
    console.log("event: ", event);
    setUserInfo({ ...userInfo, file: event.target.files[0] });
  };
  //compress image file on runtime (WEBP).
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1200,
        630,
        "WEBP",
        85,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  const { data: getData, error } = useSWR("/api/posts", fetcher);

  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const { data } = useSession();
  const uploadPost = async (e) => {
    e.preventDefault();

    const image = await resizeFile(userInfo?.file);
    const postObject = {
      input: state.value,
      photoUrl: image,
      username: data?.user?.name,
      email: data?.user?.email,
      userImg: data?.user?.image,
      createdAt: new Date().toString(),
    };

    console.log("Final object", postObject);

    await mutate("/api/posts", [...getData, postObject], false);
    const response = await axios.post("/api/posts", postObject, {
      onUploadProgress: (ProgressEvent) => {
        console.log(
          "Progress uploaded",
          Math.round((ProgressEvent.loaded / ProgressEvent.total) * 100)
        );
      },
    });
    // const responseData = await response.json();
    mutate("/api/posts");
    console.log("responseData: ", response);
    setModalOpen(false);
  };

  const handleChange = (event) => {
    const textareaLineHeight = 24;
    const { minRows } = state;

    const previousRows = event.target.rows;

    event.target.rows = minRows; // reset number of rows in textarea

    const scrollHeight = event.target.scrollHeight;

    const currentRows = event.target.scrollHeight / textareaLineHeight;

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    // if (currentRows >= maxRows) {
    //   event.target.rows = maxRows;
    //   event.target.scrollTop = event.target.scrollHeight;
    // }

    setState((prev) => ({
      ...prev,
      value: event.target.value,
      rows: currentRows,
    }));
  };

  return (
    <form className='flex flex-col relative space-y-2 text-black/80 dark:text-white/75 px-4 pb-3'>
      <div>
        <textarea
          placeholder='What do you want to talk about?'
          className={`bg-transparent focus:outline-none dark:placeholder-white/75 hideScrollbar resize-none max-h-48 w-full h-auto overflow-auto`}
          value={state.value}
          onChange={handleChange}
          rows={state.rows}
        />
      </div>
      <div className='flex items-center justify-between'>
        <input
          type='file'
          className='bg-transparent focus:outline-none truncate w-full max-w-xs md:max-w-sm dark:placeholder-white/75'
          onChange={handleImage}
          name='upload_file'
          id='actual-btn'
          onProgress={(e) => console.log("checking progress", e)}
          hidden
        />
        {/* <button className="inputButton group" for="actual-btn">
          <PhotoSizeSelectActual className="text-blue-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Photo</h4>
        </button> */}
        <label for='actual-btn'>
          <div className='inputButton group'>
            <PhotoSizeSelectActual className='text-blue-400' />
            <h4 className='opacity-80 group-hover:opacity-100'>Add a photo</h4>
          </div>
        </label>

        <button
          className='font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1'
          disabled={!state.value.trim() && !photoUrl.trim()}
          type='submit'
          onClick={uploadPost}>
          Post
        </button>
      </div>
    </form>
  );
};

export default Form;
