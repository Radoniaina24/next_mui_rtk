import {
  IconLayoutDashboard,
  IconSettings,
  Icon24Hours,
  IconCalendarPause,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "paramètre",
  },
  {
    id: uniqueId(),
    title: "Holiday",
    icon: IconCalendarPause,
    href: "/parametre/holiday",
  },
  {
    id: uniqueId(),
    title: "Permission",
    icon: Icon24Hours,
    href: "/parametre/permission",
  },
  {
    id: uniqueId(),
    title: "Autre paramètre",
    icon: IconSettings,
    href: "/parametre/autre_parametre",
  },
  // {
  //   navlabel: true,
  //   subheader: "Auth",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/authentication/login",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/authentication/register",
  // },
  // {
  //   navlabel: true,
  //   subheader: "Extra",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Sample Page",
  //   icon: IconAperture,
  //   href: "/sample-page",
  // },
];

export default Menuitems;
