import React, { useState } from 'react'

const ReaderPage = () => {
  const [uid, setUid] = useState("Not connected");

  const connectSerial = async () => {
    try {
      // Ask user to select a serial port
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 });

      // Create a decoder for the stream
      const decoder = new TextDecoderStream();
      port.readable.pipeTo(decoder.writable);
      const reader = decoder.readable.getReader();

      // Read loop
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        if (value) {
          setUid(value.trim()); // Update UID in state
          console.log("UID:", value.trim());
        }
      }
    } catch (err) {
      console.error("Serial error:", err);
      setUid("Connection failed");
    }
  };

  return (
    <div className="p-4">
      <button onClick={connectSerial} className="bg-blue-500 text-white px-4 py-2 rounded">
        Connect to RFID
      </button>
      <p className="mt-2">Card UID: {uid}</p>
    </div>
  );
}

export default ReaderPage