import React from "react";
import {
  DesktopComputerIcon,
  DeviceMobileIcon,
  DeviceTabletIcon,
} from "@heroicons/react/solid";

const ViewIcons = [
  {
    icon: <DesktopComputerIcon className="h-6 w-6" />,
    name: "desktop",
  },
  {
    icon: <DeviceTabletIcon className="h-6 w-6" />,
    name: "tablet",
  },
  {
    icon: <DeviceMobileIcon className="h-6 w-6" />,
    name: "mobile",
  },
];

export default function DeviceToolbar({setDeviceView}) {
  return (
    <div className="rounded border px-3">
      {ViewIcons.map((icon) => {
        return (
          <button
            key={icon.name}
            className="bg-white p-1  text-gray-400 hover:text-gray-500 focus:outline-none "
            onClick={() => {setDeviceView(icon.name)}}
          >
            {icon.icon}
          </button>
        );
      })}
    </div>
  );
}
