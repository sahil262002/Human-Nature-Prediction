import axios from "axios";

interface data {
  name?: string;
  email: string;
  password: string;
}
export async function ButtonBack({
  userInputs,
  link,
  routeName,
}: {
  userInputs: data;
  link: string;
  routeName: string;
}) {
  async function sendDataToBackend() {
    const sendData = await axios.post(`${link}`, {
      name: userInputs.name,
      email: userInputs.email,
      password: userInputs.password,
    });
  }
  return (
    <>
      <button onClick={sendDataToBackend}>{routeName}</button>
    </>
  );
}
