import { useAtom } from "jotai";
import React from "react";
import { useNavigate } from "react-router-dom";
import { contentAtom } from "../content.context";

const Home = () => {
  const navigate = useNavigate();
  const [content, setContent] = useAtom(contentAtom);
  const [isWarningText, setIsWarningText] = React.useState(false);

  const handleClickGetMbtiButton = () => {
    if (!content.trim()) return setIsWarningText(true);
    navigate("/result");
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) setIsWarningText(false);
    setContent(e.target.value);
  };

  return (
    <div className="w-full h-[100vh] flex items-center justify-center flex-col gap-8 px-96">
      <div className="flex items-center justify-center gap-4 w-full">
        <img src="fluent-emoji.gif" alt="emoji" className=" w-24 h-24" />
        <span className="text-7xl font-bold text-white title">
          문장으로 알아보는 MBTI
        </span>
      </div>
      <input
        onChange={handleContentChange}
        value={content}
        className="title w-full h-8 bg-transparent border-b-[3px] border-solid border-white outline-none px-4 py-6 text-3xl font-extrabold text-white"
      />
      <button
        onClick={handleClickGetMbtiButton}
        className="title text-3xl border-none rounded-xl bg-blue-500 py-3 px-6 text-white"
      >
        결과 알아보기
      </button>
      <div className="infinite-scroll-container flex gap-4">
        <img src="cursor.png" alt="cursor" className="w-6" />
        <span className="text-2xl title text-white">클릭하기!!!</span>
      </div>
      {isWarningText && (
        <span className="title text-2xl text-red-800 absolute mt-96">
          내용을 입력해주세요!!
        </span>
      )}
    </div>
  );
};

export default Home;
