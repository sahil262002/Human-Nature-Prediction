export default function Details({ name, email }: { name: string , email: string }) {
  return (
    <>
      <div className="ml-4">
        <div className="flex ">
          <div className="mt-5">
          <div className=""><p className="text-lg font-semibold font-serif ">Name :  {name}</p></div>
          <div><p className="text-lg font-semibold font-serif ">Email : {email}</p></div>
          
          </div>
        </div>
      </div>
    </>
  );
}
