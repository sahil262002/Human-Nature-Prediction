"use client";
import { useState } from "react";
import { QuestFormat, data } from "./data";
import axios from "axios";

export default function QnA() {
  const [qna, setQna] = useState<QuestFormat[]>(data);
  const [next, setNext] = useState(0);
  const [submit, setSubmit] = useState(0);
  function handleNext() {
    if (next + 5 <= qna.length) setNext((next) => next + 5);
  }
  function handlePrevious() {
    if (next - 5 >= 0) setNext((next) => next - 5);
  }
  async function handleSubmit() {
    await axios.post("/");
  }
  return (
    <>
      <div className="h-screen w-screen flex-col content-center">
        <div className="flex justify-around">
          <div className="">
            {qna.slice(next, next + 5).map((q, id) => (
              <div key={q.id} className="mt-4">
                <p>{q.quest}</p>
                <p className="text-xs text-red-200 ml-3 mt-1">
                  Rate your self between 0 to 10
                </p>
                <div className="flex justify-center">
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                    type="number"
                    min={0}
                    max={10}
                    placeholder="Rate yourslef between 0 to 10"
                    value={q.ans}
                    onChange={(event) =>
                      setQna((quet) =>
                        quet.map((u) =>
                          u.id === q.id
                            ? {
                                ...u,
                                ans: Number(
                                  event.target.value
                                ),
                              }
                            : u
                        )
                      )
                    }
                  />
                </div>
              </div>
            ))}
            <div className="flex justify-center">
              {next >= 10 ? (
                <button
                  onClick={handleSubmit}
                  className="mt-4 text-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  submit
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className=" mt-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  next
                </button>
              )}
              {next >= 5 ? (
                <button
                  onClick={handlePrevious}
                  className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  previous
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
