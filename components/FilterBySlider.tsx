"use client";

import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

export default function FilterBySlider() {
  return (
    <div className="mt-4 border-t pt-4">
      <Slider
        defaultValue={[50]}
        max={100}
        step={1}
        className={"w-[100%] my-4"}
      />
      <div className="flex items-center gap-x-5">
        <p className="text-sm">Price: ৳200 — ৳2,200</p>
        <Button size="sm">Filter</Button>
      </div>
    </div>
  );
}
