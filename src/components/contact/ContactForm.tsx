"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { z, ZodError } from "zod";

// Zod şemamızı tanımlıyoruz.
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Adınız ve soyadınız boş bırakılamaz." }),
  email: z.string().email({ message: "Geçerli bir e-posta adresi girin." }),
  message: z
    .string()
    .min(1, { message: "Mesajınız boş bırakılamaz." })
    .max(250, { message: "Mesajınız en fazla 250 karakter olmalıdır." }),
});

// Zod şemasından form verileri için bir tip çıkarıyoruz.
type ContactFormType = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  // Form verilerini bu tipe göre saklıyoruz.
  const [formData, setFormData] = useState<ContactFormType>({
    name: "",
    email: "",
    message: "",
  });

  // Validasyon hatalarını saklamak için tipi `Record<string, string>` olarak belirledik.
  // Boş bir nesneyle başlarken, TypeScript'e bu nesnenin beklenen tipte olduğunu bildirmek için tip dönüştürmesi (type casting) yaptık.
  const [errors, setErrors] = useState<Record<keyof ContactFormType, string>>(
    {} as Record<keyof ContactFormType, string>
  );

  // Mesaj alanındaki kalan karakter sayısını hesaplamak için state kullanıyoruz.
  const maxMessageLength = 250;
  const remainingCharacters = maxMessageLength - formData.message.length;

  // Input alanları değiştiğinde veriyi güncelleyen fonksiyon.
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as keyof ContactFormType]: value,
    });
  };

  // Form gönderildiğinde çalışan fonksiyon.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Zod şemasına göre veriyi validasyondan geçiriyoruz.
      contactFormSchema.parse(formData);
      // Validasyon başarılıysa, hataları temizliyoruz.
      // Yine tip dönüştürmesi kullanarak boş nesneyi doğru tipe atadık.
      setErrors({} as Record<keyof ContactFormType, string>);
      console.log("Form verileri başarıyla gönderildi:", formData);
      // İsteğe bağlı olarak formu sıfırlayabilirsiniz.
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      // Validasyon başarısız olursa ve hata bir ZodError ise
      if (err instanceof ZodError) {
        // Hataları kaydetmek için yeni bir nesne oluşturuyoruz.
        const newErrors: Record<keyof ContactFormType, string> = {
          message: "",
          name: "",
          email: "",
        };
        // Hata nesnesindeki `issues` propertysini döngüye alıyoruz.
        // Zod, hataları `issues` adında bir dizi içinde tutar.
        err.issues.forEach((issue) => {
          // Her bir hatayı doğru key ve mesajla `newErrors` nesnesine ekliyoruz.
          newErrors[issue.path[0] as keyof ContactFormType] = issue.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg ">
      <h2 className="text-2xl font-semibold text-amber-300 mb-6">
        Bize Mesaj Gönderin
      </h2>
      <form className="space-y-5" onSubmit={handleSubmit}>
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
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-amber-500 transition-colors"
            placeholder="Adınızı girin"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-2">{errors.name}</p>
          )}
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
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-amber-500 transition-colors"
            placeholder="E-posta adresinizi girin"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-2">{errors.email}</p>
          )}
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
            value={formData.message}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 focus:border-amber-500 transition-colors resize-y"
            placeholder="Mesajınızı buraya yazın..."
          ></textarea>
          <div className="flex justify-between text-gray-400 text-xs mt-1">
            <span></span>
            <span>
              {remainingCharacters} / {maxMessageLength}
            </span>
          </div>
          {errors.message && (
            <p className="text-red-500 text-xs ">{errors.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Mesajı Gönder
        </button>
      </form>
    </div>
  );
}
