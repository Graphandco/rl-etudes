export default function LastBlocks({ lastBlocks }) {
   return (
      <section className="grid grid-cols-1 md:grid-cols-2" id="last-blocks">
         <div className="text-white bg-[url(/city-night.webp)] bg-cover bg-fixed relative isolate before:content-[''] before:absolute before:inset-0 before:bg-[#0f1159] before:opacity-70 before:-z-10">
            <div className="max-w-[640px] ml-auto py-[3vw] px-5 md:px-[3vw] lg:px-[5vw] prose">
               <div
                  dangerouslySetInnerHTML={{
                     __html: lastBlocks.block1,
                  }}
                  className="presentation-last-block-1"
               />
            </div>
         </div>
         <div className="bg-accent">
            <div className="max-w-[640px] ml-auto py-[3vw] px-5 md:px-[3vw] lg:px-[5vw] prose">
               <div
                  dangerouslySetInnerHTML={{
                     __html: lastBlocks.block2,
                  }}
               />
            </div>
         </div>
      </section>
   );
}
