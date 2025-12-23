"use client";

import { FooterLinkType } from "@/app/types/footerlinks";
import { getDataPath } from "@/app/utils/paths";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "../Header/Logo";

const Footer = () => {
  const [footerlink, SetFooterlink] = useState<FooterLinkType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(getDataPath("/data.json"));
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        SetFooterlink(data.FooterLinkData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <footer>
      <div className="container py-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-20 gap-5">
          <div className="w-fit">
            <Logo />
          </div>
          <div className="flex sm:flex-row flex-col sm:items-center gap-8">
            <p className="text-darkblue dark:text-white text-lg font-medium">
              Newsletter
            </p>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email Address*"
                className="py-2.5 pl-3 pr-32 text-sm rounded-lg placeholder:text-lightgrey border border-lightgrey/30 focus:border-primary focus:outline-0 w-full"
              />
              <div className="absolute bottom-0 right-0">
                <button className="px-4 py-2 text-base font-medium text-white border rounded-lg border-primary bg-primary">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-16 xl:gap-8">
          {/* CLOUMN-1 */}
          <div className="lg:col-span-4 sm:col-span-2 flex flex-col gap-5">
            <div className="flex gap-4">
              <Link href="/" onClick={(e) => e.preventDefault()}>
                <Icon
                  icon="tabler:brand-instagram"
                  width={45}
                  height={45}
                  className="text-darkblue dark:text-white bg-darkmode/5 dark:bg-white/10 rounded-lg p-2 hover:text-primary dark:hover:text-primary duration-300"
                />
              </Link>
              <Link href="/" onClick={(e) => e.preventDefault()}>
                <Icon
                  icon="tabler:brand-dribbble"
                  width={45}
                  height={45}
                  className="text-darkblue dark:text-white bg-darkmode/5 dark:bg-white/10 rounded-lg p-2 hover:text-primary dark:hover:text-primary duration-300"
                />
              </Link>
              <Link href="/" onClick={(e) => e.preventDefault()}>
                <Icon
                  icon="tabler:brand-twitter-filled"
                  width={45}
                  height={45}
                  className="text-darkblue dark:text-white bg-darkmode/5 dark:bg-white/10 rounded-lg p-2 hover:text-primary dark:hover:text-primary duration-300"
                />
              </Link>
              <Link href="/" onClick={(e) => e.preventDefault()}>
                <Icon
                  icon="tabler:brand-youtube-filled"
                  width={45}
                  height={45}
                  className="text-darkblue dark:text-white bg-darkmode/5 dark:bg-white/10 rounded-lg p-2 hover:text-primary dark:hover:text-primary duration-300"
                />
              </Link>
            </div>
          </div>
          {/* CLOUMN-2 */}
          <div className="lg:col-span-4 col-span-1">
            <div className="flex gap-20">
              {footerlink.map((product, i) => (
                <div key={i} className="group relative col-span-2">
                  <p className="text-xl font-semibold mb-9">
                    {product.section}
                  </p>
                  <ul>
                    {product.links.map((item, i) => (
                      <li key={i} className="mb-3">
                        <Link
                          href={item.href}
                          onClick={(e) => e.preventDefault()}
                          className="text-darkblue/60 dark:text-white/60 hover:text-primary dark:hover:text-primary text-base font-normal mb-6"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {/* CLOUMN-3 */}
          <div className="lg:col-span-4 col-span-1">
            <div className="flex gap-2">
              <Icon
                icon={"tabler:map-pin"}
                width={22}
                height={22}
                className="text-lightgrey"
              />
              <p className="text-base font-normal text-offwhite">
                925 Filbert Street Pennsylvania 18072
              </p>
            </div>
            <div className="flex gap-2 mt-10">
              <Icon
                icon={"tabler:phone"}
                width={22}
                height={22}
                className="text-lightgrey"
              />
              <Link
                href="tel:+ 45 34 11 44 11"
                onClick={(e) => e.preventDefault()}
              >
                <p className="text-base font-normal text-offwhite hover:text-primary dark:hover:text-primary">
                  + 45 34 11 44 11
                </p>
              </Link>
            </div>
            <div className="flex gap-2 mt-10">
              <Icon
                icon={"tabler:mail"}
                width={22}
                height={22}
                className="text-lightgrey"
              />
              <Link
                href="mailto:info@gmail.com"
                onClick={(e) => e.preventDefault()}
              >
                <p className="text-base font-normal text-offwhite hover:text-primary dark:hover:text-primary">
                  info@gmail.com
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-3">
        <p className="text-center">
          @2025 - All Rights Reserved by{" "}
          <Link
            href="https://getnextjstemplates.com/"
            target="_blank"
            className="hover:text-primary dark:hover:text-primary"
          >
            {" "}
            GetNextJs Templates.com
          </Link>
          {" - Distributed by "}
          <Link
            href="https://themewagon.com"
            target="_blank"
            className="hover:text-primary dark:hover:text-primary"
          >
            ThemeWagon
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
