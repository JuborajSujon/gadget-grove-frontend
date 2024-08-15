import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { LuPhone, LuFacebook } from "react-icons/lu";

export default function FooterLink() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-8  md:grid-cols-4">
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium text-lg">About</h2>
          <div className="flex flex-col space-y-2  dark:text-slate-300">
            <a href="#">About Us</a>
            <a href="#">Features</a>
            <a href="#">News</a>
            <a href="#">Careers</a>
            <a href="#">Services</a>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium text-lg">Company</h2>
          <div className="flex flex-col space-y-2  dark:text-slate-300">
            <a href="#">Our Team</a>
            <a href="#">Partner with Us</a>
            <a href="#">FAQs</a>
            <a href="#">Blog</a>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-medium text-lg">Support</h2>
          <div className="flex flex-col space-y-2  dark:text-slate-300">
            <a href="#">Support Center</a>
            <a href="#">Feedback</a>
            <a href="#">Contact Us</a>
            <a href="#">Accessibility</a>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="font-semibold text-lg">Get in touch</h2>
          <div className="flex flex-col space-y-2 dark:text-slate-300">
            <a href="tel:+12025550151">+1 202 555 01 51</a>
            <a href="mailto:mealmaster@example.com" className="break-words">
              gadgetgrove@example.com
            </a>
            <div className="flex mt-2">
              <div className="hover:bg-orange-100 p-2 rounded-md cursor-pointer">
                <LuPhone size={24} />
              </div>

              <div className="hover:bg-orange-100 p-2 rounded-md cursor-pointer">
                <LuFacebook size={24} />
              </div>

              <div className="hover:bg-orange-100 p-2 rounded-md cursor-pointer">
                <FaInstagram size={24} />
              </div>

              <div className="hover:bg-orange-100 p-2 rounded-md cursor-pointer">
                <FaXTwitter size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
