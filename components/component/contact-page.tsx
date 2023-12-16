import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FaMap, FaEnvelope, FaPhone } from "react-icons/fa"
export function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold text-center mb-16"><span className="text-primary">Contact Us</span> For Any Queries</h1>
      <div className="flex flex-wrap justify-between">
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex justify-center items-center">
        <iframe
        className="md:w-[600px] md:h-[500px] w-[350px] h-[400px]"
          loading="lazy"
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=Bhagwan+Parshuram+Institute+of+Technology`}>
        </iframe>
        </div>
        <div className="w-full lg:w-1/2 lg:pl-8 gap-8 flex flex-col">
          
          <div className="p-8 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">Send us your queries or suggestions</h2>
            <form>
              <div className="mb-4">
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="mb-4">
                <Input id="email" placeholder="Your Email" />
              </div>
              <div className="mb-4">
                <Input id="subject" placeholder="Subject" />
              </div>
              <div className="mb-6">
                <textarea
                  className="w-full p-2.5 text-base text-gray-700 border rounded-lg focus:shadow-outline"
                  id="message"
                  placeholder="Message"
                />
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </div>
          <div className="flex flex-wrap flex-row items-center mb-8 gap-6">
            <div className="w-full lg:w-fit">
              <div className="flex items-center space-x-2 bg-secondary/10 p-4 rounded-lg">
                <FaMap className="w-6 h-6" />
                <span className="text-lg">BPIT, Delhi, India</span>
              </div>
            </div>
            <div className="w-full lg:w-fit">
              <div className="flex items-center space-x-2 bg-secondary/10 p-4 rounded-lg">
                <FaEnvelope className="w-6 h-6" />
                <span className="text-lg">info@urgig.com</span>
              </div>
            </div>
            <div className="w-full lg:w-fit">
              <div className="flex items-center space-x-2 bg-secondary/10 p-4 rounded-lg">
                <FaPhone className="w-6 h-6" />
                <span className="text-lg">+919191919191</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
