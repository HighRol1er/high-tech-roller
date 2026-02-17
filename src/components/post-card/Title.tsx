export const Title = ({ title }: { title: string }) => {
  return (
    <div className='relative h-6 mb-1 '>
      <h3 className='font-semibold line-clamp-1 break-all group-hover:invisible'>{title}</h3>
      <h3
        className='group-hover:underline
        absolute top-0 left-0 w-[calc(100%+1rem)] rounded-lg z-10 font-semibold wrap-break-word whitespace-normal invisible group-hover:visible bg-card p-2 -ml-2 -mt-2'
      >
        {title}
      </h3>
    </div>
  );
};
