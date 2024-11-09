import { MenuItem, SubMenu } from "@menu/horizontal-menu";
import { useParams } from "next/navigation";

const RenderMenu = ({ dictionary, menuItems }) => {
  const params = useParams();

  console.log("menuItems", menuItems);

  const { lang: locale } = params;
  return (
    <>
      {menuItems &&
        menuItems.map((menu, index) => {
          if (menu && menu.kategori === "") {
            return (
              <SubMenu
                key={index}
                label="Dashboard"
                icon={<i className="ri-home-smile-line" />}
              >
                {menu.menu &&
                  menu.menu.map((subMenu, index) => {
                    return (
                      <MenuItem
                        key={index}
                        icon={<i className={subMenu.menu_icon} />}
                        href={`/${locale}/${subMenu.menu_link}`}
                      >
                        {subMenu.menu_title}
                      </MenuItem>
                    );
                  })}
              </SubMenu>
            );
          }

          if (menu && menu.kategori !== "") {
            return menu.menu.map((menu, index) => {
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
                                subItems.submenu.map(
                                  (childMenu, childIndex) => {
                                    if (
                                      childMenu.submenu &&
                                      childMenu.submenu.length > 0
                                    ) {
                                      return (
                                        <SubMenu
                                          key={childIndex}
                                          label={childMenu.menu_title}
                                          icon={
                                            <i
                                              className={childMenu.menu_icon}
                                            />
                                          }
                                        />
                                      );
                                    } else {
                                      return (
                                        <MenuItem
                                          key={childIndex}
                                          href={`/${locale}/${childMenu.menu_link}`}
                                          icon={
                                            <i
                                              className={childMenu.menu_icon}
                                            />
                                          }
                                        >
                                          {childMenu.menu_title}
                                        </MenuItem>
                                      );
                                    }
                                  }
                                )}
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
          }
        })}
      {/* {menuItems && menuItems.kategori !== "" && {
       

      }} */}
    </>
  );

  //     else {
  //       return (
  //         <MenuItem
  //           key={index}
  //           href={`/${locale}/${menu.menu_link}`}
  //           icon={<i className={menu.menu_icon} />}
  //         >
  //           {menu.menu_title}
  //         </MenuItem>
  //       );
  //     }
  //   });
};

export default RenderMenu;
