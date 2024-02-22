/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export function BadgesSelector() {
  const [selected, setSelected] = useState(["verified"]);

  return (
    <ToggleGroup type="multiple" value={selected} onValueChange={setSelected}>
      <ToggleGroupItem value="verified">
        <img
          src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_65bde2aab77a4f2ab005f54ea73b8d47/default/light/3.0"
          alt="profile"
          className="size-6"
        />
      </ToggleGroupItem>
      <ToggleGroupItem value="cellbit-logo" disabled>
        <img
          src="https://placehold.co/24x24/f8fafc/f8fafc.png"
          alt="profile"
          className="size-6 rounded-full opacity-10"
        />
      </ToggleGroupItem>
      <ToggleGroupItem value="blood" disabled>
        <img
          src="https://placehold.co/24x24/f8fafc/f8fafc.png"
          alt="profile"
          className="size-6 rounded-full opacity-10"
        />
      </ToggleGroupItem>
      <ToggleGroupItem value="knowledge" disabled>
        <img
          src="https://placehold.co/24x24/f8fafc/f8fafc.png"
          alt="profile"
          className="size-6 rounded-full opacity-10"
        />
      </ToggleGroupItem>
      <ToggleGroupItem value="death" disabled>
        <img
          src="https://placehold.co/24x24/f8fafc/f8fafc.png"
          alt="profile"
          className="size-6 rounded-full opacity-10"
        />
      </ToggleGroupItem>
      <ToggleGroupItem value="energy" disabled>
        <img
          src="https://placehold.co/24x24/f8fafc/f8fafc.png"
          alt="profile"
          className="size-6 rounded-full opacity-10"
        />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
