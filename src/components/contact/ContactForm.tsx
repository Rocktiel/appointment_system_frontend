import React from "react";

export default function ContactForm() {
  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-amber-300 mb-6">
        Bize Mesaj Gönderin
      </h2>
      <form className="space-y-5">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-300 text-sm font-bold mb-2"
          >
            Adınız Soyadınız
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-amber-500 transition-colors"
            placeholder="Adınızı girin"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-gray-300 text-sm font-bold mb-2"
          >
            E-posta Adresiniz
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-amber-500 transition-colors"
            placeholder="E-posta adresinizi girin"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-gray-300 text-sm font-bold mb-2"
          >
            Mesajınız
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-amber-500 transition-colors resize-y"
            placeholder="Mesajınızı buraya yazın..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors"
        >
          Mesajı Gönder
        </button>
      </form>
    </div>
  );
}
