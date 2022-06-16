import React from "react";
import PlusIcon from "@heroicons/react/solid/PlusCircleIcon";

export default function EmptyRenderer() {
  return (
    <div className="pt-10">
      <button
        type="button"
        className="text-indigo-600 relative block w-full h-96 border-2 border-gray-300 border-dashed rounded-lg p-12 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <PlusIcon className="w-20 h-20 mx-auto" />
        <span className="mt-2 block text-sm font-medium text-gray-900">
          You can drag and drop components here.
        </span>
      </button>
    </div>
  );
}
