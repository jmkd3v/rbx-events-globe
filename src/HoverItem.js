function HoverItem(props) {
  return (
    <div className="font-sans p-4 flex space-x-4 bg-white dark:bg-black rounded-xl shadow-md">
      {props.data.logo.thumbnail_url && (
        <img
          className="flex-none w-18 h-18 rounded-lg object-cover bg-gray-100"
          width="144"
          height="144"
          src={props.data.logo.thumbnail_url}
        />
      )}
      <div className="min-w-0 relative flex-auto sm:pr-20 lg:pr-0 xl:pr-20 w-auto">
        <h2 className="text-xl font-semibold text-black dark:text-white mb-0.5">
          {props.data.title}
        </h2>
        <dl className="flex flex-wrap text-sm font-medium whitespace-pre">
          <div>
            <dt className="sr-only">City</dt>
            <dd>{props.data.city}</dd>
          </div>
          <div>
            <dt className="sr-only">Country</dt>
            <dd>, {props.data.country}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default HoverItem;
