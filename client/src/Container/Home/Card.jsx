import React from "react";

const Card = () => {
  return (
    <div class="flex flex-col md:flex-row gap-5 justify-center items-center">
      <button class="p-3 border border-black text-2xl uppercase rounded-lg rounded-tr-none rounded-bl-none outline-none shadow-lg hover:shadow-xl hover:text-white hover:bg-black hover:rounded-none duration-200">
        Find a Room
      </button>
      <button class="p-3 border border-black text-2xl uppercase rounded-lg rounded-tl-none rounded-br-none outline-none shadow-lg hover:shadow-xl hover:text-white hover:bg-black hover:rounded-none duration-200">
        List a Room
      </button>
    </div>
  );
};

export default Card;
