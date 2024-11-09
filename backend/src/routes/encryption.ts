export async function generateKey(
  password: string,
  saltLength: number
) {
  const encoder = new TextEncoder();
  const salt = generateSalt(saltLength);
  const combined = new Uint8Array([
    ...encoder.encode(password),
    ...salt,
  ]);
  return await crypto.subtle.importKey(
    "raw",
    combined,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signPassword (
  enteredPassword: string,
  saltLength: number
) {
  const key = await generateKey(
    enteredPassword,
    saltLength
  );
  //console.log("keysign",key);
  try {
    const encoder = new TextEncoder();
    const signature = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(enteredPassword)
    );
    const hashedPassword = await btoa(
      String.fromCharCode(...new Uint8Array(signature))
    );
    return hashedPassword;
  } catch (err) {
    return err;
  }
}

export async function verifyPassword(
  enteredPassword: string,
  storedSignature: string,
  saltLength: number
) {
  const key = await generateKey(
    enteredPassword,
    saltLength
  );
  //console.log("keyverify",key);
  try {
    const encoder = new TextEncoder();
    const signatureBuffer = Uint8Array.from(
      atob(storedSignature),
      (c) => c.charCodeAt(0)
    ).buffer;
    //console.log("signatureBuffer",signatureBuffer)
    return await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBuffer,
      encoder.encode(enteredPassword)
    );
  } catch (err) {
    return err;
  }
}

function generateSalt(length: number) {
  const array = new Uint8Array(length);
  return array
}
