import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Services", href: "#", current: false },
  { name: "Donate", href: "/donation-form", current: false },
  { name: "About Us", href: "#", current: false },
  { name: "Contact Us", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate("/login");
    toast.success("Logged out successfully");
  };
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  return (
    <Disclosure
      as="nav"
      className="p-4 bg-white shadow-md shadow-gray-500 border-gray-500 backdrop-blur-sm fixed top-0 z-50 left-0 right-0"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-800 hover:bg-[#8BC53E] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start mr-5">
                <div className="flex flex-shrink-0 items-center">
                  <Link to={"/"}>
                    <img
                      className="h-16 w-auto"
                      src="assets/images/logo.png"
                      alt="Helping Hearts"
                    />
                  </Link>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          location.pathname === item.href
                            ? "bg-[#8BC53E] text-white"
                            : "text-gray-800 hover:bg-[#8BC53E] hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={
                          location.pathname === item.href ? "page" : undefined
                        }
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                {user ? (
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </MenuButton>
                    </div>
                    <Transition
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              href="#"
                              className={classNames(
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </MenuItem>
                        <MenuItem>
                          {({ focus }) => (
                            <Link
                              onClick={logout}
                              className={classNames(
                                focus ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Logout
                            </Link>
                          )}
                        </MenuItem>
                      </MenuItems>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="relative gap-3 ml-1 hidden sm:flex sm:flex-row md:items-center">
                    <Link
                      to="/login"
                      className="w-full bg-[#8BC53E] text-white p-2 px-5 rounded"
                    >
                      LOGIN
                    </Link>
                    <Link
                      to="/signup"
                      className="w-full bg-[#8BC53E] text-white p-2 px-5 rounded"
                    >
                      SIGNUP
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href
                      ? "bg-[#8BC53E] text-white"
                      : "text-gray-800 hover:bg-[#8BC53E] hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={
                    location.pathname === item.href ? "page" : undefined
                  }
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
