import React from "react";
import getBlock from "../blocks";

export default function ComponentList({
  iconList,
  list,
  setList,
  theme,
  darkMode,
  handleScrollToLastElement,
}) {
  const onDragEnd = (block) => {
    setList(() => {
      const isComponentInList = list.includes(block);
      if (isComponentInList) {
        return list;
      } else {
        return [...list, block];
      }
    });
    handleScrollToLastElement();
  };

  return Object.entries(iconList).map(([type, icons, name]) => {
    return (
      <div className="blocks" key={type}>
        <div className="block-category">{type}</div>
        <div className="block-list">
          {Object.entries(icons).map((icon) => {
            const blockName = icon[0];
            const block = getBlock({ theme, darkMode })[type][blockName];
            const newBlock = {
              ...block,
              name: blockName,
            };
            return (
              <button
                draggable
                onDragEnd={() => onDragEnd(newBlock)}
                key={icon[0]}
                tabIndex="0"
                className="block-item"
                block-type={type}
                block-name={icon[0]}
              >
                {icon[1]}
              </button>
            );
          })}
        </div>
      </div>
    );
  });
}
