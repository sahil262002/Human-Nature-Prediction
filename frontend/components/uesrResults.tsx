import { predictArray } from "@/app/Questions/Qna/data";
import { Span } from "next/dist/trace";

interface OutputFormat {
  outputByModel: number;
}

interface Format {
  id: string;
  outputs: OutputFormat[]; // Expecting outputs to be an array of objects with `outputByModel`
}

export default function Result({
  score,
}: {
  score: Format[];
}) {
  function handle(get: Format["outputs"]) {
    if (Array.isArray(get)) {
      // Log all predictions
      get.forEach((item) => {
        console.log(predictArray[item.outputByModel]);
      });

      return get.map((item) => (
        <span key={item.outputByModel}>
          <span>
            {predictArray[item.outputByModel]}
            {", "}
          </span>
        </span>
      ));
    } else {
      return <span>No results available</span>;
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <p className="text-2xl font-mono font-semibold">
          Records
        </p>
      </div>
      {score.reverse().map((get) => (
        <div key={get.id} className="p-4 border m-2">
          <p>ID : {get.id}</p>
          {/* <div className="flex flex-col items-center">
            <div className="text-center">Nature:</div>
            <div className="text-center">
              {handle(get.outputs)}
            </div>
          </div> */}
          <span>Nature : {handle(get.outputs)}</span>
        </div>
      ))}
    </>
  );
}
