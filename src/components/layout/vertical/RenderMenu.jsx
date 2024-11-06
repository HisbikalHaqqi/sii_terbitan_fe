import { MenuItem, SubMenu } from "@menu/vertical-menu";
import { useParams } from "next/navigation";

const RenderMenu = ({ menuItems }) => {
  const params = useParams();

  const { lang: locale } = params;
  return menuItems.map((menu, index) => {
    if (menu.submenu && menu.submenu.length > 0) {
      return (
        <SubMenu
          key={index}
          label={menu.menu_title}
          icon={<i className={menu.menu_icon} />}
        >
          {menu.submenu &&
            menu.submenu.map((subItems, subIndex) => {
              if (subItems.submenu && menu.submenu.length > 0) {
                return (
                  <SubMenu
                    key={subIndex}
                    label={subItems.menu_title}
                    icon={<i className={subItems.menu_icon} />}
                  >
                    {subItems.submenu &&
                      subItems.submenu.map((childMenu, childIndex) => {
                        if (childMenu.submenu && childMenu.submenu.length > 0) {
                          return (
                            <SubMenu
                              key={childIndex}
                              label={childMenu.menu_title}
                              icon={<i className={childMenu.menu_icon} />}
                            />
                          );
                        } else {
                          return (
                            <MenuItem
                              key={childIndex}
                              href={`/${locale}/${childMenu.menu_link}`}
                              icon={<i className={childMenu.menu_icon} />}
                            >
                              {childMenu.menu_title}
                            </MenuItem>
                          );
                        }
                      })}
                  </SubMenu>
                );
              } else {
                return (
                  <MenuItem
                    key={subIndex}
                    href={`/${locale}/${subItems.menu_link}`}
                    icon={<i className={subItems.menu_icon} />}
                  >
                    {subItems.menu_title}
                  </MenuItem>
                );
              }
            })}
        </SubMenu>
      );
    } else {
      return (
        <MenuItem
          key={index}
          href={`/${locale}/${menu.menu_link}`}
          icon={<i className={menu.menu_icon} />}
        >
          {menu.menu_title}
        </MenuItem>
      );
    }
  });
};

export default RenderMenu;
