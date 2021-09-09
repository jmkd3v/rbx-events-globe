function HoverItem(props) {
  return (
    <div className="font-sans max-w-sm mx-auto bg-white dark:bg-black rounded-xl shadow-md p-4 flex space-x-4 items-center">
      {(props.data.logo.thumbnail_url && (
        <img
          class="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100"
          width="144"
          height="144"
          src={props.data.logo.thumbnail_url}
        />
      )) ||
        ""}
    </div>
  );
}

export default HoverItem;
