'use client'
import React, { useState, useEffect } from 'react';

import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { getFooterRes } from '@/helper';

const Footer = () => {
  interface FooterLink {
    title: string;
    href: string;
  }

  interface FooterSublinks{
    link_header: string;
    links: FooterLink[];
  }

  interface FooterData {
    uid: string;
    title: string;
    footer_links: FooterSublinks[];
    newsletter: {
      newsletter_header: string;
      description: string;
      subscribe: {
        title: string;
        href: string;
      }
    }
    social_links: {
      title: string;
      links: FooterLink[];
    };
    copyrights: string;
  }


  const [data, setData] = useState<FooterData>({
    uid: "",
    title: "",
    footer_links: [],
    newsletter: {
      newsletter_header: "",
      description: "",
      subscribe: {
        title: "",
        href: ""
      }
    },
    social_links: {
      title: "",
      links: []
    },
    copyrights: ""
  });

  async function getFooterInfo() {
    try {
      const res = await getFooterRes();
      console.log("footer res" + res);
      setData(res);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getFooterInfo();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}

          {data.footer_links.map((footerlink, index) => (
            <div className="space-y-4" key={index}>
              <h3 className="text-lg font-semibold text-white">{footerlink.link_header}</h3>
              <ul className="space-y-2">

                {footerlink.links.map((footerlinks, indexes)=>
                <li key={indexes}><a href="#" className="hover:text-white transition-colors">{footerlinks.title}</a></li>
                )}
              </ul>
            </div>

          ))}


          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">{data.newsletter.newsletter_header}</h3>
            <p className="text-sm">{data.newsletter.description}</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {data.newsletter.subscribe.title}
              </button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex space-x-6">
              <a href="#" className="hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span>© {currentYear} {data.copyrights}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;