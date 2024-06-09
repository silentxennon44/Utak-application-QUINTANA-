import { AiFillProduct } from "react-icons/ai";
import { RiHomeLine } from "react-icons/ri";
import { SlBasketLoaded } from "react-icons/sl";
import { TbFileInvoice } from "react-icons/tb";
import { ImPriceTags } from "react-icons/im";
import { PiGearDuotone } from "react-icons/pi";
import { BiSupport } from "react-icons/bi";

export const menusCategories = [
  "Appetizers",
  "Salads",
  "Soups",
  "Main Courses",
  "Pasta",
  "Burgers and Sandwiches",
  "Pizza",
  "Seafood",
  "Side Dishes",
  "Desserts",
  "Beverages",
  "Breakfast",
  "Kids' Menu"
]

export const navigationTop = [
  {
    name: "Overview",
    logo :RiHomeLine,
  },
  {
    name: "Products",
    logo:AiFillProduct,
  },
  {
    name: "Purchase Orders",
    logo:SlBasketLoaded,
  },
  {
    name: "Invoices",
    logo:TbFileInvoice,
  },
  {
    name: "Pricing",
    logo:ImPriceTags,
  },
]

export const navigationBottom = [
  {
    name: "Settings",
    logo :PiGearDuotone,
  },
  {
    name: "Help & Support",
    logo:BiSupport,
  },
]

export const copyright = `© ${new Date().getFullYear()} Jan Adrian V. Quintana.`