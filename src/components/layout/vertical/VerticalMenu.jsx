// Next Imports
import { useParams } from "next/navigation";

// MUI Imports
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";

// Third-party Imports
import PerfectScrollbar from "react-perfect-scrollbar";

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from "@menu/vertical-menu";

// import { GenerateVerticalMenu } from '@components/GenerateMenu'
// Hook Imports
import useVerticalNav from "@menu/hooks/useVerticalNav";

// Styled Component Imports
import StyledVerticalNavExpandIcon from "@menu/styles/vertical/StyledVerticalNavExpandIcon";

// Style Imports
import menuItemStyles from "@core/styles/vertical/menuItemStyles";
import menuSectionStyles from "@core/styles/vertical/menuSectionStyles";
import RenderMenu from "@/components/layout/vertical/RenderMenu";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon
    open={open}
    transitionDuration={transitionDuration}
  >
    <i className="ri-arrow-right-s-line" />
  </StyledVerticalNavExpandIcon>
);

const VerticalMenu = ({ dictionary, scrollMenu }) => {
  // Hooks
  const theme = useTheme();
  const verticalNavOptions = useVerticalNav();
  const params = useParams();
  const [menuData, setMenuData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const token = session?.user?.accessToken;
  const role = session?.user?.role;

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions;
  const { lang: locale } = params;
  const ScrollWrapper = isBreakpointReached ? "div" : PerfectScrollbar;

  const fetchMenuData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ role: role }),
        cache: "force-cache",
        next: {
          revalidate: 1 * 1 * 30,
        },
      });

      const data = await res.json();
      const menu = data.dataResponse.data.data;

      setMenuData(menu);
    } catch (error) {
      console.error("Error fetching menu data:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // const storedMenuData = localStorage.getItem("menu");
    // if (storedMenuData) {
    //   setMenuData(JSON.parse(storedMenuData));
    // } else {
    fetchMenuData();
    // }
  }, []);

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: "bs-full overflow-y-auto overflow-x-hidden",
            onScroll: (container) => scrollMenu(container, false),
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: (container) => scrollMenu(container, true),
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}

      {/* AUTHOR MENU */}

      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        <Menu
          popoutMenuOffset={{ mainAxis: 10 }}
          menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
          renderExpandIcon={({ open }) => (
            <RenderExpandIcon
              open={open}
              transitionDuration={transitionDuration}
            />
          )}
          renderExpandedMenuItemIcon={{
            icon: <i className="ri-circle-line" />,
          }}
          menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
        >
          {menuData
            ? menuData.map((menuCategory, index) => {
                if (menuCategory?.kategori === "") {
                  return (
                    <RenderMenu key={index} menuItems={menuCategory.menu} />
                  );
                } else {
                  return (
                    <MenuSection key={index} label={menuCategory.kategori}>
                      <RenderMenu menuItems={menuCategory.menu} />
                    </MenuSection>
                  );
                }
              })
            : null}
        </Menu>
      )}
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 10 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => (
          <RenderExpandIcon
            open={open}
            transitionDuration={transitionDuration}
          />
        )}
        renderExpandedMenuItemIcon={{ icon: <i className="ri-circle-line" /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <SubMenu
          label={dictionary["navigation"].dashboards}
          icon={<i className="ri-home-smile-line" />}
          suffix={<Chip label="5" size="small" color="error" />}
        >
          <MenuItem href={`/${locale}/dashboards/crm`}>
            {dictionary["navigation"].crm}
          </MenuItem>
        </SubMenu>
        <MenuSection label={dictionary["navigation"].appsPagesAuthor}>
          <SubMenu
            label={dictionary["navigation"].submission}
            icon={<i className="ri-lock-2-line" />}
          >
            <MenuItem href={`/${locale}/apps/ecommerce/products/add`}>
              {dictionary["navigation"].submission_add}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/submission/list_approve`}>
              {dictionary["navigation"].submission_list_approval}
            </MenuItem>
            <MenuItem href={`/${locale}/apps/submission/list_reject`}>
              {dictionary["navigation"].submission_list_reject}
            </MenuItem>
          </SubMenu>
          <SubMenu
            label={dictionary["navigation"].pages}
            icon={<i className="ri-user-line" />}
          >
            <MenuItem href={`/${locale}/pages/user-profile`}>
              {dictionary["navigation"].userProfile}
            </MenuItem>
            <MenuItem href={`/${locale}/pages/account-settings`}>
              {dictionary["navigation"].accountSettings}
            </MenuItem>
          </SubMenu>
        </MenuSection>
      </Menu> */}

      {/* ADMINISTRATOR MENU */}
      {/* <Menu
        popoutMenuOffset={{ mainAxis: 10 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => (
          <RenderExpandIcon
            open={open}
            transitionDuration={transitionDuration}
          />
        )}
        renderExpandedMenuItemIcon={{ icon: <i className="ri-circle-line" /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuSection label={dictionary["navigation"].appsPagesAdmin}>
          <MenuItem
            href={`/${locale}/apps/user/list`}
            icon={<i className="ri-user-line" />}
          >
            {dictionary["navigation"].customers}
          </MenuItem>
          <MenuItem
            href={`/${locale}/apps/ecommerce/products/category`}
            icon={<i className="ri-car-line" />}
          >
            {dictionary["navigation"].categories}
          </MenuItem>
          <MenuItem
            href={`/${locale}/apps/ecommerce/referrals`}
            icon={<i className="ri-layout-left-line" />}
          >
            {dictionary["navigation"].publisher}
          </MenuItem>
        </MenuSection>
      </Menu> */}
    </ScrollWrapper>
  );
};

export default VerticalMenu;
