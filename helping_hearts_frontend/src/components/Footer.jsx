import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-gradient-to-r relative bottom-[0] from-[#8CC43C] to-[#8CC43C] py-8 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h4 className="mb-4 text-lg font-bold text-white">About Us</h4>
              <p className="text-white/80">
                Eldercare Home is a premier senior living community dedicated to
                providing exceptional care and support for our residents.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-bold text-white">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a className="hover:text-white/80" href="#">
                    Assisted Living
                  </a>
                </li>
                <li>
                  <a className="hover:text-white/80" href="#">
                    Memory Care
                  </a>
                </li>
                <li>
                  <a className="hover:text-white/80" href="#">
                    Respite Care
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-bold text-white">Amenities</h4>
              <ul className="space-y-2">
                <li>
                  <a className="hover:text-white/80" href="#">
                    Dining
                  </a>
                </li>
                <li>
                  <a className="hover:text-white/80" href="#">
                    Activities
                  </a>
                </li>
                <li>
                  <a className="hover:text-white/80" href="#">
                    Fitness Center
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-bold text-white">Contact</h4>
              <ul className="space-y-2">
                <li>
                  <a className="hover:text-white/80" href="#">
                    +1 (234) 567-890
                  </a>
                </li>
                <li>
                  <a className="hover:text-white/80" href="#">
                    info@eldercarehome.com
                  </a>
                </li>
                <li>
                  <p className="text-white/80">123 Main Street, Anytown USA</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-white/80">
              © 2024 Eldercare Home. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
