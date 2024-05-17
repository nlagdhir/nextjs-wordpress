import { ButtonLink } from "Components/ButtonLink/ButtonLink";
import Link from "next/link";
import { FaHeart, FaHouseUser } from "react-icons/fa";

export const MainMenu = ({
  items,
  callToActionLabel,
  callToActionDestination,
}) => {
  return (
    <div className="bg-slate-800 px-5 text-white h-[64px] sticky top-0 z-20 flex">
      <div className="flex py-4 pl-5 text-pink-600">
        <FaHouseUser size={30} />
        <FaHeart size={30} />
      </div>
      <div className="flex flex-1 justify-end">
        {items.map((item) => ( 
          <div key={item.id} className="hover:bg-slate-700 cursor-pointer relative group">
            <div>
              <Link href={item.destination} className="p-5 block">
                {item.label}
              </Link>
            </div>
            {!!item.subMenuItems?.length && (
              <div className="group-hover:block hidden bg-slate-800 text-right right-0 absolute">
                {item.subMenuItems.map((subMenuItem) => (
                  <Link
                    key={subMenuItem.id}
                    className="hover:bg-slate-700 block whitespace-nowrap p-5"
                    href={subMenuItem.destination}
                  >
                    {subMenuItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <div className="ml-3 my-auto">
          <ButtonLink
            destination={callToActionDestination}
            label={callToActionLabel}
          />
        </div>
      </div>
    </div>
  );
};
