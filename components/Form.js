import React, { useEffect, useState } from "react";

const Form = () => {
  const [input, setInput] = useState("");
  const [firstRender, setFirstRender] = useState(true);

  // const ref = React.useRef();
  // console.log("ref: ", ref.current);

  const [photoUrl, setPhotoUrl] = useState("");
  // const [textAreaHeight, setTextAreaHeight] = useState();

  const [state, setState] = useState({
    value: "",
    rows: 2,
    minRows: 2,
    maxRows: 10,
  });
  console.log(state.rows);

  const handleChange = (event) => {
    const textareaLineHeight = 24;
    const { minRows, maxRows } = state;
    console.log("minRows: ", minRows);

    const previousRows = event.target.rows;
    console.log("previousRows: ", previousRows);
    event.target.rows = minRows; // reset number of rows in textarea

    const scrollHeight = event.target.scrollHeight;
    console.log("scrollHeight: ", scrollHeight);

    const currentRows = event.target.scrollHeight / textareaLineHeight;

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    // if (currentRows >= maxRows) {
    //   event.target.rows = maxRows;
    //   event.target.scrollTop = event.target.scrollHeight;
    // }
    console.log("currentRows: ", currentRows);
    setState((prev) => ({
      ...prev,
      value: event.target.value,
      rows: currentRows,
    }));
  };
  // setInput(event.target.value);

  return (
    <form className='flex flex-col relative space-y-2 text-black/80 dark:text-white/75 px-4'>
      <div>
        <textarea
          // ref={ref}
          placeholder='What do you want to talk about?'
          className={`bg-transparent focus:outline-none dark:placeholder-white/75 hideScrollbar resize-none max-h-48 w-full h-auto overflow-auto`}
          // style={{ height: textAreaHeight }}
          value={state.value}
          onChange={handleChange}
          rows={state.rows}
        />
      </div>
      <input
        type='text'
        placeholder='Add a photo URL (optional)'
        className='bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75'
        value={photoUrl}
        onChange={(e) => setPhotoUrl(e.target.value)}
      />
    </form>
  );
};

export default Form;
