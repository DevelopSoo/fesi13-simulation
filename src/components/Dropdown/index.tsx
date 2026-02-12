"use client"; // 빼먹지 말기

import {
  Menu,
  MenuButton,
  MenuHeading,
  MenuItem,
  MenuItems,
  MenuSection,
  MenuSeparator,
} from "@headlessui/react";

export default function Dropdown() {
  return (
    <Menu>
      <MenuButton>My account</MenuButton>
      <MenuItems anchor="top">
        <MenuSection>
          <MenuHeading className="text-sm opacity-50">Settings</MenuHeading>
          <MenuItem>
            <a className="block data-[focus]:bg-blue-100" href="/profile">
              My profile
            </a>
          </MenuItem>
          <MenuItem>
            <a className="block data-[focus]:bg-blue-100" href="/notifications">
              Notifications
            </a>
          </MenuItem>
        </MenuSection>
      </MenuItems>
    </Menu>
  );
}
