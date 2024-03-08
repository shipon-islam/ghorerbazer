import Image from "next/image";
import React from "react";

type PropType = {
  selected: boolean;
  item: string;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, item, onClick } = props;

  return (
    <div
      className={"embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <Image
        src={item}
        alt="thumb"
        width={200}
        height={200}
        onClick={onClick}
        className="embla-thumbs__slide__number"
      />
    </div>
  );
};
