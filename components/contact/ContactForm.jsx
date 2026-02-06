"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
// import { SiMinutemailer } from "react-icons/si";
import { AnimatePresence, motion } from "framer-motion";
// import FadeInOnView from "@/components/ui/FadeInOnView";
// import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";

export default function ContactForm() {
   const [isEmailSent, setIsEmailSent] = useState(false);

   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
   } = useForm();

   const onSubmit = async (data) => {
      try {
         const res = await fetch("/api/send", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         });

         if (res.ok) {
            setIsEmailSent(true);
            reset();
         } else {
            console.error("Erreur serveur");
         }
      } catch (error) {
         console.error("Erreur réseau", error);
      }
   };

   return (
      <AnimatePresence mode="wait">
         {isEmailSent ? (
            <motion.div
               key="success"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.4, ease: "easeInOut" }}
               className=" bg-white text-primary self-center flex flex-col items-center justify-center p-6 rounded-lg text-center"
            >
               <div className="text-3xl font-normal">Merci !</div>
               <div>Votre message a bien été envoyé.</div>
               {/* <CheckCircleIcon className="w-10 h-10 text-green-500 mt-5" /> */}
            </motion.div>
         ) : (
            <motion.form
               key="form"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.4, ease: "easeInOut" }}
               onSubmit={handleSubmit(onSubmit)}
               // onSubmit={testSubmit}
               className="max-w-xl w-full bg-white p-5 sm:p-10 rounded-lg grid items-center gap-3"
            >
               {/* <FadeInOnView className="space-y-8"> */}
               <div className="pb-0 mb-0">
                  <label htmlFor="name" className="sr-only">
                     Votre nom
                  </label>
                  <input
                     type="text"
                     id="name"
                     placeholder="Votre nom"
                     {...register("name", { required: true })}
                     className="block w-full text-sm border border-background-light rounded-lg px-3 p-4 focus:border-black outline-none"
                  />
                  {errors.name && (
                     <p className="text-sm text-red-500">Ce champ est requis</p>
                  )}
               </div>

               <div>
                  <label htmlFor="email" className="sr-only">
                     Email
                  </label>
                  <input
                     type="email"
                     id="email"
                     placeholder="Votre email"
                     {...register("email", { required: true })}
                     className="block w-full text-sm border border-background-light rounded-lg px-3 p-4 focus:border-black outline-none"
                  />
                  {errors.email && (
                     <p className="text-sm text-red-500">Ce champ est requis</p>
                  )}
               </div>

               <div>
                  <label htmlFor="phone" className="sr-only">
                     Téléphone
                  </label>
                  <input
                     type="text"
                     id="phone"
                     placeholder="Votre téléphone"
                     {...register("phone", { required: true })}
                     className="block w-full text-sm border border-background-light rounded-lg px-3 p-4 focus:border-black outline-none"
                  />
                  {errors.phone && (
                     <p className="text-sm text-red-500">Ce champ est requis</p>
                  )}
               </div>

               <div className="pb-0 mb-0">
                  <label htmlFor="message" className="sr-only">
                     Message
                  </label>
                  <textarea
                     id="message"
                     rows="5"
                     placeholder="Votre message"
                     {...register("message", { required: true })}
                     className="block w-full text-sm border border-background-light rounded-lg px-3 p-4 pb-0 focus:border-black outline-none"
                  ></textarea>
                  {errors.message && (
                     <p className="text-sm text-red-500">Ce champ est requis</p>
                  )}
               </div>

               <div className="flex items-center">
                  <input
                     id="privacy"
                     type="checkbox"
                     {...register("privacy", { required: true })}
                     className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded  mt-1 relative"
                  />
                  <label
                     htmlFor="privacy"
                     className="ml-2 mt-1 text-sm text-gray-600"
                  >
                     En cochant cette case, j'accepte les termes de la{" "}
                     <Link
                        href="/politique-de-confidentialite"
                        rel="noopener noreferrer"
                        className="text-primary underline hover:text-primary/80"
                     >
                        politique de confidentialité
                     </Link>
                  </label>
               </div>
               {errors.privacy && (
                  <p className="text-sm text-red-500">
                     Vous devez accepter la politique de confidentialité
                  </p>
               )}

               <Button
                  type="submit"
                  disabled={isSubmitting}
                  // icon={<SiMinutemailer />}
                  size="lg"
               >
                  {isSubmitting ? "Envoi en cours..." : "Envoyer"}
               </Button>
               {/* </FadeInOnView> */}
            </motion.form>
         )}
      </AnimatePresence>
   );
}
