export default function LastBlocks({ lastBlocks }) {
   console.log(lastBlocks);
   return (
      <section className="grid grid-cols-1 md:grid-cols-2" id="last-blocks">
         <div className="bg-primary-900 text-white">
            <div className="max-w-[640px] ml-auto p-[5vw]">
               <div
                  dangerouslySetInnerHTML={{
                     __html: lastBlocks.block1,
                  }}
                  className="self-end"
               />
            </div>
         </div>
         <div className="bg-accent">
            <div className="max-w-[640px] ml-auto p-[5vw]">
               <div
                  dangerouslySetInnerHTML={{
                     __html: lastBlocks.block2,
                  }}
                  className="self-end"
               />
            </div>
         </div>
      </section>
   );
}
