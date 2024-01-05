import { UseTheme } from "@/hooks/UseTheme";
import { UseUser } from "@/hooks/UseUser";
import { ButtonFilled, ButtonOutline } from "./Buttons";

const Header = () => {
  const { user } = UseUser();

  console.log(user);

  const { theme } = UseTheme();

  return (
    <>
      <div className="w-full p-3 h-20 border border-black fixed top-0 left-0 flex gap-2 items-center justify-between">
        <div>Title</div>
        <div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <ButtonOutline children="Login"></ButtonOutline>
            </div>
            <div>
              <ButtonFilled>Sign Up</ButtonFilled>
            </div>
            <div> {theme}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
