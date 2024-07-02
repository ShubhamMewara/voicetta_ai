import { getPhone } from "@/lib/actions";
import React from "react";

const PhoneNumbers = async () => {
  const numbers = await getPhone();
  return (
    <div className="flex flex-col bg-[#0e0e0e] overflow-y-auto h-[100vh]">
      <main className="flex-1 bg-[#ffffff07] text-white p-8 m-8 rounded-2xl mr-5">
        <h2 className="text-2xl font-bold mb-8">Phone Numbers</h2>
        <div className="grid grid-cols-2 gap-8">
          {numbers.map((number: any) => (
            <div
              key={number.id}
              className="bg-[#ffffff08] hover:bg-[#ffffff0e] duration-200 border border-white/5 rounded-2xl shadow-lg shadow-black/10 p-6 flex flex-col justify-between"
            >
              <p>Name: {number.name}</p>
              <p>Phone No: {number.number}</p>
              <p>Org Id : {number.orgId}</p>
              <p>Provider : {number.provider}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PhoneNumbers;
