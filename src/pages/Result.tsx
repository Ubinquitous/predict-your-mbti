import { useAtomValue } from "jotai";
import { contentAtom } from "../content.context";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PuffLoader } from "react-spinners";

const instance = axios.create({
  baseURL: "https://05ad-34-125-176-24.ngrok-free.app",
  withCredentials: false,
});

const Result = () => {
  const [mbtiResult, setMbtiResult] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState(false);
  const content = useAtomValue(contentAtom);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (content) {
      (async () => {
        const { mbti } = (
          await instance.post(
            "/mbti",
            { content },
            { headers: { "ngrok-skip-browser-warning": "69420" } }
          )
        ).data;
        setMbtiResult(
          Object.entries(mbti)
            .sort(([, valueA]: any, [, valueB]: any) => valueB - valueA)
            .map(([key, value]) => ({ key, value }))
        );
        setIsLoading(true);
      })();
    }
  }, [content]);
  return (
    <div className="w-full h-[100vh] flex items-center pt-12 gap-6 flex-col">
      <div className="flex items-center justify-center gap-4 w-full">
        <img src="result-emoji.gif" alt="emoji" className=" w-24 h-24" />
        <span className="text-7xl font-bold text-white title">
          입력하신 문장의 결과는요...
        </span>
      </div>
      <button
        onClick={() => navigate("/")}
        className="title text-3xl border-none rounded-xl bg-blue-500 py-3 px-6 text-white"
      >
        다시하기!
      </button>
      <div className="w-[70vw] h-60 flex-wrap flex justify-between gap-10">
        {!isLoading ? (
          <div className="w-full flex items-center justify-center">
            <PuffLoader color="white" size={60} />
          </div>
        ) : (
          mbtiResult.map((mbti: any, index: number) => (
            <div className="w-[22%] flex flex-col">
              <span className="text-4xl title text-white">
                {index + 1}위: {mbti.key}
              </span>
              <span className="title text-2xl font-regular text-white">
                {mbti.value.toFixed(3)}만큼 유사해요!
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Result;
