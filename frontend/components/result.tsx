import { predictArray } from "@/app/Questions/Qna/data";
export default function Result({ prop }: { prop: any }) {
  console.log(prop)
  return (
    <>
      <div>
        {prop.length != 0
          ? prop.map((num: any, index: any) => (
              <div key={index}>{predictArray[num]}{prop.pop[num]}</div>
            ))
          : ""}
          {prop=[]}
      </div>
    </>
  );
}
