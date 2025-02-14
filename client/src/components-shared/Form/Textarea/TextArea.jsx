export default function TextArea({ label, className, ...props }) {
  return (
    <div
      className="relative border border-[#66A5CA] rounded-md h-20 border-solid"
      aria-disabled={props.disabled}
    >
      <label
        htmlFor={props.name}
        className="block absolute text-xs top-0 -mt-2 left-2 bg-white px-2"
      >
        {label}
      </label>
      <textarea
        id={props.name}
        className="border-none outline-none mt-2 pl-4 w-full pr-4"
        {...props}
      ></textarea>
    </div>
  );
}
