"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { links } from "@/backendRoute";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Stepper from "@/components/Stepper";
import { QuestFormat } from "@/app/Questions/Qna/data";
import { Loading } from "./Loading";

interface PagesProps {
  next: number;
  setNext: Dispatch<SetStateAction<number>>;
  qna: QuestFormat[];
  setQna: Dispatch<SetStateAction<QuestFormat[]>>;
  loading : boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export default function Pages({
  next,
  setNext,
  qna,
  setQna,
  loading,
  setLoading
}: PagesProps) {
  
  const [error, setError] = useState<Record<number, boolean>>({});
  function handleNext() {
    if (next + 5 <= qna.length) setNext((next) => next + 5);
  }
  function handlePrevious() {
    if (next - 5 >= 0) setNext((next) => next - 5);
  }

  function handleSubmit(ans: QuestFormat[]) {
    setLoading(true);
    try {
      axios
        .post(
          `${links.quest}`,
          {
            data: ans,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(
            "Data sent successfully:",
            response.data.invalidAtIndex
          );
          console.log("shail");
          console.log(response.data.invalidInput);
          console.log("hlo")
          console.log(response.data.prediction)
          console.log("hi")
          console.log(response)

          if (response.data.invalidInput) {
            toast.error(
              `Invalid input found at ${response.data.invalidAtIndex}`
            );
          } else {
            toast.success("Verified successfully");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error sending data:", error);
          setLoading(false);
          toast.error("Something went wrong ");
        });
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      <Toaster />
      
      {qna.slice(next, next + 5).map((q, id) => (
        <div key={q.id} className="pt-4">
          <p>{q.quest}</p>
          <p className="text-xs text-red-200 ml-3 mt-1">
            Rate your self between 0 to 10
          </p>
          <div className="flex justify-center">
            <input
              className={` ${
                error[q.id]
                  ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                  : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }`}
              type="number"
              min={0}
              max={10}
              placeholder="Rate yourslef between 0 to 10"
              value={q.ans}
              onChange={(event) => {
                const value = Number(event.target.value);

                setError((prevErrors) => ({
                  ...prevErrors,
                  [q.id]: value > 10,
                }));

                
                setQna((quet) =>
                  quet.map((u) =>
                    u.id === q.id
                      ? {
                          ...u,
                          ans: Number(event.target.value),
                        }
                      : u
                  )
                );
              }}
            />
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        {next >= 10 ? (
          <button
            onClick={() => handleSubmit(qna)}
            className={`mt-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
              ${
                Object.values(error).some((err) => err)
                  ? "text-gray-500 bg-gray-300 cursor-not-allowed dark:bg-gray-700"
                  : "text-center  text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              }`}
            disabled={Object.values(error).some((err) => err)}
          >
            submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            className={`mt-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
              ${
                Object.values(error).some((err) => err)
                  ? "text-gray-500 bg-gray-300 cursor-not-allowed dark:bg-gray-700"
                  : "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              }`}
            disabled={Object.values(error).some((err) => err)}
          >
            next
          </button>
        )}
        {next >= 5 ? (
          <button
            onClick={handlePrevious}
            className={`
              mt-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
              ${
                Object.values(error).some((err) => err)
                  ? "text-gray-500 bg-gray-300 cursor-not-allowed dark:bg-gray-700"
                  : " text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800"
              }`}
            disabled={Object.values(error).some((err) => err)}
          >
            previous
          </button>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
